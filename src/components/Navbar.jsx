import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  function logout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <nav className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-xl">
            📚
          </div>

          <span className="text-lg font-bold text-slate-900">
            CSE Digital <span className="text-blue-600">Library</span>
          </span>
        </Link>

        {/* Menu */}
        <div className="hidden items-center gap-7 md:flex">
          <Link
            to="/"
            className="text-sm font-semibold text-slate-600 hover:text-blue-600"
          >
            Home
          </Link>

          <Link
            to="/books"
            className="text-sm font-semibold text-slate-600 hover:text-blue-600"
          >
            Books
          </Link>

          <Link
            to="/subjects"
            className="text-sm font-semibold text-slate-600 hover:text-blue-600"
          >
            Subjects
          </Link>

          <Link
            to="/resources"
            className="text-sm font-semibold text-slate-600 hover:text-blue-600"
          >
            Resources
          </Link>

          {token && (
            <Link
              to="/my-library"
              className="text-sm font-semibold text-blue-600"
            >
              My Library
            </Link>
          )}
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          {token ? (
            <button
              onClick={logout}
              className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="hidden text-sm font-semibold text-slate-700 sm:block"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;