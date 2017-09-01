import React from 'react';
import './FlipClock.css';

class AnimatedCard extends React.Component {
  render() {
    const { position, digit, animation } = this.props;
    return (
      <div className={`flipCard ${position} ${animation}`}>
        <span>
          {digit}
        </span>
      </div>
    );
  }
}

class StaticCard extends React.Component {
  render() {
    const { position, digit } = this.props;
    return (
      <div className={position}>
        <span>
          {digit}
        </span>
      </div>
    );
  }
}

class FlipUnitContainer extends React.Component {
  render() {
    const { digit, shuffle } = this.props;

    let now = digit;
    let before = digit - 3;
    before = parseInt(before, 10) < 0 ? 0 : before;
    before = before.toString(10);

    while (before.length < 3) {
      before = `0${before}`;
    }

    // shuffle digits
    const digit1 = shuffle ? before : now;
    const digit2 = !shuffle ? before : now;

    // shuffle animations
    const animation1 = shuffle ? 'fold' : 'unfold';
    const animation2 = !shuffle ? 'fold' : 'unfold';

    return (
      <div className={'flipUnitContainer'}>
        <StaticCard position={'upperCard'} digit={now} />
        <StaticCard position={'lowerCard'} digit={before} />
        <AnimatedCard position={'first'} digit={digit1} animation={animation1} />
        <AnimatedCard position={'second'} digit={digit2} animation={animation2} />
      </div>
    );
  }
}

class FlipClock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      million: 869,
      millionShuffle: true,
      thousand: 766,
      thousandShuffle: true,
      hundred: 917,
      hundredShuffle: true,
      num: 869766917,
    };
    //869766917
  }
  componentDidMount() {
    this.timerID = setInterval(() => this.updateTime(), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  convertNumToArray(num) {
    return num.toString(10).split('').map(function(t) {
      return parseInt(t, 10);
    });
  }

  getNumFromArray(arrayToParse, start, end) {
    end = end || arrayToParse.length;
    return arrayToParse.slice(start, end).join('');
  }

  updateTime() {
    const newNum = this.state.num + 3;
    const stateNumArray = this.convertNumToArray(this.state.num);
    const newNumArray = this.convertNumToArray(newNum);
    const newHundred = this.getNumFromArray(newNumArray, newNumArray.length - 3);
    const stateHundred = this.getNumFromArray(stateNumArray, stateNumArray.length - 3);

    const newThousand = this.getNumFromArray(
      newNumArray,
      newNumArray.length - 6,
      newNumArray.length - 3
    );
    const stateThousand = this.getNumFromArray(
      stateNumArray,
      newNumArray.length - 6,
      stateNumArray.length - 3
    );

    const newMillion = this.getNumFromArray(newNumArray, 0, newNumArray.length - 6);
    const stateMillion = this.getNumFromArray(stateNumArray, 0, newNumArray.length - 6);

    if (newHundred !== stateHundred) {
      const hundredShuffle = !this.state.hundredShuffle;
      this.setState({
        hundred: newHundred,
        hundredShuffle,
      });
    }
    if (newThousand !== stateThousand) {
      const thousandShuffle = !this.state.thousandShuffle;
      this.setState({
        thousand: newThousand,
        thousandShuffle,
      });
    }
    if (newMillion !== stateMillion) {
      const millionShuffle = !this.state.millionShuffle;
      this.setState({
        million: newMillion,
        millionShuffle,
      });
    }
    this.setState({
      num: newNum,
    });
  }
  render() {
    const {
      hundred,
      thousand,
      million,
      hundredShuffle,
      thousandShuffle,
      millionShuffle,
    } = this.state;
    return (
      <div className={'flipClock'}>
        <span className="flipClock-text">$</span>
        <FlipUnitContainer digit={million} shuffle={millionShuffle} />
        <span className="flipClock-text">,</span>
        <FlipUnitContainer digit={thousand} shuffle={thousandShuffle} />
        <span className="flipClock-text">,</span>
        <FlipUnitContainer digit={hundred} shuffle={hundredShuffle} />
      </div>
    );
  }
}

export default FlipClock;
