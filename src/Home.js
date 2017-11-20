import React, {Component} from 'react';
// import { Button, Form, FormControl, FormGroup, Col, Checkbox } from
// 'react-bootstrap';
import {Redirect} from 'react-router-dom';
import {signOut} from './actionsLogin'
export const Home  = ({successLogin, user}) => {
    return (
      <div className="App">
         {
            !successLogin  && <Redirect to = "/login" />
         }
         <h1> Kahoot Survey Admin </h1>
         <button onClick = {signOut}>
            SignOut
         </button>   
            <div>
                 {user.email} - {user.fullname} - {user.survey} -  {user.question} - {user.options} 
            </div>
            <Redirect to = "/myboard" />
      </div>
    );
}