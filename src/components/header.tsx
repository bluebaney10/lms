import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../store/auth.store";

const Header = () => {
  const { isAuthenticated, user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-card border-b border-gray-200 fixed top-0 w-full">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-4xl font-bold bg-gradient-primary text-primary">
              LMS
            </span>
          </Link>

          {isAuthenticated && (
            <div className="flex items-center gap-2">
              <Link to="/courses">
                <button className="bt-primary">Course</button>
              </Link>
              <div className="flex flex-col">
                <div className="whitespace-nowrap">Hello, {user?.name}</div>
                <button onClick={handleLogout} className="bt-tertiary">
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
