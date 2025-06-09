import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/users/Login';
import Register from './pages/users/Register'
// import LogoutButton from './components/LogoutButton';
import Blogs from './pages/Blogs/Blogs';
import ShowBlog from './pages/Blogs/ShowBlog';
import NewBlog from './pages/Blogs/NewBlog';
import EditBlog from './pages/Blogs/EditBlog';
import Navbar from './components/Navbar';
import { AuthProvider } from './context/AuthContext';

function App() {

  return (
    <AuthProvider>
      <Navbar />
      <div>
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
    </AuthProvider>     
  )
}

export default App
