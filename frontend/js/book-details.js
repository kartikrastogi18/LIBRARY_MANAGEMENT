// const apiBase = "http://localhost:5000";
// const token = localStorage.getItem("token");

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
    document.getElementById("bookPrice").textContent = book.price;

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
    // Add to Cart button handler
document.getElementById("addToCartBtn").addEventListener("click", () => {
  window.cartFunctions.addToCart(book);
  // document.getElementById("addToCartBtn").onclick = async () => {
  //   const user_id = localStorage.getItem("user_id");
  //   const token = localStorage.getItem("token");
  
  //   // Save to local storage
  //   window.cartFunctions.addToCart(book);
  
  //   // Save to DB
  //   try {
  //     const res = await fetch(`${apiBase}/cart/add`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "Authorization": `Bearer ${token}`
  //       },
  //       body: JSON.stringify({
  //         user_id: user_id,
  //         book_id: book.id
  //       })
  //     });
  
  //     const data = await res.json();
  
  //     if (!data.success) {
  //       alert("Local cart updated, but DB error: " + data.message);
  //     } else {
  //       alert("Book added to cart successfully (Local + DB)");
  //     }
  
  //   } catch (err) {
  //     console.error("Add-to-cart DB error:", err);
  //     alert("Local cart updated, but failed to save in DB.");
  //   }
  // };
  
});


  } catch (error) {
    console.error("Error loading book details:", error);
    alert("Failed to load book details");
    history.back();
  }
}

loadBookDetails();

