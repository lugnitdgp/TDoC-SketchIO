import React from 'react';
import '../styles/DrawArea.css';
import WhiteBoard from './WhiteBoard';

class DrawArea extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className = "DrawArea">
            <div className="BoardContainer">
              <WhiteBoard/>
            </div>
            <div className="ColorSelector">
                <input type="color"/>
            </div>
          </div>
        )
    }
}
export default DrawArea