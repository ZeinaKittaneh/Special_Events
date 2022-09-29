import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider, ReactReduxContext } from 'react-redux';// keep track of store state from anywhere inside the app
//import {createStore, applyMiddleware, compose} from 'redux';
import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk';
import reducers from './reducers';
import './index.css'

const store = configureStore({reducer: reducers});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
        <App />
    </Provider>,
);