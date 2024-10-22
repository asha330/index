// References to DOM elements
const homeSection = document.getElementById('home-section');
const createListingSection = document.getElementById('create-listing-section');
const loginSection = document.getElementById('login-section');
const registerSection = document.getElementById('register-section');
const productList = document.getElementById('product-list');
const createForm = document.getElementById('create-form');
const searchInput = document.getElementById('search-input');

// Placeholder data
let products = [
  { name: 'Old TV', description: 'Working well', price: 100, condition: 'Used' },
  { name: 'Laptop', description: 'Barely used', price: 800, condition: 'New' },
  { name: 'Bicycle', description: 'Mountain bike in good condition', price: 200, condition: 'Used' },
  { name: 'Smartphone', description: 'Latest model, unlocked', price: 600, condition: 'New' },
  { name: 'Washing Machine', description: 'Efficient and quiet', price: 400, condition: 'Used' },
  { name: 'Coffee Maker', description: 'Brews great coffee', price: 50, condition: 'New' },
  { name: 'Gaming Console', description: 'Includes two controllers', price: 300, condition: 'Used' },
  { name: 'Office Chair', description: 'Ergonomic design', price: 150, condition: 'New' }
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
      <button onclick="editProduct('${product.name}')">Edit</button>
      <button onclick="deleteProduct('${product.name}')">Delete</button>
    `;
    productList.appendChild(productItem);
  });
}

// Handle product creation form submission
createForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const name = document.getElementById('product-name').value;
  const description = document.getElementById('product-description').value;
  const price = parseFloat(document.getElementById('product-price').value);
  const condition = document.getElementById('product-condition').value;

  const newProduct = { name, description, price, condition };
  products.push(newProduct);
  alert('Product listed successfully!');
  createForm.reset(); // Clear the form
  showHome(); // Show the home section again
});

// Function to edit a product
function editProduct(productName) {
  const product = products.find(p => p.name === productName);
  if (product) {
    document.getElementById('product-name').value = product.name;
    document.getElementById('product-description').value = product.description;
    document.getElementById('product-price').value = product.price;
    document.getElementById('product-condition').value = product.condition;
    showCreateListing();
    deleteProduct(productName); // Remove the product to avoid duplicates
  }
}

// Function to delete a product
function deleteProduct(productName) {
  products = products.filter(product => product.name !== productName);
  renderProducts(); // Re-render the products
}

// Function to search products
function searchProducts() {
  const searchTerm = searchInput.value.toLowerCase();
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm) ||
    product.description.toLowerCase().includes(searchTerm)
  );
  renderFilteredProducts(filteredProducts);
}

// Function to render filtered products
function renderFilteredProducts(filteredProducts) {
  productList.innerHTML = '';
  filteredProducts.forEach(product => {
    const productItem = document.createElement('div');
    productItem.className = 'product-item';
    productItem.innerHTML = `
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <p>Price: $${product.price}</p>
      <p>Condition: ${product.condition}</p>
      <button onclick="editProduct('${product.name}')">Edit</button>
      <button onclick="deleteProduct('${product.name}')">Delete</button>
    `;
    productList.appendChild(productItem);
  });
}

// Initialize the app
showHome();
