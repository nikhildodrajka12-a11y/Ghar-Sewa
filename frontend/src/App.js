import { BrowserRouter, Routes, Route } from "react-router-dom";
import Interface from "./pages/Interface";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Activity from "./pages/Activity";
import Settings from "./pages/Settings";
import PartnerRegister from "./pages/PartnerRegister";
import ServicePage from "./pages/ServicePage";
import Chat from "./pages/Chat";
import Booking from "./pages/Booking";
import Partner from "./pages/Partner";
import PartnerSignup from "./pages/PartnerSignup";
import PartnerLogin from "./pages/PartnerLogin";
import PartnerHome from "./pages/PartnerHome";
import PartnerProfile from "./pages/PartnerProfile";
import PartnerChat from "./pages/PartnerChat";

import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminPartnerDetails from "./pages/AdminPartnerDetails";
import AdminHome from "./pages/AdminHome";
import AdminAnalysis from "./pages/AdminAnalysis";






function App() {


  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Interface />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
         <Route path="/profile" element={<Profile />} />
        <Route path="/activity" element={<Activity />} />
        <Route path="/settings" element={<Settings />} />
                <Route path="/services" element={<ServicePage />} />

        <Route path="/partner-register" element={<PartnerRegister />} />
       <Route path="/:category" element={<ServicePage />} />
       <Route path="/chat" element={<Chat />} />
        <Route path="/booking" element={<Booking />} />
<Route path="/partner" element={<Partner />} />
<Route path="/partnersignup" element={<PartnerSignup />} />
<Route path="/partnerlogin" element={<PartnerLogin />} />
<Route path="/partnerhome" element={<PartnerHome />} />
 <Route path="/partnerprofile" element={<PartnerProfile />} />
       <Route path="/partnerchat" element={<PartnerChat />} />

 <Route path="/admin" element={<AdminLogin />} />

        <Route
          path="/admin/dashboard"
          element={<AdminDashboard />}
        />

        <Route
          path="/admin/partner/:id"
          element={<AdminPartnerDetails />}/>
        <Route
          path="/admin-home"
          element={<AdminHome />}
        />

<Route
          path="/adminanalysis"
          element={<AdminAnalysis />}
        />
        
      </Routes>
    </BrowserRouter>
  );

}

export default App;



