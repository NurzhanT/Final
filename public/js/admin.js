document.addEventListener("DOMContentLoaded", () => {
    checkAdminAccess();
    loadAllPostsForAdmin();
    document.getElementById("logout-btn").addEventListener("click", logout);
  });
  
  // ✅ Function to Check If User Is Admin
async function checkAdminAccess() {
    const token = localStorage.getItem("token");
  
    if (!token) {
      alert("You must be logged in.");
      window.location.href = "login.html";
      return;
    }
  
    try {
      const res = await fetch("/api/users/me", {
        method: "GET",
        headers: { "Authorization": `Bearer ${token}` }
      });
  
      const data = await res.json();
  
      if (res.ok && data.role === "admin") {
        document.getElementById("admin-content").style.display = "block";
      } else {
        document.getElementById("access-denied").style.display = "block";
      }
    } catch (error) {
      console.error("Error checking admin access:", error);
    }
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    checkAdminAccess();
    loadAllPostsForAdmin();
  });
  
  // ✅ Function to Load All Posts for Admin
  async function loadAllPostsForAdmin() {
    const res = await fetch("/api/posts");
    const posts = await res.json();
  
    const postsContainer = document.getElementById("posts-container");
    postsContainer.innerHTML = "";
  
    posts.forEach(post => {
      const postDiv = document.createElement("div");
      postDiv.classList.add("post");
      postDiv.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.content}</p>
        <small>By: ${post.author.username}</small>
        <button onclick="deletePostAdmin('${post._id}')">Delete Post</button>
  
        <div class="comments">
          <h4>Comments:</h4>
          <div id="comments-${post._id}"></div>
        </div>
      `;
  
      postsContainer.appendChild(postDiv);
      loadCommentsForAdmin(post._id);
    });
  }
  
  // ✅ Function to Load Comments for Admin
  async function loadCommentsForAdmin(postId) {
    const res = await fetch(`/api/posts/${postId}/comments`);
    const comments = await res.json();
  
    const commentsDiv = document.getElementById(`comments-${postId}`);
    commentsDiv.innerHTML = "";
  
    comments.forEach(comment => {
      const commentEl = document.createElement("p");
      commentEl.innerHTML = `${comment.user.username}: ${comment.text} 
        <button onclick="deleteComment('${postId}', '${comment._id}')">Delete</button>`;
      commentsDiv.appendChild(commentEl);
    });
  }
  
  // ✅ Function to Delete Any Post (Admin Only)
  async function deletePostAdmin(postId) {
    const token = localStorage.getItem("token");
  
    const res = await fetch(`/api/posts/${postId}`, {
      method: "DELETE",
      headers: { "Authorization": `Bearer ${token}` }
    });
  
    if (res.ok) {
      alert("Post deleted successfully!");
      loadAllPostsForAdmin();
    } else {
      alert("Error deleting post.");
    }
  }
  
  // ✅ Function to Delete Any Comment (Admin Only)
  async function deleteComment(postId, commentId) {
    const token = localStorage.getItem("token");
  
    const res = await fetch(`/api/posts/${postId}/comments/${commentId}`, {
      method: "DELETE",
      headers: { "Authorization": `Bearer ${token}` }
    });
  
    if (res.ok) {
      alert("Comment deleted successfully!");
      loadCommentsForAdmin(postId);
    } else {
      alert("Error deleting comment.");
    }
  }
  
  // ✅ Logout Function
  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    alert("Logged out!");
    window.location.href = "login.html";
  }
  