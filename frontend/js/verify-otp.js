const apiBase = "http://localhost:5000";

document.querySelectorAll(".otp-input").forEach((input, index, arr) => {
  input.addEventListener("keyup", () => {
    if (input.value && index < 5) arr[index + 1].focus();
  });
});

document.getElementById("verifyBtn").addEventListener("click", async () => {
  const email = localStorage.getItem("pending_email"); // FIXED KEY

  if (!email) {
    alert("Email not found. Please signup again.");
    window.location.href = "signup.html";
    return;
  }

  const inputs = document.querySelectorAll(".otp-input");
  const otp = [...inputs].map(i => i.value).join("");

  if (otp.length !== 6) {
    alert("Enter 6-digit OTP");
    return;
  }

  const res = await fetch(`${apiBase}/auth/verify`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, otp })
  });

  const data = await res.json();

  if (data.success) {
    alert("OTP verified! You can now login.");
    localStorage.removeItem("pending_email");
    window.location.href = "index.html";
  } else {
    alert(data.message);
  }
});
