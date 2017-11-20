import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import {signUp} from './actionsLogin';

export const SignUp = ({successLogin}) => {
    return(
        <div>
            {
               successLogin  && <Redirect to = "/home" />
            }
            <form onSubmit =  {
               e => {
                  e.preventDefault();
                  signUp (this.fullNameRef.value, this.emailRef.value, this.passwordRef.value, this.surveyRef.value, this.questionRef.value, this.optionsRef.value) 
               }
            }>
              <input placeholder = "FullName" ref = {e => this.fullNameRef = e} />
              <input placeholder = "Email" ref = {e => this.emailRef = e}/>
              <input type="password" placeholder = "Password" ref = {e => this.passwordRef = e}/>
              <input placeholder = "Survey title" ref = {e => this.surveyRef = e} />
             
              <button type="submit">
                 Sign Up!
              </button>
            </form>
         </div>
    )
}