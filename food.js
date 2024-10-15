const restaurantMenus = {
    italian: [
        { id: 1, name: "Pizza", description: "Cheese pizza with tomato sauce and mozzarella cheese.", price: 9.99, image: "pizza.jpg" },
        { id: 2, name: "Pasta", description: "Spaghetti with marinara sauce and Parmesan cheese.", price: 8.99, image: "pasta.jpg" },
        { id: 3, name: "Salad", description: "Fresh garden salad with mixed greens and vinaigrette.", price: 4.99, image: "salad.jpg" }
    ],
    chinese: [
        { id: 4, name: "Kung Pao Chicken", description: "Spicy stir-fried chicken with peanuts.", price: 10.99, image: "kungpao.jpg" },
        { id: 5, name: "Fried Rice", description: "Fried rice with vegetables and soy sauce.", price: 7.99, image: "friedrice.jpg" },
        { id: 6, name: "Spring Rolls", description: "Crispy spring rolls filled with vegetables.", price: 5.49, image: "springrolls.jpg" }
    ],
    mexican: [
        { id: 7, name: "Tacos", description: "Soft tacos filled with seasoned chicken and toppings.", price: 7.99, image: "tacos.jpg" },
        { id: 8, name: "Burrito", description: "Large burrito with beans, rice, and meat.", price: 9.49, image: "burrito.jpg" },
        { id: 9, name: "Nachos", description: "Crispy tortilla chips with cheese and salsa.", price: 6.99, image: "nachos.jpg" }
    ],
    indian: [
        { id: 10, name: "Butter Chicken", description: "Creamy butter chicken served with naan.", price: 11.99, image: "butterchicken.jpg" },
        { id: 11, name: "Biryani", description: "Spicy rice dish with meat and aromatic spices.", price: 10.49, image: "biryani.jpg" },
        { id: 12, name: "Paneer Tikka", description: "Grilled paneer marinated in spices.", price: 8.99, image: "paneertikka.jpg" }
    ],
    japanese: [
        { id: 13, name: "Sushi", description: "Assorted sushi rolls with fresh fish and vegetables.", price: 12.99, image: "sushi.jpg" },
        { id: 14, name: "Ramen", description: "Noodle soup with meat and vegetables.", price: 9.99, image: "ramen.jpg" },
        { id: 15, name: "Tempura", description: "Lightly battered and fried vegetables and shrimp.", price: 10.99, image: "tempura.jpg" }
    ],
    thai: [
        { id: 16, name: "Pad Thai", description: "Stir-fried rice noodle dish with shrimp and peanuts.", price: 9.99, image: "padthai.jpg" },
        { id: 17, name: "Green Curry", description: "Spicy green curry with chicken and vegetables.", price: 10.99, image: "greencurry.jpg" },
        { id: 18, name: "Tom Yum Soup", description: "Spicy and sour soup with shrimp.", price: 8.49, image: "tomyum.jpg" }
    ]
};

let cart = [];

// Handle login
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;

    // Store user information in localStorage
    localStorage.setItem('username', username);
    localStorage.setItem('email', email);

    // Hide login page and show restaurant selection
    document.getElementById('login-page').style.display = 'none';
    document.getElementById('restaurant-selection').style.display = 'block';
    displayRestaurants();
});

// Display restaurants
function displayRestaurants() {
    const restaurantList = document.getElementById('restaurant-list');
    const restaurants = Object.keys(restaurantMenus);
    restaurantList.innerHTML = '';

    restaurants.forEach(restaurant => {
        const restaurantCard = document.createElement('div');
        restaurantCard.className = 'restaurant-card';
        restaurantCard.innerHTML = `
            <img src="images/${restaurant}.jpg" alt="${restaurant}" onerror="this.onerror=null; this.src='images/placeholder.jpg';">
            <h3>${restaurant.charAt(0).toUpperCase() + restaurant.slice(1)}</h3>
            <button onclick="selectRestaurant('${restaurant}')">View Menu</button>
        `;
        restaurantList.appendChild(restaurantCard);
    });
}

// Search restaurants
function filterRestaurants() {
    const input = document.getElementById('search').value.toLowerCase();
    const restaurantCards = document.querySelectorAll('.restaurant-card');

    restaurantCards.forEach(card => {
        const restaurantName = card.querySelector('h3').innerText.toLowerCase();
        if (restaurantName.includes(input)) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
}

// Function to select a restaurant
function selectRestaurant(restaurant) {
    // Redirect to menu.html with the selected restaurant as a query parameter
    window.location.href = `menu.html?restaurant=${restaurant}`;
}

// Add item to cart
function addToCart(itemId) {
    const quantity = parseInt(document.getElementById(`quantity-${itemId}`).value);
    const item = restaurantMenus[selectedRestaurant].find(i => i.id === itemId);
    const existingItem = cart.find(i => i.id === itemId);

    if (existingItem) {
        existingItem.quantity += quantity; // Update quantity if item already in cart
    } else {
        cart.push({ ...item, quantity }); // Add new item to cart
    }
    alert(`${item.name} added to cart!`);
}

// Checkout function
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    let total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    let orderDetails = cart.map(item => `${item.name} (x${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}`).join('\n');
    
    alert(`Your order:\n${orderDetails}\n\nTotal: $${total.toFixed(2)}`);
    cart = []; // Clear the cart after checkout
}

// Logout function
function logout() {
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    window.location.href = 'index.html'; // Redirect to login page
}
