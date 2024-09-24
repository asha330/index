document.addEventListener('DOMContentLoaded', () => {
    const postForm = document.getElementById('postForm');
    const postContent = document.getElementById('postContent');
    const postImage = document.getElementById('postImage');
    const postsContainer = document.getElementById('postsContainer');

    // Load posts from localStorage on page load
    loadPosts();

    postForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const content = postContent.value.trim();
        const imageFile = postImage.files[0];

        if (content || imageFile) {
            const post = {
                id: Date.now(),
                content: content,
                image: imageFile ? URL.createObjectURL(imageFile) : null,
                likeCount: 0,
                dislikeCount: 0,
                comments: []
            };

            // Add post to localStorage
            addPostToStorage(post);
            renderPost(post);

            // Clear form fields
            postContent.value = '';
            postImage.value = '';
        }
    });

    function loadPosts() {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        posts.forEach(post => {
            renderPost(post);
        });
    }

    function addPostToStorage(post) {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        posts.push(post);
        localStorage.setItem('posts', JSON.stringify(posts));
    }

    function renderPost(post) {
        const postDiv = document.createElement('div');
        postDiv.classList.add('post');

        // Add timestamp
        const timestamp = document.createElement('div');
        timestamp.classList.add('timestamp');
        timestamp.textContent = new Date(post.id).toLocaleString();
        postDiv.appendChild(timestamp);

        // Add post content
        const textPara = document.createElement('p');
        textPara.textContent = post.content;
        postDiv.appendChild(textPara);

        // Add image if available
        if (post.image) {
            const img = document.createElement('img');
            img.src = post.image;
            postDiv.appendChild(img);
        }

        // Render like/dislike section
        addLikeDislikeSection(postDiv, post);

        // Render comment section
        addCommentSection(postDiv, post);

        // Render existing comments
        post.comments.forEach(comment => {
            renderComment(comment, postDiv);
        });

        postsContainer.appendChild(postDiv);
    }

    function addLikeDislikeSection(postDiv, post) {
        const likeSection = document.createElement('div');
        likeSection.classList.add('like-section');

        // Add like button
        const likeButton = document.createElement('button');
        likeButton.classList.add('like-button');
        likeButton.innerHTML = '&#10084;'; // Heart symbol

        // Add like count display
        const likeCountDisplay = document.createElement('span');
        likeCountDisplay.textContent = ` Likes: ${post.likeCount}`;
        likeSection.appendChild(likeCountDisplay);

        likeButton.addEventListener('click', () => {
            post.likeCount++;
            likeCountDisplay.textContent = ` Likes: ${post.likeCount}`;
            updatePostInStorage(post);
        });
        likeSection.appendChild(likeButton);

        // Add dislike button
        const dislikeButton = document.createElement('button');
        dislikeButton.classList.add('dislike-button');
        dislikeButton.innerHTML = '&#10060;'; // Cross mark symbol

        // Add dislike count display
        const dislikeCountDisplay = document.createElement('span');
        dislikeCountDisplay.textContent = ` Dislikes: ${post.dislikeCount}`;
        likeSection.appendChild(dislikeCountDisplay);

        dislikeButton.addEventListener('click', () => {
            post.dislikeCount++;
            dislikeCountDisplay.textContent = ` Dislikes: ${post.dislikeCount}`;
            updatePostInStorage(post);
        });
        likeSection.appendChild(dislikeButton);

        postDiv.appendChild(likeSection);
    }

    function addCommentSection(postDiv, post) {
        const commentSection = document.createElement('div');
        commentSection.classList.add('comment-section');

        // Comment count display
        const commentCountDisplay = document.createElement('span');
        commentCountDisplay.textContent = ` Comments: ${post.comments.length}`;
        commentSection.appendChild(commentCountDisplay);

        // Comment input
        const commentInput = document.createElement('input');
        commentInput.type = 'text';
        commentInput.placeholder = 'Add a comment...';
        commentSection.appendChild(commentInput);

        // Emotions dropdown
        const emotionsSelect = document.createElement('select');
        const emotions = ['😊', '😢', '😡', '❤️', '😂'];
        emotions.forEach(emotion => {
            const option = document.createElement('option');
            option.value = emotion;
            option.textContent = emotion;
            emotionsSelect.appendChild(option);
        });
        commentSection.appendChild(emotionsSelect);

        // Comment button
        const commentButton = document.createElement('button');
        commentButton.textContent = 'Comment';
        commentSection.appendChild(commentButton);

        commentButton.addEventListener('click', () => {
            const commentText = commentInput.value.trim();
            const selectedEmotion = emotionsSelect.value;

            if (commentText) {
                const comment = {
                    text: commentText,
                    emotion: selectedEmotion,
                    likeCount: 0,
                    dislikeCount: 0
                };

                // Add comment to post and localStorage
                post.comments.push(comment);
                commentCountDisplay.textContent = ` Comments: ${post.comments.length}`;
                updatePostInStorage(post);
                renderComment(comment, postDiv);

                // Clear the input
                commentInput.value = '';
            }
        });

        postDiv.appendChild(commentSection);
    }

    function updatePostInStorage(post) {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        const updatedPosts = posts.map(p => p.id === post.id ? post : p);
        localStorage.setItem('posts', JSON.stringify(updatedPosts));
    }

    function renderComment(comment, postDiv) {
        const commentDisplay = document.createElement('div');
        commentDisplay.classList.add('comment-display');
        commentDisplay.textContent = ${comment.emotion} ${comment.text};

        // Like/Dislike section for the comment
        const likeSection = document.createElement('div');
        likeSection.classList.add('like-section');

        const likeCountDisplay = document.createElement('span');
        likeCountDisplay.textContent = ` Likes: ${comment.likeCount}`;
        likeSection.appendChild(likeCountDisplay);

        const likeButton = document.createElement('button');
        likeButton.classList.add('like-button');
        likeButton.innerHTML = '&#10084;'; // Heart symbol
        likeButton.addEventListener('click', () => {
            comment.likeCount++;
            likeCountDisplay.textContent = ` Likes: ${comment.likeCount}`;
        });
        likeSection.appendChild(likeButton);

        const dislikeCountDisplay = document.createElement('span');
        dislikeCountDisplay.textContent = ` Dislikes: ${comment.dislikeCount}`;
        likeSection.appendChild(dislikeCountDisplay);

        const dislikeButton = document.createElement('button');
        dislikeButton.classList.add('dislike-button');
        dislikeButton.innerHTML = '&#10060;'; // Cross mark symbol
        dislikeButton.addEventListener('click', () => {
            comment.dislikeCount++;
            dislikeCountDisplay.textContent = ` Dislikes: ${comment.dislikeCount}`;
        });
        likeSection.appendChild(dislikeButton);

        commentDisplay.appendChild(likeSection);
        postDiv.appendChild(commentDisplay);
    }
});