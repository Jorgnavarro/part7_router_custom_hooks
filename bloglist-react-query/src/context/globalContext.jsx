import React from 'react'
import { createContext, useState } from 'react'
export const ContextGlobal = createContext()



// eslint-disable-next-line react/prop-types
export const ContextProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([])

  const [errorMessage, setErrorMessage] = useState(null)

  const [infoMessage, setInfoMessage] = useState(null)

  const [username, setUsername] = useState('')

  const [password, setPassword] = useState('')

  const [user, setUser] = useState(null)

  const [modifierLikes, setModifierLikes] = useState(0)

  const values = {
    blogs,
    setBlogs,
    errorMessage,
    setErrorMessage,
    infoMessage,
    setInfoMessage,
    username,
    setUsername,
    password,
    setPassword,
    user,
    setUser,
    modifierLikes,
    setModifierLikes,
  }

  return (
    <ContextGlobal.Provider value={values}>{children}</ContextGlobal.Provider>
  )
}
