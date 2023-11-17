import React from 'react'
import { useState } from 'react'
import {Link } from 'react-router-dom'

export default function MainMenu({isLoggedIn}) {

  const [username] = useState(new URLSearchParams(location.search).get('username'))

  return (
    <div className="mainMenu">
        <p>{}</p>
        <h1> HI, WELCOME TO THE GREEN ARMY CO.</h1>

        <Link to="/createmail"> SEND A MAIL </Link> <br/>
        <Link to="/yoursentmessages"> VIEW YOUR MESSAGES </Link> <br/>
        <Link to="/about"> ABOUT THIS PROJECT </Link> <br/>
        <Link to="/suggestions"> GIVE US A SUGGESTION </Link>

    </div>
  )
}