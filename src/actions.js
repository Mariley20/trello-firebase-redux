import store from './store';
import firebase from 'firebase';
import { auth, database } from './firebase';

const snapshotToArray = (snapshot, userID) => {
    let boardArray = []
    snapshot.forEach(childSnapshot => {
        let item = childSnapshot.val();
        let id = childSnapshot.key;
        item.id = id;
        database.ref('users/' + userID + '/trello/' + id + '/stage/').on('value', res => {
            let listOfObjs = [];
            res.forEach(item => {
                let obj = item.val();
                let idList = item.key;
                obj.id = item.key;
                //add Cards
                database.ref('users/' + userID + '/trello/' + id + '/stage/' + idList + '/task/')
                    .on('value', task => {
                        let taskObjs = [];
                        task.forEach(item => {
                            let tasks = item.val();
                            tasks.id = item.key;
                            taskObjs.push(tasks)
                        });

                        obj.task = taskObjs;
                        obj.newCard = false;
                    });

                listOfObjs.push(obj);
            })
            item.stage = listOfObjs;
            item.newList = false;
        });
        boardArray.push(item);
    });
    const clone = [...store.getState().myBoard];
    store.setState({
        myBoard: boardArray
    });
    console.log('board', store.getState().myBoard);
}
export const readAllBoards = () => {
    let userID = store.getState().user.id;
    database
        .ref('users/' + userID + '/trello/')
        .on('value', res => {
            snapshotToArray(res, userID)
        });
}
export const selectBoard = (index) => {
    store.setState({
        selected: index
    })
}
export const evaluateAddCard = (selected, index) => {
    let newVal = (store.getState().myBoard[selected].stage[index].newCard) ? false : true;
    const cloneList = [...store.getState().myBoard];
    cloneList[selected].stage[index].newCard = newVal;

    store.setState({
        myBoard: cloneList
    });
}
export const evaluateAddBoard = (selected) => {
    let newVal = (store.getState().newBoard) ? false : true;

    store.setState({
        newBoard: newVal
    });
}
export const addBoard = (title, selected) => {
    let boardID = [...store.getState().myBoard].length;
    const userID = store.getState().user.id
    if (title != "") {
        database.ref('users/' + userID + '/trello').push({
            title: title
        })
    }
    evaluateAddBoard(selected);
}

export const evaluateAddList = (selected) => {
    let newVal = (store.getState().myBoard[selected].newList) ? false : true;
    const cloneList = [...store.getState().myBoard];
    cloneList[selected].newList = newVal;

    store.setState({
        myBoard: cloneList
    });

}
export const addList = (title, selected) => {
    const userID = store.getState().user.id;
    let listID = store.getState().myBoard[selected].stage.length;
    const boardID = [...store.getState().myBoard].length
    const idd = store.getState().myBoard[selected].id;
    if (title != "") {
        database.ref('users/' + userID + '/trello/' + idd + "/stage").push({
            titleList: title,
        });
        evaluateAddList(selected);
    }

}

export const addCard = (card, selected, index) => {

        if (card != "") {
            let userID = store.getState().user.id;
            const idBoard = store.getState().myBoard[selected].id;
            const idList = store.getState().myBoard[selected].stage[index].id;

            database.ref('users/' + userID + '/trello/' + idBoard + "/stage/" + idList + "/task").push({
                cardTitle: card,
            })
            evaluateAddCard(selected, index);
        }
    }
    /*------------------------------- LOGIN ---------------------------*/

export function signUp(fullname, email, pass, survey) {
    console.log('signUp' + fullname + email + pass);
    auth
        .createUserWithEmailAndPassword(email, pass)
        .then(user => {
            let newuser = {
                fullname,
                email,
                survey,
            }
            database.ref('users/' + user.uid).set(newuser);

            database.ref('users/' + user.uid).on('value', res => {
                const fullUserInfo = res.val();

                console.log('full info ', fullUserInfo);
                store.setState({
                    user: {
                        id: user.uid,
                        email: fullUserInfo.email,
                        fullname: fullUserInfo.fullname,
                        survey: fullUserInfo.survey,
                    }
                })
            })

        })

}

export function signOut() {
    auth.signOut();
    store.setState({
        successLogin: false,
        user: {
            id: '',
            email: ''
        }
    });
    console.log('estasSaliendo', store.getState().successLogin)
}

export function signIn(user, pass) {
    auth.signInWithEmailAndPassword(user, pass).then(userObj => {
        database.ref('users/' + userObj.uid).once('value').then(res => {
            const fullUserInfo = res.val();
            store.setState({
                user: {
                    id: userObj.uid,
                    email: fullUserInfo.email,
                    fullname: fullUserInfo.fullname,
                    password: fullUserInfo.password,
                }
            })
            readAllBoards();
        })
    })
}

export const success = () => {
    auth.onAuthStateChanged(user => {
        if (user) {
            console.log('user', user);
            let usersRef = database.ref('users/').child(user.uid);

            store.setState({
                successLogin: true,
                user: {
                    id: user.uid,
                }
            });
            console.log('estas-Ingresando', store.getState().successLogin)
            readAllBoards()
        }
    });
}
success();