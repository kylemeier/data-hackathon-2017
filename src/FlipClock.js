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
    let before = digit - 13;
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
      million: '559',
      millionShuffle: true,
      thousand: '000',
      thousandShuffle: true,
      hundred: '000',
      hundredShuffle: true,
      num: 559000000,
    };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.updateNumber(), 1000);
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

  updateNumber() {
    const newNum = this.state.num + 13;
    const stateNumArray = this.convertNumToArray(this.state.num);
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
    }
    if (newThousand !== this.state.thousand) {
      const thousandShuffle = !this.state.thousandShuffle;
      this.setState({
        thousand: newThousand,
        thousandShuffle,
      });
    }
    if (newMillion !== this.state.million) {
      const millionShuffle = !this.state.millionShuffle;
      this.setState({
        million: newMillion,
        millionShuffle,
      });
    }
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
