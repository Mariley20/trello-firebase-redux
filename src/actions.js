import store from './store';
import firebase from 'firebase';
import { auth, database } from './firebase';

const snapshotToArray = (snapshot, userID) => {
    let boardArray = []
    snapshot.forEach(childSnapshot => {
        let item = childSnapshot.val();
        let id = childSnapshot.key;
        item.id = id;
        // addList
        database.ref('users/' + userID + '/trello/' + id + '/stage/').once('value', res => {
            let listOfObjs = [];
            res.forEach(item => {
                let obj = item.val();
                let idList = item.key;
                obj.id = item.key;
                //add Cards
                database.ref('users/' + userID + '/trello/' + id + '/stage/' + idList + '/task/')
                    .once('value', task => {
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
    // clone = boardArray;
    store.setState({
        myBoard: boardArray
    });
    console.log('board', store.getState().myBoard);
}
export const readAllBoards = () => {
    let userID = store.getState().user.id;
    // console.log('useid-', userID)
    database
        .ref('users/' + userID + '/trello/')
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
        readAllBoards()
            // console.log('userID', store.getState().user.id);
        let boardID = [...store.getState().myBoard].length;
        const userID = store.getState().user.id
        if (title != "") {
            const keyBoard = database.ref('users/' + userID + '/trello').push({
                title: title
            }).key;


            // const cloneList = [...store.getState().myBoard];
            // let newBoard = {
            //     id: keyBoard,
            //     title: title,
            //     newList: false,
            //     stage: []
            // }
            // cloneList.push(newBoard);
            // store.setState({
            //     myBoard: cloneList
            // });
        }
        evaluateAddBoard(selected);
    }
    // database.ref('users/oacsa').once('value').then(res => {res.val})

export const addList = (title, selected) => {
    const userID = store.getState().user.id;
    let listID = store.getState().myBoard[selected].stage.length;
    const boardID = [...store.getState().myBoard].length
    const idd = store.getState().myBoard[selected].id;
    if (title != "") {
        const idList = database.ref('users/' + userID + '/trello/' + idd + "/stage").push({
            titleList: title,
        }).key;


        // let newVal = {
        //     id: idList,
        //     titleList: title,
        //     newCard: false,
        //     cards: []
        // }
        // const cloneList = [...store.getState().myBoard];
        // cloneList[selected].stage.push(newVal);

        // store.setState({
        //     myBoard: cloneList
        // });
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

export const addCard = (card, selected, index) => {

        if (card != "") {
            // readAllBoards()
            let userID = store.getState().user.id;
            const idBoard = store.getState().myBoard[selected].id;
            const idList = store.getState().myBoard[selected].stage[index].id;
            // let cardID = store.getState().myBoard[selected].stage.length;


            database.ref('users/' + userID + '/trello/' + idBoard + "/stage/" + idList + "/task").push({
                cardTitle: card,
            })

            // const cloneList = [...store.getState().myBoard];
            // let newCard = {
            //     cardTitle: card,
            // }
            // cloneList[selected].list[index].cards.push(newCard);
            // store.setState({
            //     myBoard: cloneList
            // });
            evaluateAddCard(selected, index);
        }
    }
    /*-------------------------------         LOGIN ---------------------------*/

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

            database.ref('users/' + user.uid).on('value')
                .then(res => {
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
            console.log('estasIngresando', store.getState().successLogin)
            readAllBoards()
        }
    });
}
success();