import React from 'react';
import './FlipClock.css';

class AnimatedCard extends React.Component {
  render() {
    const { position, digit, animation } = this.props;
    return (
      <div className={`flipCard ${position} ${animation}`}>
        <span>{digit}</span>
      </div>
    );
  }
}

class StaticCard extends React.Component {
  render() {
    const { position, digit } = this.props;
    return (
      <div className={position}>
        <span>{digit}</span>
      </div>
    );
  }
}

class FlipUnitContainer extends React.Component {
  render() {
    const { digit, shuffle, type } = this.props;
    const incrementer = type === 'hundred' ? 26.62 : 1;
    let now = digit;
    let before = Math.round(digit - incrementer);
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
    const initialMillion = this.getFromLocalStorage('million') || '589';
    const initialThousand = this.getFromLocalStorage('thousand') || '000';
    const initialHundred = this.getFromLocalStorage('hundred') || '815';
    this.state = {
      million: initialMillion,
      millionShuffle: true,
      thousand: initialThousand,
      thousandShuffle: true,
      hundred: initialHundred,
      hundredShuffle: true,
      num: parseInt(`${initialMillion}${initialThousand}${initialHundred}`, 10),
    };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.updateNumber(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  convertNumToArray(num) {
    return num
      .toString(10)
      .split('')
      .map(function(t) {
        return parseInt(t, 10);
      });
  }

  getNumFromArray(arrayToParse, start, end) {
    end = end || arrayToParse.length;
    return arrayToParse.slice(start, end).join('');
  }

  updateNumber() {
    const newNum = Math.round(this.state.num + 26.62);
    const newNumArray = this.convertNumToArray(newNum);
    const newHundred = this.getNumFromArray(newNumArray, newNumArray.length - 3);

    const newThousand = this.getNumFromArray(
      newNumArray,
      newNumArray.length - 6,
      newNumArray.length - 3
    );

    const newMillion = this.getNumFromArray(newNumArray, 0, newNumArray.length - 6);

    this.setState({
      num: newNum,
    });

    if (newHundred !== this.state.hundred) {
      const hundredShuffle = !this.state.hundredShuffle;
      this.setState({
        hundred: newHundred,
        hundredShuffle,
      });
      this.setInLocalStorage('hundred', newHundred);
    }
    if (newThousand !== this.state.thousand) {
      const thousandShuffle = !this.state.thousandShuffle;
      this.setState({
        thousand: newThousand,
        thousandShuffle,
      });
      this.setInLocalStorage('thousand', newThousand);
    }
    if (newMillion !== this.state.million) {
      const millionShuffle = !this.state.millionShuffle;
      this.setState({
        million: newMillion,
        millionShuffle,
      });
      this.setInLocalStorage('million', newMillion);
    }
  }

  setInLocalStorage(key, value) {
    if (window.localStorage) window.localStorage.setItem(key, value);
  }

  getFromLocalStorage(key) {
    return window.localStorage ? window.localStorage.getItem(key) : null;
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
        <FlipUnitContainer digit={million} shuffle={millionShuffle} type="million" />
        <span className="flipClock-text">,</span>
        <FlipUnitContainer digit={thousand} shuffle={thousandShuffle} type="thousand" />
        <span className="flipClock-text">,</span>
        <FlipUnitContainer digit={hundred} shuffle={hundredShuffle} type="hundred" />
      </div>
    );
  }
}

export default FlipClock;
