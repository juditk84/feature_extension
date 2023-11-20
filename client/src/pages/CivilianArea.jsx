import React from 'react'
import { useEffect, useState, useContext } from 'react'
import AuthContext from '../contexts/auth';

export default function CivilianArea() {
  
    const [allMessages, setAllMessages] = useState();
    const [error, setError] = useState("");

    const { userData } = useContext(AuthContext)

    useEffect(() => {

        displayMessages()

    }, [])


    async function displayMessages() {
        try {
        const res = await fetch(`/api/messages/${userData.user_id}`)
        if (!res.ok) throw new Error(`Oops! ${res.status} ${res.statusText}`)
        
        const data = await res.json()
        setAllMessages(data.data)
        } catch (error) {
        setError(error.message)
        } 
    }
    
    async function deleteMessage(messageId){
        console.log(`button ${messageId} pressed`)
        try{
            console.log("trying...")
            const res = await fetch(`/api/messages/delete/${messageId}`, {
                method: "DELETE", })
            console.log(res)
            displayMessages();

        }catch(err){ setError(err.message)}
    }
    
    return (
        <div>These are your super cool {userData.user_type === "politician" ? "confuse-the-crowds" : "harass-your-representative"} messages:
            <ul className="messages_list">

            {allMessages?.map((message, index) => <ul key={index} className="message"><li key="1"><b>SENT TO:</b><br />{message.sent_to}</li> <br />
                                                                 <li key="2"><b>CONTENT:</b><br />{message.body}</li> 
                                                                 <button key="3" onClick={() => deleteMessage(message.id)}>delete</button></ul>)}

            </ul>
        </div>
    )
    }
