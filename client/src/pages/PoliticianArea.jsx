
import React from 'react'
import { useState, useContext } from 'react';
import AuthContext from '../contexts/auth';

export default function PoliticianArea() {

  const {userData} = useContext(AuthContext);
  const [message, setMessage] = useState();
  const [error, setError] = useState("");

const handleSubmit = async (e, sent_to, body) => {

    e.preventDefault();
    console.log(e)

    const type = e.target[0].value
    const tone = e.target[1].value
    const goal = e.target[2].value

  try {
    const response = await fetch(`/api/messages/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("token")
      },
      body: JSON.stringify({ sent_to: "all_citizens", body: "", type: type, tone: tone, goal: goal }),
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.message);

    setMessage(data)

  } catch (err) {
    setError(err.message);
  }
};

  return (
    <div className='ultra_confidential_area'>

      <div>ULTRA CONFIDENTIAL AREA.</div>
      <p>hi {userData.user_name}, let's set things up to send an IMPORTANT 
      and LIFE CHANGING message to your entire population. It's gonna be the ultimate one-to-many experience.</p>

      <form onSubmit={(e) => handleSubmit(e)}className="politician_form" action="">

        <label className="politician_form_labels" htmlFor="type">Type of politician</label>
        <select className="politician_form_fields" name="type" id="type">
          <option value="Medieval Queen/King">Medieval Queen/King</option>
          <option value="XXth Century cult-of-personality leader">XXth Century cult-of-personality leader</option>
          <option value="Left-wing revolucionario with stylish boina">Left-wing revolucionario with stylish boina</option>
        </select> <br />

        <label className="politician_form_labels" htmlFor="tone">Tone</label>
        <select className="politician_form_fields" name="tone" id="tone">
          <option value="ominous">ominous</option>
          <option value="angry">angry</option>
          <option value="encouraging">encouraging</option>
          <option value="vengeful">vengeful</option>
          <option value="condescending">condescending</option>
          <option value="delirious">delirious</option>
        </select> <br />

        <label className="politician_form_labels" htmlFor="goal">Goal</label>
        <select className="politician_form_fields" name="objective" id="objective">
          <option value="ask for a boost in the nation's productivity">ask for a boost in the nation's productivity</option>
          <option value="Show off how COOL and AMAZING you are">Show off how COOL and AMAZING you are</option>
          <option value="Command them to build a 40m tall Bronze statue of your dog">Command them to build a 40m tall Bronze statue of your dog</option>
          <option value="Announce a war against a rival nation that will require lots of soldier">Announce a war agaisnt a rival nation that will require lots of soldiers</option>
          <option value="Claim every first born child for a massive sacrifice to please the Gods">Claim every first born child for a massive sacrifice to please the Gods</option>
        </select> <br /> 

        <button>DELIVER THE MESSAGE</button>

      </form>

        <div className="politician_msg">
          { error ? <div id="error"> {error} </div>
          : <div><br />{message?.message} <br />  .</div>}
        </div>

    </div>
  )
}
