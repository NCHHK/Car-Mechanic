
document.addEventListener("DOMContentLoaded", function () {
  const messageContainer = document.getElementById("message-container");
  const customerDropdown = document.getElementById("reply-customer");

  let messages = JSON.parse(localStorage.getItem("contactMessages")) || [];

  function renderMessages() {
    messageContainer.innerHTML = '';

    if (messages.length === 0) {
      messageContainer.innerHTML = '<p>No messages to show.</p>';
      return;
    }

    messages.forEach((msg, index) => {
      const card = document.createElement("div");
      card.className = "message-card";
      card.innerHTML = `
        <button class="delete-btn" data-index="${index}">X</button>
        <p><strong>Name:</strong> ${msg.name}</p>
        <p><strong>Email:</strong> ${msg.email}</p>
        <p><strong>Phone:</strong> ${msg.phone}</p>
        <p><strong>Service:</strong> ${msg.service}</p>
        <p><strong>Message:</strong> ${msg.message}</p>
        <p><small>${msg.date || msg.submittedAt}</small></p>
      `;
      messageContainer.appendChild(card);
    });

    attachDeleteListeners();
  }

  function attachDeleteListeners() {
    document.querySelectorAll(".delete-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const index = parseInt(e.target.dataset.index);
        showConfirmDelete(index);
      });
    });
  }

  function showConfirmDelete(index) {
    const overlay = document.createElement("div");
    overlay.className = "confirm-overlay";
    overlay.innerHTML = `
      <div class="confirm-box">
        <p>Are you sure you want to delete this message?</p>
        <button class="confirm-yes">Yes</button>
        <button class="confirm-no">No</button>
      </div>
    `;
    document.body.appendChild(overlay);

    overlay.querySelector(".confirm-yes").onclick = () => {
      messages.splice(index, 1);
      localStorage.setItem("contactMessages", JSON.stringify(messages));
      overlay.remove();
      renderMessages();
      populateCustomerDropdown();
    };

    overlay.querySelector(".confirm-no").onclick = () => {
      overlay.remove();
    };
  }

  function populateCustomerDropdown() {
    if (!customerDropdown) return;
    customerDropdown.innerHTML = '<option value="">Select Customer</option>';
    const uniqueNames = [...new Set(messages.map(m => m.name))];
    uniqueNames.forEach(name => {
      const opt = document.createElement("option");
      opt.value = name;
      opt.textContent = name;
      customerDropdown.appendChild(opt);
    });
  }

  document.getElementById("replyForm").addEventListener("submit", function (e) {
    e.preventDefault();
    alert("✅ Reply submitted (demo only)");
    this.reset();
  });

  renderMessages();
  populateCustomerDropdown();
});
