import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Blogs from './pages/Blogs';

function App() {

  return (
    <div>
      {/* keep this in different  */}
      <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/login">Login</Link> |{" "}
        <Link to="/blogs">Blogs</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/blogs" element={<Blogs />} />
      </Routes>
    </div>
  )
}

export default App
