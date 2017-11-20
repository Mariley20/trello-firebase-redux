import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import {signUp} from './actions';
import './css/app.css';

export const SignUp = ({successLogin}) => {
    return(
        <div className='container'>
        {
           successLogin  && <Redirect to = "/home" />
        }
        <form className='demoForm' onSubmit =  {
           e => {
              e.preventDefault();
              signUp (this.fullNameRef.value, this.emailRef.value, this.passwordRef.value, this.surveyRef.value) 
           }
        }>

        <div className='form-group'>
		        <div className='input-group'>
		        <span className="input-group-addon"><i className="fa fa-key fa-fw lock"></i></span>
               <input type="text" className="form-control inputName" name="password"
                        placeholder="FullName" ref = {e => this.fullNameRef = e} />
			      </div>
        </div>
        <div className='form-group'>
		        <div className='input-group'>
		        <span className="input-group-addon"><i className="fa fa-key fa-fw lock"></i></span>
               <input type="email" className="form-control inputName" 
                        placeholder="Email" ref = {e => this.emailRef = e} />
			      </div>
        </div>
        <div className='form-group'>
		        <div className='input-group'>
		        <span className="input-group-addon"><i className="fa fa-key fa-fw lock"></i></span>
               <input type="password" className="form-control inputName" name="password"
                        placeholder="Email" ref = {e => this.passwordRef = e} />
			      </div>
        </div>
        <div className='form-group'>
		        <div className='input-group'>
		        <span className="input-group-addon"><i className="fa fa-key fa-fw lock"></i></span>
               <input type="text" className="form-control inputName" 
                        placeholder="survey" ref = {e => this.surveyRef = e} />
			      </div>
        </div>
      
         
          <button type="submit">
             Sign Up!
          </button>
        </form>
     </div>
    )
}