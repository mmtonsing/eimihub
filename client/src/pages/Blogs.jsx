import { useEffect, useState } from 'react';
import axios from '../api/axios';

export default function Blogs() {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    // axios.get('/api/blogs')
    axios.get(`${import.meta.env.VITE_API_URL}/blogs`)
      .then(res => setBlogs(res.data))
      .catch(err => console.error(err))
  }, [])

  return (
    <div>
      <h1>Blogs</h1>
      {blogs.length === 0 ? <p>No blogs yet</p> :
        blogs.map(blog => {
          // const formattedDate = new Date(blog.createdAt).toLocaleDateString();
          const createdAt = new Date(blog.createdAt);
          const formattedDateTime = createdAt.toLocaleDateString('en-GB', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
          })
            + ', ' +
            createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

          return (
            <div key={blog._id}>
              <h3>{blog.title}</h3>
              <p>{formattedDateTime}</p>
              <p>{blog.content}</p>
            </div>
          );
        })
      }
    </div>
  )
}