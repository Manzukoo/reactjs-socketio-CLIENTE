import React, {useState} from 'react'
import Chat from './components/Chat';
import socket from './components/Socket';
import './App.css'
function App() {
  const [name, setName] = useState('')
  const [registered, setRegistered] = useState(false)

  const register = (e) => {
    e.preventDefault()

    if(name !== "") {
      setRegistered(true)
    }
  }

  return (
    <div className="App">
      {
        !registered &&
        <form onSubmit={register}>
          <label> Nombre de usuario</label>
          <input value={name} onChange={e => setName(e.target.value)}></input>
          <button>Ir al chat</button>
        </form>
      }

      {
        registered &&
        <Chat
          name={name}/>
      }
    </div>
  );
}

export default App;
