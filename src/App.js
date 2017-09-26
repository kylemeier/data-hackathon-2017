import React, { Component } from 'react';
import FlipClock from './FlipClock';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img
            src="http://execonlinenew.wpengine.com/wp-content/uploads/2017/04/EXO_logo_tagline_white_180.png"
            className="App-logo"
            alt="Logo"
          />
        </div>
        <div className="App-content">
          <div className="App-impactSection">
            <p className="App-impactHeader">Real time dollar impact of student projects</p>
            <p className="App-impactDescription">
              As part of the curriculum, each student brings a real project to work on during their
              course. These projects are impactful and generate real monetary value for their
              companies every second.
            </p>
            <FlipClock />
            <p>
              <a href="" target="_blank" className="App-callToAction">
                click here to learn more!
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
