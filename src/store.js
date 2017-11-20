import createStore from "redux-zero";
let board = [];

let myBoard = [{
    id: '--Kz32ehT782uHM0LLxww',
    newList: false,
    title: "Portafolio2",
    list: [{
            titleList: "Lista 1",
            newCard: false,
            cards: [{
                cardTitle: "Cards 1",
                commentary: "una lista genial"
            }]
        },
        {
            titleList: "Lista 2",
            newCard: false,
            cards: [{
                cardTitle: "Cards 12",
                commentary: "una lista genial"
            }]
        }
    ]
}]
const initialState = {
    board: board,
    myBoard: myBoard,
    newBoard: false,
    selected: 0,
successLogin : false,
user : {
    id: null,
    email: null,
    fullname: null,
    survey: null
}
};

const store = createStore(initialState);
export default store;