// ================= CART PAGE (FULL DB VERSION) =====================

// const apiBase =window.apiBase || "http://localhost:5000";

const cartItemsContainer = document.getElementById("cartItems");
const emptyCart = document.getElementById("emptyCart");
const totalItemsEl = document.getElementById("totalItems");
const subtotalEl = document.getElementById("subtotal");
const taxEl = document.getElementById("tax");
const totalEl = document.getElementById("total");
const checkoutBtn = document.getElementById("checkoutBtn");
const clearCartBtn = document.getElementById("clearCartBtn");

// ==================== LOAD CART FROM DATABASE ====================
async function loadCart() {
  let user_id =
  localStorage.getItem("user_id") ||
  localStorage.getItem("id") ||
  localStorage.getItem("userId");

  if (!user_id) {
    alert("Please login first!");
    return;
  }

  try {
    const res = await fetch(`${"http://localhost:5000"}/cart/${user_id}`);
    const data = await res.json();

    console.log("DB Cart:", data);

    if (!data.success || data.cart.length === 0) {
      emptyCart.style.display = "block";
      cartItemsContainer.style.display = "none";
      document.querySelector(".cart-summary").style.display = "none";
      return;
    }

    const cart = data.cart;
    cartItemsContainer.innerHTML = "";
    emptyCart.style.display = "none";

    let subtotal = 0;

    cart.forEach(item => {
      const book = item.Book;
      const price = book.price || 15.99;
      subtotal += price;

      const cartItem = document.createElement("div");

      cartItem.className = "cart-item";
      cartItem.innerHTML = `
        <div class="cart-item-image">
          ${book.image_url ? `<img src="${book.image_url}">` : `📚`}
        </div>
        <div class="cart-item-details">
          <h3>${book.name}</h3>
          <p>${book.author_name}</p>
          <p>Price: ${price}</p>
          <button onclick="removeFromCartDB(${item.book_id})">Remove</button>
        </div>
      `;

      cartItemsContainer.appendChild(cartItem);
    });

    // SUMMARY
    const tax = subtotal * 0.1;
    const total = subtotal + tax;

    totalItemsEl.textContent = cart.length;
    subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    taxEl.textContent = `$${tax.toFixed(2)}`;
    totalEl.textContent = `$${total.toFixed(2)}`;

  } catch (err) {
    console.error("Cart load error:", err);
  }
}

// ==================== REMOVE ITEM FROM CART (DB) ====================
async function removeFromCartDB(book_id) {
  const user_id = localStorage.getItem("user_id");

  const res = await fetch("http://localhost:5000/cart/remove", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_id, book_id })
  });

  const data = await res.json();
  alert(data.message);
  loadCart();
}


// ==================== CLEAR CART (DB) ====================
clearCartBtn.addEventListener("click", async () => {
  if (!confirm("Clear entire cart?")) return;

  const user_id = localStorage.getItem("user_id");

  const res = await fetch(`${apiBase}/cart/clear`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_id })
  });

  const data = await res.json();
  alert(data.message);

  loadCart();
});

// ==================== PURCHASE CART (DB) ====================
checkoutBtn.addEventListener("click", async () => {
  const user_id = localStorage.getItem("user_id");

  const res = await fetch(`${apiBase}/cart/purchase`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_id })
  });

  const data = await res.json();

  if (data.success) {
    alert("Purchase successful! Books added to My Library.");
    loadCart();
  } else {
    alert("Purchase failed: " + data.message);
  }
});

// -------------------- INITIAL LOAD ----------------------
loadCart();
