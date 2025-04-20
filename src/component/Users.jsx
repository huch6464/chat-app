
import React, { useContext, useEffect} from 'react'
import { userContext } from '../context/usersContext';
import axios from 'axios';



export default function Users() {
    const{dispatch,state} = useContext(userContext);
    const users = state.users
   
    // https://jsonplaceholder.typicode.com/users
     useEffect(()=>{
      if(state.isLogin === true){
        dispatch({type:'LOADING'})
        axios.get('http://huch.local/wp-json/huch/v1/users')
        .then(response=>
          dispatch({type:'FETCH_USERS',
                   payload : response.data}))
          }
    },[dispatch]);
  

  const handleClick = (userId)=>{
      dispatch({type:'SET_ISACTIVEID',payload:userId});
      }
    
    
 
    const userList = users.map((user)=>{
    return(
        <a onClick={()=>handleClick(user.id)} key={user.id} className={`list-group-item list-group-item-action ${state.isActiveId === user.id ? 'active' : ''}`} aria-current="true">
           <div className="d-flex w-100 justify-content-between ">
              <h6 className="mb-1">{user.name}</h6>
              <h6 className="mb-1">{user.family}</h6>
              <h6 style={{fontSize: '0.5rem'}}>3 days ago</h6>
           </div>
        </a>
    )
})
  return (
    <div className="h-100 w-25 bg-primary-subtle overflow-y-scroll d-none d-md-block p-1">
      <div className='d-flex justify-content-around align-items-center p-2 bg-light text-primary rounded mb-2'>
        <button className='btn btn-outline-primary btn-sm' onClick={()=>{dispatch({type:'LOGOUT'})}}>logout</button>
        <span>{state.user.username}</span>
        <span>{state.user.name}</span>
      </div>
      <div className="list-group ">
          {userList}
      </div>
    </div>    
  
  )
}



