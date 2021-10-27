import React from "react";
import "../styles/DrawArea.css";
import WhiteBoard from "./WhiteBoard";

class DrawArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: "#000000",
      size: "5",
    };
  }

  changeColor(props) {
    this.setState({
      size: props.target.value,
    });
  }

  changeSize(props) {
    this.setState({
      color: props.target.value,
    });
  }

  render() {
    return (
      <div className="DrawArea">
        <div className="BoardContainer">
          <WhiteBoard
            color={this.state.color}
            size={this.state.size}
          ></WhiteBoard>
        </div>
        <div className="tools">
          <div className="ColorSelector">
            Select Color : &nbsp;
            <input
              type="color"
              value={this.state.color}
              onChange={this.changeColor.bind(this)}
            />
          </div>
          <div className="SizeSelector">
            Select brush size : &nbsp;
            <select
              value={this.state.size}
              onChange={this.changeSize.bind(this)}
            >
              <option>5</option>
              <option>10</option>
              <option>15</option>
              <option>20</option>
              <option>25</option>
            </select>
          </div>
        </div>
      </div>
    );
  }
}

export default DrawArea;
