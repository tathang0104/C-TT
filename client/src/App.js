import React, { Fragment } from "react";
import { BrowserRouter as Router} from "react-router-dom";
import GlobleStyle from "./GlobalStyle";
import { AppRouter } from "./AppRouter";
import { CartProvider } from "./CartContext";
import { Provider } from "react-redux"
import { createStore, applyMiddleware } from "redux"
import createSagaMiddleware from "redux-saga"
import reducers from "./redux/reducers";
// import ProductSaga from "./redux/sagas";
import ProductSaga from "./redux/sagas/product";
import UserSaga from "./redux/sagas/user";
import OrderSaga from "./redux/sagas/order";
import "./index.css";

const sagaMiddleWare = createSagaMiddleware();

const store = createStore(reducers, applyMiddleware(sagaMiddleWare));

sagaMiddleWare.run(UserSaga);
sagaMiddleWare.run(ProductSaga);
sagaMiddleWare.run(OrderSaga);

function App() {
  return (
    <Provider store={store}>
      <CartProvider>
        <GlobleStyle>
          <Router>
            <Fragment>
              <AppRouter></AppRouter>
            </Fragment>
          </Router>
        </GlobleStyle>
      </CartProvider>
    </Provider>
  );
}

export default App;
