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
  
      width = canvas.width = canvas.offsetWidth
      height = canvas.height = canvas.offsetHeight
  
      dataArray = new Uint8Array(analyser.frequencyBinCount)
  
      visualize()
    }
  
    function playSound(e) {
      const keyCode = e.keyCode || this.getAttribute("data-key")
      const audio = document.querySelector(`audio[data-key="${keyCode}"]`)
      const key = document.querySelector(`.drum-pad[data-key="${keyCode}"]`)
  
      if (!audio) return // Stop if no audio found
        if (!audioContext) {
        initAudio()
      }
  
      const source = audioContext.createMediaElementSource(audio.cloneNode())
      source.connect(analyser)
      analyser.connect(audioContext.destination)
  
      audio.currentTime = 0
      audio.play()
        key.classList.add("playing")
        createRipple(e, key)
    }
      function createRipple(e, key) {
      const ripple = document.createElement("span")
      ripple.classList.add("ripple")
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
  
      key.appendChild(ripple)
  
      setTimeout(() => {
        ripple.remove()
      }, 800)
    }
  
    function removeTransition(e) {
      if (e.propertyName !== "transform") return
      this.classList.remove("playing")
    }
  
    // Visualize audio
    function visualize() {
      animationId = requestAnimationFrame(visualize)
  
      analyser.getByteFrequencyData(dataArray)
  
      canvasContext.clearRect(0, 0, width, height)
  
      const barWidth = width / analyser.frequencyBinCount
      let barHeight
      let x = 0
  
      for (let i = 0; i < analyser.frequencyBinCount; i++) {
        barHeight = (dataArray[i] / 255) * height
  
        const gradient = canvasContext.createLinearGradient(0, height, 0, height - barHeight)
        gradient.addColorStop(0, "rgba(100, 255, 218, 0.7)")
        gradient.addColorStop(1, "rgba(100, 255, 218, 0.2)")
  
        canvasContext.fillStyle = gradient
        canvasContext.fillRect(x, height - barHeight, barWidth, barHeight)
  
        x += barWidth
      }
    }
  
    const keys = document.querySelectorAll(".drum-pad")
    keys.forEach((key) => {
      key.addEventListener("transitionend", removeTransition)
      key.addEventListener("click", playSound)
      key.setAttribute("data-key", key.getAttribute("data-key"))
    })
  
    window.addEventListener("keydown", playSound)
  
    window.addEventListener("resize", () => {
      if (canvas) {
        width = canvas.width = canvas.offsetWidth
        height = canvas.height = canvas.offsetHeight
      }
    })
  })
  