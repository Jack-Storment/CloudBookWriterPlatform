import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import PublicRoute from './PublicRoute';

const App: React.FC = () => (
  <AuthProvider>
    <Router>
      <Routes>
        {/* Protected route for logged-in users */}
        <Route
          path="/home"
          element={(
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
            )}
        />

        {/* Public routes for login and register - redirect if user is logged in */}
        <Route
          path="/login"
          element={(
            <PublicRoute>
              <Login />
            </PublicRoute>
            )}
        />
        <Route
          path="/register"
          element={(
            <PublicRoute>
              <Register />
            </PublicRoute>
            )}
        />

        {/* Catch-all route for non-existent paths */}
        <Route
          path="*"
          element={(
            <ProtectedRoute>
              <Navigate to="/home" replace />
            </ProtectedRoute>
            )}
        />
      </Routes>
    </Router>
  </AuthProvider>
);

export default App;
