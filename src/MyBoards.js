import React, { Component } from 'react';
import {NavLink, Redirect} from 'react-router-dom';
// import {signOut} from './actionsLogin';
import {readAllBoards, selectBoard, addBoard, evaluateAddBoard, signOut} from './actions';
// readAllBoards();
const ListBoard = ({myBoard, newBoard, selected}) => {
    let list = myBoard.map((item, index) => {
        return (
            <li className="boards" key={index}>
                <NavLink onClick={() => selectBoard(index)} to={"/details"}>{item.title}</NavLink>
            </li>
        )
    });
    return (
        <ul className="list-flex">{list}</ul>
    )
}
const AddBoardHMTL = ({newBoard, selected}) => {
    const onSubmit = (e) => {
		e.preventDefault();
		// console.log ( 'this..', this);//con truco, es el connect el this.
    addBoard(this.List.value, selected);
     this.List.value = "";
  }
    return(
        <div>
            <form onSubmit={onSubmit}className="boards">
        <div className="form-group">
          <textarea className="form-control inputList" ref={(e) => this.List = e} ></textarea> 
        </div>
        <button type="submit" className="btn btn-primary">Add</button>
        <button type="button" className="btn btn-default" onClick={() => evaluateAddBoard(selected)}>Cancel</button>
      </form> 
        </div>
    )
}
export const MyBoards = ({successLogin, myBoard, newBoard, selected}) => {
    return (
        <div>
            { !successLogin  && <Redirect to = "/sign_in" />}
            <button onClick = {signOut}>  SignOut </button>
            
            <ListBoard myBoard={myBoard} className="btn btn-secundary" selected={selected} />
            <div className="board">
            {!newBoard?
                <button onClick={() => evaluateAddBoard(selected)} className="btn btn-add">add Board</button>
            :
                <AddBoardHMTL newBoard={newBoard} selected={selected} />
            }
            </div>
        </div>
    )
}

