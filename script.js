function searchPost() {

    const numInput = document.getElementById('numInput');
    const postId = numInput.value;

    if (!postId || postId < 1 || postId > 100) {
        alert('Please enter a valid Post ID between 1 and 100.');
        return;
    }

    getPost(postId)
        .then(post => {
            const postContainer = document.getElementById('postContainer');
            postContainer.innerHTML = `<h3>Post ${post.id}</h3><p>${post.title}</p><p>${post.body}</p>`;

            const commentsBtn = document.getElementById('commentsBtn');
            commentsBtn.style.display = 'block';
        })
        .catch(error => {
            alert(`Error: ${error.message}`);
        });
}

function getPost(postId) {

    return fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
        .then(response => response.ok ? response.json() : reject(new Error('Post not found')))
        .catch(error => {
            reject(new Error('Failed to fetch post'));
        });
}

function getComments() {

    const numInput = document.getElementById('numInput');
    const postId = numInput.value;

    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
        .then(response => response.json())
        .then(comments => {
            const postContainer = document.getElementById('postContainer');
            postContainer.innerHTML += `<h4>Comments:</h4>`;
            comments.forEach(comment => {
                postContainer.innerHTML += `<p><strong>${comment.name}</strong>: ${comment.body}</p>`;
            });

            const commentsBtn = document.getElementById('commentsBtn');
            commentsBtn.style.display = 'none';
        })
        .catch(error => {
            alert(`Error: Failed to fetch comments`);
        });
}