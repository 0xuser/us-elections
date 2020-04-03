import React from 'react';
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

class DaysPicker extends React.Component {
  static defaultProps = {
    numberOfMonths: 1,
  };

  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);
    this.state = this.getInitialState();
  }

  getInitialState() {
    return {
      from: undefined,
      to: undefined,
    };
  }

  handleDayClick(day) {
    const range = DateUtils.addDayToRange(day, this.state);
    this.setState(range);
  }

  handleResetClick() {
    this.setState(this.getInitialState());
  }

  addRange = () => {
    this.props.updateData(this.state.from.toLocaleDateString("en-US"),this.state.to.toLocaleDateString("en-US"))
  }

  render() {
    const { from, to } = this.state;
    const modifiers = { start: from, end: to };

    return (
      <div className="RangeExample">
        <DayPicker
          className="Selectable"
          numberOfMonths={this.props.numberOfMonths}
          selectedDays={[from, { from, to }]}
          modifiers={modifiers}
          onDayClick={this.handleDayClick}
        />
        <p>
          {!from && !to && 'Please select the first day.'}
          {from && !to && 'Please select the last day.'}
          {from &&
            to &&
            `Selected from ${from.toLocaleDateString()} to
                ${to.toLocaleDateString()}`}{' '}
          {from && to && (
            <button className="link daysPicker--link" onClick={this.handleResetClick}>
              Reset
            </button>
          )}
        </p>
        <button className="daysPicker--show" onClick={this.addRange}>Pokaż dane: </button>
      </div>
    );
  }
}

export default DaysPicker