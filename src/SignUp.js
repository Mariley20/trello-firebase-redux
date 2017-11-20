import React, { Component } from 'react';
// import { Button, Form, FormControl, FormGroup, Col, Checkbox } from 'react-bootstrap';
import {NavLink, Redirect} from 'react-router-dom';
import {signIn, signOut, signUp} from './actionsLogin'


export const SignUp =({myBoard, selected}) => {
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
              <input placeholder = "Question title" ref = {e => this.questionRef = e} />
              <input placeholder = "Options [array]" ref = {e => this.optionsRef = e} />
             
              <button type="submit">
                 Sign Up!
              </button>
            </form>
         </div>
    )
}