const glowText = document.getElementById('glowText');

document.addEventListener('mousemove', (e) => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const x = (e.clientX / width - 0.5) * 100;
  const y = (e.clientY / height - 0.5) * 100;

  glowText.style.textShadow = `
    ${x}px ${y}px 10px #00ffff,
    ${-x}px ${-y}px 15px #ff00ff,
    ${y}px ${-x}px 25px #ffeb3b,
    ${-y}px ${x}px 40px #00ffe1
  `;
  
});