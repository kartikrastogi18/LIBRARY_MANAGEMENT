// const apiBase = "http://localhost:5000"; // Backend base URL
// let isLogin = true;

// // Toggle between Login and Signup mode
// document.getElementById("toggleForm").addEventListener("click", () => {
//   isLogin = !isLogin;

//   document.getElementById("formTitle").textContent = isLogin ? "Login" : "Signup";
//   document.getElementById("name").style.display = isLogin ? "none" : "block";

//   document.getElementById("loginButtons").style.display = isLogin ? "block" : "none";
//   document.getElementById("signupButtons").style.display = isLogin ? "none" : "block";

//   document.getElementById("toggleText").innerHTML = isLogin
//     ? `Don’t have an account? <span id="toggleForm">Signup here</span>`
//     : `Already have an account? <span id="toggleForm">Login here</span>`;

//   // re-bind toggleForm event (since we replaced the innerHTML)
//   document.getElementById("toggleForm").addEventListener("click", () => {
//     isLogin = !isLogin;
//     location.reload();
//   });
// });

// // Handle Login
// document.getElementById("submitBtn").addEventListener("click", async () => {
//   const email = document.getElementById("email").value.trim();
//   const password = document.getElementById("password").value.trim();

//   if (!email || !password) {
//     alert("Please enter all required fields.");
//     return;
//   }

//   try {
//     const res = await fetch(`${apiBase}/auth/login`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email, password }),
//     });

//     const data = await res.json();
//     if (!res.ok) throw new Error(data.message);

//     localStorage.setItem("token", data.token);
//     localStorage.setItem("isAdmin", data.isAdmin);
//     localStorage.setItem("user_id", data.id);
//     if (res.success) {
//       localStorage.setItem("pending_email", email);
//       window.location.href = "verify-otp.html";  // <-- THIS PAGE MUST EXIST
//   }
  


//     alert(data.message);
//     window.location.href = data.isAdmin ? "admin.html" : "user.html";
//   } catch (err) {
//     alert("Login failed: " + err.message);
//     console.error(err);
//   }
// });

// // Common Signup function
// async function handleSignup(isAdmin) {
//   const name = document.getElementById("name").value.trim();
//   const email = document.getElementById("email").value.trim();
//   const password = document.getElementById("password").value.trim();

//   if (!name || !email || !password) {
//     alert("Please enter all required fields.");
//     return;
//   }

//   try {
//     const res = await fetch(`${apiBase}/auth/signup`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ name, email, password, isAdmin }),
//     });

//     const data = await res.json();
//     if (!res.ok) throw new Error(data.message);

//     alert(data.message);
//     document.getElementById("toggleForm").click(); // Go back to login
//   } catch (err) {
//     alert("Signup failed: " + err.message);
//     console.error(err);
//   }
// }

// // Separate handlers for Admin/User signup
// document.getElementById("signupAdminBtn").addEventListener("click", () => handleSignup(true));
// document.getElementById("signupUserBtn").addEventListener("click", () => handleSignup(false));
const apiBase = "http://localhost:5000";
let isLogin = true;

// Toggle Login/Signup
document.getElementById("toggleForm").addEventListener("click", () => {
  isLogin = !isLogin;

  document.getElementById("formTitle").textContent = isLogin ? "Login" : "Signup";
  document.getElementById("name").style.display = isLogin ? "none" : "block";

  document.getElementById("loginButtons").style.display = isLogin ? "block" : "none";
  document.getElementById("signupButtons").style.display = isLogin ? "none" : "block";

  document.getElementById("toggleText").innerHTML = isLogin
    ? `Don’t have an account? <span id="toggleForm">Signup here</span>`
    : `Already have an account? <span id="toggleForm">Login here</span>`;

  document.getElementById("toggleForm").addEventListener("click", () => {
    isLogin = !isLogin;
    location.reload();
  });
});


// ------------------------
// LOGIN
// ------------------------
// document.getElementById("submitBtn").addEventListener("click", async () => {
//   const email = document.getElementById("email").value.trim();
//   const password = document.getElementById("password").value.trim();

//   if (!email || !password) {
//     alert("Please enter all required fields.");
//     return;
//   }

//   try {
//     const res = await fetch(`${apiBase}/auth/login`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email, password }),
//     });

//     const data = await res.json();

//     if (!res.ok) throw new Error(data.message);

//     // Save login data
//     localStorage.setItem("token", data.token);
//     localStorage.setItem("isAdmin", data.isAdmin);
//     localStorage.setItem("user_id", data.userId);

//     alert(data.message);
//     window.location.href = data.isAdmin ? "admin.html" : "user.html";

//   } catch (err) {
//     alert("Login failed: " + err.message);
//     console.error(err);
//   }
// });
document.getElementById("submitBtn").addEventListener("click", async () => {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) {
    alert("Please enter all required fields.");
    return;
  }

  try {
    const res = await fetch(`${apiBase}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    // OTP Required
    if (data.requiresOTP) {
      localStorage.setItem("pendingEmail", email);
      window.location.href = "verify-otp.html";
      return;
    }

    if (!data.success) throw new Error(data.message);

    // Successful login
    localStorage.setItem("token", data.token);
    localStorage.setItem("isAdmin", data.isAdmin);
    // localStorage.setItem("user_id", data.userId);
    localStorage.setItem("user_id", data.id);


    alert(data.message);
    window.location.href = data.isAdmin ? "admin.html" : "user.html";

  } catch (err) {
    alert("Login failed: " + err.message);
  }
});



// ------------------------
// SIGNUP → OTP PAGE
// ------------------------
async function handleSignup(isAdmin) {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!name || !email || !password) {
    alert("Please enter all required fields.");
    return;
  }

  try {
    const res = await fetch(`${apiBase}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, isAdmin }),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message);

    // Save email for OTP
    localStorage.setItem("pending_email", email);

    alert("OTP sent to your email. Please verify.");
    window.location.href = "verify-otp.html";

  } catch (err) {
    alert("Signup failed: " + err.message);
    console.error(err);
  }
}

document.getElementById("signupAdminBtn").addEventListener("click", () => handleSignup(true));
document.getElementById("signupUserBtn").addEventListener("click", () => handleSignup(false));
