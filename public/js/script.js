document.addEventListener("DOMContentLoaded", async () => {
    const postsContainer = document.getElementById("posts-container");
    try {
      const res = await fetch("/api/posts");
      const posts = await res.json();
  
      posts.forEach(post => {
        const postDiv = document.createElement("div");
        postDiv.innerHTML = `<h3>${post.title}</h3><p>${post.content}</p><small>By: ${post.author.username}</small>`;
        postsContainer.appendChild(postDiv);
      });
    } catch (error) {
      console.error("Error loading posts", error);
    }
  });
  