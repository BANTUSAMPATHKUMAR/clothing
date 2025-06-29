// checkout.js - Checkout page logic

document.addEventListener('DOMContentLoaded', function () {
  renderOrderSummary();
  document.getElementById('checkoutForm').addEventListener('submit', handleCheckout);
});

function renderOrderSummary() {
  const cart = getCart();
  const orderItemsEl = document.getElementById('orderItems');
  let subtotal = 0;
  orderItemsEl.innerHTML = '';
  cart.forEach(item => {
    subtotal += item.price * item.quantity;
    const div = document.createElement('div');
    div.className = 'order-item';
    div.innerHTML = `
      <div class="order-item-image">
        <img src="${item.image}" alt="${item.name}">
      </div>
      <div class="order-item-details">
        <div class="order-item-title">${item.name}</div>
        <div class="order-item-qty">Qty: ${item.quantity}</div>
      </div>
      <div class="order-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
    `;
    orderItemsEl.appendChild(div);
  });
  document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
  document.getElementById('shipping').textContent = '$0.00';
  document.getElementById('tax').textContent = '$0.00';
  document.getElementById('total').textContent = `$${subtotal.toFixed(2)}`;
}

function handleCheckout(e) {
  e.preventDefault();
  // Basic validation
  const form = e.target;
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }
  // Simulate order placement
  const orderId = 'SH' + Math.floor(Math.random() * 1000000);
  const total = document.getElementById('total').textContent;
  document.getElementById('orderId').textContent = orderId;
  document.getElementById('orderTotal').textContent = total;
  document.getElementById('orderModal').style.display = 'flex';
  // Clear cart
  localStorage.removeItem('cart');
  window.dispatchEvent(new Event('storage'));
}

function closeOrderModal() {
  document.getElementById('orderModal').style.display = 'none';
} 