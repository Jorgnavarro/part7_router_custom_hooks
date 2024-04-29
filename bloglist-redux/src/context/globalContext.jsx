import { createContext, useState } from 'react'
export const ContextGlobal = createContext()



// eslint-disable-next-line react/prop-types
export const ContextProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([])

  const [username, setUsername] = useState('')

  const [password, setPassword] = useState('')

  const [answer, setAnswer] = useState('')

  const values = {
    blogs,
    setBlogs,
    username,
    setUsername,
    password,
    setPassword,
    answer,
    setAnswer,
  }

  return (
    <ContextGlobal.Provider value={values}>{children}</ContextGlobal.Provider>
  )
}
