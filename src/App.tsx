import "./App.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CoursesPage from "./pages/CoursesPage";
import CourseDetailPage from "./pages/CourseDetailPage";
import useAuthStore from "./store/auth.store";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
import Header from "./components/header";
import CourseFormPopup from "./popups/CourseFormPopup";

const App = () => {
  const { isAuthenticated } = useAuthStore();

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route
            path="/courses"
            element={isAuthenticated ? <CoursesPage /> : <Navigate to="/" />}
          />
          <Route
            path="/course/detail/:id"
            element={
              isAuthenticated ? <CourseDetailPage /> : <Navigate to="/" />
            }
          />
        </Routes>
      </Router>
      <Toaster />
    </>
  );
};

export default App;
