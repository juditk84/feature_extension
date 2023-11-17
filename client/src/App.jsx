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

// import { Animated, Text, View, StyleSheet, Button, SafeAreaView } from 'react-native'
import { useRef, useState } from 'react'

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState()

  console.log(isLoggedIn)
  return (
    <div>

     <Routes>
        <Route  path="/" element={<LoginPage setUserId={setUserId} setIsLoggedIn={setIsLoggedIn}/>} />
        <Route  path="/MainMenu" element={<MainMenu isLoggedIn={isLoggedIn}/>} />
        <Route  path="/Register" element={<Register isLoggedIn={isLoggedIn}/>} />
        <Route path="yoursentmessages" element={<CivilianArea userId={userId}/>}/>


        <Route path="/createmail" element={<SendMailPage userId={userId}/>} >
          <Route path="/createmail/:id" element={<SendMailPage/>} />
        </Route>

        <Route path="/about" element={<About/>} />
        <Route path="/suggestions" element={<Suggestions/>} />
     </Routes>

     <footer>
     <div className="total_msgs">
        <TotalMsgs></TotalMsgs>
     </div>
     </footer>
  
    </div>
  )
}

export default App;
