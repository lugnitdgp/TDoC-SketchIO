import "../styles/LeaderBoard.css";
//var icon = require("./images/icon.jpg");   // <img src={icon} alt="" />

const LeaderBoard = ({ users = [{}, {}, {}] }) => {
  return (
    <div className="board">
      <h2>Welcome to the Leaderboard</h2>

      <div className="ranks">
        <ul className="ranklist">
          {users.map(({ name, points }, i) => (
            <li key={i} className="ranklistItem">
              <h4>{name}</h4>
              <p className="points">{points}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LeaderBoard;
