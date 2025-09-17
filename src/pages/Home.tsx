import { Link } from "react-router-dom";
import useAuthStore from "../store/auth.store";

const Home = () => {
  const { isAuthenticated } = useAuthStore();

  return (
    <div className="min-h-screen bg-gradient-hero items-center flex">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="heading">
            Minimal <span>LMS</span>
          </h1>
          <p className="sub-heading">
            Minimal Learning Management System (LMS)
          </p>

          {!isAuthenticated && (
            <div className="flex flex-col max-w-max m-auto gap-4 justify-center">
              <Link to="/register">
                <button className="bt-primary min-w-2xs">Register</button>
              </Link>
              <div className="text-center">
                <p className="text-muted-foreground mb-4">
                  Already have an account?
                </p>
                <Link to="/login">
                  <button className="bt-tertiary">Sign In</button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
