import React, { Component } from "react";

class InputButton extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange = (e) => {
    e.preventDefault();
    const num = parseInt(e.target.value);
    this.props.change(num);
  };

  increase = (e) => {
    this.props.change(this.props.num + 1);
  };

  decrease = (e) => {
    this.props.change(this.props.num - 1);
  };

  render() {
    return (
      <div className="counter-outer">
        <label htmlFor={this.props.type}>{this.props.type}</label>
        <div className="input-group mb-3" id="counter-inner">
          <div className="input-group-prepend">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={this.decrease}
            >
              -
            </button>
          </div>
          <input
            type="text"
            name={this.props.type}
            value={this.props.num}
            onChange={this.onChange}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={this.increase}
            >
              +
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default InputButton;
