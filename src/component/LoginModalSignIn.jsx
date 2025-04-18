import axios from "axios";
import { useState } from "react";

export default function LoginModalSignIn() {

    const[name,setName]=useState('');
    const[family,setFamily]=useState('');
    const[mobile,setMobile]=useState('');
    const[email,setEmail]=useState('');
    const[username,setUsername]=useState('');
    const[password,setPassword]=useState('');
    const IranMobile = /^(\+98|0)?9\d{9}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const usernameRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

    const form = {
        name : name,
        family : family,
        mobile : mobile,
        email : email,
        username : username,
        password : password
    }
  
    const handleSubmit = async (e)=>{
       e.preventDefault();
       try{
            const res = await axios.post('http://huch.local/wp-json/huch/v1/register',form);
            if(res.data.status === 'success'){
            alert('ایول ok شد')
            window.location.reload();
            }
       }catch(err){
          if(err.response && err.response.data && err.response.data.message){

            alert(err.response.data.message)
          }
       }
      
    };




    return(
        <div className="modal fade" id="urerlogin" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">لطفا اطلاعات زیر را تکمیل کنید :</h1>
              {/* <button type="button" className="btn-close ms-5" data-bs-dismiss="modal" aria-label="Close"></button> */}
            </div>
            <div className="modal-body">
                <form className="row g-3" onSubmit={handleSubmit}>
                    <div className="col-md-6">
                      <label htmlFor="validationServer01" className="form-label">نام</label>
                      <input onChange={(e)=>{setName(e.target.value)}} type="text" className={`form-control ${name ?'is-valid' :'is-invalid'} `} id="validationServer01" value={name} required/>
                      <div className={` ${name ?'valid-feedback' :''} `}>
                        {name ? 'چه نام زیبایی' :
                        <span style={{color:'rgb(180,0,0)'}}>نام خود را وارد کنید</span>
                    }
                      </div>
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="validationServer02" className="form-label">نام خانوادگی</label>
                      <input  onChange={(e)=>{setFamily(e.target.value)}} type="text" className={`form-control ${family ?'is-valid' :'is-invalid'} `} id="validationServer02" value={family} required/>
                      <div className={` ${family ?'valid-feedback' :''} `}>
                        {family ? 'خوشبختم' :
                        <span style={{color:'rgb(180,0,0)'}}>نام خانوادگی خود را وارد کنید</span>
                    }
                      </div>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="validationServer03" className="form-label">شماره موبایل</label>
                        <input onChange={(e)=>{setMobile(e.target.value)}} type="tel" className={`form-control ${IranMobile.test(mobile) ?'is-valid' :'is-invalid'} `} id="validationServer03" value={mobile} pattern="(\+98|0)?9\d{9}" required/>
                        <div className={` ${IranMobile.test(mobile) ?'valid-feedback' :''} `} >
                          {IranMobile.test(mobile) ? 'ok' :
                          <span style={{color:'rgb(180,0,0)'}}>شماره موبایل معتبر وارد کنید</span>
                           }
                      </div>
                      </div>
                    <div className="col-md-6">
                        <label htmlFor="validationServer04" className="form-label">ایمیل (اختیاری)</label>
                        <input  onChange={(e)=>{setEmail(e.target.value)}} type="email" className={`form-control ${emailRegex.test(email) ?'is-valid' :'is-invalid'} `}  id="validationServer04" value={email} />
                        <div className={` ${ emailRegex.test(email)?'valid-feedback' :''} `}>
                        {emailRegex.test(email) ? 'ok' :
                        <span style={{color:'rgb(180,0,0)'}}>ایمیل معتبر وارد کنید</span>
                    }
                      </div>
                      </div>
                    <div className="col-md-6">
                      <label htmlFor="Username" className="form-label">نام کاربری</label>
                        <input  onChange={(e)=>{setUsername(e.target.value)}} type="text" className={`form-control ${usernameRegex.test(username) ?'is-valid' :'is-invalid'} `} id="Username"  value={username} pattern="(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}" required/>
                        <div className={` ${usernameRegex.test(username) ?'valid-feedback' :''} `}>
                        {usernameRegex.test(username) ? 'ok' :
                        <span style={{color:'rgb(180,0,0)'}}>مخلوط حروف و اعداد انگلیسی و حداقل 8 کارکتر</span>
                    }
                      </div>
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="Password" className="form-label">رمز عبور</label>
                      <input  onChange={(e)=>{setPassword(e.target.value)}} type="text" className={`form-control ${usernameRegex.test(password) ?'is-valid' :'is-invalid'} `} id="Password"  value={password} pattern="(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}" required/>
                      <div className={` ${usernameRegex.test(password) ?'valid-feedback' :''} `}>
                        {usernameRegex.test(password) ? 'ok' :
                        <span style={{color:'rgb(180,0,0)'}}>مخلوط حروف و اعداد انگلیسی و حداقل 8 کارکتر</span>
                    }
                      </div>
                      </div>
                    <div className="col">
                        <button className="btn btn-primary w-100" type="submit">تکمیل شد</button>
                      </div>
                
                  </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">خروج</button>
            </div>
          </div>
        </div>
      </div>
    )
};
