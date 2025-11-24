
window.apiBase = window.apiBase || "http://localhost:5000";

const token = localStorage.getItem("token");

// If not logged in, go back to login page
if (!token) window.location.href = "index.html";

document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.clear();
  window.location.href = "index.html";
});

const urlParams = new URLSearchParams(window.location.search);
const bookId = urlParams.get("id");

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

    // Fill UI
    document.getElementById("bookName").textContent = book.name;
    document.getElementById("bookCategory").textContent = book.category;
    document.getElementById("bookLanguage").textContent = book.language;
    document.getElementById("bookdescription").textContent = book.description;
    document.getElementById("bookPrice").textContent = book.price;

    document.getElementById("bookauthor_name").textContent = book.author_name;
    document.getElementById("bookPublished").textContent =
      book.published_on || "Not specified";
    document.getElementById("bookId").textContent = book.id;

    const imageContainer = document.getElementById("bookImage");
    if (book.image_url) {
      imageContainer.innerHTML = `<img src="${book.image_url}" alt="${book.name}">`;
    } else {
      imageContainer.innerHTML = `<div class="book-placeholder">📚</div>`;
    }

    document.title = `${book.name} | TheZman Library`;

    // ADD TO CART BUTTON (DB)
    document.getElementById("addToCartBtn").addEventListener("click", async () => {
      const user_id = localStorage.getItem("user_id");

      if (!user_id) {
        alert("User not logged in!");
        return;
      }

      const payload = { user_id, book_id: book.id };
      console.log("Sending to DB:", payload);

      const res = await fetch("http://localhost:5000/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      console.log("DB Response:", result);
      alert(result.message);
    });

  } catch (err) {
    console.error("Error loading book details:", err);
    alert("Failed to load book details");
    history.back();
  }
}

loadBookDetails();
