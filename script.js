// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Preloader
  const preloader = document.querySelector(".preloader")
  window.addEventListener("load", () => {
    preloader.classList.add("hide")
    setTimeout(() => {
      preloader.style.display = "none"
    }, 500)
  })

  // Set current year in footer
  document.getElementById("current-year").textContent = new Date().getFullYear()

  // Initialize AOS (Animate On Scroll)
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    })
  } else {
    console.warn("AOS is not defined. Make sure to include the AOS library.")
  }

  // Custom cursor
  const cursor = document.querySelector(".cursor")
  const cursorFollower = document.querySelector(".cursor-follower")

  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px"
    cursor.style.top = e.clientY + "px"

    setTimeout(() => {
      cursorFollower.style.left = e.clientX + "px"
      cursorFollower.style.top = e.clientY + "px"
    }, 100)
  })

  document.addEventListener("mousedown", () => {
    cursor.style.transform = "translate(-50%, -50%) scale(0.8)"
    cursorFollower.style.transform = "translate(-50%, -50%) scale(0.6)"
  })

  document.addEventListener("mouseup", () => {
    cursor.style.transform = "translate(-50%, -50%) scale(1)"
    cursorFollower.style.transform = "translate(-50%, -50%) scale(1)"
  })

  // Add hover effect to links and buttons
  const links = document.querySelectorAll("a, button, .filter-btn, .testimonial-dot")
  links.forEach((link) => {
    link.addEventListener("mouseenter", () => {
      cursor.style.transform = "translate(-50%, -50%) scale(1.5)"
      cursor.style.backgroundColor = "transparent"
      cursor.style.border = "1px solid var(--primary-color)"
      cursorFollower.style.opacity = 0
    })

    link.addEventListener("mouseleave", () => {
      cursor.style.transform = "translate(-50%, -50%) scale(1)"
      cursor.style.backgroundColor = "var(--primary-color)"
      cursor.style.border = "none"
      cursorFollower.style.opacity = 1
    })
  })

  // Sticky Header
  const header = document.querySelector(".header")
  const logo = document.querySelector(".logo")

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("sticky")
    } else {
      header.classList.remove("sticky")
    }
  })

  // Mobile Menu Toggle
  const menuToggle = document.querySelector(".menu-toggle")
  const mobileMenu = document.querySelector(".mobile-menu")

  menuToggle.addEventListener("click", function () {
    this.classList.toggle("active")
    mobileMenu.classList.toggle("active")
    document.body.classList.toggle("no-scroll")
  })

  // Close mobile menu when clicking on a link
  const mobileLinks = document.querySelectorAll(".mobile-nav-link")
  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.classList.remove("active")
      mobileMenu.classList.remove("active")
      document.body.classList.remove("no-scroll")
    })
  })

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      if (targetId === "#") return

      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        const headerHeight = document.querySelector(".header").offsetHeight
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })
      }
    })
  })

  // Active navigation link on scroll
  const sections = document.querySelectorAll("section[id]")
  const navLinks = document.querySelectorAll(".nav-link")

  window.addEventListener("scroll", () => {
    let current = ""

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100
      const sectionHeight = section.offsetHeight

      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute("id")
      }
    })

    navLinks.forEach((link) => {
      link.classList.remove("active")
      if (link.getAttribute("href") === "#" + current) {
        link.classList.add("active")
      }
    })
  })

  // Back to top button
  const backToTop = document.querySelector(".back-to-top")

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTop.classList.add("active")
    } else {
      backToTop.classList.remove("active")
    }
  })

  // Counter animation
  const counters = document.querySelectorAll(".counter-number")
  let counted = false

  function startCounting() {
    if (counted) return

    counters.forEach((counter) => {
      const target = +counter.getAttribute("data-target")
      let count = 0
      const increment = target / 100

      const updateCount = () => {
        if (count < target) {
          count += increment
          counter.innerText = Math.ceil(count)
          setTimeout(updateCount, 20)
        } else {
          counter.innerText = target
        }
      }

      updateCount()
    })

    counted = true
  }

  window.addEventListener("scroll", () => {
    const counterSection = document.querySelector(".counter-section")
    if (!counterSection) return

    const sectionTop = counterSection.offsetTop
    const sectionHeight = counterSection.offsetHeight

    if (window.scrollY > sectionTop - window.innerHeight + sectionHeight / 2) {
      startCounting()
    }
  })

  // Portfolio filter
  const filterBtns = document.querySelectorAll(".filter-btn")
  const portfolioItems = document.querySelectorAll(".portfolio-item")

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      // Remove active class from all buttons
      filterBtns.forEach((btn) => btn.classList.remove("active"))

      // Add active class to clicked button
      this.classList.add("active")

      // Get filter value
      const filterValue = this.getAttribute("data-filter")

      // Filter portfolio items
      portfolioItems.forEach((item) => {
        if (filterValue === "all" || item.classList.contains(filterValue)) {
          item.style.display = "block"
          setTimeout(() => {
            item.style.opacity = "1"
            item.style.transform = "scale(1)"
          }, 200)
        } else {
          item.style.opacity = "0"
          item.style.transform = "scale(0.8)"
          setTimeout(() => {
            item.style.display = "none"
          }, 500)
        }
      })
    })
  })

  // Testimonial slider
  const testimonialTrack = document.querySelector(".testimonial-track")
  const testimonialSlides = document.querySelectorAll(".testimonial-slide")
  const testimonialDots = document.querySelectorAll(".testimonial-dot")
  const prevBtn = document.querySelector(".testimonial-prev")
  const nextBtn = document.querySelector(".testimonial-next")
  let currentSlide = 0

  function goToSlide(index) {
    if (index < 0) {
      index = testimonialSlides.length - 1
    } else if (index >= testimonialSlides.length) {
      index = 0
    }

    testimonialTrack.style.transform = `translateX(-${index * 100}%)`

    testimonialDots.forEach((dot) => dot.classList.remove("active"))
    testimonialDots[index].classList.add("active")

    currentSlide = index
  }

  prevBtn.addEventListener("click", () => {
    goToSlide(currentSlide - 1)
  })

  nextBtn.addEventListener("click", () => {
    goToSlide(currentSlide + 1)
  })

  testimonialDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      goToSlide(index)
    })
  })

  // Auto slide testimonials
  let testimonialInterval = setInterval(() => {
    goToSlide(currentSlide + 1)
  }, 5000)

  // Pause auto slide on hover
  const testimonialSlider = document.querySelector(".testimonial-slider")

  testimonialSlider.addEventListener("mouseenter", () => {
    clearInterval(testimonialInterval)
  })

  testimonialSlider.addEventListener("mouseleave", () => {
    testimonialInterval = setInterval(() => {
      goToSlide(currentSlide + 1)
    }, 5000)
  })

  // Form validation
  const contactForm = document.querySelector(".contact-form")

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault()

      // Simple validation
      let valid = true
      const inputs = this.querySelectorAll("input, textarea, select")

      inputs.forEach((input) => {
        if (input.hasAttribute("required") && !input.value.trim()) {
          valid = false
          input.classList.add("error")
        } else {
          input.classList.remove("error")
        }

        if (input.type === "email" && input.value.trim()) {
          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
          if (!emailPattern.test(input.value)) {
            valid = false
            input.classList.add("error")
          }
        }
      })

      if (valid) {
        // Simulate form submission
        const submitBtn = this.querySelector('button[type="submit"]')
        const originalText = submitBtn.textContent

        submitBtn.disabled = true
        submitBtn.textContent = "Sending..."

        setTimeout(() => {
          this.reset()
          submitBtn.textContent = "Message Sent!"

          setTimeout(() => {
            submitBtn.disabled = false
            submitBtn.textContent = originalText
          }, 2000)
        }, 1500)
      }
    })
  }

  // Newsletter form
  const newsletterForm = document.querySelector(".newsletter-form")

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault()

      const emailInput = this.querySelector('input[type="email"]')
      const submitBtn = this.querySelector('button[type="submit"]')
      const originalText = submitBtn.textContent

      if (!emailInput.value.trim()) {
        emailInput.classList.add("error")
        return
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailPattern.test(emailInput.value)) {
        emailInput.classList.add("error")
        return
      }

      emailInput.classList.remove("error")

      // Simulate form submission
      submitBtn.disabled = true
      submitBtn.textContent = "Subscribing..."

      setTimeout(() => {
        this.reset()
        submitBtn.textContent = "Subscribed!"

        setTimeout(() => {
          submitBtn.disabled = false
          submitBtn.textContent = originalText
        }, 2000)
      }, 1500)
    })
  }

  // Parallax effect
  window.addEventListener("scroll", () => {
    const parallaxBg = document.querySelector(".parallax-bg")
    if (parallaxBg) {
      const scrollPosition = window.pageYOffset
      parallaxBg.style.transform = `translateY(${scrollPosition * 0.4}px)`
    }
  })

  // Partner logos slider animation
  const partnerLogos = document.querySelectorAll(".partner-logo")

  function animatePartnerLogos() {
    partnerLogos.forEach((logo, index) => {
      setTimeout(() => {
        logo.style.transform = "translateY(-10px)"

        setTimeout(() => {
          logo.style.transform = "translateY(0)"
        }, 400)
      }, index * 200)
    })
  }

  if (partnerLogos.length > 0) {
    setInterval(animatePartnerLogos, 3000)
  }

  // Add smooth reveal animation to service cards
  const serviceCards = document.querySelectorAll(".service-card")

  function checkServiceCards() {
    serviceCards.forEach((card) => {
      const cardTop = card.getBoundingClientRect().top
      const windowHeight = window.innerHeight

      if (cardTop < windowHeight * 0.8) {
        card.classList.add("reveal")
      }
    })
  }

  if (serviceCards.length > 0) {
    window.addEventListener("scroll", checkServiceCards)
    checkServiceCards()
  }

  // Add CSS class for service cards reveal animation
  const style = document.createElement("style")
  style.textContent = `
    .service-card {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.6s ease, transform 0.6s ease;
    }
    .service-card.reveal {
      opacity: 1;
      transform: translateY(0);
    }
  `
  document.head.appendChild(style)
})
