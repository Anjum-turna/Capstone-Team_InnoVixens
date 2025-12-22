import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Home from './pages/Home';
import RoleSelection from './pages/RoleSelection'; // আপনার ফাইলের নাম যদি RoleSelect.jsx হয়, তবে সেটিই রাখুন
import Login from './pages/Login';
import UserDashboard from './pages/UserDashboard'; // <--- এটি যোগ করুন
import AdminDashboard from './pages/AdminDashboard'; // <--- এটি যোগ করুন

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/select-role" element={<RoleSelection />} />
          <Route path="/login" element={<Login />} />
          {/* আলাদা ড্যাশবোর্ড রুট */}
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;