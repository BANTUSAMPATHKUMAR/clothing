// products.js - Product listing and add to cart logic

// Example static product data
const PRODUCTS = [
  // Men's Collection
  {id: 'm1', category: 'men', name: 'Classic Denim Jacket', price: 59.99, image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=300&h=300&fit=crop', size: ['M', 'L', 'XL']},
  {id: 'm2', category: 'men', name: 'Slim Fit Chinos', price: 39.99, image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=300&h=300&fit=crop', size: ['S', 'M', 'L', 'XL']},
  {id: 'm3', category: 'men', name: 'Cotton Crew T-Shirt', price: 19.99, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop', size: ['S', 'M', 'L', 'XL', 'XXL']},
  {id: 'm4', category: 'men', name: 'Wool Blazer', price: 89.99, image: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=300&h=300&fit=crop', size: ['S', 'M', 'L', 'XL']},
  {id: 'm5', category: 'men', name: 'Casual Hoodie', price: 34.99, image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=300&h=300&fit=crop', size: ['S', 'M', 'L', 'XL', 'XXL']},
  {id: 'm6', category: 'men', name: 'Formal Dress Shirt', price: 44.99, image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=300&h=300&fit=crop', size: ['S', 'M', 'L', 'XL']},
  {id: 'm7', category: 'men', name: 'Leather Belt', price: 24.99, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop', size: ['S', 'M', 'L', 'XL']},
  {id: 'm8', category: 'men', name: 'Winter Sweater', price: 49.99, image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=300&h=300&fit=crop', size: ['M', 'L', 'XL']},
  
  // Women's Collection
  {id: 'w1', category: 'women', name: 'Floral Summer Dress', price: 49.99, image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=300&h=300&fit=crop', size: ['S', 'M', 'L']},
  {id: 'w2', category: 'women', name: 'High Waist Jeans', price: 44.99, image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&h=300&fit=crop', size: ['XS', 'S', 'M', 'L']},
  {id: 'w3', category: 'women', name: 'Silk Blouse', price: 34.99, image: 'https://images.unsplash.com/photo-1564257631407-3deb25e91c1b?w=300&h=300&fit=crop', size: ['S', 'M', 'L', 'XL']},
  {id: 'w4', category: 'women', name: 'Knit Cardigan', price: 39.99, image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=300&h=300&fit=crop', size: ['S', 'M', 'L', 'XL']},
  {id: 'w5', category: 'women', name: 'Pencil Skirt', price: 29.99, image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=300&fit=crop', size: ['XS', 'S', 'M', 'L']},
  {id: 'w6', category: 'women', name: 'Evening Gown', price: 129.99, image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&h=300&fit=crop', size: ['S', 'M', 'L']},
  {id: 'w7', category: 'women', name: 'Casual T-Shirt', price: 16.99, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop', size: ['XS', 'S', 'M', 'L', 'XL']},
  {id: 'w8', category: 'women', name: 'Denim Jacket', price: 54.99, image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=300&h=300&fit=crop', size: ['S', 'M', 'L', 'XL']},
  {id: 'w9', category: 'women', name: 'Summer Shorts', price: 24.99, image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=300&fit=crop', size: ['XS', 'S', 'M', 'L']},
  {id: 'w10', category: 'women', name: 'Winter Coat', price: 89.99, image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=300&h=300&fit=crop', size: ['S', 'M', 'L', 'XL']},
  
  // Kids' Collection
  {id: 'k1', category: 'kids', name: 'Boys Polo Shirt', price: 14.99, image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=300&h=300&fit=crop', size: ['XS', 'S', 'M']},
  {id: 'k2', category: 'kids', name: 'Girls Denim Skirt', price: 17.99, image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=300&fit=crop', size: ['XS', 'S', 'M', 'L']},
  {id: 'k3', category: 'kids', name: 'Kids Hoodie', price: 24.99, image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=300&h=300&fit=crop', size: ['S', 'M', 'L']},
  {id: 'k4', category: 'kids', name: 'School Uniform', price: 34.99, image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=300&h=300&fit=crop', size: ['XS', 'S', 'M', 'L']},
  {id: 'k5', category: 'kids', name: 'Rain Jacket', price: 19.99, image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=300&h=300&fit=crop', size: ['S', 'M', 'L']},
  {id: 'k6', category: 'kids', name: 'Party Dress', price: 29.99, image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=300&h=300&fit=crop', size: ['XS', 'S', 'M']},
  {id: 'k7', category: 'kids', name: 'Sports Jersey', price: 22.99, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop', size: ['S', 'M', 'L']},
  {id: 'k8', category: 'kids', name: 'Winter Boots', price: 39.99, image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=300&fit=crop', size: ['S', 'M', 'L']},
  
  // Sale Items
  {id: 's1', category: 'sale', name: 'Unisex Graphic Tee', price: 9.99, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop', size: ['S', 'M', 'L', 'XL']},
  {id: 's2', category: 'sale', name: 'Lightweight Windbreaker', price: 29.99, image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=300&h=300&fit=crop', size: ['M', 'L', 'XL']},
  {id: 's3', category: 'sale', name: 'Casual Sneakers', price: 19.99, image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=300&fit=crop', size: ['S', 'M', 'L', 'XL']},
  {id: 's4', category: 'sale', name: 'Summer Hat', price: 7.99, image: 'https://images.unsplash.com/photo-1556306535-38febf6782e7?w=300&h=300&fit=crop', size: ['One Size']},
  {id: 's5', category: 'sale', name: 'Denim Shorts', price: 12.99, image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=300&h=300&fit=crop', size: ['XS', 'S', 'M', 'L']},
  {id: 's6', category: 'sale', name: 'Basic Tank Top', price: 6.99, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop', size: ['S', 'M', 'L', 'XL']},
  {id: 's7', category: 'sale', name: 'Winter Scarf', price: 8.99, image: 'https://images.unsplash.com/photo-1556306535-38febf6782e7?w=300&h=300&fit=crop', size: ['One Size']},
  {id: 's8', category: 'sale', name: 'Formal Tie', price: 11.99, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop', size: ['One Size']},
];

function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

function renderProducts(products) {
  const grid = document.getElementById('productsGrid');
  grid.innerHTML = '';
  if (products.length === 0) {
    grid.innerHTML = '<p>No products found in this category.</p>';
    document.getElementById('productCount').textContent = '0';
    return;
  }
  products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <div class="product-image">
        <img src="${product.image}" alt="${product.name}" loading="lazy">
      </div>
      <div class="product-content">
        <div>
          <h3 class="product-title">${product.name}</h3>
          <div class="product-price">$${product.price.toFixed(2)}</div>
        </div>
        <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
      </div>
    `;
    grid.appendChild(card);
  });
  document.getElementById('productCount').textContent = products.length;
}

function filterProducts() {
  let category = getQueryParam('category');
  let filtered = PRODUCTS;
  if (category && category !== 'all') {
    filtered = PRODUCTS.filter(p => p.category === category);
  }
  // TODO: Add filter logic for price, size, sort
  renderProducts(filtered);
  // Set category title
  const titleMap = {men: "Men's Collection", women: "Women's Collection", kids: "Kids' Collection", sale: "Sale Items"};
  document.getElementById('categoryTitle').textContent = titleMap[category] || 'All Products';
  document.getElementById('breadcrumbCategory').textContent = titleMap[category] || 'Products';
}

document.addEventListener('DOMContentLoaded', function () {
  filterProducts();

  // Add to Cart
  document.getElementById('productsGrid').addEventListener('click', function (e) {
    if (e.target.classList.contains('add-to-cart-btn')) {
      const id = e.target.getAttribute('data-id');
      const product = PRODUCTS.find(p => p.id === id);
      if (product) {
        addToCart(product);
      }
    }
  });
});

function addToCart(product) {
  let cart = localStorage.getItem('cart');
  cart = cart ? JSON.parse(cart) : [];
  const existing = cart.find(item => item.id === product.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({id: product.id, name: product.name, price: product.price, image: product.image, quantity: 1});
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  window.dispatchEvent(new Event('storage'));
  // Feedback
  alert('Added to cart!');
} 