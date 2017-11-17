import store from './store';
import firebase from 'firebase';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyD3RT9dGPTVDtxeqdBSkJtO8WN3epjrnjE",
    authDomain: "fir-37152.firebaseapp.com",
    databaseURL: "https://fir-37152.firebaseio.com",
    projectId: "fir-37152",
    storageBucket: "fir-37152.appspot.com",
    messagingSenderId: "505773939781"
};
firebase.initializeApp(config);

const snapshotToArray = snapshot => {
    snapshot.forEach(childSnapshot => {
        let item = childSnapshot.val();
        let id = childSnapshot.key;
        item.id = id;
        const clone = [...store.getState().board]
        clone.push(item);
        store.setState({
            board: clone
        });

        // readAllList(id)
    });
    console.log('board', store.getState().board);
}

const demo = () => {
    console.log('entro')
    const clone = [...store.getState().board];
    clone.map((item, index) => {
        readAllList(item.id, index)
        item.list.map((item2, index2) => {
            readAllCard(item.id, index, item2.id, index2)
        });
    });
    console.log('board', store.getState().board);
}

const readAllCard = (id1, index1, id2, index2) => {
    console.log('id', id1, 'index', index1)
    console.log('id', id2, 'index', index2)


    firebase.database()
        .ref('trello/' + id1 + '/stage/' + id2)
        .once('value')
        .then(res => {
            let listOfObjs = [];
            res.forEach(item => {
                let obj = item.val();
                obj.id = item.key;
                listOfObjs.push(obj);
            })
            const clone = [...store.getState().board]
            clone.board[index1].list[index2] = listOfObjs;
            store.setState({
                board: clone
            });
            console.log('cards', listOfObjs)
        })
}

const readAllList = (id, index) => {
    console.log('id', id, 'index', index)
    firebase.database()
        .ref('trello/' + id + '/stage/')
        .once('value')
        .then(res => {
            let listOfObjs = [];
            res.forEach(item => {
                let obj = item.val();
                obj.id = item.key;
                listOfObjs.push(obj);
            })
            const clone = [...store.getState().board]
            clone.board[index].list = listOfObjs;
            store.setState({
                board: clone
            });
            console.log('listas', listOfObjs)
        })
}

export const readAllBoards = () => {
    firebase.database()
        .ref('trello/')
        .once('value')
        .then(res => {
            snapshotToArray(res)
        });
    demo()


    //     /*pasar el key por parametro*/
    // firebase.database()
    //     .ref('board/-Kz31pasbLxmMyAl6ZXA')
    //     .once('value')
    //     .then(res => {
    //         const list = res.val().list;
    //         let listOfObjs = [];
    //         list.forEach(item => {
    //                 let obj = item.val();
    //                 obj.id = item.key;
    //                 listOfObjs.push(item.val());
    //             })
    // store.set as.... 
    // })
}

export const selectBoard = (index) => {
        console.log("index", store.getState().myBoard)
        console.log("selected", store.getState().selected)
        store.setState({
            selected: index
        })
    }
    // export const addBoard = () => {

// }
export const evaluateAddCard = (selected, index) => {
    let newVal = (store.getState().myBoard[selected].list[index].newCard) ? false : true;
    const cloneList = [...store.getState().myBoard];
    cloneList[selected].list[index].newCard = newVal;

    store.setState({
        myBoard: cloneList
    });
}
export const addCard = (card, selected, index) => {
    if (card != "") {
        const idBoard = store.getState().myBoard[selected].id;
        const idList = store.getState().myBoard[selected].list[index].id;

        firebase.database().ref('trello/' + idBoard + "/stage/" + idList + "/task/").push({
            cardTitle: card,
        })

        const cloneList = [...store.getState().myBoard];
        let newCard = {
            cardTitle: card,
            commentary: []
        }
        cloneList[selected].list[index].cards.push(newCard);
        store.setState({
            myBoard: cloneList
        });
        // console.log("clonelist", cloneList);
        evaluateAddCard(selected, index);
    }
}
export const addBoard = (title, selected) => {
        if (title != "") {


            const keyBoard = firebase.database().ref('trello').push({
                title: title
            }).key;


            const cloneList = [...store.getState().myBoard];
            let newBoard = {
                id: keyBoard,
                title: title,
                list: []
            }
            cloneList.push(newBoard);
            store.setState({
                myBoard: cloneList
            });
        }
        evaluateAddBoard(selected);
    }
    // firebase.database().ref('users/oacsa').once('value').then(res => {res.val})
export const evaluateAddBoard = (selected) => {
    let newVal = (store.getState().newBoard) ? false : true;

    store.setState({
        newBoard: newVal
    });
}
export const addList = (title, selected) => {
    console.log('title', title, 'selected', selected);
    const idd = store.getState().myBoard[selected].id;
    if (title != "") {


        const idCard = firebase.database().ref('trello/' + idd + "/stage/").push({
            titleList: title,
        }).key;


        let newVal = {
            id: idCard,
            titleList: title,
            newCard: false,
            cards: []
        }
        const cloneList = [...store.getState().myBoard];
        cloneList[selected].list.push(newVal);

        store.setState({
            myBoard: cloneList
        });
    }
    evaluateAddList(selected);
}
export const evaluateAddList = (selected) => {
    let newVal = (store.getState().myBoard[selected].newList) ? false : true;
    const cloneList = [...store.getState().myBoard];
    cloneList[selected].newList = newVal;

    store.setState({
        myBoard: cloneList
    });

}