export default function LoginModalForgetPassword() {
    return(
        <div className="modal fade" id="passwordlogin" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel1">لطفا اطلاعات زیر را تکمیل کنید :</h1>
              {/* <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> */}
            </div>
            <div className="modal-body">
                <form className="row g-3">
                    <div className="col-md-6">
                      <label htmlFor="validationServerUsername" className="form-label">نام کاربری</label>
                      <div className="input-group has-validation">
                        {/* <span className="input-group-text" id="inputGroupPrepend3">@</span> */}
                        <input type="text" className="form-control is-invalid" id="validationServerUsername" aria-describedby="inputGroupPrepend3 validationServerUsernameFeedback" required />
                        <div id="validationServerUsernameFeedback" className="invalid-feedback">
                        لطفا نام کاربری خود را وارد کنید .
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="validationServer05" className="form-label">شماره موبایل</label>
                      <input type="email" className="form-control is-invalid" id="validationServer05" aria-describedby="validationServer05Feedback" required/>
                      <div id="validationServer05Feedback" className="invalid-feedback">
                       لطفا از ادغام حروف و اعداد استفاده کنید
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
