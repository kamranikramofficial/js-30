document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    const loadingIndicator = document.getElementById('loading-indicator');
    
    let cities = [];
    let selectedIndex = -1;
    let debounceTimer;

    fetch('cities.json')
        .then(response => response.json())
        .then(data => {
            cities = data;
        })
        .catch(error => {
            console.error('Error loading cities data:', error);
        });

    function debounce(func, delay) {
        return function() {
            const context = this;
            const args = arguments;
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                func.apply(context, args);
            }, delay);
        };
    }

    const performSearch = debounce(function(query) {
        if (query.length < 2) {
            searchResults.innerHTML = '';
            searchResults.classList.remove('active');
            return;
        }

        loadingIndicator.style.display = 'block';

        setTimeout(() => {
            const filteredCities = cities.filter(city => 
                city.name.toLowerCase().includes(query.toLowerCase()) || 
                city.state.toLowerCase().includes(query.toLowerCase())
            ).slice(0, 10);

            loadingIndicator.style.display = 'none';
            displayResults(filteredCities, query);
        }, 300);
    }, 300);

    function displayResults(results, query) {
        searchResults.innerHTML = '';

        if (results.length === 0) {
            searchResults.innerHTML = '<div class="no-results">No results found</div>';
            searchResults.classList.add('active');
            return;
        }

        results.forEach((result, index) => {
            const resultItem = document.createElement('div');
            resultItem.className = 'search-result-item';
            resultItem.setAttribute('data-index', index);

            const nameElement = document.createElement('div');
            nameElement.className = 'result-name';
            nameElement.innerHTML = highlightMatch(result.name, query);

            const stateElement = document.createElement('div');
            stateElement.className = 'result-state';
            stateElement.textContent = result.state;

            resultItem.appendChild(nameElement);
            resultItem.appendChild(stateElement);

            resultItem.addEventListener('click', () => {
                selectResult(result);
            });

            searchResults.appendChild(resultItem);
        });

        searchResults.classList.add('active');
        selectedIndex = -1;
    }

    function highlightMatch(text, query) {
        if (!query) return text;
        const regex = new RegExp(`(${escapeRegExp(query)})`, 'gi');
        return text.replace(regex, '<span class="highlight">$1</span>');
    }

    function escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    function selectResult(result) {
        searchInput.value = result.name;
        searchResults.innerHTML = '';
        searchResults.classList.remove('active');
    }

    searchInput.addEventListener('input', function() {
        const query = this.value.trim();
        performSearch(query);
    });

    searchInput.addEventListener('focus', function() {
        const query = this.value.trim();
        if (query.length >= 2) {
            performSearch(query);
        }
    });

    searchInput.addEventListener('keydown', function(e) {
        const items = searchResults.querySelectorAll('.search-result-item');

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            selectedIndex = Math.min(selectedIndex + 1, items.length - 1);
            updateSelectedItem(items);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            selectedIndex = Math.max(selectedIndex - 1, -1);
            updateSelectedItem(items);
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (selectedIndex >= 0 && items[selectedIndex]) {
                const selectedResult = cities.find(city => 
                    city.name === items[selectedIndex].querySelector('.result-name').textContent.replace(/\s+/g, ' ')
                );
                if (selectedResult) {
                    selectResult(selectedResult);
                }
            }
        } else if (e.key === 'Escape') {
            searchResults.innerHTML = '';
            searchResults.classList.remove('active');
        }
    });

    function updateSelectedItem(items) {
        items.forEach(item => {
            item.classList.remove('selected');
        });

        if (selectedIndex >= 0 && items[selectedIndex]) {
            items[selectedIndex].classList.add('selected');
            items[selectedIndex].scrollIntoView({ block: 'nearest' });
        }
    }

    document.addEventListener('click', function(e) {
        if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.innerHTML = '';
            searchResults.classList.remove('active');
        }
    });
});
