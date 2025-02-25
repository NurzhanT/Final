# 📌 Reddit Clone - Node.js, Express, MongoDB

A simple Reddit-like web app where users can create, edit, delete, and comment on posts.  
Includes authentication, user roles (admin, regular user), and an admin panel to manage posts and comments.

---

## 🚀 Features

### 🔹 User Features
✅ Register & Login (JWT Authentication)  
✅ Create, edit, and delete own posts  
✅ View all users' posts  
✅ Search posts by username  
✅ Comment on posts  

### 🔹 Admin Features
✅ Access to admin panel (admin.html)  
✅ Delete any user's post  
✅ Delete any user's comment  
✅ Restrict non-admin users from accessing the admin panel  

### 🔹 Security Features
✅ Passwords are hashed (bcrypt.js)  
✅ JWT-based authentication  
✅ Role-based access control (RBAC)  

---

## 🏗 Tech Stack

- Backend: Node.js, Express.js  
- Database: MongoDB (Mongoose ODM)  
- Authentication: JWT (JSON Web Token)  
- Frontend: HTML, CSS, JavaScript  

---

## 📂 Project Structure

/reddit-clone │── /public │ │── /css │ │ │── styles.css │ │── /js │ │ │── auth.js │ │ │── posts.js │ │ │── admin.js │ │── index.html │ │── profile.html │ │── admin.html │ │── login.html │ │── register.html │── /routes │ │── userRoutes.js │ │── postRoutes.js │── /controllers │ │── userController.js │ │── postController.js │── /models │ │── User.js │ │── Post.js │── /middleware │ │── auth_middleware.js │ │── validate.js │── server.js │── .env │── README.md │── package.json



---

## 📦 Installation & Setup

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/NurzhanT/reddit-clone.git
cd reddit-clone
2️⃣ Install Dependencies

npm install
3️⃣ Set Up Environment Variables
Create a .env file and add the following:


MONGO_URI=mongodb://localhost:27017/reddit-clone
JWT_SECRET=your_jwt_secret
4️⃣ Start the Server

node server.js
The app will run at http://localhost:5000.

🔑 API Endpoints
🟢 Authentication
Method  Endpoint  Description
POST  /api/users/register  Register a new user
POST  /api/users/login  User login (returns JWT)
GET  /api/users/me  Get logged-in user profile
📝 Posts
Method  Endpoint  Description
POST  /api/posts  Create a new post
GET  /api/posts  Get all posts
GET  /api/posts/user/:username  Get posts by username
PUT  /api/posts/:id  Update a post (only owner)
DELETE  /api/posts/:id  Delete a post (owner or admin)
💬 Comments
Method  Endpoint  Description
POST  /api/posts/:id/comments  Add a comment to a post
GET  /api/posts/:id/comments  Get comments for a post
DELETE  /api/posts/:id/comments/:commentId  Delete a comment (admin only)
🛠 Admin Panel (admin.html)
Only admins can access (checkAdminAccess() in admin.js).
Admins can delete any post or comment.
If a non-admin visits, they see an "Access Denied" message.
👤 User Roles
Role  Permissions
Admin  Can delete any post & comment
User  Can only delete own posts
⚡️ How It Works
1️⃣ User registers and logs in.
2️⃣ Users can create, edit, and delete their own posts.
3️⃣ Users can comment on posts.
4️⃣ Admins can delete any post or comment.
5️⃣ Only admins can access admin.html.

🎯 To-Do / Future Improvements
✅ Implement likes & dislikes on posts.
✅ Improve UI with a better design.
✅ Deploy the project online (e.g., Vercel, Render).
💡 Contributing
Want to contribute? Feel free to open a pull request or an issue on GitHub.

📜 License
This project is open-source under the MIT License.

🚀 Now your project is fully documented!
Just copy and paste this into your README.md file. Let me know if you need any changes! 🔥🔥🔥



---

### ✅ Final README Features
✔️ Project Overview  
✔️ Features (Users, Admins, Security)  
✔️ Tech Stack & Project Structure  
✔️ Installation Guide  
✔️ API Endpoints Table  
✔️ Admin Panel & Role-Based Access  
✔️ How the Project Works  
✔️ To-Do List (Future Improvements)
