import React from 'react'
import { useEffect, useState } from 'react'

export default function CivilianArea( {userData}) {
  
    const [allMessages, setAllMessages] = useState();
    const [error, setError] = useState("");

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
        <div>These are your super cool harass-your-representative messages:
            <ul className="messages_list">

            {allMessages?.map(message => <ul className="message"><li><b>SENT TO:</b><br />{message.sent_to}</li> <br />
                                                                 <li><b>CONTENT:</b><br />{message.body}</li> 
                                                                 <button onClick={() => deleteMessage(message.id)}>delete</button></ul>)}

            </ul>
            

        </div>
    )
    }
