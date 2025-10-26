const apiBase = "https://library-management-1-74wv.onrender.com";
const token = localStorage.getItem("token");

if (!token) window.location.href = "index.html";

document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.clear();
  window.location.href = "index.html";
});

async function loadBooks() {
  try {
    const res = await fetch(`${apiBase}/listBook`);
    const data = await res.json();

    const container = document.getElementById("bookList");
    container.innerHTML = "";
    
    data.data.forEach(b => {
      const div = document.createElement("div");
      div.className = "book-card";
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