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
        entry.target.style.transform = "translateY(-20)"
      }
    })
  }, observerOptions)

  // Observe elements for animation
  const animateElements = document.querySelectorAll(".feature-card, .service-card, .portfolio-item")
  animateElements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(10px)"
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

window.addEventListener(
  "scroll",
  throttle(() => {
    handleStickyNav()
    updateActiveNavLink()
    handleBackToTop()
    handleParallax()
  }, 16),
) 
