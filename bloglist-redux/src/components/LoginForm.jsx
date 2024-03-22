import { useContext } from 'react'
import { ContextGlobal } from '../context/globalContext'
import { useDispatch } from 'react-redux'
import { setUserService } from '../reducers/loginReducer'


export function LoginForm () {
  const { username, setUsername, password, setPassword } = useContext(ContextGlobal)
  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(setUserService(username, password))
    setUsername('')
    setPassword('')
  }

  return (
    <form onSubmit={handleLogin} id='loginForm' className="mb-3">
      <div className="mb-3">
        <label htmlFor="username" className="form-label">Username</label>
        <input
          type="text"
          className="form-control"
          id="username"
          placeholder="Write your username here..."
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="inputPassword" className="form-label">Password</label>
        <input
          type='password'
          className="form-control"
          id="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <div>
        <button type='submit'>Login</button>
      </div>
    </form>
  )
}