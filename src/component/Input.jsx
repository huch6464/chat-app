import React, { useContext, useEffect, useRef, useState } from 'react'
import { userContext } from '../context/usersContext';
import {v4 as uuidv4} from 'uuid';

export default function Input() {
 const{state,dispatch} = useContext(userContext)
 const input = useRef(null)
 const[msg,setMsg] = useState('');


    const handleInputIsend = (e)=>{
        if(msg.trim()){
            dispatch({type:'FETCH_MSGES', payload: {
                id: uuidv4(),
                text: msg,
                sender: 'me',
                receiver: state.isActiveId,
                time: new Date().toLocaleTimeString()
            }})
            setMsg('')
            input.current.focus();
        }
    }

    const handleInputOthersend = (e)=>{
        if(msg.trim()){
            dispatch({type:'FETCH_MSGES', payload: {
                id: uuidv4(),
                text: msg,
                sender: state.isActiveId,
                receiver: 'me',
                time: new Date().toLocaleTimeString()
            }})
            setMsg('')
            input.current.focus();
        }
    }


    useEffect(()=>{
       if(state.isActiveId){
           input.current.focus();
       }
    },[state.isActiveId])


    const userActive = state.users.find((item)=>(state.isActiveId === item.id))

   const userChatList = state.msges.filter((msg)=>((msg.sender === 'me' && msg.receiver === state.isActiveId) || (msg.sender === state.isActiveId && msg.receiver === 'me')));
    const chatLIst = userChatList.map((msg)=>{
        return (
         <div key={msg.id} className="px-4 py-2 text-start ">
            <span className={`d-inline-block  text-break  p-3 rounded position-relative ${msg.sender === 'me' ? 'float-start': 'text-bg-info float-end'}`}>
            <span className="position-absolute top-100" style={{fontSize: '0.5rem'}}>{msg.time}</span>
            {msg.text}
            </span>
         </div>
        )
    })

  return (
    <>
        {state.isActiveId ?
        <div className="bg-light text-center border d-flex justify-content-around align-items-center m-0 p-1">
        <img  className="img-fluid" alt='img'/>
         <h5 className="m-0">{userActive.username}</h5>
        <h5 className="m-0">{userActive.name}</h5>
        </div>
         : ''}
        {state.isActiveId ? chatLIst : <div className="text-center m-auto">لطفا چت را انتخاب کنید</div>}
        <div className="input-group input-group-lg p-3 mt-auto ">
           {state.isActiveId ?
           <>
           <button onClick={handleInputOthersend} className="input-group-text" id="inputGroup-sizing-lg">{userActive.username} send </button>
           <input onChange={(e)=>{setMsg(e.target.value)}} value={msg} ref={input}  type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg"/>
           <button onClick={handleInputIsend} className="input-group-text" id="inputGroup-sizing-lg">I send </button>
           </>
           : ''}
           </div>
      </>
  )
}
