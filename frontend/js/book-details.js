const apiBase = "http://localhost:5000";
const token = localStorage.getItem("token");

if (!token) window.location.href = "index.html";

document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.clear();
  window.location.href = "index.html";
});

// Get book ID from URL
const urlParams = new URLSearchParams(window.location.search);
const bookId = urlParams.get('id');

if (!bookId) {
  alert("No book ID provided");
  history.back();
}

async function loadBookDetails() {
  try {
    const res = await fetch(`${apiBase}/getBook/${bookId}`);
    const data = await res.json();

    if (!data.success) {
      alert(data.message || "Book not found");
      history.back();
      return;
    }

    const book = data.data;

    // Update page content
    document.getElementById("bookName").textContent = book.name;
    document.getElementById("bookCategory").textContent = book.category;
    document.getElementById("bookLanguage").textContent = book.language;
    document.getElementById("bookdescription").textContent = book.description;
    document.getElementById("bookauthor_name").textContent = book.author_name;
    document.getElementById("bookPublished").textContent = book.published_on || "Not specified";
    document.getElementById("bookId").textContent = book.id;

    // Update image
    const imageContainer = document.getElementById("bookImage");
    if (book.image_url) {
      imageContainer.innerHTML = `<img src="${book.image_url}" alt="${book.name}">`;
    } else {
      imageContainer.innerHTML = `<div class="book-placeholder">📚</div>`;
    }

    // Update page title
    document.title = `${book.name} | TheZman Library`;

  } catch (error) {
    console.error("Error loading book details:", error);
    alert("Failed to load book details");
    history.back();
  }
}

loadBookDetails();