import './App.css'
import axios from 'axios'
import { useEffect, useState } from 'react'

function App() {
  const [anecdotes, setAnecdotes] = useState([])
  
  useEffect(()=> {
    axios.get('http://localhost:3001/anecdotes')
      .then(response => setAnecdotes(response.data))
  },[])

  console.log(anecdotes)
  return (
    <div>
      <h1>Welcome to the exercise</h1>
    </div>
  )
}

export default App
