var subscribers = {}
var prefix = 'SUB'
var lastSubscriber = 1

var xs = require('xstream').default
var stream = xs.never()

const dispatcher = {
  dispatch: action => {
    stream.shamefullySendNext(action)
  },
  getStream(){
    return stream
  }
}

export default dispatcher