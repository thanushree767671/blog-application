import { useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import MyBlogs from "./pages/MyBlogs";

function App() {
  const [loggedIn, setLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setLoggedIn(false);
    alert("Logged out successfully!");
  };

  return (
    <div>
      <h1>My Blog Application</h1>

      <nav>
        <button onClick={() => window.scrollTo(0, 0)}>
          Home
        </button>

        <button
          onClick={() =>
            document
              .getElementById("register")
              ?.scrollIntoView()
          }
        >
          Register
        </button>

        <button
          onClick={() =>
            document
              .getElementById("login")
              ?.scrollIntoView()
          }
        >
          Login
        </button>

        <button
          onClick={() =>
            document
              .getElementById("create-post")
              ?.scrollIntoView()
          }
        >
          Create Post
        </button>

        {loggedIn && (
          <>
            <button
              onClick={() =>
                document
                  .getElementById("my-blogs")
                  ?.scrollIntoView()
              }
            >
              My Blogs
            </button>

            <button onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </nav>

      <hr />

      <section id="register">
        <Register />
      </section>

      <hr />

      <section id="login">
        <Login />
      </section>

      <hr />

      <section id="create-post">
        <CreatePost />
      </section>

      <hr />

      <section id="my-blogs">
        <MyBlogs />
      </section>

      <hr />

      <Home />
    </div>
  );
}

export default App;