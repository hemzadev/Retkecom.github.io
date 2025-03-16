document.addEventListener("DOMContentLoaded", () => {
    // Form submission
    const form = document.getElementById("signup-form")
    const modal = document.getElementById("success-modal")
    const closeBtn = document.querySelector(".close-btn")
    const modalBtn = document.querySelector(".modal-btn")
    const moneyContainer = document.getElementById("money-container")
    const contactLink = document.getElementById("contact-link")
    const contactPopup = document.getElementById("contact-popup")
    const closePopup = document.querySelector(".close-popup")
  
    // Create floating money elements
    function createMoneyElements() {
      // Clear existing money elements
      moneyContainer.innerHTML = ""
  
      // Create new money elements
      for (let i = 0; i < 10; i++) {
        createMoneyElement()
      }
    }
  
    function createMoneyElement() {
      const money = document.createElement("div")
      money.className = "money"
      money.style.position = "absolute"
      money.style.width = "30px"
      money.style.height = "15px"
      money.style.backgroundColor = "#1db954"
      money.style.borderRadius = "3px"
      money.style.display = "flex"
      money.style.justifyContent = "center"
      money.style.alignItems = "center"
      money.style.color = "white"
      money.style.fontSize = "10px"
      money.style.fontWeight = "bold"
      money.innerHTML = "$"
  
      // Random position
      const left = Math.random() * window.innerWidth
      const top = Math.random() * window.innerHeight + window.innerHeight
  
      money.style.left = `${left}px`
      money.style.top = `${top}px`
  
      // Random rotation
      const rotation = Math.random() * 360
      money.style.transform = `rotate(${rotation}deg)`
  
      // Random size
      const size = Math.random() * 20 + 20
      money.style.width = `${size}px`
      money.style.height = `${size / 2}px`
  
      // Animation
      const duration = Math.random() * 5 + 5
      money.style.animation = `floatMoney ${duration}s linear infinite`
  
      moneyContainer.appendChild(money)
    }
  
    // Initialize money animation
    createMoneyElements()
  
    // Recreate money elements on window resize
    window.addEventListener("resize", createMoneyElements)
  
    // Form submission handler for Formspree
    form.addEventListener("submit", (e) => {
      e.preventDefault()
  
      // Show loading state
      const submitBtn = form.querySelector(".submit-btn")
      const originalText = submitBtn.innerHTML
      submitBtn.innerHTML = '<span class="btn-text">Processing...</span>'
      submitBtn.disabled = true
  
      // Get form data
      const formData = new FormData(form)
  
      // Submit to Formspree
      fetch(form.action, {
        method: form.method,
        body: formData,
        headers: {
          Accept: "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json()
          }
          throw new Error("Network response was not ok.")
        })
        .then((data) => {
          // Reset button
          submitBtn.innerHTML = originalText
          submitBtn.disabled = false
  
          // Show success modal
          modal.classList.add("show")
  
          // Create money celebration effect
          celebrateWithMoney()
  
          // Reset form
          form.reset()
        })
        .catch((error) => {
          console.error("Error:", error)
  
          // Reset button
          submitBtn.innerHTML = originalText
          submitBtn.disabled = false
  
          // Show error message
          alert("There was a problem submitting your form. Please try again.")
        })
    })
  
    // Money celebration effect
    function celebrateWithMoney() {
      for (let i = 0; i < 20; i++) {
        setTimeout(() => {
          const money = document.createElement("div")
          money.className = "money-celebration"
          money.style.position = "fixed"
          money.style.width = "30px"
          money.style.height = "15px"
          money.style.backgroundColor = "#1db954"
          money.style.borderRadius = "3px"
          money.style.display = "flex"
          money.style.justifyContent = "center"
          money.style.alignItems = "center"
          money.style.color = "white"
          money.style.fontSize = "10px"
          money.style.fontWeight = "bold"
          money.innerHTML = "$"
          money.style.zIndex = "1001"
  
          // Position in center of screen
          const centerX = window.innerWidth / 2
          const centerY = window.innerHeight / 2
  
          // Random offset from center
          const offsetX = (Math.random() - 0.5) * 100
          const offsetY = (Math.random() - 0.5) * 100
  
          money.style.left = `${centerX + offsetX}px`
          money.style.top = `${centerY + offsetY}px`
  
          // Random size
          const size = Math.random() * 20 + 20
          money.style.width = `${size}px`
          money.style.height = `${size / 2}px`
  
          // Animation
          const angle = Math.random() * Math.PI * 2
          const distance = Math.random() * 400 + 200
          const duration = Math.random() * 1 + 1
  
          money.animate(
            [
              { transform: "scale(0) rotate(0deg)", opacity: 0 },
              { transform: "scale(1) rotate(180deg)", opacity: 1, offset: 0.2 },
              {
                transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) rotate(360deg)`,
                opacity: 0,
              },
            ],
            {
              duration: duration * 1000,
              easing: "cubic-bezier(0.22, 0.61, 0.36, 1)",
            },
          )
  
          document.body.appendChild(money)
  
          // Remove after animation
          setTimeout(() => {
            document.body.removeChild(money)
          }, duration * 1000)
        }, i * 50)
      }
    }
  
    // Contact popup
    contactLink.addEventListener("click", (e) => {
      e.preventDefault()
      contactPopup.classList.add("show")
    })
  
    // Close contact popup
    closePopup.addEventListener("click", () => {
      contactPopup.classList.remove("show")
    })
  
    // Close contact popup when clicking outside
    window.addEventListener("click", (e) => {
      if (e.target === contactPopup) {
        contactPopup.classList.remove("show")
      }
    })
  
    // Close modal
    function closeModal() {
      modal.classList.remove("show")
    }
  
    closeBtn.addEventListener("click", closeModal)
    modalBtn.addEventListener("click", closeModal)
  
    // Close modal when clicking outside
    window.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeModal()
      }
    })
  
    // Social media follow buttons
    const followButtons = document.querySelectorAll(".follow-btn")
    followButtons.forEach((button) => {
      button.addEventListener("click", function (e) {
        e.preventDefault()
        e.stopPropagation()
  
        const currentText = this.textContent
        if (currentText === "Follow") {
          this.textContent = "Following"
          this.style.backgroundColor = "#0e9d3c"
        } else {
          this.textContent = "Follow"
          this.style.backgroundColor = "#1db954"
        }
      })
    })
  
    // Add subtle parallax effect on mouse move
    document.addEventListener("mousemove", (e) => {
      const mouseX = e.clientX / window.innerWidth - 0.5
      const mouseY = e.clientY / window.innerHeight - 0.5
  
      const heroContent = document.querySelector(".hero-content")
      if (heroContent) {
        heroContent.style.transform = `translate(${mouseX * -10}px, ${mouseY * -10}px)`
      }
  
      const features = document.querySelectorAll(".feature")
      features.forEach((feature, index) => {
        const offsetX = mouseX * (5 + index * 3)
        const offsetY = mouseY * (5 + index * 3)
        feature.style.transform = `translate(${offsetX}px, ${offsetY}px)`
      })
    })
  })
  
  