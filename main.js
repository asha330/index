const restaurants = [
    {
        id: 1,
        name: 'Pizza Palace',
        menu: [
            { id: 1, name: 'Margherita Pizza', price: 12 },
            { id: 2, name: 'Pepperoni Pizza', price: 15 },
            { id: 3, name: 'Garlic Bread', price: 5 }
        ]
    },
    {
        id: 2,
        name: 'Burger House',
        menu: [
            { id: 4, name: 'Cheeseburger', price: 10 },
            { id: 5, name: 'Fries', price: 4 },
            { id: 6, name: 'Chicken Sandwich', price: 8 }
        ]
    }
];

let cart = [];
let totalPrice = 0;

document.addEventListener("DOMContentLoaded", () => {
    showRestaurants();
});

// Function to display the restaurant list
function showRestaurants() {
    const restaurantList = document.getElementById('restaurants');
    restaurantList.innerHTML = '';
    restaurants.forEach(restaurant => {
        const div = document.createElement('div');
        div.classList.add('restaurant');
        div.innerHTML = `<h3>${restaurant.name}</h3><button onclick="showMenu(${restaurant.id})">View Menu</button>`;
        restaurantList.appendChild(div);
    });
}

// Function to display the menu of a selected restaurant
function showMenu(restaurantId) {
    const restaurant = restaurants.find(r => r.id === restaurantId);
    document.getElementById('menu-title').innerText = `Menu - ${restaurant.name}`;
    const menuSection = document.getElementById('menu-items');
    menuSection.innerHTML = '';
    restaurant.menu.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('menu-item');
        div.innerHTML = `<h4>${item.name} - $${item.price}</h4><button onclick="addToCart('${item.name}', ${item.price})">Add to Cart</button>`;
        menuSection.appendChild(div);
    });
    document.getElementById('restaurant-list').style.display = 'none';
    document.getElementById('menu-section').style.display = 'block';
}

// Function to add items to the cart
function addToCart(itemName, itemPrice) {
    cart.push({ name: itemName, price: itemPrice });
    totalPrice += itemPrice;
    document.getElementById('cart-count').innerText = cart.length;
    alert(`${itemName} added to cart`);
}

// Function to show the cart
function showCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `${item.name} - $${item.price} <button onclick="removeFromCart(${index})">Remove</button>`;
        cartItems.appendChild(li);
    });
    document.getElementById('total-price').innerText = totalPrice;
    document.getElementById('restaurant-list').style.display = 'none';
    document.getElementById('menu-section').style.display = 'none';
    document.getElementById('cart-section').style.display = 'block';
}

// Function to remove items from the cart
function removeFromCart(index) {
    totalPrice -= cart[index].price;
    cart.splice(index, 1);
    document.getElementById('cart-count').innerText = cart.length;
    showCart();
}

// Function to go back to the restaurant list
function backToRestaurants() {
    document.getElementById('restaurant-list').style.display = 'block';
    document.getElementById('menu-section').style.display = 'none';
    document.getElementById('cart-section').style.display = 'none';
}

// Function to handle checkout
function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
    } else {
        alert("Order placed successfully!");
        cart = [];
        totalPrice = 0;
        document.getElementById('cart-count').innerText = 0;
        showRestaurants();
    }
}
