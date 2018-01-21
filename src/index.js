import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import burgerBuilder from './store/reducers/burgerBuilder';
import orderReducer from './store/reducers/order';

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
