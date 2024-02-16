import { createContext, useState } from "react";


export const ContextGlobal = createContext()


export const AnecdotesContextProvider = ({children}) => {
    
    const [anecdotes, setAnecdotes] = useState([])

    return(
        <ContextGlobal.Provider value={[anecdotes, setAnecdotes]}>
            {children}
        </ContextGlobal.Provider>
    )
}
