import React from 'react'
import {useState} from 'react'
import {Link} from 'react-router-dom'

export default function Suggestions() {
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [input, setInput] = useState("")
    const [message, setMessage] = useState("")

async function handleSuggestion() {
    try {
        const response = await fetch("/api/suggestions", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({magic: input})
        });
        if (!response.ok) throw new Error(`Oops! ${response.status} ${response.statusText}`);
        setMessage(response.message)
    } catch (error) {
        setError(error.message);
        console.log("the gods have rejected your suggestion");
    } finally {
        setLoading(false);
        setInput("");
    }
    }

const handleInput = event => {
    setInput(event.target.value);
};

const handleSubmit = event => {
    event.preventDefault();
    setLoading(true);
    setError("");
    handleSuggestion();
};

  return (
    <div>Suggestions <br/><br/>

        <input id="suggestions" type="text" value={input} onChange={e => handleInput(e)}></input> <br/><br/>
        <button type="submit" onClick={e => handleSubmit(e)}> BURN IT </button><br/><br/>
        <br/>
        {message}
        <br/><br/>
        <Link id="homebutton" to="/"><button> go home </button> </Link>
    </div>
  )
}
