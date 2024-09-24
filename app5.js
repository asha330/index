// References to DOM elements
const homeSection = document.getElementById('home-section');
const createListingSection = document.getElementById('create-listing-section');
const loginSection = document.getElementById('login-section');
const registerSection = document.getElementById('register-section');
const productList = document.getElementById('product-list');
const createForm = document.getElementById('create-form');

// Placeholder data
let products = [
  { name: 'Old TV', description: 'Working well', price: 100, condition: 'Used' },
  { name: 'Laptop', description: 'Barely used', price: 800, condition: 'New' }
];

// Function to show Home Section
function showHome() {
  hideAllSections();
  homeSection.classList.remove('hidden');
  renderProducts();
}

// Function to show Create Listing Section
function showCreateListing() {
  hideAllSections();
  createListingSection.classList.remove('hidden');
}

// Function to show Login Section
function showLogin() {
  hideAllSections();
  loginSection.classList.remove('hidden');
}

// Function to show Register Section
function showRegister() {
  hideAllSections();
  registerSection.classList.remove('hidden');
}

// Function to hide all sections
function hideAllSections() {
  homeSection.classList.add('hidden');
  createListingSection.classList.add('hidden');
  loginSection.classList.add('hidden');
  registerSection.classList.add('hidden');
}

// Function to render products in the home section
function renderProducts() {
  productList.innerHTML = '';
  products.forEach(product => {
    const productItem = document.createElement('div');
    productItem.className = 'product-item';
    productItem.innerHTML = `
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <p>Price: $${product.price}</p>
      <p>Condition: ${product.condition}</p>
    `;
    productList.appendChild(productItem);
  });
}

// Handle product creation form submission
createForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const name = document.getElementById('product-name').value;
  const description = document.getElementById('product-description').value;
  const price = document.getElementById('product-price').value;
  const condition = document.getElementById('product-condition').value;

  const newProduct = { name, description, price, condition };
  products.push(newProduct);
  alert('Product listed successfully!');
  showHome();
});

// Initialize the app
showHome();
