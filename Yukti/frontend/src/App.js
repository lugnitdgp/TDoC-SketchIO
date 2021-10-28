import React from "react";

import { BrowserRouter as Router, Route } from "react-router-dom";

import Join from "./components/Join/Join";
import Chat from "./components/Chat/Chat";
import DrawArea from "./components/DrawArea";
import LeaderBoard from "./components/LeaderBoard";

const App = () => (
  <Router>
    <Route path="/" exact component={LeaderBoard} />
  </Router>
);

/*
function App() {
  return <LeaderBoard />;
  //return <DrawArea />;
}

/*  <Route path="/chat" exact component={Chat} /> 
 <Route path="/" exact component={Join} />
 <Route path="/drawarea" exact component={DrawArea} />

    <Route path="/leaderboard" exact component={LeaderBoard} />
*/

export default App;
