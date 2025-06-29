// main.js - Shared navigation and cart count logic

document.addEventListener('DOMContentLoaded', function () {
    updateCartCount();
});

function getCart() {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
}

function updateCartCount() {
    const cart = getCart();
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountEls = document.querySelectorAll('#cartCount');
    cartCountEls.forEach(el => {
        el.textContent = count;
    });
}

// Listen for cart updates from other scripts
window.addEventListener('storage', function (e) {
    if (e.key === 'cart') {
        updateCartCount();
    }
}); 