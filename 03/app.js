        const marginSlider = document.getElementById('marginSlider');
        const opacitySlider = document.getElementById('opacitySlider');
        
        const marginValue = document.getElementById('marginValue');
        const opacityValue = document.getElementById('opacityValue');
        
        const images = document.querySelectorAll('.stack-image');
        
        function updateMargin() {
            const value = marginSlider.value;
            marginValue.textContent = `${value}px`;
 
            
            
            images[0].style.top = `${value}px`;
            images[0].style.left = `${value}px`;
            
        }
        
        function updateOpacity() {
            const value = opacitySlider.value;
            opacityValue.textContent = `${value}%`;
            
            images.forEach(image => {
                image.style.opacity = value / 100;
            });
        }
        
        marginSlider.addEventListener('input', updateMargin);
        opacitySlider.addEventListener('input', updateOpacity);
        
        updateMargin();
        updateOpacity();