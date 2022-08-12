import React, { Fragment } from "react";
import { BrowserRouter as Router} from "react-router-dom";
import GlobleStyle from "./GlobalStyle";
import { AppRouter } from "./AppRouter";

import "./index.css";

function App() {
  return (
    <GlobleStyle>
      <Router>
        <Fragment>
          <AppRouter></AppRouter>
        </Fragment>
      </Router>
    </GlobleStyle>
  );
}

export default App;
