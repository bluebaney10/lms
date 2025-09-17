import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useAuthStore from "../store/auth.store";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { isAuthenticated, login } = useAuthStore();

  if (isAuthenticated) navigate("/courses");

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="p-8 bg-white shadow-md rounded w-full max-w-md">
        <h1 className="head text-center">Login</h1>
        <label className="label" htmlFor="email">
          Email
        </label>
        <input
          type="email"
          placeholder="Email"
          className="input-text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className="label" htmlFor="email">
          Password
        </label>
        <input
          type="password"
          placeholder="Password"
          className="input-text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={() => login({ email, password })}
          className="bt-primary m-auto"
        >
          Login
        </button>
        <p className="mt-4 text-center">
          Don't have an account?{" "}
          <Link className="bt-tertiary" to="/register">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
