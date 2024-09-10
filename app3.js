const loginForm = document.getElementById('login-form'); 
const usernameInput = document.getElementById('username');
const loginButton = document.getElementById('login-btn');
const userDashboard = document.getElementById('user-dashboard');
const userUsername = document.getElementById('user-username'); 
const postContent = document.getElementById('post-content'); 
const postButton = document.getElementById('post-btn');
const postList = document.getElementById('post-list');
let currentUser = null;

// Event listener for login button 
loginButton.addEventListener('click', () => {
  const username = usernameInput.value.trim();
  if (username !== '') {
    currentUser = username; 
    loginForm.style.display = 'none'; 
    userDashboard.style.display = 'block'; 
    userUsername.textContent = username;
    loadPosts();
  }
});

// Event listener for post button 
postButton.addEventListener('click', () => {
  const content = postContent.value.trim();
  if (content !== '') {
    const post = {
      username: currentUser,
      content: content
    };
    savePost(post); 
    postContent.value = '';
    loadPosts();
  }
});

// Save post to local storage
function savePost(post) {
  let posts = JSON.parse(localStorage.getItem('posts')) || [];
  posts.push(post);
  localStorage.setItem('posts', JSON.stringify(posts));
}

// Load posts from local storage
function loadPosts() {
  postList.innerHTML = '';
  const posts = JSON.parse(localStorage.getItem('posts')) || [];
  posts.forEach(post => {
    const postItem = document.createElement('li');
    postItem.innerHTML = `<p><strong>${post.username}</strong>: ${post.content}</p>`;
    postList.appendChild(postItem);
  });
}

// Initial setup
if (localStorage.getItem('posts') === null) {
  localStorage.setItem('posts', JSON.stringify([]));
}






loginButton.addEventListener('click', () => {
  console.log('Login button clicked');
  const username = usernameInput.value.trim();
  if (username !== '') {
    currentUser = username; 
    loginForm.style.display = 'none'; 
    userDashboard.style.display = 'block'; 
    userUsername.textContent = username;
    loadPosts();
  }
});

postButton.addEventListener('click', () => {
  console.log('Post button clicked');
  const content = postContent.value.trim();
  if (content !== '') {
    const post = {
      username: currentUser,
      content: content
    };
    savePost(post); 
    postContent.value = '';
    loadPosts();
  }
});
