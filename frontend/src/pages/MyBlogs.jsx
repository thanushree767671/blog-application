import { useEffect, useState } from "react";

function MyBlogs() {
  const [posts, setPosts] = useState([]);

  const fetchMyBlogs = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      setPosts([]);
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/posts"
      );

      const data = await response.json();

      if (!response.ok) {
        console.error("Failed to fetch posts");
        return;
      }

      const myPosts = data.filter(
        (post) =>
          post.author &&
          String(post.author._id) === String(user.id)
      );

      setPosts(myPosts);
    } catch (error) {
      console.error("Error fetching my posts:", error);
    }
  };

  useEffect(() => {
    fetchMyBlogs();
  }, []);

  return (
    <div>
      <h2>My Blogs</h2>

      <button onClick={fetchMyBlogs}>
        Refresh My Blogs
      </button>

      <br />
      <br />

      {posts.length === 0 ? (
        <p>You have not created any blog posts yet.</p>
      ) : (
        posts.map((post) => (
          <div key={post._id}>
            <h3>{post.title}</h3>

            <p>{post.content}</p>

            <small>
              By: {post.author?.username || "User"}
            </small>

            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default MyBlogs;