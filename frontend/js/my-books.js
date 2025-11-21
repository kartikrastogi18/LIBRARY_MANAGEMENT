// My Books page logic
const myBooksGrid = document.getElementById("myBooksGrid");
const emptyBooks = document.getElementById("emptyBooks");
const tabButtons = document.querySelectorAll(".tab-btn");

// Sample user books data (In production, this would come from API)
const userBooks = [
  {
    id: "1",
    name: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    image_url: "",
    status: "reading",
    progress: 65,
    dueDate: "2025-11-15"
  },
  {
    id: "2",
    name: "To Kill a Mockingbird",
    author: "Harper Lee",
    image_url: "",
    status: "completed",
    completedDate: "2025-10-28"
  },
  {
    id: "3",
    name: "1984",
    author: "George Orwell",
    image_url: "",
    status: "wishlist",
    addedDate: "2025-11-01"
  },
  {
    id: "4",
    name: "Pride and Prejudice",
    author: "Jane Austen",
    image_url: "",
    status: "reading",
    progress: 30,
    dueDate: "2025-11-20"
  },
  {
    id: "5",
    name: "The Catcher in the Rye",
    author: "J.D. Salinger",
    image_url: "",
    status: "completed",
    completedDate: "2025-10-15"
  }
];

// Store books in localStorage for persistence
if (!localStorage.getItem("myBooks")) {
  localStorage.setItem("myBooks", JSON.stringify(userBooks));
}

let currentFilter = "all";

// Load and display books
function loadMyBooks(filter = "all") {
  const books = JSON.parse(localStorage.getItem("myBooks") || "[]");
  
  let filteredBooks = books;
  if (filter !== "all") {
    filteredBooks = books.filter(book => book.status === filter);
  }
  
  if (filteredBooks.length === 0) {
    myBooksGrid.style.display = "none";
    emptyBooks.style.display = "block";
    return;
  }
  
  myBooksGrid.style.display = "grid";
  emptyBooks.style.display = "none";
  
  myBooksGrid.innerHTML = "";
  
  filteredBooks.forEach((book, index) => {
    const bookCard = document.createElement("div");
    bookCard.className = "my-book-card";
    bookCard.style.animationDelay = `${index * 0.1}s`;
    bookCard.onclick = () => viewBookDetails(book);
    
    const statusClass = `status-${book.status}`;
    const statusText = {
      reading: "📖 Reading",
      completed: "✅ Completed",
      wishlist: "⭐ Wishlist"
    }[book.status];
    
    bookCard.innerHTML = `
      <div class="my-book-image">
        ${book.image_url 
          ? `<img src="${book.image_url}" alt="${book.name}">` 
          : `<span>📚</span>`
        }
      </div>
      <div class="my-book-info">
        <h3 class="my-book-title">${book.name}</h3>
        <p style="color: rgba(255, 255, 255, 0.8); font-size: 0.9rem; margin-top: 5px;">
          ${book.author}
        </p>
        <span class="my-book-status ${statusClass}">${statusText}</span>
        ${book.progress ? `
          <div style="margin-top: 10px;">
            <div style="background: rgba(255,255,255,0.2); height: 6px; border-radius: 3px; overflow: hidden;">
              <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); height: 100%; width: ${book.progress}%; transition: width 0.3s ease;"></div>
            </div>
            <p style="color: rgba(255,255,255,0.7); font-size: 0.8rem; margin-top: 5px;">${book.progress}% complete</p>
          </div>
        ` : ''}
      </div>
    `;
    
    myBooksGrid.appendChild(bookCard);
  });
}

// View book details
function viewBookDetails(book) {
  alert(`Book: ${book.name}\nAuthor: ${book.author}\nStatus: ${book.status}\n\nFull book details page coming soon!`);
}

// Tab filter functionality
tabButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    tabButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    
    const filter = btn.getAttribute("data-filter");
    currentFilter = filter;
    loadMyBooks(filter);
  });
});

// Initial load
loadMyBooks(currentFilter);