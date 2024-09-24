document.addEventListener('DOMContentLoaded', function () {
    const postBtn = document.getElementById('postBtn');
    const postContent = document.getElementById('postContent');
    const feed = document.getElementById('feed');

    // Load posts from local storage or initialize an empty array
    let posts = JSON.parse(localStorage.getItem('posts')) || [];

    // Available Emojis (50+ emojis)
    const emojis = [
        '😊', '😂', '😍', '😎', '🤔', '😢', '👍', '❤️', '🔥', '🎉', '😃', '😜', '🤩', '🥳', '😡', '🤯', '😇', '🤗', '😴', 
        '💪', '😱', '🙌', '🙏', '🎶', '😈', '😤', '👀', '👊', '💥', '👏', '😷', '💔', '💋', '💯', '✨', '🥰', '🤞', '🤤', 
        '😆', '😐', '😬', '😵', '😓', '😩', '🤮', '🤡', '👻', '💀', '🤖', '😺', '🙈', '🐶', '🐱', '🐻', '🦄', '🐼'
    ];

    // Handle posting new content
    postBtn.addEventListener('click', () => {
        const content = postContent.value.trim();
        if (content === '') {
            alert('Post content cannot be empty!');
            return;
        }

        const currentTime = new Date();
        const post = {
            content,
            time: `${currentTime.toLocaleDateString()} ${currentTime.toLocaleTimeString()}`,
            comments: [],
            likes: 0,
            dislikes: 0
        };

        posts.push(post);
        postContent.value = ''; // Clear input
        savePosts();
        renderFeed();
    });

    // Save posts to local storage
    function savePosts() {
        localStorage.setItem('posts', JSON.stringify(posts));
    }

    // Render all posts in the feed
    function renderFeed() {
        feed.innerHTML = ''; // Clear the feed

        posts.forEach((post, index) => {
            const postDiv = document.createElement('div');
            postDiv.classList.add('post');

            const postTime = document.createElement('div');
            postTime.classList.add('post-time');
            postTime.textContent = `Posted on: ${post.time}`;

            const postContent = document.createElement('p');
            postContent.textContent = post.content;

            const likeBtn = document.createElement('button');
            likeBtn.textContent = `👍 ${post.likes}`;
            likeBtn.addEventListener('click', () => {
                post.likes++;
                savePosts();
                renderFeed(); // Re-render to update like count
            });

            const dislikeBtn = document.createElement('button');
            dislikeBtn.textContent = `👎 ${post.dislikes}`;
            dislikeBtn.addEventListener('click', () => {
                post.dislikes++;
                savePosts();
                renderFeed(); // Re-render to update dislike count
            });

            const commentSection = createCommentSection(index);

            postDiv.appendChild(postContent);
            postDiv.appendChild(postTime);
            postDiv.appendChild(likeBtn);
            postDiv.appendChild(dislikeBtn);
            postDiv.appendChild(commentSection);
            feed.appendChild(postDiv);
        });
    }

    // Create comment section for each post
    function createCommentSection(postIndex) {
        const commentSection = document.createElement('div');
        commentSection.classList.add('comments-section');

        const commentCount = document.createElement('div');
        commentCount.textContent = `Comments: ${posts[postIndex].comments.length}`;

        const commentInput = document.createElement('input');
        commentInput.placeholder = 'Add a comment...';

        const commentBtn = document.createElement('button');
        commentBtn.textContent = 'Comment';

        // Emoji container
        const emojiContainer = document.createElement('div');
        emojiContainer.classList.add('emoji-container');

        // Add emoji buttons
        emojis.forEach(emoji => {
            const emojiBtn = document.createElement('button');
            emojiBtn.classList.add('emoji-btn');
            emojiBtn.textContent = emoji;

            emojiBtn.addEventListener('click', () => {
                commentInput.value += emoji; // Add emoji to comment input
            });

            emojiContainer.appendChild(emojiBtn);
        });

        commentBtn.addEventListener('click', () => {
            const commentText = commentInput.value.trim();
            if (commentText === '') {
                alert('Comment cannot be empty!');
                return;
            }
            posts[postIndex].comments.push(commentText);
            savePosts(); // Save posts after adding a comment
            renderFeed();
        });

        commentSection.appendChild(commentCount);
        commentSection.appendChild(commentInput);
        commentSection.appendChild(commentBtn);
        commentSection.appendChild(emojiContainer); // Append emoji container

        // Display comments
        posts[postIndex].comments.forEach(comment => {
            const commentDiv = document.createElement('div');
            commentDiv.classList.add('comment');
            commentDiv.textContent = comment;
            commentSection.appendChild(commentDiv);
        });

        return commentSection;
    }

    // Initial render of the feed
    renderFeed();
});
