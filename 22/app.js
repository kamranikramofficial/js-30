class FollowAlongLinks {
    constructor() {
        this.navLinks = document.querySelectorAll('.nav-link');
        this.highlight = document.getElementById('highlight');
        this.sections = document.querySelectorAll('section');
        this.progressBar = document.getElementById('progressBar');
        this.mobileMenuBtn = document.getElementById('mobileMenuBtn');
        this.navLinksContainer = document.getElementById('navLinks');

        this.currentSection = 'home';
        this.isScrolling = false;

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateHighlight();
        this.observeSections();
        this.animateOnScroll();
    }

    setupEventListeners() {
        // Navigation link clicks
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                this.scrollToSection(targetId);
                this.setActiveLink(link);
            });

            // Hover effects
            link.addEventListener('mouseenter', () => {
                if (!this.isScrolling) {
                    this.updateHighlight(link);
                }
            });
        });

        // Return highlight to active link when not hovering
        this.navLinksContainer.addEventListener('mouseleave', () => {
            if (!this.isScrolling) {
                const activeLink = document.querySelector('.nav-link.active');
                this.updateHighlight(activeLink);
            }
        });

        // Scroll events
        window.addEventListener('scroll', () => {
            this.updateProgressBar();
            this.updateActiveSection();
        });

        // Mobile menu toggle
        this.mobileMenuBtn.addEventListener('click', () => {
            this.navLinksContainer.classList.toggle('active');
        });

        // Resize events
        window.addEventListener('resize', () => {
            this.updateHighlight();
        });
    }

    updateHighlight(targetLink = null) {
        const activeLink = targetLink || document.querySelector('.nav-link.active');
        if (!activeLink) return;

        const linkRect = activeLink.getBoundingClientRect();
        const navRect = this.navLinksContainer.getBoundingClientRect();

        const left = linkRect.left - navRect.left - 10;
        const width = linkRect.width;
        const height = linkRect.height;

        this.highlight.style.left = `${left}px`;
        this.highlight.style.width = `${width}px`;
        this.highlight.style.height = `${height}px`;
    }

    setActiveLink(clickedLink) {
        this.navLinks.forEach(link => link.classList.remove('active'));
        clickedLink.classList.add('active');
        this.updateHighlight(clickedLink);
    }

    scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            this.isScrolling = true;
            section.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            // Reset scrolling flag after animation
            setTimeout(() => {
                this.isScrolling = false;
            }, 1000);
        }
    }

    updateProgressBar() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        this.progressBar.style.width = `${scrollPercent}%`;
    }

    updateActiveSection() {
        if (this.isScrolling) return;

        const scrollPosition = window.scrollY + 150;

        this.sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                if (this.currentSection !== sectionId) {
                    this.currentSection = sectionId;
                    const correspondingLink = document.querySelector(`a[href="#${sectionId}"]`);
                    if (correspondingLink) {
                        this.setActiveLink(correspondingLink);
                    }
                }
            }
        });
    }

    observeSections() {
        const observerOptions = {
            threshold: 0.3,
            rootMargin: '-50px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const sectionContent = entry.target.querySelector('.section-content');
                if (entry.isIntersecting) {
                    sectionContent.classList.add('visible');
                }
            });
        }, observerOptions);

        this.sections.forEach(section => {
            observer.observe(section);
        });
    }

    animateOnScroll() {
        // Add parallax effect to floating elements
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.floating-element');

            parallaxElements.forEach((element, index) => {
                const speed = 0.5 + (index * 0.1);
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.1}deg)`;
            });
        });
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    new FollowAlongLinks();
});

// Add some interactive effects
document.addEventListener('mousemove', (e) => {
    const cursor = document.createElement('div');
    cursor.style.cssText = `
                position: fixed;
                width: 10px;
                height: 10px;
                background: rgba(0, 0, 0, 0.3);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                left: ${e.clientX - 5}px;
                top: ${e.clientY - 5}px;
                animation: cursorFade 0.5s ease-out forwards;
            `;

    document.body.appendChild(cursor);

    setTimeout(() => {
        cursor.remove();
    }, 500);
});

// Add cursor fade animation
const style = document.createElement('style');
style.textContent = `
            @keyframes cursorFade {
                0% {
                    opacity: 1;
                    transform: scale(1);
                }
                100% {
                    opacity: 0;
                    transform: scale(2);
                }
            }
        `;
document.head.appendChild(style);
// kamran made github-id kamranikramofficial
