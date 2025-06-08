import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/users/Login';
import Register from './pages/users/Register'
import LogoutButton from './components/LogoutButton';
import Blogs from './pages/Blogs/Blogs';
import ShowBlog from './pages/Blogs/ShowBlog';
import NewBlog from './pages/Blogs/NewBlog';
import EditBlog from './pages/Blogs/EditBlog';


function App() {

  return (
    <div>
      {/* keep this in different  */}
      <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/login">Login</Link> |{" "}
        <Link to="/register">Register</Link> |{" "}
        <Link to="/blogs">Blogs</Link>
        <LogoutButton />
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:id" element={<ShowBlog />} />
        <Route path="/blogs/:id/edit" element={<EditBlog />} />
        <Route path="/blogs/new" element={<NewBlog />} />
      </Routes>
    </div>
  )
}

export default App
