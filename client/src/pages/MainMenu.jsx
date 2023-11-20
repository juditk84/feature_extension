import React, { useEffect } from 'react'
import { useState, useContext } from 'react'
import {Link, useNavigate } from 'react-router-dom'
import AuthContext from '../contexts/auth'

export default function MainMenu() {

  const navigate = useNavigate();

  const { userData, isLoggedIn } = useContext(AuthContext)
  console.log(userData, isLoggedIn)
  
  useEffect(() => {
    !isLoggedIn && navigate({pathname: "./"})
  }, [])

  return (
    <div className="mainMenu">
        <p>{}</p>
        <h1> {userData?.user_name.toUpperCase()}, WELCOME TO {userData?.user_type === "politician" ? "YOUR CONFIDENTIAL AREA of confidential affairs" : "THE GREEN ARMY CO."}</h1>

      {userData?.user_type === "politician" ?
      
        <div>
        <Link to="/ultraconfidential_area">TALK TO THE MASSES</Link> <br />
        <Link to="/yoursentmessages"> VIEW YOUR MESSAGES </Link> 

        </div>
      : 
        <div>
        <Link to="/createmail"> SEND A MAIL </Link> <br/>
        <Link to="/yoursentmessages"> VIEW YOUR MESSAGES </Link> <br/>
        <Link to="/about"> ABOUT THIS PROJECT </Link> <br/>
        <Link to="/suggestions"> GIVE US A SUGGESTION </Link> <br />
        </div>
    }
    </div>
  )
}