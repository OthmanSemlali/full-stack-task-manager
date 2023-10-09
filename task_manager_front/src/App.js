
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Error from "./pages/Error";
import { AddTask} from "./components/dashboard/AddTask";
import SharedLayout from "./pages/dashboard/SharedLayout";
import { AuthRoute } from "./ProtectedRoutes/AuthRoute";
import PrivateRoute from "./ProtectedRoutes/PrivateRoute";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            <AuthRoute>
              <Login />
            </AuthRoute>
          }
        />


        <Route
          path="/register"
          element={
            <AuthRoute>
              <Register />
            </AuthRoute>
          }
        />


        <Route index element={<Home />} />
        <Route path="*" element={<Error />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <SharedLayout />
            </PrivateRoute>
          }
        >
          <Route path="/dashboard/addTask" element={<AddTask />} />
          <Route index element={<Dashboard />} />
        </Route>
      </Routes>

      <ToastContainer position='top-left' autoClose={3000}
/>
    </Router>
  );
}

export default App;
