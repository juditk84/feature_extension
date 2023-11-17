import React from 'react'
import { useEffect, useState } from 'react'

export default function CivilianArea( {userId}) {
  
    const [allMessages, setAllMessages] = useState();


    useEffect(() => {

        displayMessages()

    }, [])


    async function displayMessages() {
        try {
        const res = await fetch(`/api/messages/${userId}`)
        if (!res.ok) throw new Error(`Oops! ${res.status} ${res.statusText}`)
        
        const data = await res.json()
        setAllMessages(data.data)
        console.log(data)
        } catch (error) {
        setError(error.message)
        } 
    }
    
    
    return (
        <div>These are your super cool harass-your-representative messages:
            <ul className="messages_list">

            {allMessages?.map(message => <ul className="message"><li><b>sent to:</b><br />{message.sent_to}</li>
                                                                 <li><b>content:</b><br />{message.body}</li>
                                                                 <li><b>user id:</b><br />{message.user_id}</li></ul>)}

            </ul>
            

        </div>
    )
    }
