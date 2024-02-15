import { Link } from 'react-router-dom'

const Header = () => {

    return (
    <div className='containerHeader'>
      <h1>Anecdotes APP 🙇🏽‍♀️</h1>
      <div>
        <Link className="p-2 links" to="/">Anecdotes</Link>
        <Link className="p-2 links" to="/create">Create new</Link>
        <Link className="p-2 links" to="/about">About</Link>
      </div>
    </div>
  )
}


export default Header
