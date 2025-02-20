
import React, { useEffect,useContext } from 'react';
import { userContext } from '../context/usersContext';
import axios from 'axios';




export default function UsersNav() {
const{dispatch,state} = useContext(userContext);
const users = state.users;

useEffect(()=>{
  axios.get('https://jsonplaceholder.typicode.com/users')
  .then(response=>
    dispatch({type:'FETCH_USERS',
             payload : response.data}))
},[dispatch])


    const userList = users.map((user)=>{
        return(
            <div key={user.id} className="offcanvas-body p-0">
            <div className="list-group ">
                <a className="list-group-item list-group-item-action" aria-current="true">
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">{user.name}</h5>
                    <h6 style={{fontSize: '0.5rem'}}>3 days ago</h6>
                  </div>
                </a>
            </div>
        </div>
        )
    })

  return (
    <div className="offcanvas offcanvas-end h-100  bg-primary-subtle overflow-y-scroll p-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
      
           {userList}
            </div>
  )
}
