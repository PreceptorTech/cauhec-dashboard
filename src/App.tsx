import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/layout/Layout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Connections from "./pages/Connections";
import Institutions from "./pages/Institutions";
import Users from "./pages/Users";
import UserDetail from "./pages/UserDetail";
import Profiles from "./pages/Profiles";
import ConnectionDetail from "./pages/ConnectionDetail";

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

function AppRoutes() {
  const location = useLocation();

  return (
    <Routes>
      <Route
        path="/login"
        element={
          localStorage.getItem("token") ? (
            <Navigate to={location.state?.from || "/"} replace />
          ) : (
            <Login />
          )
        }
      />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="/connections" element={<Connections />} />
        <Route path="/connections/:id" element={<ConnectionDetail />} />
        <Route path="/institutions" element={<Institutions />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<UserDetail />} />
        <Route path="/profiles" element={<Profiles />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
