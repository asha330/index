// Sample menu data with images
const menuItems = [
    { id: 1, name: 'Burger', price: 5.99, image:"D:\fullstack\Burger"},
    { id: 2, name: 'Pizza', price: 8.99, image: 'https://via.placeholder.com/50?text=Pizza' },
    { id: 3, name: 'Pasta', price: 7.49, image: 'https://via.placeholder.com/50?text=Pasta' },
    { id: 4, name: 'Salad', price: 4.99, image: 'https://via.placeholder.com/50?text=Salad' },
    { id: 5, name: 'Sushi', price: 10.99, image: 'https://via.placeholder.com/50?text=Sushi' },
    { id: 6, name: 'Tacos', price: 6.99, image: 'https://via.placeholder.com/50?text=Tacos' },
    { id: 7, name: 'Steak', price: 14.99, image: 'https://via.placeholder.com/50?text=Steak' },
    { id: 8, name: 'Ice Cream', price: 3.99, image: 'https://via.placeholder.com/50?text=Ice+Cream' },
    { id: 9, name: 'Fries', price: 2.99, image: 'https://via.placeholder.com/50?text=Fries' },
    { id: 10, name: 'Chocolate Cake', price: 4.49, image: 'https://via.placeholder.com/50?text=Cake' },
    { id: 11, name: 'Sandwich', price: 5.49, image: 'https://via.placeholder.com/50?text=Sandwich' },
    { id: 12, name: 'Muffin', price: 2.99, image: 'https://via.placeholder.com/50?text=Muffin' },
    { id: 13, name: 'Lemonade', price: 1.99, image: 'https://via.placeholder.com/50?text=Lemonade' },
    { id: 14, name: 'Hot Dog', price: 3.99, image: 'https://via.placeholder.com/50?text=Hot+Dog' },
    { id: 15, name: 'Pancakes', price: 6.49, image: 'https://via.placeholder.com/50?text=Pancakes' }
];

// Array to hold cart items
let cart = [];

// Function to display menu items
function displayMenu() {
    const menuList = document.getElementById('menu-items');
    menuItems.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `<img src="${item.image}" alt="${item.name}">${item.name} - $${item.price.toFixed(2)} <button onclick="addToCart(${item.id})">Add to Cart</button>`;
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
