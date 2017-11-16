import React, { Component } from 'react';
import { connect } from "redux-zero/react";
import {
    BrowserRouter,
    NavLink,
    Route,
    Redirect,
    Switch} from 'react-router-dom';
import './css/app.css';
import {SignIn} from './SignIn';
import {SignUp} from './SignUp';
import {MyBoards} from './MyBoards';
import {Details} from './BoardDetail';
const App = ({myBoard, newBoard,  selected}) => {
return (
    <div className="container">
        <Header />
        {/* <div>
            <NavLink className="btn" to="/sign_in" >Sign in</NavLink>
            <NavLink className="btn" to="/sign_up" > Sign Up </NavLink>
        </div> */}
        <BrowserRouter>
            <Switch>
                    <Route exact path="/" render={() => <SignIn myBoard={myBoard} selected={selected} />}/>
                    <Route path="/sign_up" render={() => <SignUp myBoard={myBoard} selected={selected} />}/>
                    <Route path="/sign_in"  render={() => <SignIn myBoard={myBoard} selected={selected} />}/>
                    <Route path="/myboard"  render={() => <MyBoards myBoard={myBoard} newBoard={newBoard} selected={selected} />}/>
                    <Route path="/details"  render={() => <Details myBoard={myBoard}  selected={selected} />}/>
                    <Route path='/trello-redux' render={() => <Redirect to="/sign_in"/>}/>
            </Switch>
        </BrowserRouter>
    </div>
)
}
const Header = () => {
    return (
        <div>
            <img className="logo" src="https://phoenix-trello.herokuapp.com/images/logo-11ecccd65d1c7977997eb6f0bc0002ad.png?vsn=d" />
        </div>
    )
}
const mapToProps = ({myBoard, newBoard,  selected}) => ({myBoard, newBoard,  selected});

export default connect(mapToProps)(App);