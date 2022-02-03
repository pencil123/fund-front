import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Index from "./page/Index";
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Index} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
