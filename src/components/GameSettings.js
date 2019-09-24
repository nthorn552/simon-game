import React, { useState } from 'react';

import { DifficultyLevels, SequenceOptions } from '../constants';

const createNewSequence = difficulty => {
    const seq = [];
    for (let i = 0; i < difficulty; i++) {
        seq.push(SequenceOptions[Math.floor(Math.random() * SequenceOptions.length)]);
    }
    return seq;
};

const GameSettings = (props) => {
    const [difficultyLevel, setDifficultyLevel] = useState(4);
    return <div className="game-settings">
        <button onClick={() => {
            const newSequence = createNewSequence(difficultyLevel);
            props.newGame(newSequence);
        }} >Start</button>
        <div>
            Difficulty: <select onChange={(event) => setDifficultyLevel(event.target.value)} value={difficultyLevel}>
                {DifficultyLevels.map(numOfSteps => {
                    return <option value={numOfSteps}>{numOfSteps}</option>
                })}
            </select>
        </div>
        <div>
            Score: {props.score}
        </div>
    </div>
}

export default GameSettings;