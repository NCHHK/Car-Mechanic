
document.addEventListener("DOMContentLoaded", () => {
  const bookingList = document.getElementById("booking-list");
  const dateFilter = document.getElementById("filter-date");
  const timeFilter = document.getElementById("filter-time");
  const showAllBtn = document.getElementById("show-all");
  const overlay = document.getElementById("booking-overlay");
  const overlayDetails = document.getElementById("overlay-details");

  function renderBookings(bookings) {
    bookingList.innerHTML = "";
    if (bookings.length === 0) {
      bookingList.innerHTML = "<p>No bookings scheduled.</p>";
      return;
    }

    bookings.forEach(b => {
      const item = document.createElement("div");
      item.className = "booking-item";
      item.textContent = `${b.date} at ${b.time}`;
      item.onclick = () => showOverlay(b);
      bookingList.appendChild(item);
    });
  }

  function filterBookings() {
    const allBookings = JSON.parse(localStorage.getItem("bookings")) || [];
    const selectedDate = dateFilter.value;
    const selectedTime = timeFilter.value;

    const filtered = allBookings.filter(b => {
      const dateMatch = !selectedDate || b.date === selectedDate;
      const hour = parseInt(b.time.split(":")[0]);
      const isMorning = hour < 12;
      const timeMatch = selectedTime === "all" ||
        (selectedTime === "morning" && isMorning) ||
        (selectedTime === "afternoon" && !isMorning);
      return dateMatch && timeMatch;
    });

    renderBookings(filtered);
  }

  function showOverlay(booking) {
    overlayDetails.innerHTML = `
      <h3>Booking Details</h3>
      <p><strong>Name:</strong> ${booking.name}</p>
      <p><strong>Email:</strong> ${booking.email}</p>
      <p><strong>Phone:</strong> ${booking.phone}</p>
      <p><strong>Vehicle:</strong> ${booking.vehicleType}</p>
      <p><strong>Service:</strong> ${booking.service}</p>
      <p><strong>Date:</strong> ${booking.date}</p>
      <p><strong>Time:</strong> ${booking.time}</p>
    `;
    overlay.style.display = "flex";
  }

  window.closeOverlay = () => {
    overlay.style.display = "none";
  };

  dateFilter.addEventListener("change", filterBookings);
  timeFilter.addEventListener("change", filterBookings);
  showAllBtn.addEventListener("click", () => {
    const allBookings = JSON.parse(localStorage.getItem("bookings")) || [];
    renderBookings(allBookings);
  });

  const initial = JSON.parse(localStorage.getItem("bookings")) || [];
  renderBookings(initial);
});
