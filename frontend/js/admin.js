const apiBase = "http://localhost:5000";
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
          <p class="book-id">ID: ${b.id}</p>
        </div>
      `;
      container.appendChild(div);
    });
  } catch (error) {
    console.error("Error loading books:", error);
  }
}

document.getElementById("addBookBtn").addEventListener("click", async () => {
  const name = document.getElementById("bookName").value;
  const category = document.getElementById("bookCategory").value;
  const language = document.getElementById("bookLanguage").value;
  const description = document.getElementById("bookdescription").value;
  const author_name = document.getElementById("bookauthor_name").value;

  if (!name || !category || !language|| !description|| !author_name) {
    alert("Please fill in all required fields");
    return;
  }

  try {
    const res = await fetch(`${apiBase}/addbook`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ name, category, language ,description ,author_name })
    });

    const data = await res.json();
    alert(data.message);
    
    // Clear form
    document.getElementById("bookName").value = "";
    document.getElementById("bookCategory").value = "";
    document.getElementById("bookLanguage").value = "";
    document.getElementById("bookdescription").value="";
    document.getElementById("bookauthor_name").value="";
    
    loadBooks();
  } catch (error) {
    console.error("Error adding book:", error);
    alert("Failed to add book");
  }
});

document.getElementById("updateBookBtn").addEventListener("click", async () => {
  const id = document.getElementById("bookId").value;
  const name = document.getElementById("bookName").value;
  const category = document.getElementById("bookCategory").value;
  const language = document.getElementById("bookLanguage").value;
  const description = document.getElementById("bookdescription").value;
  const author_name = document.getElementById("bookauthor_name").value;
  const published_on = document.getElementById("bookPublished").value;

  if (!id) {
    alert("Please enter Book ID to update");
    return;
  }

  try {
    const res = await fetch(`${apiBase}/update?id=${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ name, category, language, published_on, description,author_name })
    });

    const data = await res.json();
    alert(data.message);
    loadBooks();
  } catch (error) {
    console.error("Error updating book:", error);
    alert("Failed to update book");
  }
});

document.getElementById("deleteBookBtn").addEventListener("click", async () => {
  const id = document.getElementById("bookId").value;
  
  if (!id) {
    alert("Please enter Book ID to delete");
    return;
  }

  if (!confirm("Are you sure you want to delete this book?")) {
    return;
  }

  try {
    const res = await fetch(`${apiBase}/delete?id=${id}`, {
      method: "DELETE",
      headers: { "Authorization": `Bearer ${token}` }
    });

    const data = await res.json();
    alert(data.message);
    
    // Clear form
    document.getElementById("bookId").value = "";
    
    loadBooks();
  } catch (error) {
    console.error("Error deleting book:", error);
    alert("Failed to delete book");
  }
});

loadBooks();