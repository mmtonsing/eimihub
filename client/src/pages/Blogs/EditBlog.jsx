import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // get blog id from url and redirect
import axios from '../../api/axios';

export default function EditBlog() {
  const { id } = useParams(); // blog id from URL
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [blogCategory, setBlogCategory] = useState('');

  // Fetch blog data on mount to pre-fill the form
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/blogs/${id}`)
      .then(res => {
        setTitle(res.data.title);
        setContent(res.data.content);
        setBlogCategory(res.data.blogCategory || '');
      })
      .catch(err => console.error('Failed to fetch blog:', err));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/blogs/${id}`, {
        title,
        content,
        blogCategory,
      });
      alert('Blog updated successfully!');
      navigate(`/blogs/${id}`); // Redirect to blog details page after edit
    } catch (error) {
      alert('Failed to update blog');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Blog</h2>
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
      <button type="submit">Update Blog</button>
    </form>
  );
}
