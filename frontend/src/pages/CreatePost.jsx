import { useState } from "react";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleCreatePost = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      return;
    }

    if (!title.trim() || !content.trim()) {
      alert("Please fill all fields");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/posts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: title.trim(),
            content: content.trim(),
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Post created successfully!");
        setTitle("");
        setContent("");
      } else {
        alert(data.message || "Failed to create post");
      }
    } catch (error) {
      console.error(error);
      alert("Unable to connect to server");
    }
  };

  return (
    <div>
      <h2>Create Blog Post</h2>

      <form onSubmit={handleCreatePost}>
        <input
          type="text"
          placeholder="Post title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <br />
        <br />

        <textarea
          placeholder="Write your blog content..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="8"
          cols="40"
        />

        <br />
        <br />

        <button type="submit">
          Create Post
        </button>
      </form>
    </div>
  );
}

export default CreatePost;