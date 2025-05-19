// cart.js

function addToCart(id, name, price) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ id, name, price, quantity: 1 });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`${name} added to cart!`);
}

function loadCart() {
  const container = document.getElementById('cart-container');
  const totalDiv = document.getElementById('cart-total');
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  if (!container || !totalDiv) return;

  container.innerHTML = '';
  let total = 0;

  if (cart.length === 0) {
    container.innerHTML = '<p>Your cart is empty.</p>';
    totalDiv.innerHTML = '';
    return;
  }

  cart.forEach((item, index) => {
    total += item.price * item.quantity;
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <p><strong>${item.name}</strong></p>
      <p>Price: $${item.price}</p>
      <p>Quantity: <button onclick="updateQuantity(${index}, -1)">-</button> ${item.quantity} <button onclick="updateQuantity(${index}, 1)">+</button></p>
      <button onclick="removeItem(${index})">Remove</button>
      <hr>
    `;
    container.appendChild(div);
  });

  totalDiv.innerHTML = `<h3>Total: $${total.toFixed(2)}</h3>`;
}

function updateQuantity(index, change) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart[index].quantity += change;
  if (cart[index].quantity < 1) cart[index].quantity = 1;
  localStorage.setItem('cart', JSON.stringify(cart));
  loadCart();
}

function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  loadCart();
}

function checkoutCart() {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  if (cart.length === 0) {
    alert("Your cart is empty. Add items before checking out.");
    return;
  }

  let total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (confirm(`Your total is $${total.toFixed(2)}. Do you want to proceed with checkout?`)) {
    localStorage.removeItem('cart');
    alert("Thank you for your purchase!");
    location.reload();
  }
}

window.addEventListener('DOMContentLoaded', loadCart);
