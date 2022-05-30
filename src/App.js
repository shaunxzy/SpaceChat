import './App.css';
import {Routes, Route, Navigate } from "react-router-dom";
import SignupPage from "./auth/SignupPage";
import LoginPage from "./auth/LoginPage";
import Verification from "./auth/Verification";
import Homepage from "./components/Homepage";
import UserPage from "./components/UserPage";
import AuthProvider from "./context/AuthProvider";
import Visitor from "./components/Visitor";
import VisitorAuth from "./auth/VisitorAuth";

function App() {
  return (
      <AuthProvider>
          <Routes>
              <Route path={"/"} exact={true} element={<Navigate to={'/home'} />}/>
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/verification" element={<Verification />} />
              <Route path={"/home/*"} element={<Homepage />} />
              <Route path={"/user/:id"} element={<UserPage />} />
              <Route path={"/visitor/:id"} element={<Visitor />}/>
              <Route path={"/visitor/auth/:id"} element={<VisitorAuth />} />
          </Routes>
      </AuthProvider>
  )
}

export default App;
