import React, { useContext, useEffect, useRef, useState } from 'react'
import { userContext } from '../context/usersContext';
import {v4 as uuidv4} from 'uuid';

export default function Input() {
 const{state,dispatch} = useContext(userContext)
 const input = useRef(null);
 const msgEnd = useRef(null);
 const longPress = useRef(null);
 const[msg,setMsg] = useState('');
 const[contextMenu,setContextMenu] = useState({
    visible: false,
    x: null,
    y: null,
    msgId:null
 })


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

const handleDelete =(msgId)=>{
    dispatch({
        type:'DELETE_MSG',
        payload: msgId
    });
    setContextMenu({
        visible: false,
        x: null,
        y: null,
        msgId: null
    })
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
    const handleContextMenu = (e,msgId)=>{
        e.preventDefault();
        setContextMenu({
            visible: true,
            x: e.pageX,
            y: e.pageY,
            msgId: msgId
        })
    }
    const handleContextTouchMenu = (e,msgId)=>{
        e.preventDefault();
        longPress.current = setTimeout(() => {
            setContextMenu({
                visible: true,
                x: e.touches[0].pageX,
                y: e.touches[0].pageY,
                msgId: msgId
            })
        },1000);
    }
    const handleTouchEnd = ()=>{
        clearTimeout(longPress.current)
    }

    const handleClose =()=>{
        setContextMenu({
            visible: false,
            x: null,
            y: null,
            msgId: null
        })
    }


    useEffect(()=>{
       if(state.isActiveId){
           input.current.focus();
       }
    },[state.isActiveId])

    useEffect(() => {
        if (msgEnd.current) {
            msgEnd.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [state.msges]);


    const userActive = state.users.find((item)=>(state.isActiveId === item.id))

   const userChatList = state.msges.filter((msg)=>((msg.sender === 'me' && msg.receiver === state.isActiveId) || (msg.sender === state.isActiveId && msg.receiver === 'me')));
    const chatLIst = userChatList.map((msg)=>{
        return (
            <>
         <div key={msg.id} className="px-4 py-2 my-1 text-start " onContextMenu={(e)=>handleContextMenu(e,msg.id)} onTouchStart={(e)=>handleContextTouchMenu(e,msg.id)} onTouchEnd={handleTouchEnd}>
            <span className={`d-inline-block  text-break  p-3 rounded position-relative ${msg.sender === 'me' ? 'float-start text-bg-secondary': 'text-bg-info float-end'}`}>
            <span className="position-absolute text-dark top-100" style={{fontSize: '0.5rem'}}>{msg.time}</span>
            {msg.text}
            </span>
         </div>
         {contextMenu.visible && <div style={{
        position:'absolute',
        top: contextMenu.y,
        left: contextMenu.x-100,
        display: 'flex',
        flexDirection: 'column',
       minWidth:'10rem',
        zIndex: 1000
    }}>
        <button className="text-center border-0 border-bottom " onClick={()=>handleDelete(msg.id)}>delete</button>
        <button className="text-center border-0 " onClick={handleClose}>close</button>
        </div>}
         </>
        )
    })
   

  return (
    <>
        {state.isActiveId ?
        <div className="bg-light text-center border d-flex  justify-content-around align-items-center m-0 p-1">
        <img  className="img-fluid" alt='img'/>
         <h5 className="m-0">{userActive.username}</h5>
        <h5 className="m-0">{userActive.name}</h5>
        </div>
         : ''}
        {state.isActiveId ? chatLIst : 
         (state.status === 'loading' ? <div className="text-center m-auto">loading...</div> : <div className="text-center m-auto">لطفا چت را انتخاب کنید</div>)
        }
        <div ref={msgEnd} className=" px-1 mt-auto d-flex flex-column position-sticky bottom-0">
           {state.isActiveId ?
           <>
           <button onClick={handleInputOthersend} className="btn btn-info text-center " id="inputGroup-sizing-lg">{userActive.username} send </button>
           <input onChange={(e)=>{setMsg(e.target.value)}} value={msg} ref={input}  type="text" className="input-group p-2 fs-3" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg"/>
           <button onClick={handleInputIsend} className="btn btn-secondary text-center" id="inputGroup-sizing-lg">I send </button>
           </>
           : ''}
           </div>
      </>
  )
}



