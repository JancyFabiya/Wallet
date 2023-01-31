// import './App.css';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {BrowserRouter as Router, Routes,Route  } from "react-router-dom";
import OTPpage from "./Component/SignIn/OTPpage";
import SignIn from "./Component/SignIn/SignIn";
import Wallet from "./Component/Wallet/Wallet";

function App() {
  return (
    <Router>
      <ToastContainer />

      <Routes>
        <Route path="/" element={<SignIn/>}/>
        <Route path="/otp" element={<OTPpage/>}/>
        <Route path="/wallet" element={<Wallet/>}/>
      </Routes>
    </Router>
      );
}

export default App;
