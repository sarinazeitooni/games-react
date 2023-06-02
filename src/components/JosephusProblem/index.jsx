import React, { useState } from "react";
import "./JosephusProblem.css";

const JosephusProblem = () => {
    const [initialData, setInitialData] = useState({ disabled: false, eliminationIndex: 0, guessedPosition: 0, peopleCount: 0 });
    const [status, setStatus] = useState('start');
    const handleStart = () => {
        setInitialData({ ...initialData, disabled: true })
        const peopleItems = new Array(initialData.peopleCount).map((_, index) => {
            return ({
                id: index + 1,
                isDead: false,
            })
        })
        const upperhalf = peopleItems.filter((item) => item?.id >= initialData.eliminationIndex);
        const lowerHalf = peopleItems.filter((item) => item?.id < initialData.eliminationIndex);
        const sortedPeople = upperhalf.concat(lowerHalf);
        setStatus(initialData.guessedPosition === kill(sortedPeople) ? 'winner' : 'loser');
    };
    const kill = (people) => {
        if (people.length === 1) {
            return people[0]?.id;
        } else {
            for (let index = 0; index < people.length; index++) {

                if (people[index] && index % 2 !== 0) {
                    people[index].isDead = true;
                }
            }
            const survivedPeople = people.filter((item) => item?.isDead === false);
            const sortedSurvivedPeople = [survivedPeople.pop()].concat(survivedPeople);
            return kill(sortedSurvivedPeople);
        }
    };

    return (
        <div className="josephus-problem">
            <h1>Josephus Problem Solution</h1>
            <div className="input-container">
                <label htmlFor="elimination-index">Entry Point of Elimination:</label>
                <input type="number" id="elimination-index" value={initialData.eliminationIndex}
                    onChange={(e) => setInitialData({ ...initialData, eliminationIndex: parseInt(e.target.value) })} />
                <label htmlFor="guessed-position">Guessed Position:</label>
                <input type="number" id="guessed-position" value={initialData.guessedPosition}
                    onChange={(e) => setInitialData({ ...initialData, guessedPosition: parseInt(e.target.value) })} />
                <label htmlFor="people-count">People Count:</label>
                <input type="number" id="people-count" value={initialData.peopleCount}
                    onChange={(e) => setInitialData({ ...initialData, peopleCount: parseInt(e.target.value) })} min="1" max="100" />
                <button onClick={handleStart}>Start</button>
                <button onClick={() => {
                    setInitialData({ disabled: false, eliminationIndex: 0, guessedPosition: 0, peopleCount: 0 })
                    setStatus('start');
                }}>reset</button>
            </div>
            <div className="people-container">
                {(Boolean(initialData.peopleCount) && status !== "start") && new Array(initialData.peopleCount).fill().map((_, index) => (
                    <div key={`person-${index + 1}`} className={`person ${index % 2 !== 0 ? 'eliminated' : ''} ${index === initialData.guessedPosition - 1 ? 'guessed' : ''}`}>{index + 1}</div>
                ))}
            </div>
            {status === "winner" ? <h3 className="win-message">Congratulations! You Win!</h3> : status === "loser" && <h3 className="lose-message">Sorry! You Lose!</h3>}
        </div>
    );
}

export default JosephusProblem;