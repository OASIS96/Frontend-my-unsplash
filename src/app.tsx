import React from "react";
import { MainPage } from "./pages/Main.page";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Pusher from "pusher-js";

const pusher = new Pusher("b5119dada49563d92ee4", {
  cluster: "us2",
});

export const channel = pusher.subscribe("my-unsplash-channel");

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" component={MainPage}></Route>
      </Switch>
    </Router>
  );
};

export default App;
