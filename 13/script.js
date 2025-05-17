// Initialize AOS
document.addEventListener('DOMContentLoaded', function () {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out',
            delay: 0,
            once: false,
            mirror: false,
            anchorPlacement: 'top-bottom',
        });

        // Function to check if element is in viewport
        function isElementInViewport(el) {
            const rect = el.getBoundingClientRect();
            return (
                rect.top < window.innerHeight &&
                rect.bottom > 0
            );
        }

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
