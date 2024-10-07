const postForm = document.getElementById('post-form');
const postContent = document.getElementById('post-content');
const postsContainer = document.getElementById('posts-container');
const loginForm = document.getElementById('login-form');
const loginContainer = document.getElementById('login-container');
const postContainer = document.getElementById('post-container');

let posts = JSON.parse(localStorage.getItem('posts')) || [];
let currentUser = null; // Store the current logged-in user

// Function to display posts
function displayPosts() {
    postsContainer.innerHTML = '';
    posts.forEach((post, postIndex) => {
        const postElement = document.createElement('div');
        postElement.className = 'post';
        postElement.innerHTML = `
            <strong>${post.username}</strong> <br>
            <p>${post.content}</p>
            <p><small>${timeSince(new Date(post.date))} ago</small></p>
            <p>👍 Likes: ${post.likes} | 👎 Dislikes: ${post.dislikes}</p>
            <button class="like" onclick="likePost(${postIndex})">👍 Like</button>
            <⬤
