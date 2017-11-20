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
const App = ({myBoard, newBoard, selected, successLogin, user}) => {
return (
    <div className="container">
        <Header />
        {/* <div>
            <NavLink className="btn" to="/sign_in" >Sign in</NavLink>
            <NavLink className="btn" to="/sign_up" > Sign Up </NavLink>
        </div> */}
        <BrowserRouter>
            <Switch>
                    <Route name="home"  exact path = "/home" render={() => <Home successLogin={successLogin} user={user}/>}/>
                    <Route path="/sign_up" render={() => <SignUp successLogin={successLogin} />}/>
                    <Route path="/sign_in"  render={() => <SignIn successLogin={successLogin} />}/>
                    <Route path="/myboard"  render={() => <MyBoards myBoard={myBoard} newBoard={newBoard} selected={selected} />}/>
                    <Route path="/details"  render={() => <Details myBoard={myBoard}  selected={selected} />}/>
                    <Route exact path="/" render={() => <SignIn successLogin={successLogin} />}/>
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
const mapToProps = ({myBoard, newBoard, selected, successLogin, user}) => ({myBoard, newBoard, selected, successLogin, user});

export default connect(mapToProps)(App);