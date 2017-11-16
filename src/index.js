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
import  './css/app.css';
// import {SignIn} from './SignIn';
// import {SignUp} from './SignUp';
// import {MyBoards} from './MyBoards';
import registerServiceWorker from './registerServiceWorker';

const Index = () => (
    <Provider store={store}>
        <HashRouter>
            <Switch>
                    <Route exact path="/" component={App} />
            </Switch>
        </HashRouter>
    </Provider>
);
ReactDOM.render(<Index />, document.getElementById('root'));
registerServiceWorker();