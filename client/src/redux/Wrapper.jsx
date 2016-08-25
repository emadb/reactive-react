import React from 'react'
import dispatcher from './dispatcher'
import R from 'ramda'
var io = require('socket.io-client')
var xs = require('xstream').default
var socket = io.connect('http://localhost:3000/');
var patch = require('socketio-wildcard')(io.Manager);
patch(socket);

function createProducer(){
  return {
    start: function (listener) {
      socket.on('*', function(evt){
        listener.next({type: evt.data[0], data: evt.data[1]})
      })
    },
    stop: function () {

    },
    id: 1
  }
}

const Wrapper = (Container, reducers = [], initialState = {}) => class WrapperClass extends React.Component {
  constructor(props) {
    super(props)
    this.applyNewState = this.applyNewState.bind(this)
    this.state = {
      childState: initialState
    }
  }
  componentWillMount() {
    const stream = xs.create(createProducer())
    stream.addListener({
      next: this.applyNewState,
      error: (err) => { console.log('err', err)},
      complete: () => {},
    })

    this.subscriptionToken = dispatcher.register(this.applyNewState)
  }
  applyNewState(action){
    const newState = reducers.reduce((acc, r) => {
      const projection = r.project(this.state.childState)
      return Object.assign(this.state.childState, r(projection, action))  
    }, this.state.childState)
    this.setState({childState: newState})
  }
  componentWillUnmount() {
    //TODO: stop the stream
    //TODO: dispatcher.unregister(this.subscriptionToken)
  }
  render() {
    return <Container {...this.state.childState} {...this.props} dispatcher={dispatcher} />
  }
}

export default Wrapper