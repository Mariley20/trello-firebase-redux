import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {evaluateAddList, addList, evaluateAddCard, addCard} from './actions';

const ListCards = ({myCard}) => {
    let list = myCard.map((item, index) => {
            return (
                <li className="cards" key={index}>
                    {item.cardTitle}
                </li>
            )
        });
        return (
            <div><ul>{list}</ul></div>
        )
}
const AddCardsHTML = ({selected, index}) =>{
    const onSubmit = (e) => {
		e.preventDefault();
		// console.log ( 'this..', this);//con truco, es el connect el this.
    addCard(this.card.value, selected, index );
     this.card.value = "";
  }
    return(
        <form onSubmit = {onSubmit}>
        <div className="form-group">
          <textarea className="form-control inputcard" ref={(e) => this.card = e} ></textarea> 
        </div>
        <button type="submit" className="btn btn-primary">Add</button>
        <button type="button" onClick={() => evaluateAddCard(selected, index)} className="btn btn-default" >Cancel</button>
      </form> 
    )
}
const ListHomework = ({myList, selected}) => {
    let list = myList.list.map((item, index) => {
        return (
            <div className="boards" key={index}>
                <h3>{item.titleList}</h3>
                <ListCards myCard={item.cards}/>
                {!item.newCard?
                    <a onClick={() => evaluateAddCard(selected, index)} >add a new Card </a>
                    :
                    <AddCardsHTML selected={selected} index={index} />
                }            
            </div>
        )
    });
    return (
        <div className="list-flex">{list}
        <div >
            {!myList.newList?
                <button type="text" onClick={() => evaluateAddList(selected)} className="btn btn-add">add List</button>
            :
                <AddListHMTL newBoard={myList.newList} className="btn btn-secundary" selected={selected} />
            }
            </div>
        </div>
    )
}
const AddListHMTL = ({newBoard, selected}) => {
    const onSubmit = (e) => {
		e.preventDefault();
		console.log ( 'this..', this);//con truco, es el connect el this.
    addList(this.List.value, selected);
     this.List.value = "";
  }
    return(
            <form onSubmit={onSubmit} className="boards">
        <div className="form-group">
          <textarea className="form-control inputList" ref={(e) => this.List = e} ></textarea> 
        </div>
        <button type="submit" className="btn btn-primary">Add</button>
        <button type="button" onClick={() => evaluateAddList(selected)} className="btn btn-default" >Cancel</button>
      </form> 
    )
}
export const Details = ({myBoard, selected}) => {
    return (
        <div>
           <h2> Hola Detalles {selected} </h2>
            <ListHomework myList={myBoard[selected]} selected={selected} />
            
        </div>
    )
}
