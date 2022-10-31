import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from 'pages/Home';
import Register from 'pages/Register';
import Login from 'pages/Login';
import Verification from 'pages/Verification';
import ResendVerification from 'pages/ResendVerification';
import ForgotPassword from 'pages/ForgotPassword';
import ResetPassword from 'pages/ResetPassword';
import Profile from 'pages/Profile';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verification" element={<Verification />} />
        <Route path="/resendverification" element={<ResendVerification />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/resetpassword/:userId" element={<ResetPassword />} />
        <Route path="/profile/:userId" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
