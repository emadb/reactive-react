var React = require('react')
var req = require('superagent')
var Wrapper = require('../redux/Wrapper')
var actions = require('./actions')
var reducers = require('../reducers')

const INITIAL_STATE = {ticks: 0, tacks: 100000, running: false}

var Index = React.createClass({
  getInitialState: function() {
    return {
      counter:0 
    };
  },
  componentWillMount: function() {
  
  },
  start(){
    actions.start()
  },
  stop(){
    actions.stop()
  },
  render: function() {
    return (
      <div>
        <button onClick={this.start}>Start</button>
        <button onClick={this.stop}>Stop</button>
        <h3>{this.props.ticks}</h3>
        <h3>{this.props.tacks}</h3>
      </div>
    );
  }
});

module.exports = Wrapper(Index, reducers, INITIAL_STATE);