// // const apiBase = "https://library-management-1-74wv.onrender.com";
// // const token = localStorage.getItem("token");

// // if (!token) window.location.href = "index.html";

// // document.getElementById("logoutBtn").addEventListener("click", () => {
// //   localStorage.clear();
// //   window.location.href = "index.html";
// // });

// // async function loadBooks() {
// //   try {
// //     const res = await fetch(`${apiBase}/listBook`);
// //     const data = await res.json();

// //     const container = document.getElementById("bookList");
// //     container.innerHTML = "";
    
// //     data.data.forEach(b => {
// //       const div = document.createElement("div");
// //       div.className = "book-card";
// //       div.onclick = () => window.location.href = `book-details.html?id=${b.id}`;
      
// //       div.innerHTML = `
// //         <div class="book-image">
// //           ${b.image_url 
// //             ? `<img src="${b.image_url}" alt="${b.name}">` 
// //             : `<div class="book-placeholder">📚</div>`
// //           }
// //         </div>
// //         <div class="book-info">
// //           <h3>${b.name}</h3>
// //         </div>
// //       `;
// //       container.appendChild(div);
// //     });
// //   } catch (error) {
// //     console.error("Error loading books:", error);
// //   }
// // }

// // loadBooks();
// const apiBase = "https://library-management-1-74wv.onrender.com";
// const token = localStorage.getItem("token");
// const username = localStorage.getItem("username") || "User";

// if (!token) window.location.href = "index.html";

// // Set profile image with username
// const profileImg = document.getElementById("profileImage");
// profileImg.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=667eea&color=fff&bold=true&size=128`;
// profileImg.alt = username;

// // Logout functionality
// document.getElementById("logoutBtn").addEventListener("click", () => {
//   localStorage.clear();
//   window.location.href = "index.html";
// });

// // Profile click
// document.getElementById("profileBtn").addEventListener("click", () => {
//   alert(`Profile: ${username}\n\nThis feature is coming soon!`);
// });

// // My Books button
// document.getElementById("myBooksBtn").addEventListener("click", () => {
//   alert("My Books feature coming soon!");
// });

// // My Cart button
// document.getElementById("myCartBtn").addEventListener("click", () => {
//   alert("My Cart feature coming soon!");
// });

// // Update cart badge (you can implement real cart logic later)
// function updateCartBadge(count) {
//   const badge = document.getElementById("cartBadge");
//   badge.textContent = count;
//   if (count > 0) {
//     badge.style.display = "flex";
//   } else {
//     badge.style.display = "none";
//   }
// }

// // Initialize cart badge
// updateCartBadge(0);

// async function loadBooks() {
//   try {
//     const res = await fetch(`${apiBase}/listBook`);
//     const data = await res.json();

//     const container = document.getElementById("bookList");
//     container.innerHTML = "";
    
//     data.data.forEach(b => {
//       const div = document.createElement("div");
//       div.className = "book-card";
//       div.onclick = () => window.location.href = `book-details.html?id=${b.id}`;
      
//       div.innerHTML = `
//         <div class="book-image">
//           ${b.image_url 
//             ? `<img src="${b.image_url}" alt="${b.name}">` 
//             : `<div class="book-placeholder">📚</div>`
//           }
//         </div>
//         <div class="book-info">
//           <h3>${b.name}</h3>
//         </div>
//       `;
//       container.appendChild(div);
//     });
//   } catch (error) {
//     console.error("Error loading books:", error);
//   }
// }

// loadBooks();
// User.js - Main book listing page
// Navigation and authentication are handled by navigation.js

// Load books from API
async function loadBooks() {
  try {
    const res = await fetch(`${apiBase}/listBook`);
    const data = await res.json();

    const container = document.getElementById("bookList");
    container.innerHTML = "";
    
    data.data.forEach(b => {
      const div = document.createElement("div");
      div.className = "book-card";
      
      // Add click handler for book details
      div.onclick = () => window.location.href = `book-details.html?id=${b.id}`;
      
      div.innerHTML = `
        <div class="book-image">
          ${b.image_url 
            ? `<img src="${b.image_url}" alt="${b.name}">` 
            : `<div class="book-placeholder">📚</div>`
          }
        </div>
        <div class="book-info">
          <h3>${b.name}</h3>
        </div>
      `;
      container.appendChild(div);
    });
  } catch (error) {
    console.error("Error loading books:", error);
  }
}

loadBooks();