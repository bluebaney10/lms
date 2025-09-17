import { Link } from "react-router-dom";
import { useRegister } from "../hooks/useRegister";

const RegisterPage = () => {
  const { formData, loading, handleChange, handleRegister } = useRegister();

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="p-8 bg-white shadow-md rounded w-full max-w-md">
        <h1 className="head text-center">Register</h1>

        <form onSubmit={handleRegister} className="flex flex-col gap-3">
          <label className="label" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Name"
            className="input-text"
            value={formData.name}
            onChange={handleChange}
          />

          <label className="label" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            className="input-text"
            value={formData.email}
            onChange={handleChange}
          />

          <label className="label" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            className="input-text"
            value={formData.password}
            onChange={handleChange}
          />

          <button type="submit" className="bt-primary" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="mt-4 text-center">
          Already have an account?{" "}
          <Link className="bt-tertiary" to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
