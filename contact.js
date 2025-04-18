document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.getElementById("contact-form");
  
    if (contactForm) {
      contactForm.addEventListener("submit", function (e) {
        e.preventDefault();
  
        const formData = {
          name: this.name.value,
          email: this.email.value,
          phone: this.phone.value,
          service: this.service.value,
          message: this.message.value,
          submittedAt: new Date().toLocaleString()
        };
  
        const stored = JSON.parse(localStorage.getItem("contactMessages")) || [];
        stored.push(formData);
        localStorage.setItem("contactMessages", JSON.stringify(stored));
  
        document.getElementById("form-response").textContent = "✅ Message sent!";
        contactForm.reset();
      });
    }
  });
  