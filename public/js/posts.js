document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("posts-container")) {
      loadAllPosts();
    }
    if (document.getElementById("user-posts")) {
      loadUserPosts();
    }
    if (document.getElementById("post-form")) {
      document.getElementById("post-form").addEventListener("submit", async (e) => {
        e.preventDefault();
        createPost();
      });
    }
  });
  
  // ✅ Function to Load All Posts with Comments
  async function loadAllPosts() {
    const res = await fetch("/api/posts");
    const posts = await res.json();
  
    const postsContainer = document.getElementById("posts-container");
    if (!postsContainer) return; // Prevent error if element is missing
    postsContainer.innerHTML = "";
  
    posts.forEach(post => {
      const postDiv = document.createElement("div");
      postDiv.classList.add("post");
      postDiv.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.content}</p>
        <small>By: ${post.author.username}</small>
        
        <div class="comments">
          <h4>Comments:</h4>
          <div id="comments-${post._id}"></div>
          <input type="text" id="comment-input-${post._id}" placeholder="Write a comment">
          <button onclick="addComment('${post._id}')">Comment</button>
        </div>
      `;
  
      postsContainer.appendChild(postDiv);
      loadComments(post._id);
    });
  }

  // ✅ Function to Create a Post
async function createPost() {
    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;
    const token = localStorage.getItem("token");
  
    if (!token) {
      alert("You must be logged in to create a post.");
      window.location.href = "login.html";
      return;
    }
  
    const res = await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ title, content })
    });
  
    const data = await res.json();
    if (res.ok) {
      alert("Post created successfully!");
      document.getElementById("post-form").reset();
      loadUserPosts(); // ✅ Refresh user's posts after creating
    } else {
      alert(`Error creating post: ${data.message}`);
    }
  }
  
  // ✅ Function to Load Comments for a Post
  async function loadComments(postId) {
    const res = await fetch(`/api/posts/${postId}/comments`);
    const comments = await res.json();
  
    const commentsDiv = document.getElementById(`comments-${postId}`);
    if (!commentsDiv) return; // Prevent error if element is missing
    commentsDiv.innerHTML = "";
  
    comments.forEach(comment => {
      const commentEl = document.createElement("p");
      commentEl.textContent = `${comment.user.username}: ${comment.text}`;
      commentsDiv.appendChild(commentEl);
    });
  }
  

// ✅ Function to Load Only the Logged-in User's Posts (with Comments)
async function loadUserPosts() {
    const token = localStorage.getItem("token");
  
    if (!token) {
      alert("You must be logged in.");
      window.location.href = "login.html";
      return;
    }
  
    const res = await fetch("/api/posts/user", {
      method: "GET",
      headers: { "Authorization": `Bearer ${token}` }
    });
  
    const postsContainer = document.getElementById("user-posts");
    if (!postsContainer) return;
    const posts = await res.json();
    postsContainer.innerHTML = "";
  
    posts.forEach(post => {
      const postDiv = document.createElement("div");
      postDiv.classList.add("post");
      postDiv.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.content}</p>
        <button onclick="deletePost('${post._id}')">Delete</button>
  
        <div class="comments">
          <h4>Comments:</h4>
          <div id="comments-${post._id}"></div>
          <input type="text" id="comment-input-${post._id}" placeholder="Write a comment">
          <button onclick="addComment('${post._id}')">Comment</button>
        </div>
      `;
  
      postsContainer.appendChild(postDiv);
      loadComments(post._id);
    });
  }
  
  // ✅ Function to Add a Comment
  async function addComment(postId) {
    const text = document.getElementById(`comment-input-${postId}`).value;
    const token = localStorage.getItem("token");
  
    if (!text) return alert("Comment cannot be empty.");
    if (!token) return alert("You must be logged in to comment.");
  
    const res = await fetch(`/api/posts/${postId}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ text })
    });
  
    if (res.ok) {
      loadComments(postId);
      document.getElementById(`comment-input-${postId}`).value = "";
    } else {
      alert("Error adding comment.");
    }
  }

  // ✅ Function to Delete a Post (Admins Can Delete Any, Users Can Delete Their Own)
async function deletePost(postId) {
    const token = localStorage.getItem("token");
  
    if (!token) {
      alert("You must be logged in.");
      window.location.href = "login.html";
      return;
    }
  
    const res = await fetch(`/api/posts/${postId}`, {
      method: "DELETE",
      headers: { "Authorization": `Bearer ${token}` }
    });
  
    const data = await res.json();
    if (res.ok) {
      alert("Post deleted successfully!");
      if (window.location.pathname.includes("admin.html")) {
        loadAllPostsForAdmin();
      } else {
        loadUserPosts();
      }
    } else {
      alert(`Error: ${data.message}`);
    }
  }
  
  