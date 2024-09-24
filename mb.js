document.addEventListener('DOMContentLoaded', function () {
    const postBtn = document.getElementById('postBtn');
    const postContent = document.getElementById('postContent');
    const feed = document.getElementById('feed');

    // Store posts
    let posts = [];

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
        };

        posts.push(post);
        postContent.value = ''; // Clear input
        renderFeed();
    });

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

            const commentSection = createCommentSection(index);

            postDiv.appendChild(postContent);
            postDiv.appendChild(postTime);
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

        const emojiBtn = document.createElement('button');
        emojiBtn.classList.add('emoji-btn');
        emojiBtn.textContent = '😊'; // Add emoji button

        commentBtn.addEventListener('click', () => {
            const commentText = commentInput.value.trim();
            if (commentText === '') {
                alert('Comment cannot be empty!');
                return;
            }
            posts[postIndex].comments.push(commentText);
            renderFeed();
        });

        emojiBtn.addEventListener('click', () => {
            commentInput.value += '😊'; // Add emoji to comment input
        });

        commentSection.appendChild(commentCount);
        commentSection.appendChild(commentInput);
        commentSection.appendChild(commentBtn);
        commentSection.appendChild(emojiBtn);

        // Display comments
        posts[postIndex].comments.forEach(comment => {
            const commentDiv = document.createElement('div');
            commentDiv.classList.add('comment');
            commentDiv.textContent = comment;
            commentSection.appendChild(commentDiv);
        });

        return commentSection;
    }
});
