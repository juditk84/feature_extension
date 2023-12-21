import './App.css'
import {Route, Routes, Link} from 'react-router-dom'
import About from "./pages/About"
import SendMailPage from './pages/SendMailPage'
import MainMenu from "./pages/MainMenu"
import Suggestions from "./pages/Suggestions"
import LoginPage from "./pages/LoginPage"
import Register from "./components/Register"
import CivilianArea from "./pages/CivilianArea"
import PoliticianArea from "./pages/PoliticianArea"
import HideLoginForLoggedUsers from './components/HideLoginForLoggedUsers'
import RestrictAccessIfNotLoggedIn from './components/RestrictAccessIfNotLoggedIn'

import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from './contexts/auth'

function App() {

  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState()

  const authObject = {
    userData,
    setUserData,
    isLoggedIn,
    setIsLoggedIn
  }

  function logout(){
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate({pathname: "./"});
  }

  return (
  
  <AuthContext.Provider value={authObject}>
    <div>
      <header className="">{isLoggedIn ? <div>🐸 {userData?.user_name} is logged in 🐸<button onClick={() => logout()} className="">logout</button></div> 
                                                 : <div>👹not logged in!👹</div>}</header>

     <Routes>
        <Route
                path="/"
                element={
                  <HideLoginForLoggedUsers>
                    <LoginPage />
                  </HideLoginForLoggedUsers>
                }
              />
        <Route  path="/MainMenu" element={<RestrictAccessIfNotLoggedIn><MainMenu /></RestrictAccessIfNotLoggedIn>} />
        <Route  path="/Register" element={<RestrictAccessIfNotLoggedIn><Register /></RestrictAccessIfNotLoggedIn>} />
        <Route  path="/yoursentmessages" element={<RestrictAccessIfNotLoggedIn><CivilianArea /></RestrictAccessIfNotLoggedIn>} />
        <Route  path="/ultraconfidential_area" element={<RestrictAccessIfNotLoggedIn><PoliticianArea userData={userData}/></RestrictAccessIfNotLoggedIn>} />

        <Route path="/createmail" element={<RestrictAccessIfNotLoggedIn><SendMailPage userData={userData}/></RestrictAccessIfNotLoggedIn>} >
          <Route path="/createmail/:id" element={<SendMailPage/>} />
        </Route>

        <Route path="/about" element={<RestrictAccessIfNotLoggedIn><About/></RestrictAccessIfNotLoggedIn>} />
        <Route path="/suggestions" element={<RestrictAccessIfNotLoggedIn><Suggestions/></RestrictAccessIfNotLoggedIn>} />
     </Routes>

     <footer>
      <br />
     <div>
        <Link to="/MainMenu">Home</Link>
     </div>
     </footer>
  
    </div>
  </AuthContext.Provider>
  )
}

export default App;
