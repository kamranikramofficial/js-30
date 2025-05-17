document.addEventListener('DOMContentLoaded', function () {
    const galleryItems = document.querySelectorAll('.gallery-item');

    function handleMouseEnter() {
        galleryItems.forEach(item => {
            item.classList.remove('active');
        });
        this.classList.add('active');
    }

    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', handleMouseEnter);
    });

    if (galleryItems.length > 0) {
        galleryItems[0].classList.add('active');
    }
    galleryItems.forEach(item => {
        item.addEventListener('click', function () {
            if (!this.classList.contains('active')) {
                galleryItems.forEach(item => {
                    item.classList.remove('active');
                });

                this.classList.add('active');
            }
        });
    });
});