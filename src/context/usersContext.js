import { createContext, useReducer } from "react";
import React from 'react'




const userContext = createContext();



const initialState = {
    users : [],
    msges : [],
    isActiveId:null,
    status : 'idle',
}
    
const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    
  case 'FETCH_USERS':
    state.status = 'success'
    return { ...state, users : payload }
  case 'FETCH_MSGES':
    return {...state, msges : [...state.msges,payload]}
    case 'SET_ISACTIVEID' :
    const item = state.users.find(item=>item.id === payload)
    return {...state, isActiveId : item.id}
  
    
  default:
    return state
  }
}

 function ProviderUsers({children}) {


    const[state,dispatch] = useReducer(reducer,initialState);

  return (
  <userContext.Provider value={{state,dispatch}} >
    {children}
  </userContext.Provider>
  )
}

export {ProviderUsers,userContext}
