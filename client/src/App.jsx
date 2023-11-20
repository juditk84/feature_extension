import './App.css'
import {Route, Routes, Link} from 'react-router-dom'
import About from "./pages/About"
import SendMailPage from './pages/SendMailPage'
import MainMenu from "./pages/MainMenu"
import Suggestions from "./pages/Suggestions"
import TotalMsgs from "./components/TotalMsgs"
import LoginPage from "./pages/LoginPage"
import Register from "./components/Register"
import CivilianArea from "./pages/CivilianArea"
import PoliticianArea from "./pages/PoliticianArea"

// import { Animated, Text, View, StyleSheet, Button, SafeAreaView } from 'react-native'
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

  return (
  
  <AuthContext.Provider value={authObject}>
    <div>

      <header className="the_header">{isLoggedIn ? <div>🐸 {userData?.user_name} is logged in 🐸</div> : <div>👹not logged in!👹</div>}</header>

     <Routes>
        <Route  path="/" element={<LoginPage />} />
        <Route  path="/MainMenu" element={<MainMenu />} />
        <Route  path="/Register" element={<Register />} />
        <Route  path="/yoursentmessages" element={<CivilianArea />} />
        <Route  path="/ultraconfidential_area" element={<PoliticianArea userData={userData}/>} />

        <Route path="/createmail" element={<SendMailPage userData={userData}/>} >
          <Route path="/createmail/:id" element={<SendMailPage/>} />
        </Route>

        <Route path="/about" element={<About/>} />
        <Route path="/suggestions" element={<Suggestions/>} />
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
