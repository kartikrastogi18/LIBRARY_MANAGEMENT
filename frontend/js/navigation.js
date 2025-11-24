// // Shared navigation logic for all pages
const apiBase = "http://localhost:5000";
// const token = localStorage.getItem("token");
// const username = localStorage.getItem("username") || "User";

// // Check authentication
// if (!token) {
//   console.warn("No token found. Some buttons may not work.");
// }

// // Set profile images
// const profileImage = document.getElementById("profileImage");
// if (profileImage) {
//   profileImage.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=667eea&color=fff&bold=true&size=128`;
//   profileImage.alt = username;
// }

// const profileAvatarLarge = document.getElementById("profileAvatarLarge");
// if (profileAvatarLarge) {
//   profileAvatarLarge.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=667eea&color=fff&bold=true&size=256`;
//   profileAvatarLarge.alt = username;
// }

// // Navigation button handlers
// const profileBtn = document.getElementById("profileBtn");
// if (profileBtn) {
//   profileBtn.addEventListener("click", () => {
//     window.location.href = "profile.html";
//   });
// }

// const myBooksBtn = document.getElementById("myBooksBtn");
// if (myBooksBtn) {
//   myBooksBtn.addEventListener("click", () => {
//     window.location.href = "my-books.html";
//   });
// }

// const myCartBtn = document.getElementById("myCartBtn");
// if (myCartBtn) {
//   myCartBtn.addEventListener("click", () => {
//     window.location.href = "my-cart.html";
//   });
// }

// const logoutBtn = document.getElementById("logoutBtn");
// if (logoutBtn) {
//   logoutBtn.addEventListener("click", () => {
//     if (confirm("Are you sure you want to logout?")) {
//       localStorage.clear();
//       window.location.href = "index.html";
//     }
//   });
// }

// // Cart badge management
// function updateCartBadge(count) {
//   const badge = document.getElementById("cartBadge");
//   if (badge) {
//     badge.textContent = count;
//     if (count > 0) {
//       badge.style.display = "flex";
//     } else {
//       badge.style.display = "none";
//     }
//   }
// }

// // Load cart count from localStorage
// function loadCartCount() {
//   const cart = JSON.parse(localStorage.getItem("cart") || "[]");
//   updateCartBadge(cart.length);
// }

// // Initialize cart badge
// loadCartCount();

// // Helper function to add to cart
// function addToCart(book) {
//   const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  
//   // Check if book already in cart
//   if (cart.find(item => item.id === book.id)) {
//     alert("This book is already in your cart!");
//     return false;
//   }
  
//   cart.push(book);
//   localStorage.setItem("cart", JSON.stringify(cart));
//   updateCartBadge(cart.length);
//   alert(`"${book.name}" has been added to your cart!`);
//   return true;
// }

// // Helper function to remove from cart
// function removeFromCart(bookId) {
//   let cart = JSON.parse(localStorage.getItem("cart") || "[]");
//   cart = cart.filter(item => item.id !== bookId);
//   localStorage.setItem("cart", JSON.stringify(cart));
//   updateCartBadge(cart.length);
// }

// // Helper function to clear cart
// function clearCart() {
//   localStorage.setItem("cart", "[]");
//   updateCartBadge(0);
// }

// // Helper function to get cart items
// function getCartItems() {
//   return JSON.parse(localStorage.getItem("cart") || "[]");
// }

// // Export functions for use in other scripts
// window.cartFunctions = {
//   addToCart,
//   removeFromCart,
//   clearCart,
//   getCartItems,
//   updateCartBadge
// };
// Shared navigation logic for all pages

// DO NOT declare token again here (it already exists in other files)
// const token = localStorage.getItem("token");

const username = localStorage.getItem("username") || "User";

// Set profile images
const profileImage = document.getElementById("profileImage");
if (profileImage) {
  profileImage.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=667eea&color=fff&bold=true&size=128`;
  profileImage.alt = username;
}

const profileAvatarLarge = document.getElementById("profileAvatarLarge");
if (profileAvatarLarge) {
  profileAvatarLarge.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=667eea&color=fff&bold=true&size=256`;
  profileAvatarLarge.alt = username;
}

// Navigation button handlers
const profileBtn = document.getElementById("profileBtn");
if (profileBtn) profileBtn.addEventListener("click", () => window.location.href = "profile.html");

const myBooksBtn = document.getElementById("myBooksBtn");
if (myBooksBtn) myBooksBtn.addEventListener("click", () => window.location.href = "my-books.html");

const myCartBtn = document.getElementById("myCartBtn");
if (myCartBtn) myCartBtn.addEventListener("click", () => window.location.href = "my-cart.html");

const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to logout?")) {
      localStorage.clear();
      window.location.href = "index.html";
    }
  });
}

// Cart badge
function updateCartBadge(count) {
  const badge = document.getElementById("cartBadge");
  if (!badge) return;

  badge.textContent = count;
  badge.style.display = count > 0 ? "flex" : "none";
}

function loadCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  updateCartBadge(cart.length);
}

loadCartCount();

// Cart functions
window.cartFunctions = {
  addToCart(book) {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    if (cart.find(item => item.id === book.id)) {
      alert("This book is already in your cart!");
      return false;
    }
    cart.push(book);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartBadge(cart.length);
    return true;
  },

  removeFromCart(bookId) {
    let cart = JSON.parse(localStorage.getItem("cart") || "[]");
    cart = cart.filter(item => item.id !== bookId);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartBadge(cart.length);
  },

  clearCart() {
    localStorage.setItem("cart", "[]");
    updateCartBadge(0);
  },

  getCartItems() {
    return JSON.parse(localStorage.getItem("cart") || "[]");
  }
};
