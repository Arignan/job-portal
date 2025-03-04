import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import PrivateRoute from './components/common/PrivateRoute';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Dashboard from './pages/Dashboard';
import JobDetails from './pages/JobDetails';
import ProfilePage from './pages/ProfilePage';
import NotFound from './pages/NotFound';
import { AuthProvider } from './context/AuthContext';
//import './App.css' // DELETE THIS LINE

const App = () => {
  return (
      <AuthProvider> {/* Wrap the entire app with AuthProvider */}
        <Router>
          <Header />
          <main>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/jobs/:jobId" element={<JobDetails />} />

              {/* Protected Routes (Job Poster) */}
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />

              {/* Protected Routes (Job Seeker) */}
              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <ProfilePage />
                  </PrivateRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </Router>
    </AuthProvider>
  );
};

export default App;
