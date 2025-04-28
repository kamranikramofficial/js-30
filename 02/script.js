document.addEventListener('DOMContentLoaded', function() {
    const hourHand = document.querySelector('.hour-hand');
    const minuteHand = document.querySelector('.minute-hand');
    const secondHand = document.querySelector('.second-hand');
    
    function setDate() {
        const now = new Date();
        
        // Seconds
        const seconds = now.getSeconds();
        const secondsDegrees = ((seconds / 60) * 360) + 90; 
        secondHand.style.transform = `rotate(${secondsDegrees}deg)`;
        
        // Minutes
        const minutes = now.getMinutes();
        const minutesDegrees = ((minutes / 60) * 360) + ((seconds / 60) * 6) + 90;
        minuteHand.style.transform = `rotate(${minutesDegrees}deg)`;
        
        // Hours
        const hours = now.getHours() % 12; // Convert to 12-hour format
        const hoursDegrees = ((hours / 12) * 360) + ((minutes / 60) * 30) + 90;
        hourHand.style.transform = `rotate(${hoursDegrees}deg)`;
        
        if (seconds === 0) {
            secondHand.style.transition = 'none';
            setTimeout(() => {
                secondHand.style.transition = 'all 0.05s cubic-bezier(0.1, 2.7, 0.58, 1)';
            }, 50);
        }
        
        if (minutes === 0 && seconds === 0) {
            minuteHand.style.transition = 'none';
            setTimeout(() => {
                minuteHand.style.transition = 'all 0.1s cubic-bezier(0.1, 2.7, 0.58, 1)';
            }, 50);
        }
        // console.log(now)
    }
    
    setDate();
    
    setInterval(setDate, 1000);
    

});