import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from "react-redux"
// import {BrowserRouter} from "react-router-dom";
// import rootReducer from "./reducers/rootReducer";
// import CryptoJS from 'crypto-js';
import store from '../src/redux/store'


ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>,
document.getElementById('root'));