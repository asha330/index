let products = [];
let cart = [];

// Initial product list
function initializeProducts() {
    products = [
        { name: 'Bicycle', price: 5000, description: 'Used bicycle in good condition.', image: 'cycle.jpeg', reviews: [] },
        { name: 'Camera', price: 3000, description: 'Vintage camera for sale.', image: 'camera.jpeg', reviews: [] },
        { name: 'Smartphone', price: 15000, description: 'Smart phone with good working condition.', image: 'phone.jpeg', reviews: [] },
        { name: 'Flower Pot', price: 500, description: 'Vintage Brass Flower Pot.', image: 'brassfp.jpeg', reviews: [] },
        { name: 'Gaming Console', price: 2000, description: 'Latest model console for kids.', image: 'game.jpeg', reviews: [] },
        { name: 'Laptop', price: 45000, description: 'High-performance laptop for gaming and work.', image: 'laptop.jpeg', reviews: [] },
        { name: 'Headphones', price: 3000, description: 'Noise-cancelling headphones.', image: 'headphones.jpeg', reviews: [] },
        { name: 'Watch', price: 8000, description: 'Stylish wristwatch with leather strap.', image: 'watch.jpeg', reviews: [] },
        { name: 'Sneakers', price: 4000, description: 'Comfortable running shoes.', image: 'sneakers.jpeg', reviews: [] },
        { name: 'Backpack', price: 1500, description: 'Durable backpack for school or travel.', image: 'backpack.jpeg', reviews: [] },
        { name: 'Tablet', price: 20000, description: 'Lightweight tablet for entertainment.', image: 'tablet.jpeg', reviews: [] },
        { name: 'Game Controller', price: 1500, description: 'Wireless game controller.', image: 'controller.jpeg', reviews: [] },
        { name: 'Coffee Maker', price: 6000, description: 'Automatic coffee maker for home use.', image: 'coffee_maker.jpeg', reviews: [] },
        { name: 'Blender', price: 3500, description: 'Powerful blender for smoothies.', image: 'blender.jpeg', reviews: [] },
        { name: 'Electric Kettle', price: 2000, description: 'Fast boiling electric kettle.', image: 'kettle.jpeg', reviews: [] },
        { name: 'Microwave', price: 8000, description: 'Compact microwave oven.', image: 'microwave.jpeg', reviews: [] },
        { name: 'Air Conditioner', price: 30000, description: 'Energy-efficient air conditioner.', image: 'ac.jpeg', reviews: [] },
        { name: 'Refrigerator', price: 25000, description: 'Double door refrigerator with freezer.', image: 'fridge.jpeg', reviews: [] },
        { name: 'Television', price: 40000, description: '55 inch Smart LED TV.', image: 'tv.jpeg', reviews: [] },
        { name: 'Bluetooth Speaker', price: 4000, description: 'Portable Bluetooth speaker.', image: 'speaker.jpeg', reviews: [] },
        { name: 'Action Camera', price: 12000, description: 'HD action camera for adventures.', image: 'action_camera.jpeg', reviews: [] },
        { name: 'Drone', price: 20000, description: 'High-quality drone with HD camera.', image: 'drone.jpeg', reviews: [] }
    ];
}

window.onload = function() {
    initializeProducts();
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
        products = JSON.parse(savedProducts);
    }
    displayProducts();
};

function displayProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    products.forEach((product, index) => {
        const div = document.createElement('div');
        div.classList.add('product-card');
        div.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p>Price: ₹${product.price}</p>
            <button onclick="addToCart('${product.name}', ${product.price})">Add to Cart</button>
            <div class="reviews">
                <h4>Reviews:</h4>
                ${getProductReviews(product)}
                <form onsubmit="addReview(${index}); return false;">
                    <label>Rating (1-5):</label>
                    <input type="number" min="1" max="5" id="rating-${index}" required>
                    <textarea id="review-${index}" placeholder="Write a review" required></textarea>
                    <button type="submit">Submit Review</button>
                </form>
            </div>
        `;
        productList.appendChild(div);
    });
}

function getProductReviews(product) {
    if (product.reviews.length === 0) return '<p>No reviews yet.</p>';
    return product.reviews
        .map(review => `<p>${review.rating}/5 - ${review.comment}</p>`)
        .join('');
}

function addReview(productIndex) {
    const rating = document.getElementById(`rating-${productIndex}`).value;
    const comment = document.getElementById(`review-${productIndex}`).value;

    const newReview = { rating: parseInt(rating), comment };
    products[productIndex].reviews.push(newReview);

    // Save updated product list to localStorage
    localStorage.setItem('products', JSON.stringify(products));

    displayProducts();
}

function addToCart(name, price) {
    cart.push({ name, price });
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const totalPrice = document.getElementById('total-price');
    
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - ₹${item.price}`;
        cartItems.appendChild(li);
        total += item.price;
    });

    cartCount.textContent = cart.length;
    totalPrice.textContent = `Total: ₹${total}`;
}

function proceedToPayment() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    const name = prompt("Enter your name:");
    const phone = prompt("Enter your phone number:");
    const address = prompt("Enter your delivery address:");
    const paymentMethod = prompt("Enter your payment method (e.g., Cash on Delivery, Credit/Debit Card, PayPal):");

    alert(`Your order has been placed!\nName: ${name}\nPhone: ${phone}\nDelivery Address: ${address}\nPayment Method: ${paymentMethod}`);

    cart = []; // Clear the cart after checkout
    updateCart();
}

function showSection(section) {
    document.querySelectorAll('main > section').forEach(s => s.style.display = 'none');
    document.getElementById(section).style.display = 'block';

    if (section === 'home') {
        displayProducts();
    }
}

function addProduct() {
    const name = document.getElementById('product-name').value;
    const price = parseFloat(document.getElementById('product-price').value);
    const description = document.getElementById('product-description').value;
    const image = document.getElementById('product-image').files[0];

    const reader = new FileReader();
    reader.onload = function(event) {
        const newProduct = {
            name,
            price,
            description,
            image: event.target.result, // Use the file data as the image source
            reviews: []
        };
        products.push(newProduct);
        localStorage.setItem('products', JSON.stringify(products)); // Save to localStorage
        displayProducts();
    };
    reader.readAsDataURL(image);
}
