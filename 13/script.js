// Initialize AOS
document.addEventListener('DOMContentLoaded', function () {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,           // Animation duration in ms
            easing: 'ease-out',      // Animation easing
            delay: 0,                // Default delay in ms
            once: false,             // Whether animation should happen only once - false = repeat
            mirror: false,           // Whether elements should animate out while scrolling past them
            anchorPlacement: 'top-bottom', // Defines which position of the element regarding to window should trigger the animation
        });

        // Function to check if element is in viewport
        function isElementInViewport(el) {
            const rect = el.getBoundingClientRect();
            return (
                rect.top < window.innerHeight &&
                rect.bottom > 0
            );
        }

        // Remove 'aos-animate' class when elements are not in viewport
        // This ensures animations repeat every time an element enters the viewport
        document.addEventListener('scroll', function () {
            const elements = document.querySelectorAll('[data-aos]');
            elements.forEach(element => {
                if (!isElementInViewport(element)) {
                    element.classList.remove('aos-animate');
                }
            });
        });

        // Ensure animations work on page load for elements already in viewport
        setTimeout(function () {
            AOS.refresh();
        }, 100);
    } else {
        console.warn('AOS is not initialized. Make sure AOS library is included.');
    }
});