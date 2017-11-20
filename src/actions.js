import store from './store';
import firebase from 'firebase';
import {database} from './firebase';

const snapshotToArray = (snapshot, userID) => {
    snapshot.forEach(childSnapshot => {
        let item = childSnapshot.val();
        let id = childSnapshot.key;
        item.id = id;
        database.ref('users/'+userID+'/trello/' + id + '/stage/').once('value')
            .then(res => {
                let listOfObjs = [];
                res.forEach(item => {
                    let obj = item.val();
                    let idList = item.key;
                    obj.id = item.key;
                    database.ref('users/'+userID+'/trello/' + id + '/stage/' + idList + '/task/').once('value')
                        .then(task => {
                            let taskObjs = [];
                            task.forEach(item => {
                                let tasks = item.val();
                                tasks.id = item.key;
                                taskObjs.push(tasks)
                            });

                            obj.task = taskObjs;
                        });

                    listOfObjs.push(obj);
                })
                item.stage = listOfObjs;
            })

        const clone = [...store.getState().board]
        console.log('itemmm', item)
        clone.push(item);
        store.setState({
            board: clone
        });
    });
    console.log('board', store.getState().board);
}
export const readAllBoards = (userID) => {
    database
        .ref('users/'+userID+'/trello/')
        .once('value')
        .then(res => {
            snapshotToArray(res, userID)
        });
}

export const selectBoard = (index) => {
    // console.log("index", store.getState().myBoard)
    // console.log("selected", store.getState().selected)
    store.setState({
        selected: index
    })
}
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

        database.ref('trello/' + idBoard + "/stage/" + idList + "/task/").push({
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
    console.log('userID', store.getState().user.id);
    const userID = store.getState().user.id 
        if (title != "") {

            const keyBoard = database.ref('users/'+userID+'/trello').push({
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
    // database.ref('users/oacsa').once('value').then(res => {res.val})
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


        const idCard = database.ref('trello/' + idd + "/stage/").push({
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