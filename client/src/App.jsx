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

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState()


  console.log(isLoggedIn)
  return (
    <div>

     <Routes>
        <Route  path="/" element={<LoginPage setUserData={setUserData} setIsLoggedIn={setIsLoggedIn}/>} />
        <Route  path="/MainMenu" element={<MainMenu userData={userData} isLoggedIn={isLoggedIn}/>} />
        <Route  path="/Register" element={<Register isLoggedIn={isLoggedIn}/>} />
        <Route  path="/yoursentmessages" element={<CivilianArea userData={userData}/>} />
        <Route  path="/ultraconfidential_area" element={<PoliticianArea userData={userData}/>} />

        <Route path="/createmail" element={<SendMailPage userData={userData}/>} >
          <Route path="/createmail/:id" element={<SendMailPage/>} />
        </Route>

        <Route path="/about" element={<About/>} />
        <Route path="/suggestions" element={<Suggestions/>} />
     </Routes>

     {/* <footer>
     <div className="total_msgs">
        <TotalMsgs></TotalMsgs>
     </div>
     </footer> */}
  
    </div>
  )
}

export default App;
