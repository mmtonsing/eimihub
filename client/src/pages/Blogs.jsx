import { useEffect, useState } from 'react';
import axios from 'axios';

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
        blogs.map(blog => (
          <div key={blog._id}>
            <h3>{blog.title}</h3>
            <p>{blog.content}</p>
          </div>
        ))
      }
    </div>
  )
}