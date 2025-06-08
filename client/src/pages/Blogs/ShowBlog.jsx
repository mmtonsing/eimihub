import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from '../../api/axios';

export default function ShowBlog() {
    const { id } = useParams(); // Get :id from URL
    const [blog, setBlog] = useState(null);
    
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/blogs/${id}`)
            .then(res => setBlog(res.data))
            .catch(err => console.error(err));
    }, [id]);

    const navigate = useNavigate();

const handleDelete = async () => {
  const confirm = window.confirm("Are you sure you want to delete this blog?");
  if (!confirm) return;

  try {
    await axios.delete(`${import.meta.env.VITE_API_URL}/blogs/${id}`);
    alert("Blog deleted successfully.");
    navigate('/blogs'); // or wherever you want to redirect after deletion
  } catch (err) {
    alert("Failed to delete blog.");
    console.error(err);
  }
};


    if (!blog) return <p>Loading...</p>;

    return (
        <div>
            <h1>{blog.title}</h1>
            <h2>Categoty: {blog.blogCategory}</h2>
            <p>{blog.content}</p>

            <Link to={`/blogs/${blog._id}/edit`}>
                <button>Edit</button>
                
            </Link>
            
            <button onClick={handleDelete} style={{ marginLeft: '10px', color: 'red' }}>
      Delete
    </button>
        </div>
    );
}