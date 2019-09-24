import React from 'react';
import './App.css';

import StepBox from './components/StepBox';
import GameSettings from './components/GameSettings';

import { GameState, SequenceOptions } from './constants';

class Simon extends React.Component {
  constructor(props) {
    super(props);
    this.stepToLeadInterval = null;
    this.state = {
      sequence: [],
      playerSequence: null,
      stepToLead: null,
      gameState: GameState.OFF
    };
  }

  newGame = (sequence) => {
    let stepToLead = 0;
    clearInterval(this.stepToLeadInterval);
    this.setState({
      sequence,
      stepToLead,
      gameState: GameState.IN_PROGRESS,
      playerStep: 0
    });

    this.stepToLeadInterval = setInterval(() => {
      console.log(sequence[stepToLead]); // For cheating 
      stepToLead = stepToLead + 1;
      if (stepToLead <= sequence.length - 1) {
        this.setState({ stepToLead });
      } else {
        this.setState({ stepToLead: null })
        clearInterval(this.stepToLeadInterval);
      }
    }, 1000);
  }

  playerSelectedOption = (option) => {
    if (this.state.gameState === GameState.IN_PROGRESS) {
      if (option === this.state.sequence[this.state.playerStep]) {
        let playerStep = this.state.playerStep + 1;
        this.setState({ playerStep });
        if (playerStep === this.state.sequence.length) {
          this.setState({ gameState: GameState.GAME_OVER_WIN });
        }
      } else {
        this.setState({ gameState: GameState.GAME_OVER_LOSE });
      }
    }
  }

  render() {
    let gameInterface = null;
    switch (this.state.gameState) {
      case GameState.GAME_OVER_WIN:
        gameInterface = <iframe src="https://giphy.com/embed/3ohryhNgUwwZyxgktq" width="400" height="250" frameBorder="0"></iframe>;
        break;
      case GameState.GAME_OVER_LOSE:
        gameInterface = <iframe src="https://giphy.com/embed/HSvpy6Jk396SI" width="400" height="250" frameBorder="0"></iframe>
        break;
      default:
        gameInterface = <StepBox value={this.state.gameState === GameState.IN_PROGRESS ? this.state.sequence[this.state.stepToLead] : null} />
        break;
    }

    return <div className="simon-container">
      <div className="game-control-container">
        <div className="game-control">
          {gameInterface}
        </div>
        <GameSettings newGame={this.newGame} score={this.state.playerStep} />
      </div>
      <div className="user-control-container">
        {SequenceOptions.map(option => {
          return <StepBox value={option} key={option} selectCallback={this.playerSelectedOption} />
        })}
      </div>
    </div >
  }
}

export default Simon;
