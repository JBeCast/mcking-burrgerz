import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import App from './App';
import burgerBuilder from './store/reducers/burgerBuilder';
import orderReducer from './store/reducers/order';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION__COMPOSE__ || compose;

const rootReducer = combineReducers({
  burgerBuilder: burgerBuilder,
  order: orderReducer
})

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);


// The provider should wrap everything
const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
  
)

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
