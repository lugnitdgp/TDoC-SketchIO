import Chat from './Components/Chat/Chat';
import Join from './Components/Join/Join';

import { BrowserRouter as Router, Route } from "react-router-dom";
import DrawArea from './Components/DrawArea/DrawArea';
const home = () => {
  return(
    <>
    <Chat/>
    <DrawArea/>
    </>
  )
}
const App = () => {

  return (
    <>
      <Router>
        <Route path="/" exact component={Join} />
        <Route path="/chat" component={Chat} />
        <Route path="/chat" component={DrawArea}/>
      </Router>
    </>
  );
}



export default App;