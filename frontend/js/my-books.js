// async function loadMyBooks() {
//   const user_id = localStorage.getItem("user_id");

//   if (!user_id) {
//     alert("Login first!");
//     return;
//   }

//   try {
//     const res = await fetch(`http://localhost:5000/library/${user_id}`);
//     const data = await res.json();

//     console.log("LIBRARY:", data);

//     if (!data.success || data.books.length === 0) {
//       document.getElementById("emptyBooks").style.display = "block";
//       return;
//     }

//     const grid = document.getElementById("myBooksGrid");
//     grid.innerHTML = "";

//     data.books.forEach(book => {
//       const div = document.createElement("div");
//       div.className = "book-card";

//       div.innerHTML = `
//         <div class="book-card-image">
//           <img src="${book.image_url || ''}" />
//         </div>
//         <h3>${book.name}</h3>
//         <p>${book.author_name}</p>
//       `;

//       grid.appendChild(div);
//     });

//   } catch (err) {
//     console.error("My Books Load Error:", err);
//   }
// }

// loadMyBooks();
// const apiBase = "http://localhost:5000";/

async function loadMyBooks() {
  try {
    const user_id = localStorage.getItem("user_id");

    if (!user_id) {
      alert("Please login first!");
      return;
    }

    const res = await fetch(`${"http://localhost:5000"}/library/${user_id}`);
    const data = await res.json();

    if (!data.success || data.books.length === 0) {
      document.getElementById("emptyBooks").style.display = "block";
      return;
    }

    const grid = document.getElementById("myBooksGrid");
    grid.innerHTML = "";

    data.books.forEach(book => {
      const card = document.createElement("div");
      card.className = "my-book-card";

      card.innerHTML = `
        <div class="my-book-image">
        ${book.image_url ? `<img src="${book.image_url}">` : `📚`}
        </div>
        <div class="my-book-title">${book.name}</div>
        <div class="my-book-author">${book.author_name}</div>
      `;

      grid.appendChild(card);
    });

  } catch (err) {
    console.error("My Books Load Error:", err);
    alert("Could not load your books.");
  }
}

loadMyBooks();

