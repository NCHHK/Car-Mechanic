document.addEventListener("DOMContentLoaded", () => {
  // Load Contact Messages
  const messageBox = document.getElementById("review-box");
  const prevBtn = document.getElementById("prev-msg");
  const nextBtn = document.getElementById("next-msg");

  const messages = JSON.parse(localStorage.getItem("contactMessages")) || [];
  let currentMessageIndex = 0;

  function renderMessage(index) {
    if (!messageBox) return;
    if (messages.length === 0) {
      messageBox.innerHTML = "<p>No messages yet.</p>";
      return;
    }

    const msg = messages[index];
    messageBox.innerHTML = `
      <p><strong>Name:</strong> ${msg.name}</p>
      <p><strong>Email:</strong> ${msg.email}</p>
      <p><strong>Phone:</strong> ${msg.phone}</p>
      <p><strong>Service:</strong> ${msg.service}</p>
      <p><strong>Message:</strong> ${msg.message}</p>
      <p><small>${msg.date || msg.submittedAt}</small></p>
    `;
  }

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener("click", () => {
      currentMessageIndex = (currentMessageIndex - 1 + messages.length) % messages.length;
      renderMessage(currentMessageIndex);
    });

    nextBtn.addEventListener("click", () => {
      currentMessageIndex = (currentMessageIndex + 1) % messages.length;
      renderMessage(currentMessageIndex);
    });
  }

  renderMessage(currentMessageIndex);

  // Load Booking Schedule
  const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
  const bookingList = document.getElementById("booking-list");

  if (bookingList) {
    if (bookings.length === 0) {
      bookingList.innerHTML = "<li>No bookings yet.</li>";
    } else {
      bookings.forEach(b => {
        const li = document.createElement("li");
        li.textContent = `${b.date} at ${b.time}`;
        bookingList.appendChild(li);
      });
    }
  }
});


document.addEventListener('DOMContentLoaded', () => {
  const showAllBtn = document.getElementById('show-all');
  if (showAllBtn) {
    showAllBtn.addEventListener('click', () => {
      const allBookings = JSON.parse(localStorage.getItem('bookings')) || [];
      displayBookings(allBookings);
    });
  }

  function displayBookings(bookings) {
    const container = document.getElementById('schedule-results');
    container.innerHTML = '';
    if (bookings.length === 0) {
      container.innerHTML = '<p>No bookings scheduled.</p>';
      return;
    }

    bookings.forEach(booking => {
      const card = document.createElement('div');
      card.className = 'booking-card';
      card.innerHTML = `
        <p><strong>${booking.date}</strong> at <strong>${booking.time}</strong></p>
        <button class="view-details" data-id="${booking.id}">View Details</button>
      `;
      container.appendChild(card);
    });
  }
});
