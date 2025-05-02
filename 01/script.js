document.addEventListener("DOMContentLoaded", () => {
    let audioContext
    let analyser
    let dataArray
    let canvasContext
    let canvas
    let width
    let height
    let animationId
  
    function initAudio() {
      audioContext = new (window.AudioContext || window.webkitAudioContext)()
      analyser = audioContext.createAnalyser()
      analyser.fftSize = 256
  
      canvas = document.getElementById("visualizer")
      canvasContext = canvas.getContext("2d")
  
      // Set canvas dimensions
      width = canvas.width = canvas.offsetWidth
      height = canvas.height = canvas.offsetHeight
  
      // Create buffer for frequency data
      dataArray = new Uint8Array(analyser.frequencyBinCount)
  
      // Start visualization
      visualize()
    }
  
    // Function to play sound when a key is pressed
    function playSound(e) {
      // Get keyCode from event or data attribute
      const keyCode = e.keyCode || this.getAttribute("data-key")
      const audio = document.querySelector(`audio[data-key="${keyCode}"]`)
      const key = document.querySelector(`.drum-pad[data-key="${keyCode}"]`)
  
      if (!audio) return // Stop if no audio found
  
      // Initialize audio context on first interaction
      if (!audioContext) {
        initAudio()
      }
  
      // Create source from audio element
      const source = audioContext.createMediaElementSource(audio.cloneNode())
      source.connect(analyser)
      analyser.connect(audioContext.destination)
  
      // Reset audio and play
      audio.currentTime = 0
      audio.play()
  
      // Add visual feedback
      key.classList.add("playing")
  
      // Create ripple effect
      createRipple(e, key)
    }
  
    // Create ripple effect on drum pad
    function createRipple(e, key) {
      const ripple = document.createElement("span")
      ripple.classList.add("ripple")
  
      // Position ripple at click location or center
      if (e.clientX && e.clientY) {
        const rect = key.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
  
        ripple.style.left = `${x}px`
        ripple.style.top = `${y}px`
      } else {
        ripple.style.left = "50%"
        ripple.style.top = "50%"
        ripple.style.transform = "translate(-50%, -50%)"
      }
  
      // Set ripple size based on element
      const size = Math.max(key.offsetWidth, key.offsetHeight)
      ripple.style.width = ripple.style.height = `${size}px`
  
      // Add ripple to element
      key.appendChild(ripple)
  
      // Remove ripple after animation
      setTimeout(() => {
        ripple.remove()
      }, 800)
    }
  
    // Remove playing class when transition ends
    function removeTransition(e) {
      if (e.propertyName !== "transform") return
      this.classList.remove("playing")
    }
  
    // Visualize audio
    function visualize() {
      // Request animation frame
      animationId = requestAnimationFrame(visualize)
  
      // Get frequency data
      analyser.getByteFrequencyData(dataArray)
  
      // Clear canvas
      canvasContext.clearRect(0, 0, width, height)
  
      // Set bar width based on canvas and data
      const barWidth = width / analyser.frequencyBinCount
      let barHeight
      let x = 0
  
      // Draw bars for each frequency
      for (let i = 0; i < analyser.frequencyBinCount; i++) {
        barHeight = (dataArray[i] / 255) * height
  
        // Create gradient
        const gradient = canvasContext.createLinearGradient(0, height, 0, height - barHeight)
        gradient.addColorStop(0, "rgba(100, 255, 218, 0.7)")
        gradient.addColorStop(1, "rgba(100, 255, 218, 0.2)")
  
        canvasContext.fillStyle = gradient
        canvasContext.fillRect(x, height - barHeight, barWidth, barHeight)
  
        x += barWidth
      }
    }
  
    // Add event listeners to all keys
    const keys = document.querySelectorAll(".drum-pad")
    keys.forEach((key) => {
      key.addEventListener("transitionend", removeTransition)
      key.addEventListener("click", playSound)
      key.setAttribute("data-key", key.getAttribute("data-key"))
    })
  
    // Listen for keydown events
    window.addEventListener("keydown", playSound)
  
    // Handle window resize
    window.addEventListener("resize", () => {
      if (canvas) {
        width = canvas.width = canvas.offsetWidth
        height = canvas.height = canvas.offsetHeight
      }
    })
  })
  