///process/process.js that is displayed on the right side of the chat room. It displays the secret key used, encrypted and decrypted message.
//process.js displays the incoming encrypted and decrypted messages on the sidebar.
import "./process.scss";
import { useSelector } from "react-redux";
function Process() {
  // returns new state from the reducers
  const state = useSelector((state) => state.ProcessReducer);

  return (
    <div className="process">
      <h5>
        Secret Key : <span>"uI2ooxtwHeI6q69PS98fx9SWVGbpQohO"</span>
      </h5>
      <div className="incoming">
        <h4>Incoming Data</h4>
        <p>{state.cypher}</p>
      </div>
      <div className="crypt">
        <h4>Decypted Data</h4>
        <p>{state.text}</p>
      </div>
    </div>
  );
}
export default Process;