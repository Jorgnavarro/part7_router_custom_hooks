import './App.css'
import {Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import CreateNew from './routes/Create'
import Anecdotes from './routes/Anecdotes'

function App() {

  return (
    <div>
      <Header/>
      <Routes>
        <Route path='/' element={<Anecdotes/>}/>
        <Route path='create' element={ <CreateNew/> }/>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
