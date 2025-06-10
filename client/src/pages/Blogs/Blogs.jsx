import { useEffect, useState } from 'react';
import axios from '../../api/axios';
import { Link } from 'react-router-dom';
import placeholderImg from '../../../assets/imgPlaceholder.jpeg';
import './BlogsCss/Blogs.css';  // Import the CSS file

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/blogs`, {
      withCredentials: true
    })
      .then(res => setBlogs(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="blogs-container">
      <div className="blogs-wrapper">
        {/* Header */}
        <div className="blogs-header">
          <h2 className="blogs-title">From the blog</h2>
          <p className="blogs-subtitle">
            Dive into diverse stories, insights, and passions from EimiHub's authors.
          </p>
        </div>

        <div className="blogs-post-button-wrapper">
          <Link
            to="/blogs/new" className="blogs-post-button"> + Post a Blog
          </Link>
        </div>

        {/* Blog Grid */}
        {blogs.length === 0 ? (
          <p className="blogs-empty-message">No blogs yet. Be the first to post!</p>
        ) : (
          <div className="blogs-grid">
            {blogs.map(blog => {
              const createdAt = new Date(blog.createdAt).toLocaleDateString('en-GB', {
                year: 'numeric',
                month: 'short',
                day: '2-digit',
              });

              return (
                <article key={blog._id} className="blog-article">
                  {/* Meta */}
                  <div className="blog-meta">
                    <time className="blog-date">{createdAt}</time>
                    <span className="blog-category">{blog.blogCategory}</span>
                  </div>

                  {/* Title + Content */}
                  <div className="blog-content">
                    <h3 className="blog-title">
                      <Link to={`/blogs/${blog._id}`} className="blog-link">
                        {blog.title}
                      </Link>
                    </h3>
                    <p className="blog-snippet">{blog.content}</p>
                  </div>

                  {/* Author / Image / Location */}
                  <div className="blog-author">
                    <img
                      src={blog.image || placeholderImg}
                      alt={blog.title}
                      className="author-image"
                    />
                    <div className="author-info">
                      <p className="author-location">{blog.location || 'EimiHub Contributor'}</p>
                      <p className="author-username">{blog.author?.username || "Unknown Author"}</p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}


// import { useEffect, useState } from 'react';
// import axios from '../../api/axios';
// import { Link } from 'react-router-dom';
// import placeholderImg from '../../../assets/imgPlaceholder.jpeg';

// export default function Blogs() {
//   const [blogs, setBlogs] = useState([]);

//   useEffect(() => {
//     axios.get(`${import.meta.env.VITE_API_URL}/blogs`)
//       .then(res => setBlogs(res.data))
//       .catch(err => console.error(err));
//   }, []);

//   return (
//     <div className="bg-white py-24 sm:py-32">
//       <div className="mx-auto max-w-7xl px-6 lg:px-8">
//         {/* Header */}
//         <div className="mx-auto max-w-2xl lg:mx-0 text-center lg:text-left">
//           <h2 className="text-4xl font-semibold tracking-tight text-indigo-900 sm:text-5xl">
//             From the blog
//           </h2>
//           <p className="mt-2 text-lg leading-8 text-gray-600">
//             Dive into diverse stories, insights, and passions from EimiHub's authors.
//           </p>
//         </div>

//         {/* Blog Grid */}
//         {blogs.length === 0 ? (
//           <p className="mt-16 text-center text-gray-600 text-lg">No blogs yet. Be the first to post!</p>
//         ) : (
//           <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 
//                           sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
//             {blogs.map(blog => {
//               const createdAt = new Date(blog.createdAt).toLocaleDateString('en-GB', {
//                 year: 'numeric',
//                 month: 'short',
//                 day: '2-digit',
//               });

//               return (
//                 <article key={blog._id} className="flex max-w-xl flex-col items-start justify-between">
//                   {/* Meta */}
//                   <div className="flex items-center gap-x-4 text-xs">
//                     <time className="text-gray-500">{createdAt}</time>
//                     <span className="rounded-full bg-gray-100 px-3 py-1.5 font-medium text-gray-600">
//                       {blog.blogCategory}
//                     </span>
//                   </div>

//                   {/* Title + Content */}
//                   <div className="group relative mt-3">
//                     <h3 className="text-lg font-semibold leading-6 text-indigo-900 group-hover:text-indigo-600">
//                       <Link to={`/blogs/${blog._id}`}>
//                         <span className="absolute inset-0" />
//                         {blog.title}
//                       </Link>
//                     </h3>
//                     <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
//                       {blog.content}
//                     </p>
//                   </div>

//                   {/* Author / Image / Location */}
//                   <div className="relative mt-8 flex items-center gap-x-4">
//                     <img
//                       src={blog.image || placeholderImg}
//                       alt={blog.title}
//                       className="h-10 w-10 rounded-full bg-gray-50 object-cover"
//                     />
//                     <div className="text-sm leading-6">
//                       <p className="font-semibold text-indigo-900">
//                         <span>{blog.location || 'EimiHub Contributor'}</span>
//                       </p>
//                       <p className="text-gray-600">{blog.author?.username || "Unknown Author"}</p>
//                     </div>
//                   </div>
//                 </article>
//               );
//             })}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
