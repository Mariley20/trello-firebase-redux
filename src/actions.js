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
    console.log('object', snapshot);
    snapshot.forEach(childSnapshot => {
        let item = childSnapshot.val();
        let id = childSnapshot.key;
        console.log('listi',childSnapshot.val().list)
        item.id = id;
        const clone = [...store.getState().board]
              
            // clone.board.list = readListCard('list',id)
        clone.push( item );
        store.setState({
            board: clone
        });
        // console.log('listas', readListCard('list', id, ))
    });
     console.log('board',store.getState().board);
}

const readListCard = (list) => {


}

export const readAllBoards = () =>{
    firebase.database()
    .ref('board/')
    .once('value')
    .then(res => {
        snapshotToArray(res)
    })
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
        firebase.database().ref('board/'+idBoard+"/list/"+idList+"/card/").push(
            {
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
        console.log("clonelist", cloneList);
        evaluateAddCard(selected, index);
    }
}
export const addBoard = (title, selected) => {
        if (title != "") {
            const keyBoard = firebase.database().ref('board').push({
                title:title
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
        const idCard = firebase.database().ref('board/'+idd+"/list/").push(
            {
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