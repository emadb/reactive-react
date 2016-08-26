import React from 'react'
import dispatcher from './dispatcher'
import R from 'ramda'
var io = require('socket.io-client')
var xs = require('xstream').default
var socket = io.connect('http://localhost:3000/');
var patch = require('socketio-wildcard')(io.Manager);
patch(socket);

function createWebsocketStream(){
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

// function createActionStream(){
//   return {
//     start: function (listener) {
//       dispatcher.register(action => {
//         listener.next(action)
//       })
//     },
//     stop: function () {

//     },
//     id: 2
//   }
// }

function combineReducers(reducers, state, action){
  const newState = reducers.reduce((acc, r) => {
    const projection = r.project(state)
    return Object.assign(state, r(projection, action))  
  }, state)
  return newState
}

const Wrapper = (Container, reducers = [], initialState = {}) => class WrapperClass extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      childState: initialState
    }
  }
  componentWillMount() {
    const stream1 = xs.create(createWebsocketStream())
    const stream2 = dispatcher.getStream() //xs.create(createActionStream())
    const stream = xs.merge(stream1, stream2)

    stream
      .map(s => combineReducers(reducers, this.state.childState, s))
      .addListener({
        next: s => this.setState({childState: s}),
        error: (err) => { console.log('err', err)},
        complete: () => {},
      })
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