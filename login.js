document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("loginForm");
  const showPassword = document.getElementById("show-password");
  const passwordInput = document.getElementById("password");
  const errorBox = document.getElementById("error");

  // Show password toggle
  if (showPassword && passwordInput) {
    showPassword.addEventListener("change", () => {
      passwordInput.type = showPassword.checked ? "text" : "password";
    });
  }

  // Default demo users (saved in localStorage if not already)
  if (!localStorage.getItem("users")) {
    const demoUsers = {
      "admin1": { password: "admin123", type: "admin" },
      "mech1": { password: "mech123", type: "mechanic" }
    };
    localStorage.setItem("users", JSON.stringify(demoUsers));
  }

  // Login check
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
    const userType = document.getElementById("user-type").value;

    const users = JSON.parse(localStorage.getItem("users")) || {};
    const user = users[username];

    if (user && user.password === password && user.type === userType) {
      errorBox.style.color = "green";
      errorBox.textContent = `Login successful! Redirecting to Dashboard... Please wait.`;

      setTimeout(() => {
        if (userType === "admin") {
          window.location.href = "admin-dashboard.html";
        } else {
          window.location.href = "mechanic-dashboard.html";
        }
      }, 1000);
    } else {
      errorBox.style.color = "red";
      errorBox.textContent = "Incorrect username, password, or user type.";
    }
  });
});
