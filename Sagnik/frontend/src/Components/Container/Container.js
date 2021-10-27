import React from 'react';



import './Container.css';

const Container = ({ users }) => (
  <div className="Container">
    <div>
      <h1>SketchIO Chat! Let's Guess the Word!</h1>
    </div>
    {
      users
        ? (
          <div>
            <h1>People currently chatting:</h1>
            <div className="activeContainer">
              <h2>
                {users.map(({name}) => (
                  <div key={name} className="activeItem">
                    {name}
                  </div>
                ))}
              </h2>
            </div>
          </div>
        )
        : null
    }
  </div>
);

export default Container;