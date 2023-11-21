import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from '../contexts/auth.js'

export default function HideLoginForLoggedUsers({ children }) {
  
  const { isLoggedIn } = useContext(AuthContext);

  // redirect you if you're not logged in
  if (isLoggedIn) {
    console.log("redirecting to main menu")
    return <Navigate to="/MainMenu" />;
  }
  // otherwise, let you through
  return children;
}