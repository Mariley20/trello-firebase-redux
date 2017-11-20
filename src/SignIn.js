import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import {signIn} from './actionsLogin'
// import { Button, Form, FormControl, FormGroup, Col, Checkbox } from 'react-bootstrap';

export const SignIn = ({successLogin, SignUp}) => {
    return(
       <div className="App">
      {successLogin && <Redirect to="/home"/>}
      <h1>
        Kahoot Survey Admin
      </h1>
      <form
        onSubmit=
        { e => { e.preventDefault(); signIn ( this.emailInputRef.value, this.passwordInputRef.value) } }>
        <input placeholder="email" ref= { e => this.emailInputRef = e}/>
        <input
          type="password"
          placeholder="password"
          ref=
          { e => this.passwordInputRef = e}/>
        <button type="submit">
          Login
        </button>
      </form>
      <SignUp successLogin={successLogin} />
    </div>
    )
}