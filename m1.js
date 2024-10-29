const postForm = document.getElementById('post-form');
const postContent = document.getElementById('post-content');
const postsContainer = document.getElementById('posts-container');
const loginForm = document.getElementById('login-form');
const loginContainer = document.getElementById('login-container');
const postContainer = document.getElementById('post-container');
const errorDisplay = document.getElementById('error-display');
const logoutButton = document.getElementById('logout-button');

let posts = [];
let currentUser = null;

// Load posts from localStorage
try {
    posts = JSON.parse(localStorage.getItem('posts')) || [];
} catch (e) {
    console.error('Error reading posts from localStorage', e);
    posts = [];
}

// Function to display posts
function displayPosts() {
    postsContainer.innerHTML = '';
    if (posts.length === 0) {
        postsContainer.innerHTML = '<p>No posts to display.</p>';
        return;
    }
    posts.forEach((post, postIndex) => {
        const postElement = document.createElement('div');
        postElement.className = 'post';
        postElement.innerHTML = `
            <strong>Posted by: ${post.username}</strong>
            <p>${post.content}</p>
            <p><small>${post.date}</small></p>
            <p>👍 Likes: ${post.likes} | 👎 Dislikes: ${post.dislikes}</p>
            <button class="like" onclick="likePost(${postIndex})">👍 Like</button>
            <button class="dislike" onclick="dislikePost(${postIndex})">👎 Dislike</button>
            <input type="text" class="comment-input" id="comment-input-${postIndex}" placeholder="Add a comment">
            <button onclick="addComment(${postIndex})">💬 Comment</button>
            <div>
                <strong>Comments:</strong>
                <ul>
                    ${post.comments.map((comment, commentIndex) => `
                        <li>
                            ${comment.text} 
                            <br> 👍 ${comment.likes} 👎 ${comment.dislikes}
                            <button onclick="likeComment(${postIndex}, ${commentIndex})">👍 Like</button>
                            <button onclick="dislikeComment(${postIndex}, ${commentIndex})">👎 Dislike</button>
                        </li>
                    `).join('')}
                </ul>
            </div>
        `;
        postsContainer.appendChild(postElement);
    });
}

// Show error message
function showError(message) {
    errorDisplay.textContent = message;
    errorDisplay.style.display = 'block';
}

// Clear error messages
function clearError() {
    errorDisplay.style.display = 'none';
}

// Handle login
loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    clearError();
    const username = document.getElementById('username').value.trim();

    if (username && username.length >= 3) {
        currentUser = username;
        alert(`Login successful! Welcome, ${username}!`);
        loginContainer.style.display = 'none';
        postContainer.style.display = 'block';
        logoutButton.style.display = 'block';
    } else {
        showError('Please enter a valid username (at least 3 characters).');
    }
});

// Handle logout
logoutButton.addEventListener('click', () => {
    currentUser = null;
    loginContainer.style.display = 'block';
    postContainer.style.display = 'none';
    logoutButton.style.display = 'none';
    posts = []; // Clear posts if desired
    savePosts();
    displayPosts(); // Clear displayed posts
});

// Function to handle post submission
postForm.addEventListener('submit', (event) => {
    event.preventDefault();
    clearError();
    const content = postContent.value.trim();

    if (content === '') {
        showError('Post content cannot be empty.');
        return;
    }

    const newPost = {
        username: currentUser,
        content: content,
        likes: 0,
        dislikes: 0,
        comments: [],
        date: new Date().toLocaleString()
    };

    posts.push(newPost);
    postContent.value = '';
    savePosts();
    displayPosts();
});

// Function to like a post
function likePost(index) {
    posts[index].likes++;
    savePosts();
    displayPosts();
}

// Function to dislike a post
function dislikePost(index) {
    posts[index].dislikes++;
    savePosts();
    displayPosts();
}

// Function to add a comment
function addComment(index) {
    const commentInput = document.getElementById(`comment-input-${index}`);
    const comment = commentInput.value.trim();

    if (comment === '') {
        showError('Comment cannot be empty.');
        return;
    }

    const newComment = {
        text: comment,
        likes: 0,
        dislikes: 0
    };

    posts[index].comments.push(newComment);
    commentInput.value = '';
    savePosts();
    displayPosts();
}

// Function to like a comment
function likeComment(postIndex, commentIndex) {
    posts[postIndex].comments[commentIndex].likes++;
    savePosts();
    displayPosts();
}

// Function to dislike a comment
function dislikeComment(postIndex, commentIndex) {
    posts[postIndex].comments[commentIndex].dislikes++;
    savePosts();
    displayPosts();
}

// Save posts to localStorage
function savePosts() {
    localStorage.setItem('posts', JSON.stringify(posts));
}

// Initial display of posts
displayPosts();
