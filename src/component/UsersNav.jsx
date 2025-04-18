

import React, { useContext, useEffect,useState} from 'react'
import { userContext } from '../context/usersContext';
import axios from 'axios';



export default function UsersNav() {
    const{dispatch,state} = useContext(userContext);
    const users = state.users
     const[menuIsOpen,setMenuIsOpen] = useState(true);

     useEffect(()=>{
          dispatch({type:'LOADING'})
          axios.get('http://huch.local/wp-json/huch/v1/users')
          .then(response=>
            dispatch({type:'FETCH_USERS',
                     payload : response.data}))
      },[dispatch])

    const handleClick = (userId)=>{
        dispatch({type:'SET_ISACTIVEID',payload:userId});
        closeMenu();
    }
    const closeMenu = ()=>{setMenuIsOpen(false)}

    const userList = users.map((user)=>{
        return(
        <div key={user.id} className="offcanvas-body p-0">
            <div className="list-group ">
                <a onClick={()=>handleClick(user.id)} key={user.id} className={`list-group-item list-group-item-action ${state.isActiveId === user.id ? 'active' : ''}`} aria-current="true">
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">{user.name}</h5>
                    <h5 className="mb-1">{user.family}</h5>
                    <h6 style={{fontSize: '0.5rem'}}>3 days ago</h6>
                  </div>
                </a>
            </div>
        </div>
        )
    })

  return (
    <div className="offcanvas offcanvas-end h-100  bg-primary-subtle overflow-y-scroll p-1 w-75 " id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
           {userList}
            </div>
  )
}
