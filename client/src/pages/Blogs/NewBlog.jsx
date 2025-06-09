import { useState } from 'react';
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';

export default function NewBlog() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [blogCategory, setBlogCategory] = useState('');
  const navigate = useNavigate();
    
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/blogs`, {
        title,
        content,
        blogCategory,
      },
      {
        withCredentials: true
        }
      );
        alert('Blog created successfully!');
        // redirect or clear form here
        navigate(`/blogs/${res.data._id}`);
    } catch (error) {
      alert('Failed to create blog');
      console.log("You are not logged in",error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create New Blog</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Category"
        value={blogCategory}
        onChange={(e) => setBlogCategory(e.target.value)}
      />
      <button type="submit">Create Blog</button>
    </form>
  );
}