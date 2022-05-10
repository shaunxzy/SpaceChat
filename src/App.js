import './App.css';
import {Routes, Route, Navigate } from "react-router-dom";
import SignupPage from "./auth/SignupPage";
import LoginPage from "./auth/LoginPage";
import Verification from "./auth/Verification";
import Homepage from "./components/Homepage";
import UserPage from "./components/user/UserPage";
import Loading from "./tools/Loading";
import AuthProvider from "./context/AuthProvider";

function App() {
  return (
      <AuthProvider>
          <Routes>
              <Route path={"/"} exact={true} element={<Navigate to={'/home'} />}/>
              <Route path={"/test"} exact={true} element={<UserPage />}/>
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/verification" element={<Verification />} />
              <Route path={"/home/*"} element={<Homepage />} />
              <Route path={"/home/:user/*"} element={<UserPage />} />
          </Routes>
      </AuthProvider>
  )
}

export default App;
