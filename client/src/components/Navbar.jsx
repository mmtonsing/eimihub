import { Link, useLocation } from "react-router-dom";
import LogoutButton from "../pages/users/LogoutButton";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const location = useLocation();
  const { user, setUser } = useContext(AuthContext);
  const isLoggedIn = !!user;

  // useEffect(() => {
  //   axios
  //     .get(`${import.meta.env.VITE_API_URL}/auth/status`, { withCredentials: true })
  //     .then((res) => {
  //       setUser(res.data.user);
  //       console.log("Logged in user:", res.data.user); // ✅ Safe logging
  //     })
  //     .catch(() => setUser(null));
  // }, []);

  // if (isHomePage) return null; // hide on home

  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left - Branding */}
          <div className="flex items-center">
            <Link to="/" className="text-white font-bold text-xl">
              EimiHub
            </Link>
          </div>

          {/* Middle - Navigation Links */}
          <div className="hidden sm:flex space-x-4">
            <Link
              to="/blogs"
              className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Blogs
            </Link>
          </div>

          {/* Right - Auth Buttons */}
          <div className="flex items-center space-x-4">
  {isLoggedIn ? (
    <>
      {/* You can show username here if needed */}
      <span className="text-gray-300 text-sm">Hello, {user.username}</span>
      <LogoutButton />
    </>
  ) : (
    <>
      <Link
        to="/login"
        className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
      >
        Login
      </Link>
      <Link
        to="/register"
        className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
      >
        Register
      </Link>
    </>
  )}
</div>

        </div>
      </div>
    </nav>
  );
}
