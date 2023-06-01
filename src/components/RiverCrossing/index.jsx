import React, { useState } from "react";
import "./RiverCrossing.css";

function RiverCrossing() {
  const [leftBank, setLeftBank] = useState(["normal1", "normal2", "normal3", "zombie1", "zombie2", "zombie3"]);
  const [rightBank, setRightBank] = useState([]);
  const [boat, setBoat] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);

  const handleMove = (person) => {
    if (boat.length < 2) {
      // Check if person is on left or right bank
      if (leftBank.includes(person)) {
        setLeftBank(leftBank.filter((p) => p !== person));
        setBoat([...boat, person]);
      } else if (rightBank.includes(person)) {
        setRightBank(rightBank.filter((p) => p !== person));
        setBoat([...boat, person]);
      }
    }
  };

  const handleCross = () => {
    if (boat.length > 0 && boat.length <= 2) {
      if (boat.some((person) => person.startsWith("zombie"))) {
        // Count persons on left and right banks
        const leftNormal = leftBank.filter((person) => person.startsWith("normal")).length;
        const leftZombie = leftBank.filter((person) => person.startsWith("zombie")).length;
        const rightNormal = rightBank.filter((person) => person.startsWith("normal")).length;
        const rightZombie = rightBank.filter((person) => person.startsWith("zombie")).length;

        // Game over if count of zombies is greater than normal persons on either side
        if ((leftNormal > 0 && leftZombie > leftNormal) || (rightNormal > 0 && rightZombie > rightNormal)) {
          setIsGameOver(true);
          return;
        }
      }

      // Move people from boat to opposite bank
      if (leftBank.length > rightBank.length) {
        setRightBank([...rightBank, ...boat]);
      } else {
        setLeftBank([...leftBank, ...boat]);
      }

      // Clear boat state
      setBoat([]);
    }
  };

  return (
    <div className="river-crossing-puzzle">
      <h1>River Crossing Puzzle</h1>
      <div className="banks-container">
        <div className="bank">
          <h2>Left Bank:</h2>
          {leftBank.map((person) => (
            <button key={person} onClick={() => handleMove(person)}>
              {person}
            </button>
          ))}
        </div>
        <div className="bank">
          <h2>Right Bank:</h2>
          {rightBank.map((person) => (
            <button key={person} onClick={() => handleMove(person)}>
              {person}
            </button>
          ))}
        </div>
      </div>
      <div className="boat-container">
        <h2>Boat:</h2>
        {boat.map((person) => (
          <button key={person} onClick={() => handleMove(person)}>
            {person}
          </button>
        ))}
        <button className="cross-button" onClick={handleCross}>
          Cross
        </button>
      </div>
      {isGameOver && <h3 className="game-over-message">Game Over!</h3>}
    </div>
  );
}

export default RiverCrossing;