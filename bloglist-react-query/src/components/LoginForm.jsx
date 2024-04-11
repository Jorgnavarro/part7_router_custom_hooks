import { useContext } from 'react'
import { ContextGlobal } from '../context/globalContext'
import loginService from '../services/login'
import blogService from '../services/blog'
import { useNotify } from '../context/notificationContext'


export function LoginForm () {
  const { username, setUsername, setUser, password, setPassword } = useContext(ContextGlobal)
  const notifyWith = useNotify()
  const handleLogin = async (event) => {
    event.preventDefault()
    try{
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedUserBlogs', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      notifyWith(`Welcome ${username}`)
    }catch(exception){
      notifyWith('Wrong username or password')
      console.log(exception)
    }
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