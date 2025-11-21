// My Cart page logic
const cartItemsContainer = document.getElementById("cartItems");
const emptyCart = document.getElementById("emptyCart");
const totalItemsEl = document.getElementById("totalItems");
const subtotalEl = document.getElementById("subtotal");
const taxEl = document.getElementById("tax");
const totalEl = document.getElementById("total");
const checkoutBtn = document.getElementById("checkoutBtn");
const clearCartBtn = document.getElementById("clearCartBtn");

// Load and display cart items
function loadCart() {
  const cart = window.cartFunctions.getCartItems();
  
  if (cart.length === 0) {
    cartItemsContainer.style.display = "none";
    document.querySelector(".cart-summary").style.display = "none";
    emptyCart.style.display = "block";
    return;
  }
  
  cartItemsContainer.style.display = "flex";
  document.querySelector(".cart-summary").style.display = "block";
  emptyCart.style.display = "none";
  
  cartItemsContainer.innerHTML = "";
  let subtotal = 0;
  
  cart.forEach((book, index) => {
    const price = book.price || 15.99; // Default price if not set
    subtotal += price;
    
    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";
    cartItem.style.animationDelay = `${index * 0.1}s`;
    
    cartItem.innerHTML = `
      <div class="cart-item-image">
        ${book.image_url 
          ? `<img src="${book.image_url}" alt="${book.name}">` 
          : `<span>📚</span>`
        }
      </div>
      <div class="cart-item-details">
        <div>
          <h3 class="cart-item-title">${book.name}</h3>
          <p class="cart-item-author">${book.author || "Unknown Author"}</p>
        </div>
        <div class="cart-item-footer">
          <span class="cart-item-price">$${price.toFixed(2)}</span>
          <button class="remove-btn" onclick="removeItem('${book.id}')">
            🗑️ Remove
          </button>
        </div>
      </div>
    `;
    
    cartItemsContainer.appendChild(cartItem);
  });
  
  // Update summary
  const tax = subtotal * 0.1;
  const total = subtotal + tax;
  
  totalItemsEl.textContent = cart.length;
  subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
  taxEl.textContent = `$${tax.toFixed(2)}`;
  totalEl.textContent = `$${total.toFixed(2)}`;
}

// Remove item from cart
window.removeItem = function(bookId) {
  if (confirm("Remove this book from cart?")) {
    window.cartFunctions.removeFromCart(bookId);
    loadCart();
  }
};

// Clear entire cart
clearCartBtn.addEventListener("click", () => {
  if (confirm("Are you sure you want to clear your entire cart?")) {
    window.cartFunctions.clearCart();
    loadCart();
  }
});

// Checkout handler
checkoutBtn.addEventListener("click", () => {
  const cart = window.cartFunctions.getCartItems();
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  
  // Calculate total
  const subtotal = cart.reduce((sum, book) => sum + (book.price || 15.99), 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;
  
  // Show confirmation dialog
  const bookList = cart.map(book => `• ${book.name}`).join('\n');
  const confirmMessage = `📦 Purchase Confirmation\n\n${bookList}\n\nTotal Items: ${cart.length}\nTotal Amount: ${total.toFixed(2)}\n\nProceed with purchase?`;
  
  if (confirm(confirmMessage)) {
    // Simulate purchase (In production, this would call an API)
    alert(`✅ Purchase Successful!\n\nOrder Summary:\n${cart.length} books\nTotal: ${total.toFixed(2)}\n\nThank you for your purchase!\nYour books have been added to "My Books".`);
    
    // Add books to My Books
    addBooksToMyLibrary(cart);
    
    // Clear cart after checkout
    window.cartFunctions.clearCart();
    loadCart();
  }
});

// Initial load
loadCart();