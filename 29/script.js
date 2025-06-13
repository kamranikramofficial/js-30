// DOM Elements
const navbar = document.getElementById("navbar")
const navMenu = document.querySelector(".nav-menu")
const hamburger = document.querySelector(".hamburger")
const navLinks = document.querySelectorAll(".nav-link")
const backToTop = document.getElementById("backToTop")
const sections = document.querySelectorAll(".section")

// Sticky Navigation
function handleStickyNav() {
  const heroHeight = document.querySelector(".hero").offsetHeight

  if (window.scrollY > heroHeight - 100) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky")
  }
}

// Mobile Menu Toggle
function toggleMobileMenu() {
  hamburger.classList.toggle("active")
  navMenu.classList.toggle("active")
}

// Close mobile menu when clicking on a link
function closeMobileMenu() {
  hamburger.classList.remove("active")
  navMenu.classList.remove("active")
}

// Smooth scrolling for navigation links
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

  // Close mobile menu after clicking
  closeMobileMenu()
}

// Active navigation link highlighting
function updateActiveNavLink() {
  const scrollPos = window.scrollY + navbar.offsetHeight + 50

  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.offsetHeight
    const sectionId = section.getAttribute("id")

    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      // Remove active class from all links
      navLinks.forEach((link) => link.classList.remove("active"))

      // Add active class to current section link
      const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`)
      if (activeLink) {
        activeLink.classList.add("active")
      }
    }
  })
}

// Back to top button visibility
function handleBackToTop() {
  if (window.scrollY > 300) {
    backToTop.classList.add("visible")
  } else {
    backToTop.classList.remove("visible")
  }
}

// Scroll to top function
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
}

// Form submission
function handleFormSubmit(e) {
  e.preventDefault()

  // Get form data
  const formData = new FormData(e.target)
  const name = formData.get("name")
  const email = formData.get("email")
  const subject = formData.get("subject")
  const message = formData.get("message")

  // Simple validation
  if (!name || !email || !subject || !message) {
    alert("Please fill in all fields")
    return
  }

  // Simulate form submission
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

// Intersection Observer for animations
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

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Set initial active nav link
  navLinks[0].classList.add("active")

  // Create intersection observer for animations
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

  // Form submission
  const contactForm = document.querySelector(".contact-form")
  if (contactForm) {
    contactForm.addEventListener("submit", handleFormSubmit)
  }

  // Close mobile menu when clicking outside
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
function throttle(func, wait) {
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
  throttle(() => {
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

      // Add flipping class to trigger animation
      flipCard.classList.add("flipping")

      // Remove class after animation completes
      setTimeout(() => {
        flipCard.classList.remove("flipping")
      }, 900)
    }
  }

  // Update the main clock display
  function updateClock() {
    const now = new Date()

    // Convert to selected timezone
    const options = { timeZone: currentTimezone }
    const formatter = new Intl.DateTimeFormat("en-US", { ...options, ...timeOptions })
    const dateFormatter = new Intl.DateTimeFormat("en-US", { ...options, ...dateOptions })

    const timeString = formatter.format(now)
    const dateString = dateFormatter.format(now)

    // Parse time components
    const [time, period] = timeString.split(" ")
    let [hours, minutes, seconds] = time.split(":")

    // Convert hours to 24-hour format for internal use
    hours = Number.parseInt(hours)
    if (period === "PM" && hours !== 12) hours += 12
    if (period === "AM" && hours === 12) hours = 0

    // Format for display (always show in 12-hour format)
    let displayHours = hours % 12
    if (displayHours === 0) displayHours = 12

    // Update AM/PM indicator
    if (period === "AM") {
      amIndicator.classList.add("active")
      pmIndicator.classList.remove("active")
      ampmIndicator.classList.remove("pm")
    } else {
      amIndicator.classList.remove("active")
      pmIndicator.classList.add("active")
      ampmIndicator.classList.add("pm")
    }

    // Get previous values for animation comparison
    const prevHourTens = hourTens.querySelector(".top").textContent
    const prevHourOnes = hourOnes.querySelector(".top").textContent
    const prevMinuteTens = minuteTens.querySelector(".top").textContent
    const prevMinuteOnes = minuteOnes.querySelector(".top").textContent
    const prevSecondTens = secondTens.querySelector(".top").textContent
    const prevSecondOnes = secondOnes.querySelector(".top").textContent

    // Format new values
    const newHourTens = Math.floor(displayHours / 10).toString()
    const newHourOnes = (displayHours % 10).toString()
    const newMinuteTens = Math.floor(Number.parseInt(minutes) / 10).toString()
    const newMinuteOnes = (Number.parseInt(minutes) % 10).toString()
    const newSecondTens = Math.floor(Number.parseInt(seconds) / 10).toString()
    const newSecondOnes = (Number.parseInt(seconds) % 10).toString()

    // Update flip cards with animation if values changed
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
      // We could use this data to synchronize our clock more accurately
      // For now, we'll continue using the browser's Date object with timezone conversion
    } catch (error) {
      console.error("Error fetching world time data:", error)
      // Fallback to browser time if API fails
    }
  }

  // Try to fetch time data, but don't block the app if it fails
  fetchWorldTimeData().catch(console.error)
})
