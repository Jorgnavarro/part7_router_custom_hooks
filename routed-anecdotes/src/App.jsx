import './App.css'
import {Routes, Route, useMatch} from 'react-router-dom'
import { useEffect, useContext } from 'react'
import { ContextGlobal } from './context/Context'
import Header from './components/Header'
import Footer from './components/Footer'
import CreateNew from './routes/Create'
import Anecdotes from './routes/Anecdotes'
import AnecdoteDetail from './components/AnecdoteDetail'
import anecdoteService from './services/anecdote'


function App() {
  const [anecdotes, setAnecdotes] = useContext(ContextGlobal)

  useEffect(()=> {
    anecdoteService.getAll().then(response => setAnecdotes(response))
  },[setAnecdotes])

  const match = useMatch('/anecdotes/:id')
  
  const anecdoteSelected = anecdotes.find(anecdote => anecdote.id === match?.params.id)


  return (
    <div className='containerApp'>
      <Header/>
      <Routes>
        <Route path='/' element={<Anecdotes list={anecdotes}/>}/>
        <Route path='/create' element={ <CreateNew/> }/>
        <Route path='/anecdotes/:id' element={ <AnecdoteDetail anecdote={anecdoteSelected}/>}/>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
