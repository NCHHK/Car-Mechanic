
document.addEventListener('DOMContentLoaded', function () {
  const filterDate = document.getElementById('filter-date');
  const filterTime = document.getElementById('filter-time');
  const bookingList = document.getElementById('booking-list');
  const overlay = document.getElementById('booking-overlay');
  const overlayDetails = document.getElementById('overlay-details');

  function loadBookings() {
    const storedBookings = JSON.parse(localStorage.getItem('bookings')) || [];
    const selectedDate = filterDate.value;
    const selectedPeriod = filterTime.value;

    bookingList.innerHTML = '';
    const filtered = storedBookings.filter(b => {
      const matchDate = !selectedDate || b.date === selectedDate;
      const hour = parseInt(b.time.split(':')[0]);
      const isMorning = hour < 12;
      const matchTime = selectedPeriod === 'all' || 
                        (selectedPeriod === 'morning' && isMorning) || 
                        (selectedPeriod === 'afternoon' && !isMorning);
      return matchDate && matchTime;
    });

    if (filtered.length === 0) {
      bookingList.innerHTML = '<p>No bookings scheduled.</p>';
      return;
    }

    filtered.forEach(b => {
      const div = document.createElement('div');
      div.className = 'booking-item';
      div.textContent = `${b.date} at ${b.time}`;
      div.onclick = () => showOverlay(b);
      bookingList.appendChild(div);
    });
  }

  function showOverlay(booking) {
    overlayDetails.innerHTML = `
      <h3>Booking Details</h3>
      <p><strong>Name:</strong> ${booking.name}</p>
      <p><strong>Email:</strong> ${booking.email}</p>
      <p><strong>Phone:</strong> ${booking.phone}</p>
      <p><strong>Vehicle Type:</strong> ${booking.vehicleType}</p>
      <p><strong>Service:</strong> ${booking.service}</p>
      <p><strong>Date:</strong> ${booking.date}</p>
      <p><strong>Time:</strong> ${booking.time}</p>
    `;
    overlay.style.display = 'flex';
  }

  window.closeOverlay = function () {
    overlay.style.display = 'none';
  }

  filterDate.addEventListener('change', loadBookings);
  filterTime.addEventListener('change', loadBookings);

  loadBookings(); // Initial load
});
