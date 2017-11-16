import createStore from "redux-zero";
let board = [];

let myBoard = [{
        id:'-Kz31pasbLxmMyAl6ZXA',
        newList: false,
        title: "Portafolio",
        list: [{
                titleList: "Lista 1",
                newCard: false,
                cards: [{
                        cardTitle: "Card 1",
                        commentary: "una lista genial"
                    },
                    {
                        cardTitle: "Card 2",
                        commentary: "una lista genial"
                    }
                ]
            },
            {
                titleList: "Lista 2",
                newCard: false,
                cards: [{
                    cardTitle: "Cards 1",
                    commentary: "una lista genial"
                }]
            },
            {
                titleList: "Lista 3",
                newCard: false,
                cards: [{
                    cardTitle: "Cards 1",
                    commentary: "una lista genial"
                }]
            }
        ]
    },
    {
        id:'--Kz32ehT782uHM0LLxww',
        newList: false,
        title: "Portafolio2",
        list: [{
                titleList: "Lista 1",
                newCard: false,
                cards: [{
                    cardTitle: "Cards 2312",
                    commentary: "una lista genial"
                }]
            },
            {
                titleList: "Lista 2",
                newCard: false,
                cards: [{
                    cardTitle: "Cards 2312",
                    commentary: "una lista genial"
                }]
            }
        ]
    }
]
const initialState = {
    board:board,
    myBoard: myBoard,
    newBoard: false,
    selected: 0,
};

const store = createStore(initialState);
export default store;