
import React, { useContext, useEffect} from 'react'
import { userContext } from '../context/usersContext';
import axios from 'axios';



export default function Users() {
    const{dispatch,state} = useContext(userContext);
    const users = state.users
   

     useEffect(()=>{
          dispatch({type:'LOADING'})
          axios.get('https://jsonplaceholder.typicode.com/users')
          .then(response=>
            dispatch({type:'FETCH_USERS',
                     payload : response.data}))
      },[dispatch])

    const handleClick = (userId)=>{
        dispatch({type:'SET_ISACTIVEID',payload:userId});
       
    }
    
 
    const userList = users.map((user)=>{
    return(
        <a onClick={()=>handleClick(user.id)} key={user.id} className={`list-group-item list-group-item-action ${state.isActiveId === user.id ? 'active' : ''}`} aria-current="true">
           <div className="d-flex w-100 justify-content-between ">
              <h6 className="mb-1">{user.name}</h6>
              <h6 style={{fontSize: '0.5rem'}}>3 days ago</h6>
           </div>
        </a>
    )
})
  return (
    <div className="h-100 w-25 bg-primary-subtle overflow-y-scroll d-none d-md-block p-1">
          <div className="list-group ">
        {userList}
    </div>
    </div>    
  
  )
}



