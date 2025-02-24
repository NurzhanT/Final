async function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
  
    const res = await fetch("/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
  
    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("token", data.token);
      window.location.href = "index.html";
    } else {
      alert(data.message);
    }
  }
  
  async function register() {
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
  
    const res = await fetch("/api/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });
  
    const data = await res.json();
    if (res.ok) {
      window.location.href = "login.html";
    } else {
      alert(data.message);
    }
  }

  // ✅ Function to Fetch User Role from Backend
async function fetchUserRole(token) {
    try {
      const res = await fetch("/api/users/me", {
        method: "GET",
        headers: { "Authorization": `Bearer ${token}` }
      });
  
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("role", data.role);
      }
    } catch (error) {
      console.error("Error fetching user role:", error);
    }
  }
  