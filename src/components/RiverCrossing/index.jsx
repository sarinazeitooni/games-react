import React, { useState } from "react";
import "./RiverCrossing.css";

const RiverCrossing = () => {
  const [isGameOver, setIsGameOver] = useState(false);
  const [boatSide, setBoatSide] = useState('right');
  const [leftSide, setLeftSide] = useState([]);
  const [rightSide, setRightSide] = useState([
    { id: 1, isHuman: true }, { id: 2, isHuman: true },
    { id: 3, isHuman: true }, { id: 4, isHuman: false },
    { id: 5, isHuman: false }, { id: 6, isHuman: false }
  ]);
  const [inBoat, setInBoat] = useState([]);

  const gameCondition = () => {
    const humanLength = rightSide.filter((person) => person.isHuman === true).length;
    const zombieLength = rightSide.filter((person) => person.isHuman === false).length;
    return zombieLength > humanLength;
  }

  const handleDropOff = () => {
    setIsGameOver(gameCondition())
  }
  const handleInsertInBoat = (person) => {
    const people = boatSide === 'left' ? leftSide : rightSide;
    const personIndex = people.findIndex((item) => item.id === person.id);
    if (personIndex !== -1 && inBoat.length < 2) {
      if (boatSide === 'left') leftSide.splice(personIndex, 1);
      else rightSide.splice(personIndex, 1);
      setInBoat([...inBoat, person]);
    }
  }
  const handleEmptyBoat = () => {
    const peopleInBoat = inBoat;
    if (boatSide === 'left') {
      setLeftSide(leftSide.concat(peopleInBoat));
    } else {
      setRightSide(rightSide.concat(peopleInBoat));
    }
    setInBoat([]);
  }
  const handleCrossBoat = () => {
    if (boatSide === 'left') setBoatSide('right');
    else setBoatSide('left');
    alert('by clicking on people buttons you will drop them off');
  }
  console.log({ boatSide, inBoat, leftSide, rightSide, isGameOver });
  return (
    <div className="river-crossing-puzzle">
      <h1>River Crossing Puzzle</h1>
      <div className="banks-container">
        <div className="bank">
          <h2>Left Side:</h2>
          {Boolean(leftSide.length) && leftSide?.map((person) => (
            <button key={person?.id} disabled={inBoat.length === 2} onClick={() => handleInsertInBoat(person)}>
              {person?.isHuman ? 'human' : 'zombie'}{person?.id}
            </button>
          ))}
        </div>
        <div className="bank">
          <h2>Right Side:</h2>
          {Boolean(rightSide.length) && rightSide?.map((person) => (
            <button key={person?.id} disabled={inBoat.length === 2} onClick={() => handleInsertInBoat(person)}>
              {person?.isHuman ? 'human' : 'zombie'}{person?.id}
            </button>
          ))}
        </div>
      </div>
      {inBoat.length === 2 && 'boat is full either cross the boat or empty it'}
      <div className="boat-container">
        <h2>Boat:</h2>
        {inBoat.map((person) => (
          <button key={person.id}
            onClick={() => { handleDropOff(person) }}
          >
            {person?.isHuman ? 'human' : 'zombie'}{person?.id}
          </button>
        ))}
        <button className="cross-button" onClick={handleCrossBoat}>
          Cross The Boat
        </button>
        <button className="empty-button" onClick={handleEmptyBoat}>
          Empty The Boat
        </button>
      </div>
      {isGameOver && <h3 className="game-over-message">Game Over!</h3>}
    </div>
  );
}

export default RiverCrossing;