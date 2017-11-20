import store from './store'
import { auth, database } from './firebase';
import { readAllBoards } from './actions';

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
            database
                .ref('users/' + user.uid)
                .set(newuser);

            // database.ref ('users/' + user.uid + '/options').update ( 'option1, option2,
            // option3...');  database.ref ('users/').push (newuser);

            database
                .ref('users/' + user.uid)
                .once('value')
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
    })
}

export function signIn(user, pass) {
    auth
        .signInWithEmailAndPassword(user, pass)
        .then(userObj => {
            store.setState({
                user: {
                    id: user.uid,
                }
            });
            readAllBoards()

            // database
            //     .ref('users/' + userObj.uid)
            //     .once('value')
            //     .then(res => {
            //         const fullUserInfo = res.val();

            //         console.log('full info ', fullUserInfo);
            //         store.setState({
            //             user: {
            //                 id: userObj.uid,
            //                 email: fullUserInfo.email,
            //                 fullname: fullUserInfo.fullname,
            //                 survey: fullUserInfo.survey,
            //                 question: fullUserInfo.question,
            //                 options: fullUserInfo.options
            //             }
            //         })
            //     })
        })
}

auth.onAuthStateChanged(user => {
    if (user) {
        console.log('user', user);
        let usersRef = database.ref('/users');
        let userRef = usersRef.child(user.uid);
        // console.log('user2', user.uid);
        store.setState({ successLogin: true })

        store.setState({
            user: {
                id: user.uid,
            }
        });
        readAllBoards()
    }
});