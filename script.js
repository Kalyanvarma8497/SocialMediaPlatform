let posts = JSON.parse(localStorage.getItem("posts")) || [];

displayPosts();

function createPost() {

    let postInput = document.getElementById("postInput");

    let text = postInput.value;

    if (text.trim() === "") {
        alert("Enter a post!");
        return;
    }

    let newPost = {
        text: text,
        likes: 0,
        comments: []
    };

    posts.push(newPost);

    localStorage.setItem("posts", JSON.stringify(posts));

    postInput.value = "";

    displayPosts();
}

function displayPosts() {

    let postsDiv = document.getElementById("posts");

    postsDiv.innerHTML = "";

    for (let i = 0; i < posts.length; i++) {

        let postDiv = document.createElement("div");

        postDiv.style.border = "1px solid gray";
        postDiv.style.padding = "10px";
        postDiv.style.margin = "10px 0";

        let commentsHTML = "";

        for (let j = 0; j < posts[i].comments.length; j++) {
            commentsHTML += `<p>💬 ${posts[i].comments[j]}</p>`;
        }

        postDiv.innerHTML = `
            <p>${posts[i].text}</p>

            <button onclick="likePost(${i})">
                ❤️ Like
            </button>

            ${posts[i].likes} Likes

            <br><br>

            <input type="text"
                   id="comment${i}"
                   placeholder="Write Comment">

            <button onclick="addComment(${i})">
                Comment
            </button>

            <div>
                ${commentsHTML}
            </div>
        `;

        postsDiv.appendChild(postDiv);
    }
}

function likePost(index) {

    posts[index].likes++;

    localStorage.setItem("posts", JSON.stringify(posts));

    displayPosts();
}

function addComment(index) {

    let commentBox =
        document.getElementById("comment" + index);

    let comment = commentBox.value;

    if (comment.trim() === "") {
        return;
    }

    posts[index].comments.push(comment);

    localStorage.setItem("posts", JSON.stringify(posts));

    displayPosts();
}