import React from 'react'
import { useState } from 'react'
import {Link } from 'react-router-dom'

export default function MainMenu({userData, isLoggedIn}) {

  console.log(userData)

  return (
    <div className="mainMenu">
        <p>{}</p>
        <h1> HI, {userData.user_name.toUpperCase()} WELCOME TO {userData.user_type === "politician" ? "YOUR CONFIDENTIAL AREA of confidential affairs" : "THE GREEN ARMY CO."}</h1>

      {userData.user_type === "politician" ?
      
        <div>
        <Link to="/ultraconfidential_area">TALK TO THE MASSES</Link> 
        <Link to="/yoursentmessages"> VIEW YOUR MESSAGES </Link> 
        </div>
      : 
        <div>
        <Link to="/createmail"> SEND A MAIL </Link> <br/>
        <Link to="/about"> ABOUT THIS PROJECT </Link> <br/>
        <Link to="/suggestions"> GIVE US A SUGGESTION </Link> <br />
        </div>
    }
    </div>
  )
}