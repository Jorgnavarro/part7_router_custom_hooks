import { createContext, useState } from 'react'
export const ContextGlobal = createContext()



// eslint-disable-next-line react/prop-types
export const ContextProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([])

  const [userDDBB, setUserDDBB] = useState({})

  const [username, setUsername] = useState('')

  const [password, setPassword] = useState('')

  const [user, setUser] = useState(null)


  const values = {
    blogs,
    setBlogs,
    userDDBB,
    setUserDDBB,
    username,
    setUsername,
    password,
    setPassword,
    user,
    setUser
  }

  return (
    <ContextGlobal.Provider value={values}>{children}</ContextGlobal.Provider>
  )
}
