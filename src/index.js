import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'redux-zero/react';
import {
    HashRouter,
    Route,
    Switch
} from 'react-router-dom';
import store from "./store";
import App from './App';
import {readAllBoards} from './actions';
import  './css/app.css';
// import {SignIn} from './SignIn';
// import {SignUp} from './SignUp';
// import {MyBoards} from './MyBoards';
import registerServiceWorker from './registerServiceWorker';

const Index = () => (
    <Provider store={store}>
       <App />
    </Provider>
);
readAllBoards()
ReactDOM.render(<Index />, document.getElementById('root'));
registerServiceWorker();