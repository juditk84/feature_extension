import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from '../contexts/auth.js'

export default function RestrictAccessIfNotLoggedIn({ children }) {
  
  const { isLoggedIn } = useContext(AuthContext);

  // redirect you if you're not logged in
  if (!isLoggedIn) {
    console.log("redirecting to login page")
    return <Navigate to="/" />;
  }
  // otherwise, let you through
  return children;
}