import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      <main className="flex flex-grow justify-center items-center px-6 relative">
        {/* Main Content */}
        <section className="max-w-3xl text-center px-6">
          <h1 className="text-6xl font-extrabold text-indigo-900 mb-6">EimiHub</h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-xl mx-auto">
            Welcome to EimiHub — a space where stories, creativity, and community come alive.
            Discover diverse blogs, explore 3D models, connect through community maps, and appreciate unique arts.
          </p>
        </section>

        {/* Navbar on right side */}
        <nav className="absolute top-1/2 right-10 transform -translate-y-1/2 bg-violet-600 shadow-lg rounded-xl p-6 w-48">
          <ul className="flex flex-col gap-5">
            {['Blogs', '3D Models', 'Eimi Community Maps', 'Arts'].map((item) => (
              <li key={item}>
                <Link
                  to={`/${item.toLowerCase().replace(/\s/g, '-')}`}
                  className="block text-lg font-semibold text-gray-700 hover:text-indigo-100 transition-colors duration-200"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </main>

      <footer className="text-center py-4 bg-white shadow-inner">
        <p className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} EimiHub. Created by mmtonsing.
        </p>
      </footer>
    </div>
  );
}


// import { Link } from 'react-router-dom';
// import'./Home.css';

// export default function Home() {
//   return (
//     <div className="home-container">
//       <header className="home-header">
//         <nav className="home-navbar">
//           <ul className="navbar-list">
//             <li className="navbar-item"><Link to="/blogs" className="navbar-link">Blogs</Link></li>
//             <li className="navbar-item"><Link to="/3d-models" className="navbar-link">3D Models</Link></li>
//             <li className="navbar-item"><Link to="/community-maps" className="navbar-link">Eimi Community Maps</Link></li>
//             <li className="navbar-item"><Link to="/arts" className="navbar-link">Arts</Link></li>
//           </ul>
//         </nav>
//       </header>

//       <main className="home-main">
//         <section className="about-section">
//           <h1 className="about-title">EimiHub</h1>
//           <p className="about-description">
//             Welcome to EimiHub — a space where stories, creativity, and community come alive. 
//             Discover diverse blogs, explore 3D models, connect through community maps, and appreciate unique arts.
//           </p>
//         </section>
//       </main>

//       <footer className="home-footer">
//         <p className="footer-text">
//           &copy; {new Date().getFullYear()} EimiHub. Created by mmtonsing.
//         </p>
//       </footer>
//     </div>
//   );
// }
