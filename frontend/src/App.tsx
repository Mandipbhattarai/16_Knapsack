import "./App.css";
import CustomerPage from "./pages/Customers";
import Dashboard from "./pages/Dashboard";
import LoanApprovalLanding from "./pages/HomePage";
import LoanApplicationOCR from "./pages/LoanApplicationOCR";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoanApprovalLanding />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/signin" element={<SignIn />}></Route>
          <Route path="/ocr" element={<LoanApplicationOCR />}></Route>
          <Route path="/customer" element={<CustomerPage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
