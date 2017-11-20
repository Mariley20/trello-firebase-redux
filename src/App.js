import React, { Component } from 'react';
import { connect } from "redux-zero/react";
import {
    HashRouter,
    NavLink,
    Route,
    Redirect,
    Switch} from 'react-router-dom';
import './css/app.css';
import {Home} from './Home';
import {SignIn} from './SignIn';
import {SignUp} from './SignUp';
import {MyBoards} from './MyBoards';
// import {readAllBoards} from './actions';
import {Details} from './BoardDetail';
// import {signOut} from './actionsLogin'
// readAllBoards();
const App = ({myBoard, newBoard, selected, successLogin, user}) => {
return (
    <div className="container">

        <Header />
        <HashRouter>
            <Switch>
                    <Route path = "/home" render={() => <Home successLogin={successLogin} user={user}/>}/>
                    <Route path="/sign_up" render={() => <SignUp successLogin={successLogin} />}/>
                    <Route path="/sign_in"  render={() => <SignIn successLogin={successLogin} SignUp={SignUp} />}/>
                    <Route path="/myboard"  render={() => <MyBoards successLogin={successLogin} myBoard={myBoard} newBoard={newBoard} selected={selected} />}/>
                    <Route path="/details"  render={() => <Details successLogin={successLogin} myBoard={myBoard}  selected={selected} />}/>
                    <Route path='/trello-firebase-redux' render={() => <Redirect to="/sign_in"/>}/>
                    <Route exact path="/" render={() => <Redirect to="/sign_in"/>}/>
            </Switch>
        </HashRouter>
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