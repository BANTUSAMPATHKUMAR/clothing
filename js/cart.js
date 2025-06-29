// cart.js - Cart page logic

document.addEventListener('DOMContentLoaded', function () {
  renderCart();
});

function renderCart() {
  const cart = getCart();
  const cartItemsEl = document.getElementById('cartItems');
  const cartEmptyEl = document.getElementById('cartEmpty');
  if (cart.length === 0) {
    cartItemsEl.style.display = 'none';
    cartEmptyEl.style.display = 'block';
    updateSummary(0);
    return;
  }
  cartItemsEl.style.display = 'block';
  cartEmptyEl.style.display = 'none';
  cartItemsEl.innerHTML = '';
  let subtotal = 0;
  cart.forEach(item => {
    subtotal += item.price * item.quantity;
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <div class="cart-item-image">
        <img src="${item.image}" alt="${item.name}">
      </div>
      <div class="cart-item-details">
        <div class="cart-item-title">${item.name}</div>
        <div class="cart-item-price">$${item.price.toFixed(2)}</div>
        <div class="cart-item-qty">
          <button class="qty-btn" data-action="decrease" data-id="${item.id}">-</button>
          <span>${item.quantity}</span>
          <button class="qty-btn" data-action="increase" data-id="${item.id}">+</button>
        </div>
      </div>
      <button class="cart-item-remove" data-id="${item.id}" title="Remove"><i class="fas fa-trash"></i></button>
    `;
    cartItemsEl.appendChild(div);
  });
  updateSummary(subtotal);
}

function updateSummary(subtotal) {
  document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
  document.getElementById('shipping').textContent = '$0.00';
  document.getElementById('tax').textContent = '$0.00';
  document.getElementById('total').textContent = `$${subtotal.toFixed(2)}`;
}

document.getElementById('cartItems').addEventListener('click', function (e) {
  const id = e.target.closest('[data-id]')?.getAttribute('data-id');
  if (!id) return;
  let cart = getCart();
  const item = cart.find(i => i.id === id);
  if (!item) return;
  if (e.target.classList.contains('qty-btn')) {
    const action = e.target.getAttribute('data-action');
    if (action === 'increase') {
      item.quantity += 1;
    } else if (action === 'decrease' && item.quantity > 1) {
      item.quantity -= 1;
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
    window.dispatchEvent(new Event('storage'));
  } else if (e.target.classList.contains('cart-item-remove') || e.target.closest('.cart-item-remove')) {
    cart = cart.filter(i => i.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
    window.dispatchEvent(new Event('storage'));
  }
});

// Listen for cart updates from other tabs
window.addEventListener('storage', function (e) {
  if (e.key === 'cart') {
    renderCart();
  }
}); 