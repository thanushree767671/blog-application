import { useEffect, useState } from "react";

function Home() {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState({});
  const [search, setSearch] = useState("");

  // Fetch all posts
  const fetchPosts = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/posts"
      );

      const data = await response.json();

      if (!response.ok) {
        console.error("Failed to fetch posts:", data);
        return;
      }

      setPosts(data);

      data.forEach((post) => {
        fetchComments(post._id);
      });
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  // Fetch comments
  const fetchComments = async (postId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/comments/${postId}`
      );

      const data = await response.json();

      if (!response.ok) {
        return;
      }

      setComments((previous) => ({
        ...previous,
        [postId]: data,
      }));
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Add comment
  const handleAddComment = async (postId) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    if (!user || !token) {
      alert("Please login first");
      return;
    }

    const commentText = newComment[postId]?.trim();

    if (!commentText) {
      alert("Please enter a comment");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/comments",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            text: commentText,
            author: user.id,
            post: postId,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Comment added successfully!");

        setNewComment((previous) => ({
          ...previous,
          [postId]: "",
        }));

        fetchComments(postId);
      } else {
        alert(data.message || "Failed to add comment");
      }
    } catch (error) {
      console.error(error);
      alert("Unable to add comment");
    }
  };

  // Edit post
  const handleEdit = async (post) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      return;
    }

    const newTitle = window.prompt(
      "Enter new title:",
      post.title
    );

    if (newTitle === null) {
      return;
    }

    const newContent = window.prompt(
      "Enter new content:",
      post.content
    );

    if (newContent === null) {
      return;
    }

    if (!newTitle.trim() || !newContent.trim()) {
      alert("Title and content cannot be empty");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/posts/${post._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: newTitle.trim(),
            content: newContent.trim(),
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Post updated successfully!");
        fetchPosts();
      } else {
        alert(data.message || "Failed to update post");
      }
    } catch (error) {
      console.error(error);
      alert("Unable to update post");
    }
  };

  // Delete post
  const handleDelete = async (postId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/posts/${postId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Post deleted successfully!");
        fetchPosts();
      } else {
        alert(data.message || "Failed to delete post");
      }
    } catch (error) {
      console.error(error);
      alert("Unable to delete post");
    }
  };

  // Search posts
  const filteredPosts = posts.filter((post) => {
    const searchText = search.toLowerCase().trim();

    return (
      post.title.toLowerCase().includes(searchText) ||
      post.content.toLowerCase().includes(searchText)
    );
  });

  return (
    <div>
      <h2>Blog Posts</h2>

      {/* Search */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search blog posts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "300px",
            padding: "10px",
            marginRight: "10px",
            border: "2px solid #333",
            borderRadius: "5px",
            fontSize: "16px",
          }}
        />

        <button onClick={fetchPosts}>
          Refresh Posts
        </button>
      </div>

      <hr />

      {/* Posts */}
      {filteredPosts.length === 0 ? (
        <p>
          {search.trim()
            ? "No matching blog posts found."
            : "No blog posts available."}
        </p>
      ) : (
        filteredPosts.map((post) => (
          <div key={post._id}>
            <h3>{post.title}</h3>

            <p>{post.content}</p>

            {post.author && (
              <small>
                By: {post.author.username}
              </small>
            )}

            <br />
            <br />

            <button onClick={() => handleEdit(post)}>
              Edit
            </button>

            {" "}

            <button onClick={() => handleDelete(post._id)}>
              Delete
            </button>

            <h4>Comments</h4>

            {comments[post._id]?.length > 0 ? (
              comments[post._id].map((comment) => (
                <div key={comment._id}>
                  <strong>
                    {comment.author?.username || "User"}:
                  </strong>{" "}
                  {comment.text}
                </div>
              ))
            ) : (
              <p>No comments yet.</p>
            )}

            <br />

            <input
              type="text"
              placeholder="Write a comment..."
              value={newComment[post._id] || ""}
              onChange={(e) =>
                setNewComment((previous) => ({
                  ...previous,
                  [post._id]: e.target.value,
                }))
              }
            />

            {" "}

            <button
              onClick={() => handleAddComment(post._id)}
            >
              Add Comment
            </button>

            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default Home;