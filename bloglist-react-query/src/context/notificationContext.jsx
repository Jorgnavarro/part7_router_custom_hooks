import { createContext, useContext, useReducer } from 'react'

/* eslint-disable react/prop-types */
const NotificationContext = createContext()


const notificationReducer = ( state, action ) => {

    switch(action.type){
        case 'MESSAGE': 
          return action.payload
        case 'CLEAR':
          return null
        default: 
          return state
    }
}

export const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, null)

    return(
        <NotificationContext.Provider value={[notification, notificationDispatch]}>
            {props.children}
        </NotificationContext.Provider>
    )
}