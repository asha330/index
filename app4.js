// Sample menu data with images
const menuItems = [
    { id: 1, name: 'Burger', price: 5.99, image: 'https://example.com/burger.jpg' },
    { id: 2, name: 'Pizza', price: 8.99, image: 'https://example.com/pizza.jpg' },
    { id: 3, name: 'Pasta', price: 7.49, image: 'https://example.com/pasta.jpg' },
    { id: 4, name: 'Salad', price: 4.99, image: 'https://example.com/salad.jpg' },
    { id: 5, name: 'Sushi', price: 10.99, image: 'https://example.com/sushi.jpg' },
    { id: 6, name: 'Tacos', price: 6.99, image: 'https://example.com/tacos.jpg' },
    { id: 7, name: 'Steak', price: 14.99, image: 'https://example.com/steak.jpg' },
    { id: 8, name: 'Ice Cream', price: 3.99, image: 'https://example.com/icecream.jpg' },
];

// Array to hold cart items
let cart = [];

// Function to display menu items
function displayMenu() {
    const menuList = document.getElementById('menu-items');
    menuItems.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `<img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; margin-right: 10px;">${item.name} - $${item.price.toFixed(2)} <button onclick="addToCart(${item.id})">Add to Cart</button>`;
        menuList.appendChild(li);
    });
}

// Function to add items to cart
function addToCart(itemId) {
    const item = menuItems.find(menuItem => menuItem.id === itemId);
    cart.push(item);
    displayCart();
}

// Function to display cart items
function displayCart() {
    const cartList = document.getElementById('cart-items');
    cartList.innerHTML = '';

    let totalPrice = 0;
    cart.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `${item.name} - $${item.price.toFixed(2)}`;
        cartList.appendChild(li);
        totalPrice += item.price;
    });

    document.getElementById('total-price').innerText = totalPrice.toFixed(2);
}

// Function to handle order placement
function placeOrder() {
    if (cart.length === 0) {
        alert('Your cart is empty.');
        return;
    }

    alert('Order placed successfully!');
    cart = []; // Clear the cart
    displayCart();
}

// Initialize the menu and cart
document.addEventListener('DOMContentLoaded', () => {
    displayMenu();
    document.getElementById('place-order').addEventListener('click', placeOrder);
});
