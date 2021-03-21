import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import RootReducers, { rootSaga } from './modules';
import reportWebVitals from './reportWebVitals';
import App from './App';

const DEV_MODE = true;
const sagaMiddleware = createSagaMiddleware();

const DevTool = DEV_MODE ? composeWithDevTools(applyMiddleware(sagaMiddleware)) : applyMiddleware(sagaMiddleware)

const store = createStore(
  RootReducers,
  DevTool
);

sagaMiddleware.run(rootSaga);

ReactDOM.render((
  <Provider store={store}>
    <BrowserRouter>
        <App />
    </BrowserRouter>
  </Provider>
), document.getElementById('root'));

reportWebVitals();
