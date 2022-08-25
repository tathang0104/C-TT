import React, { Fragment } from "react";
import { BrowserRouter as Router} from "react-router-dom";
import GlobleStyle from "./GlobalStyle";
import { AppRouter } from "./AppRouter";
import { CartProvider } from "./CartContext";

import "./index.css";

function App() {
  return (
    <CartProvider>
      <GlobleStyle>
        <Router>
          <Fragment>
            <AppRouter></AppRouter>
          </Fragment>
        </Router>
      </GlobleStyle>
    </CartProvider>
  );
}

export default App;
