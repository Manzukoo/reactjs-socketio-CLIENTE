import React, { useState, useEffect, useRef } from "react";
import socket from "./Socket";

const Chat = ({ name }) => {
    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState([])

    useEffect(() => {
        socket.emit('connected', name)
    }, [name])

    useEffect(() => {
        socket.on('messages', message => {
            setMessages([...messages, message])
        })

        return () => socket.off()
    }, [messages])

    const divRef = useRef(null)
    useEffect(() => {
        divRef.current.scrollIntoView({ behavior: 'smooth'})
    })

    const submit = (e) => {
        e.preventDefault()
        socket.emit('message', name, message)
        setMessage('')
    }

    return (
        <div className="chat-container">
            <div className="chat">
                {messages.map((e, i) => {
                    return (
                        <div key={i} style={{display: 'flex', alignItems: 'baseline'}}>
                            <p>{e.message}</p>
                        </div>
                    )
                })}
                <div ref={divRef}></div>
            </div>
            <form onSubmit={submit}>
                <input placeholder="Escribir..." className="input" value={message} onChange={e => setMessage(e.target.value)}/>
                <button>Enviar</button>
            </form>
        </div>
    )
}

export default Chat