const postForm = document.getElementById('post-form');
const postContent = document.getElementById('post-content');
const postsContainer = document.getElementById('posts-container');
const loginForm = document.getElementById('login-form');
const loginContainer = document.getElementById('login-container');
const postContainer = document.getElementById('post-container');

let posts = JSON.parse(localStorage.getItem('posts')) || [];

// Function to display posts
function displayPosts() {
    postsContainer.innerHTML = '';
    posts.forEach((post, index) => {
        const postElement = document.createElement('div');
        postElement.className = 'post';
        postElement.innerHTML = `
            <p>${post.content}</p>
            <p><small>${post.date}</small></p>
            <p>👍 Likes: ${post.likes} | 👎 Dislikes: ${post.dislikes}</p>
            <button class="like" onclick="likePost(${index})">👍 Like</button>
            <button class="dislike" onclick="dislikePost(${index})">👎 Dislike</button>
            <input type="text" class="comment-input" id="comment-input-${index}" placeholder="Add a comment with emojis">
            <button onclick="addComment(${index})">💬 Comment</button>
            <div>
                <strong>Comments:</strong>
                <ul>${post.comments.map(comment => `<li>${comment}</li>`).join('')}</ul>
            </div>
        `;
        postsContainer.appendChild(postElement);
    });
}

// Handle login
loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const username = document.getElementById('username').value;

    // Simple check for username (replace with real authentication if needed)
    if (username) {
        alert(`Login successful! Welcome, ${username}!`);
        loginContainer.style.display = 'none';
        postContainer.style.display = 'block'; // Show post container
    } else {
        alert('Please enter a username.');
    }
});

// Function to handle post submission
postForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const content = postContent.value;
    const newPost = {
        content: content,
        likes: 0,
        dislikes: 0,
        comments: [],
        date: new Date().toLocaleString() // Store current date and time
    };
    posts.push(newPost);
    postContent.value = '';
    savePosts(); // Save posts in localStorage
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
    const comment = commentInput.value;
    if (comment) {
        posts[index].comments.push(comment + ' 😊');
        commentInput.value = '';
        savePosts();
        displayPosts();
    }
}

// Save posts to localStorage
function savePosts() {
    localStorage.setItem('posts', JSON.stringify(posts));
}

// Initial display of posts
displayPosts();
