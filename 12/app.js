// Konami Code
const konamiCode = [
    "ArrowUp", "ArrowUp",
    "ArrowDown", "ArrowDown",
    "ArrowLeft", "ArrowRight",
    "ArrowLeft", "ArrowRight",
    "b", "a"
  ];

  // Store user input
  let userInput = [];

  // Listen for key presses
  document.addEventListener("keydown", function(event) {
    userInput.push(event.key);

    // Limit input to last 10 keys only
    if (userInput.length > konamiCode.length) {
      userInput.shift();
    }

    // Check for match
    if (JSON.stringify(userInput) === JSON.stringify(konamiCode)) {
      document.getElementById("message").textContent = "🎉 Konami Code Activated!";
    }
  });