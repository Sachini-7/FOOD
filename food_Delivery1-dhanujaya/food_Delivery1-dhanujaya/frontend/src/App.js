import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './component/Header';
import Addcustomer from './component/Addcustomer';
import UserProfile from './component/UserProfile';
import AllCustomers from './component/AllCustomers';
import Login from './component/Login';
import EditProfile from './component/EditProfile';
import DeleteAccount from './component/DeleteAccount';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<AllCustomers />} />
          <Route path="/add" element={<Addcustomer />} />
          <Route path="/loginCus" element={<Login />} />
          <Route path="/getUser/:nic" element={<UserProfile />} />
          <Route path="/AllCus" element={<AllCustomers />} />
          <Route path="/edit/:nic" element={<EditProfile />} />
          <Route path="/DeleteAccount" element={<DeleteAccount />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
