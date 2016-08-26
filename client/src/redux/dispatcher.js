var subscribers = {}
var prefix = 'SUB'
var lastSubscriber = 1

var xs = require('xstream').default
var stream = xs.never()

const dispatcher = {
  register: subscriber => {
    var id = prefix + lastSubscriber++
    subscribers[id] = subscriber
    return id
  },
  dispatch: action => {
    stream.shamefullySendNext(action)
  },
  getStream(){
    return stream
  },
  // dispatch: action => {
  //   Object.keys(subscribers).forEach(sub => {
  //     subscribers[sub](action)
  //   })    
  // },
  unregister: id => {
    // TODO
  }
}

export default dispatcher