import axios from 'axios'
import { useEffect, useState } from 'react'
const Anecdotes = () => {
    const [anecdotes, setAnecdotes] = useState([])
  
    useEffect(()=> {
      axios.get('http://localhost:3001/anecdotes')
        .then(response => setAnecdotes(response.data))
    },[])
    return ( 
        <div className='containerList'>
        <h4>Anecdotes</h4>
        <ul className='list-group ulAnecdotes'>
          { anecdotes.map(anecdote => {
            return <li key={anecdote.id} className='list-group-item list-group-item-primary' id='colorList'>{anecdote.title}</li>
            })
          }
        </ul>
      </div>
     )
}

export default Anecdotes