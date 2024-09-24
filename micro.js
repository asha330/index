let posts = [];

document.getElementById('postButton').addEventListener('click', () => {
    const content = document.getElementById('postContent').value;
    if (content) {
        const post = {
            id: Date.now(),
            content,
            likes: 0,
            dislikes: 0,
            comments: [],
            date: new Date().toLocaleString()
        };
        posts.push(post);
        document.getElementById('postContent').value = '';
        renderPosts();
    }
});

function renderPosts() {
    const postsContainer = document.getElementById('posts');
    postsContainer.innerHTML = '';
    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'post';
        postElement.innerHTML = `
            <p>${post.content}</p>
            <small>${post.date}</small>
            <div class="actions">
                <span class="emojis" onclick="likePost(${post.id})">👍 ${post.likes}</span>
                <span class="emojis" onclick="dislikePost(${post.id})">👎 ${post.dislikes}</span>
                <input type="text" id="commentInput${post.id}" placeholder="Add a comment..." />
                <button onclick="addComment(${post.id})">Comment</button>
            </div>
            <div class="comment-section" id="commentSection${post.id}"></div>
        `;
        postsContainer.appendChild(postElement);
    });
}

function likePost(postId) {
    const post = posts.find(p => p.id === postId);
    post.likes++;
    renderPosts();
}

function dislikePost(postId) {
    const post = posts.find(p => p.id === postId);
    post.dislikes++;
    renderPosts();
}

function addComment(postId) {
    const commentInput = document.getElementById(`commentInput${postId}`);
    const comment = commentInput.value;
    if (comment) {
        const post = posts.find(p => p.id === postId);
        post.comments.push(comment);
        commentInput.value = '';
        renderComments(postId);
    }
}

function renderComments(postId) {
    const post = posts.find(p => p.id === postId);
    const commentSection = document.getElementById(`commentSection${postId}`);
    commentSection.innerHTML = post.comments.map(comment => `<div class="comment">${comment}</div>`).join('');
}
