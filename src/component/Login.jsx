
import { useState,useContext } from 'react';
import './login.css';
import LoginModalForgetPassword from './LoginModalForgetPassword';
import LoginModalSignIn from './LoginModalSignIn';
import {userContext} from '../context/usersContext';
import axios from 'axios';


export default function Login() {
    const{dispatch,state} = useContext(userContext);
    const[username,setUsername] = useState('');
    const[error,setError] = useState('');
    const[password,setPassword] = useState('');
    const form ={
        username : username,
        password : password
    }
    const handleLogin = async ()=>{
        try{
        const res1 = await axios.post('http://huch.local/wp-json/jwt-auth/v1/token',form);
        if(res1.data.token){
            localStorage.setItem('token',res1.data.token);
            
            const res = await axios.post('http://huch.local/wp-json/huch/v1/login', form);
            
            dispatch({type : 'LOGIN', payload : res.data.user});
        }

        }catch(err){
                if(err.response?.data?.message){
                    setError(err.response.data.message)
                }else{
                    setError('مشکلی پیش آمده')
                }
        }
    }


    return(
        //  start login form 
        <div className="container" style={{direction:'rtl'}}>
           <div className="row">
               <div className="col text-center mt-5">
                   <form action="" className="d-flex flex-column w-50 mx-auto mt-3">
                       <input onChange={(e)=>{setUsername(e.target.value)}} value={username} type="text" placeholder="نام کاربری" className="border-0 border-bottom p-2 w-50 mx-auto my-2"/>
                       <input onChange={(e)=>{setPassword(e.target.value)}} value={password}  type="password" placeholder="رمز عبور" className="border-0 border-bottom p-2 w-50 mx-auto my-2"/>
                       {error && <p>{error}</p>}
                       <button onClick={handleLogin} type="button" className="btn btn-outline-primary btn-sm pb-2 px-5 w-25 mx-auto my-4">ورود</button>
               </form>
                   <section className="d-flex justify-content-center mt-5">
                       <div className="d-flex flex-column">
                           <label htmlFor="btn-user-form" className="text-secondary text-opacity-50" style={{fontSize: 0.8 + 'rem'}}>حساب کاربری ندارم!</label>
                           <button id="btn-user-form" type="button" className="btn btn-light btn-sm px-5 py-2 m-2"  data-bs-target="#urerlogin" data-bs-toggle="modal">ایجاد حساب کاربری</button>
                        </div>
                        <div className="d-flex flex-column">
                           <label htmlFor="btn-user-form" className="text-secondary text-opacity-50"  style={{fontSize: 0.7 + 'rem'}}>رمز خود را فراموش کرده ام</label>
                           <button type="button" className="btn btn-light btn-sm px-5 py-2 m-2" data-bs-target="#passwordlogin" data-bs-toggle="modal">فراموشی رمز عبور</button>
                        </div>
                   </section>
                </div>
           </div>
 
           <LoginModalSignIn/>
           <LoginModalForgetPassword/>

        </div>
    );
};
