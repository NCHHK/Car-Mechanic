 /*Quotation Calculator*/
 window.addEventListener("DOMContentLoaded", function () {
    document.getElementById("quotation-form").addEventListener("submit", function(e) {
      e.preventDefault();
  
      const vehicle = document.getElementById("vehicle-type").value;
      const service = document.getElementById("service-type").value;
      const result = document.getElementById("quotation-result");
      const warning = document.getElementById("quotation-warning");
  
      const prices = {
        suv: { minor: 450, major: 1200, general: 200, health: 100 },
        minibus: { minor: 550, major: 1500, general: 350, health: 150 },
        convertible: { minor: 100, major: 800, general: 150, health: 50 },
        other: { minor: 200, major: 1000, general: 150, health: 70 }
      };
  
      if (prices[vehicle] && prices[vehicle][service]) {
        const quote = prices[vehicle][service];
        result.innerHTML = `Estimated Quotation: <strong>£${quote}</strong>`;
        warning.style.display = "block";
      } else {
        result.innerHTML = "Please select valid options.";
        warning.style.display = "none";
      }
      });
    });
      /* Booking Form */

      document.addEventListener("DOMContentLoaded", function () {
        const form = document.getElementById("booking-form");
        const message = document.getElementById("booking-message");
      
        if (!form) return;
      
        const dateInput = document.getElementById("date");
        const timeInput = document.getElementById("time");
      
        const today = new Date();
        today.setDate(today.getDate() + 3);
        dateInput.min = today.toISOString().split("T")[0];
      
        timeInput.setAttribute("min", "09:00");
        timeInput.setAttribute("max", "18:00");
        timeInput.setAttribute("step", "1800");
      
        form.addEventListener("submit", function (e) {
          e.preventDefault();
      
          const selectedTime = timeInput.value;
          if (selectedTime < "09:00" || selectedTime > "18:00") {
            message.textContent = "❌ Time must be between 09:00 and 18:00.";
            message.style.color = "red";
            return;
          }
      
          const booking = {
            id: Date.now(),
            name: document.getElementById("name").value.trim(),
            email: document.getElementById("email").value.trim(),
            phone: document.getElementById("phone").value.trim(),
            vehicleType: document.getElementById("vehicle").value,
            service: document.getElementById("service").value,
            date: dateInput.value,
            time: timeInput.value
          };
      
          const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
          bookings.push(booking);
          localStorage.setItem("bookings", JSON.stringify(bookings));
      
          form.reset();
          message.style.color = "green";
          message.textContent = "✅ Booking confirmed!";
        });
      });
      
    
    document.addEventListener("DOMContentLoaded", function () {
      const overlay = document.getElementById("service-overlay");
      const title = document.getElementById("overlay-title");
      const desc = document.getElementById("overlay-desc");
      const closeBtn = document.querySelector(".close-overlay");
    
      const serviceInfo = {
        minor: {
          title: "Minor Repair",
          desc: "A minor servicing generally includes a comprehensive vehicle inspection and diagnostic checks, engine oil and filter replacement, vehicle greasing, and tyre rotation by a professional factory-trained technician."
        },
        major: {
          title: "Major Repair",
          desc: "A major car service typically includes a thorough check of the following systems and components: Engine and Transmission. The engine oil, oil filter, and air filter will be replaced, and the engine and transmission will be checked for any signs of wear and tear."
        },
        general: {
          title: "General Service",
          desc: "General services are routine maintenance tasks that may not necessarily adhere strictly to the manufacturer's logbook recommendations. They are often performed at regular intervals every 6 or 12 months. Tasks may include: Oil and oil filter changes, visual inspection of the vehicle components, fluid level checks and top-ups, inspection of lights, wipers, and other basic components, tire pressure check and adjustment, and safety checks."
        },
        health: {
          title: "Health Check",
          desc: "Vehicle Health Check (VHC) is a check conducted on your car which includes a visual inspection of your car's brakes, wheels, tyres, exhaust, steering, key fluid levels and more. VHCs are similar to an MOT, and help provide you with peace of mind that your car is in a sound condition to be on the roads."
        }
      };
    
      document.querySelectorAll(".service-btn").forEach(button => {
        button.addEventListener("click", () => {
          const key = button.getAttribute("data-service");
          title.textContent = serviceInfo[key].title;
          desc.textContent = serviceInfo[key].desc;
          overlay.classList.add("active");
        });
      });
    
      closeBtn.addEventListener("click", () => {
        overlay.classList.remove("active");
      });
    
      overlay.addEventListener("click", (e) => {
        if (e.target === overlay) {
          overlay.classList.remove("active");
        }
      });
    });
      


const mechanicImages = [
    "img/mechanic1.jpg",
    "img/mechanic2.jpg",
    "img/mechanic3.jpg",
    "img/mechanic4.jpg"
  ];
  
  let currentImage = 0;
  const imageEl = document.getElementById("slideshow-image");
  const dots = document.querySelectorAll(".dot");
  
  function updateSlideshow(index) {
    currentImage = index;
    imageEl.src = mechanicImages[currentImage];
  
    dots.forEach(dot => dot.classList.remove("active"));
    dots[currentImage].classList.add("active");
  }
  
  // Manual controls
  document.querySelector(".prev").addEventListener("click", () => {
    currentImage = (currentImage - 1 + mechanicImages.length) % mechanicImages.length;
    updateSlideshow(currentImage);
  });
  
  document.querySelector(".next").addEventListener("click", () => {
    currentImage = (currentImage + 1) % mechanicImages.length;
    updateSlideshow(currentImage);
  });
  
  dots.forEach(dot => {
    dot.addEventListener("click", () => {
      const index = parseInt(dot.dataset.index);
      updateSlideshow(index);
    });
  });
  
  // Auto-play every 4 seconds
  setInterval(() => {
    currentImage = (currentImage + 1) % mechanicImages.length;
    updateSlideshow(currentImage);
  }, 8000); // change every 4 seconds
  
  // Initialize first image
  updateSlideshow(0);

  /*Customer Reviews*/
  const reviews = [
    "“Fast and professional service! Highly recommended.” – Matthew N.",
    "“Great prices and very friendly staff. Will come again!” – Carrie ",
    "“They fixed my car quickly and explained everything clearly.This is the best mechanics i have ever tried” – Philip",
    "“I was impressed by their attention to detail and customer service.” – John.",
    "“The team was knowledgeable and helped me understand my car issues.” – George",
  ];
  
  let currentReview = 0;
  
  const reviewText = document.getElementById("review-text");
  const reviewDots = document.querySelectorAll(".review-dot");
  
  function updateReview(index) {
    currentReview = index;
    reviewText.textContent = reviews[currentReview];
  
    reviewDots.forEach(dot => dot.classList.remove("active"));
    reviewDots[currentReview].classList.add("active");
  }
  
  document.querySelector(".review-prev").addEventListener("click", () => {
    currentReview = (currentReview - 1 + reviews.length) % reviews.length;
    updateReview(currentReview);
  });
  
  document.querySelector(".review-next").addEventListener("click", () => {
    currentReview = (currentReview + 1) % reviews.length;
    updateReview(currentReview);
  });
  
  reviewDots.forEach(dot => {
    dot.addEventListener("click", () => {
      const index = parseInt(dot.dataset.index);
      updateReview(index);
    });
  });
  
  // Auto-play every 5 seconds
  setInterval(() => {
    currentReview = (currentReview + 1) % reviews.length;
    updateReview(currentReview);
  }, 5000);
  
  // Initialize first review
  updateReview(0);

 