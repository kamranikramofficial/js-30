const navbar = document.getElementById("navbar")
const navMenu = document.querySelector(".nav-menu")
const hamburger = document.querySelector(".hamburger")
const navLinks = document.querySelectorAll(".nav-link")
const backToTop = document.getElementById("backToTop")
const sections = document.querySelectorAll(".section")
function handleStickyNav() {
  const heroHeight = document.querySelector(".hero").offsetHeight

  if (window.scrollY > heroHeight - 100) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky")
  }
}
function toggleMobileMenu() {
  hamburger.classList.toggle("active")
  navMenu.classList.toggle("active")
}
function closeMobileMenu() {
  hamburger.classList.remove("active")
  navMenu.classList.remove("active")
}
function smoothScroll(e) {
  e.preventDefault()

  const targetId = this.getAttribute("href")
  const targetSection = document.querySelector(targetId)

  if (targetSection) {
    const offsetTop = targetSection.offsetTop - navbar.offsetHeight

    window.scrollTo({
      top: offsetTop,
      behavior: "smooth",
    })
  }

  closeMobileMenu()
}

function updateActiveNavLink() {
  const scrollPos = window.scrollY + navbar.offsetHeight + 50

  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.offsetHeight
    const sectionId = section.getAttribute("id")

    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      navLinks.forEach((link) => link.classList.remove("active"))

      const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`)
      if (activeLink) {
        activeLink.classList.add("active")
      }
    }
  })
}

function handleBackToTop() {
  if (window.scrollY > 300) {
    backToTop.classList.add("visible")
  } else {
    backToTop.classList.remove("visible")
  }
}
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
}
function handleFormSubmit(e) {
  e.preventDefault()
  const formData = new FormData(e.target)
  const name = formData.get("name")
  const email = formData.get("email")
  const subject = formData.get("subject")
  const message = formData.get("message")
  if (!name || !email || !subject || !message) {
    alert("Please fill in all fields")
    return
  }
  const submitBtn = e.target.querySelector(".submit-btn")
  const originalText = submitBtn.innerHTML

  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...'
  submitBtn.disabled = true

  setTimeout(() => {
    alert("Thank you for your message! We'll get back to you soon.")
    e.target.reset()
    submitBtn.innerHTML = originalText
    submitBtn.disabled = false
  }, 2000)
}
function createIntersectionObserver() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  // Observe elements for animation
  const animateElements = document.querySelectorAll(".feature-card, .service-card, .portfolio-item")
  animateElements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(30px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(el)
  })
}

// Parallax effect for hero section
function handleParallax() {
  const hero = document.querySelector(".hero")
  const scrolled = window.pageYOffset
  const rate = scrolled * -0.5

  if (hero) {
    hero.style.transform = `translateY(${rate}px)`
  }
}

document.addEventListener("DOMContentLoaded", () => {
  navLinks[0].classList.add("active")

  createIntersectionObserver()

  // Event Listeners
  window.addEventListener("scroll", () => {
    handleStickyNav()
    updateActiveNavLink()
    handleBackToTop()
    handleParallax()
  })

  hamburger.addEventListener("click", toggleMobileMenu)

  navLinks.forEach((link) => {
    link.addEventListener("click", smoothScroll)
  })

  backToTop.addEventListener("click", scrollToTop)

  const contactForm = document.querySelector(".contact-form")
  if (contactForm) {
    contactForm.addEventListener("submit", handleFormSubmit)
  }

  document.addEventListener("click", (e) => {
    if (!navbar.contains(e.target)) {
      closeMobileMenu()
    }
  })

  // Handle window resize
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      closeMobileMenu()
    }
  })

  // Initial calls
  handleStickyNav()
  handleBackToTop()
})

// Performance optimization: Throttle scroll events
function customThrottle(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Apply throttling to scroll events for better performance
window.addEventListener(
  "scroll",
  customThrottle(() => {
    handleStickyNav()
    updateActiveNavLink()
    handleBackToTop()
    handleParallax()
  }, 16),
) // ~60fps

document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const timezoneSelect = document.getElementById("timezoneSelect")
  const locationName = document.getElementById("locationName")
  const currentDateElement = document.getElementById("currentDate")
  const amIndicator = document.getElementById("amIndicator")
  const pmIndicator = document.getElementById("pmIndicator")
  const ampmIndicator = document.querySelector(".ampm-indicator")
  const currentYearElement = document.getElementById("currentYear")

  // Set current year in footer
  currentYearElement.textContent = new Date().getFullYear()

  // Time elements
  const hourTens = document.querySelector("[data-hour-tens]")
  const hourOnes = document.querySelector("[data-hour-ones]")
  const minuteTens = document.querySelector("[data-minute-tens]")
  const minuteOnes = document.querySelector("[data-minute-ones]")
  const secondTens = document.querySelector("[data-second-tens]")
  const secondOnes = document.querySelector("[data-second-ones]")

  // State variables
  let currentTimezone = "Asia/Karachi" // Default to Pakistan time

  // Format options
  const dateOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }

  const timeOptions = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  }

  // Helper function to update flip card
  function updateFlipCard(element, newValue, oldValue) {
    if (newValue !== oldValue) {
      // Create temporary elements for the flip animation
      const flipCard = element

      // Set the current value
      flipCard.querySelector(".top").textContent = newValue
      flipCard.querySelector(".bottom").textContent = newValue
      flipCard.classList.add("flipping")
      setTimeout(() => {
        flipCard.classList.remove("flipping")
      }, 900)
    }
  }
  function updateClock() {
    const now = new Date()
    const options = { timeZone: currentTimezone }
    const formatter = new Intl.DateTimeFormat("en-US", { ...options, ...timeOptions })
    const dateFormatter = new Intl.DateTimeFormat("en-US", { ...options, ...dateOptions })

    const timeString = formatter.format(now)
    const dateString = dateFormatter.format(now)
    const [time, period] = timeString.split(" ")
    let [hours, minutes, seconds] = time.split(":")
    hours = Number.parseInt(hours)
    if (period === "PM" && hours !== 12) hours += 12
    if (period === "AM" && hours === 12) hours = 0
    let displayHours = hours % 12
    if (displayHours === 0) displayHours = 12

    if (period === "AM") {
      amIndicator.classList.add("active")
      pmIndicator.classList.remove("active")
      ampmIndicator.classList.remove("pm")
    } else {
      amIndicator.classList.remove("active")
      pmIndicator.classList.add("active")
      ampmIndicator.classList.add("pm")
    }

    const prevHourTens = hourTens.querySelector(".top").textContent
    const prevHourOnes = hourOnes.querySelector(".top").textContent
    const prevMinuteTens = minuteTens.querySelector(".top").textContent
    const prevMinuteOnes = minuteOnes.querySelector(".top").textContent
    const prevSecondTens = secondTens.querySelector(".top").textContent
    const prevSecondOnes = secondOnes.querySelector(".top").textContent

    const newHourTens = Math.floor(displayHours / 10).toString()
    const newHourOnes = (displayHours % 10).toString()
    const newMinuteTens = Math.floor(Number.parseInt(minutes) / 10).toString()
    const newMinuteOnes = (Number.parseInt(minutes) % 10).toString()
    const newSecondTens = Math.floor(Number.parseInt(seconds) / 10).toString()
    const newSecondOnes = (Number.parseInt(seconds) % 10).toString()

    updateFlipCard(hourTens, newHourTens, prevHourTens)
    updateFlipCard(hourOnes, newHourOnes, prevHourOnes)
    updateFlipCard(minuteTens, newMinuteTens, prevMinuteTens)
    updateFlipCard(minuteOnes, newMinuteOnes, prevMinuteOnes)
    updateFlipCard(secondTens, newSecondTens, prevSecondTens)
    updateFlipCard(secondOnes, newSecondOnes, prevSecondOnes)

    // Update date
    currentDateElement.textContent = dateString
  }

  // Handle timezone change
  timezoneSelect.addEventListener("change", function () {
    const selected = this.value
    currentTimezone = selected

    // Format the timezone name for display
    const cityName = selected.split("/").pop().replace(/_/g, " ")
    locationName.textContent = cityName

    // Update displays immediately
    updateClock()
  })

  // Initialize clock
  updateClock()

  // Set intervals for updates
  setInterval(updateClock, 1000)

  // Fetch world time data from API
  async function fetchWorldTimeData() {
    try {
      // Using WorldTimeAPI to get accurate time data for Pakistan
      const response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Karachi")
      const data = await response.json()

      console.log("Pakistan Time API data:", data)
    } catch (error) {
      console.error("Error fetching world time data:", error)
    }
  }

  fetchWorldTimeData().catch(console.error)
})

document.addEventListener("DOMContentLoaded", () => {
  const scrollContainers = document.querySelectorAll(".scroll-container")

  scrollContainers.forEach((container) => {
    initializeDragScroll(container)
  })
})

function initializeDragScroll(container) {
  const scrollContent = container.querySelector(".scroll-content")
  const isVertical = container.dataset.scroll === "vertical"

  let isDown = false
  let startX, startY
  let scrollLeft, scrollTop
  let velocity = 0
  let lastX = 0,
    lastY = 0
  let lastTime = 0
  let animationId = null

  // Mouse events
  container.addEventListener("mousedown", handleStart)
  container.addEventListener("mouseleave", handleEnd)
  container.addEventListener("mouseup", handleEnd)
  container.addEventListener("mousemove", handleMove)

  // Touch events for mobile
  container.addEventListener("touchstart", handleTouchStart, { passive: false })
  container.addEventListener("touchend", handleEnd)
  container.addEventListener("touchmove", handleTouchMove, { passive: false })

  // Prevent default drag behavior on images
  container.addEventListener("dragstart", (e) => e.preventDefault())

  function handleStart(e) {
    isDown = true
    container.classList.add("dragging")

    const rect = container.getBoundingClientRect()
    startX = e.pageX - rect.left
    startY = e.pageY - rect.top

    if (isVertical) {
      scrollTop = container.scrollTop
    } else {
      scrollLeft = container.scrollLeft
    }

    lastX = e.pageX
    lastY = e.pageY
    lastTime = Date.now()
    velocity = 0

    // Cancel any ongoing momentum animation
    if (animationId) {
      cancelAnimationFrame(animationId)
      animationId = null
    }

    scrollContent.classList.remove("momentum")
  }

  function handleTouchStart(e) {
    if (e.touches.length === 1) {
      const touch = e.touches[0]
      isDown = true
      container.classList.add("dragging")

      const rect = container.getBoundingClientRect()
      startX = touch.pageX - rect.left
      startY = touch.pageY - rect.top

      if (isVertical) {
        scrollTop = container.scrollTop
      } else {
        scrollLeft = container.scrollLeft
      }

      lastX = touch.pageX
      lastY = touch.pageY
      lastTime = Date.now()
      velocity = 0

      if (animationId) {
        cancelAnimationFrame(animationId)
        animationId = null
      }

      scrollContent.classList.remove("momentum")
      e.preventDefault()
    }
  }

  function handleMove(e) {
    if (!isDown) return
    e.preventDefault()

    const currentTime = Date.now()
    const deltaTime = currentTime - lastTime

    if (isVertical) {
      const rect = container.getBoundingClientRect()
      const y = e.pageY - rect.top
      const walk = (y - startY) * 2
      const newScrollTop = scrollTop - walk

      container.scrollTop = Math.max(0, Math.min(newScrollTop, container.scrollHeight - container.clientHeight))

      // Calculate velocity for momentum
      if (deltaTime > 0) {
        velocity = (e.pageY - lastY) / deltaTime
      }
      lastY = e.pageY
    } else {
      const rect = container.getBoundingClientRect()
      const x = e.pageX - rect.left
      const walk = (x - startX) * 2
      const newScrollLeft = scrollLeft - walk

      container.scrollLeft = Math.max(0, Math.min(newScrollLeft, container.scrollWidth - container.clientWidth))

      // Calculate velocity for momentum
      if (deltaTime > 0) {
        velocity = (e.pageX - lastX) / deltaTime
      }
      lastX = e.pageX
    }

    lastTime = currentTime
  }

  function handleTouchMove(e) {
    if (!isDown || e.touches.length !== 1) return

    const touch = e.touches[0]
    const currentTime = Date.now()
    const deltaTime = currentTime - lastTime

    if (isVertical) {
      const rect = container.getBoundingClientRect()
      const y = touch.pageY - rect.top
      const walk = (y - startY) * 2
      const newScrollTop = scrollTop - walk

      container.scrollTop = Math.max(0, Math.min(newScrollTop, container.scrollHeight - container.clientHeight))

      if (deltaTime > 0) {
        velocity = (touch.pageY - lastY) / deltaTime
      }
      lastY = touch.pageY
    } else {
      const rect = container.getBoundingClientRect()
      const x = touch.pageX - rect.left
      const walk = (x - startX) * 2
      const newScrollLeft = scrollLeft - walk

      container.scrollLeft = Math.max(0, Math.min(newScrollLeft, container.scrollWidth - container.clientWidth))

      if (deltaTime > 0) {
        velocity = (touch.pageX - lastX) / deltaTime
      }
      lastX = touch.pageY
    }

    lastTime = currentTime
    e.preventDefault()
  }

  function handleEnd() {
    if (!isDown) return

    isDown = false
    container.classList.remove("dragging")

    // Apply momentum scrolling
    if (Math.abs(velocity) > 0.1) {
      applyMomentum()
    }
  }

  function applyMomentum() {
    scrollContent.classList.add("momentum")

    const friction = 0.95
    const minVelocity = 0.1

    function animate() {
      velocity *= friction

      if (Math.abs(velocity) < minVelocity) {
        scrollContent.classList.remove("momentum")
        return
      }

      if (isVertical) {
        const newScrollTop = container.scrollTop - velocity * 16
        const maxScroll = container.scrollHeight - container.clientHeight

        if (newScrollTop < 0 || newScrollTop > maxScroll) {
          velocity *= -0.3 // Bounce effect
        }

        container.scrollTop = Math.max(0, Math.min(newScrollTop, maxScroll))
      } else {
        const newScrollLeft = container.scrollLeft - velocity * 16
        const maxScroll = container.scrollWidth - container.clientWidth

        if (newScrollLeft < 0 || newScrollLeft > maxScroll) {
          velocity *= -0.3 // Bounce effect
        }

        container.scrollLeft = Math.max(0, Math.min(newScrollLeft, maxScroll))
      }

      animationId = requestAnimationFrame(animate)
    }

    animate()
  }

  // Update scroll indicators
  function updateScrollIndicators() {
    if (isVertical) {
      const canScrollUp = container.scrollTop > 0
      const canScrollDown = container.scrollTop < container.scrollHeight - container.clientHeight

      container.classList.toggle("can-scroll-up", canScrollUp)
      container.classList.toggle("can-scroll-down", canScrollDown)
    } else {
      const canScrollLeft = container.scrollLeft > 0
      const canScrollRight = container.scrollLeft < container.scrollWidth - container.clientWidth

      container.classList.toggle("can-scroll-left", canScrollLeft)
      container.classList.toggle("can-scroll-right", canScrollRight)
    }
  }

  container.addEventListener("scroll", updateScrollIndicators)

  updateScrollIndicators()

  window.addEventListener("resize", updateScrollIndicators)
}

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

document.querySelectorAll(".scroll-section").forEach((section) => {
  section.style.opacity = "0"
  section.style.transform = "translateY(30px)"
  section.style.transition = "opacity 0.6s ease, transform 0.6s ease"
  observer.observe(section)
})

document.addEventListener("keydown", (e) => {
  const focusedContainer = document.querySelector(".scroll-container:focus")
  if (!focusedContainer) return

  const isVertical = focusedContainer.dataset.scroll === "vertical"
  const scrollAmount = 100

  switch (e.key) {
    case "ArrowLeft":
      if (!isVertical) {
        e.preventDefault()
        focusedContainer.scrollLeft -= scrollAmount
      }
      break
    case "ArrowRight":
      if (!isVertical) {
        e.preventDefault()
        focusedContainer.scrollLeft += scrollAmount
      }
      break
    case "ArrowUp":
      if (isVertical) {
        e.preventDefault()
        focusedContainer.scrollTop -= scrollAmount
      }
      break
    case "ArrowDown":
      if (isVertical) {
        e.preventDefault()
        focusedContainer.scrollTop += scrollAmount
      }
      break
  }
})

document.querySelectorAll(".scroll-container").forEach((container) => {
  container.setAttribute("tabindex", "0")
})

document.querySelectorAll("img").forEach((img) => {
  img.addEventListener("load", function () {
    this.style.opacity = "1"
  })

  if (!img.complete) {
    img.style.opacity = "0"
  }
})

function customThrottle2(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

const scrollPerformance = {
  lastScrollTime: 0,
  scrollCount: 0,
}

document.querySelectorAll(".scroll-container").forEach((container) => {
  container.addEventListener(
    "scroll",
    customThrottle2(() => {
      scrollPerformance.scrollCount++
      scrollPerformance.lastScrollTime = Date.now()
    }, 16),
  ) 
})
