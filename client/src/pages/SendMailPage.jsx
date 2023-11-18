import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import ChooseMagic from '../components/ChooseMagic.jsx'
import MessageSent from '../components/MessageSent.jsx'
// import CrystalBall from '../components/CrystalBallSprite.jsx'

export default function SendMailPage({userData}) {
  const [data, setData] = useState([])
  const [error, setError] = useState("");
  const [magicID, setMagic] = useState(1)
  const [loading, setLoading] = useState(false)
  const [ready, setReady] = useState(false)

  // const [message, setMessage] = useState({sentTo: "", body: ""});

async function getData() {
  try {
    const res = await fetch(`/api/createmail/${magicID}`)
    if (!res.ok) throw new Error(`Oops! ${res.status} ${res.statusText}`)
    const data = await res.json()
    setData(data)
    
    addMessageToDatabaseLikeAChampion(data.politician.name, data.message); //did it like this otherwise it didn't work
  } catch (error) {
    setError(error.message)
  } 
}

const addMessageToDatabaseLikeAChampion = async (sent_to, body) => {
  try {
    const response = await fetch(`/api/messages/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sent_to: sent_to, body: body, user_id: userData.user_id, type: "", tone: "", goal: "" }),
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.message);

  } catch (err) {
    setError(err.message);
  }
};

async function handleClick (event) {
  event.preventDefault()
  setLoading(true)
  setError("")
  getData()
  setTimeout(() => {
    setLoading(false);
    setReady(true);
  }, 8000);
}

function setAndClean() {
  setLoading(false)
  setReady(false)
  setError("")
  setMagic(1)
}

/// this is a bit of a mess with all the loading and ready and error, maybe it could be better
// also I wanted the magic to be 1 by default but at some point it stopped working
  return (
    <div> <h3> ARE YOU READY? </h3> <br />
      <div className="sendMailPage">
        
      { (!error && loading) ? <img src="crystal_ball.gif" /> 
        : <img src="crystal_ball_still.png" onClick={(e) => handleClick(e)}/>}
          <div className="choosemagic">
            <ChooseMagic setMagic={setMagic}></ChooseMagic>
            you chose: {magicID}
          </div>
        <div>
          { error ? <div id="error"> {error} </div>
          : ready ? <MessageSent data={data} setAndClean={setAndClean}></MessageSent>
          : <> there's a crystal ball in your future </>}
        </div>
      </div>
    
    <footer>
    <Link id="homebutton" to="/"><button> go home </button> </Link>
      </footer>
    
    </div>
    
  )
  
}


