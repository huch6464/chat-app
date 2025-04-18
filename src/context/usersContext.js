import { createContext, useReducer } from "react";
import React from 'react'




const userContext = createContext();



const initialState = {
    users : [],
    msges : [],
    isActiveId:null,
    status : 'idle',
    isLogin : false,
    user : null
}
    
const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'LOADING':
    state.status = 'loading'
    return {...state, status:'loading'}
  case 'FETCH_USERS':
    state.status = 'success'
    return { ...state, users : payload }
  case 'FETCH_MSGES':
    return {...state, msges : [...state.msges,payload]}
    case 'SET_ISACTIVEID' :
    const item = state.users.find(item=>item.id === payload)
    return {...state, isActiveId : item.id}
 case 'DELETE_MSG' :
    const deleteItem = state.msges.find(item=>item.id === payload);
    const newMsges = state.msges.filter(msg=> msg !== deleteItem)
    return {...state, msges : newMsges}
    case 'LOGIN':
      state.isLogin = true
      return { ...state, user : payload }
  
    
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
