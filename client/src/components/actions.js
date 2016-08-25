var req = require('superagent')
var dispatcher = require('../redux/dispatcher')

const actions = {
  start: function(){
    req.post('http://localhost:3000/start').end((e,r) => {
      dispatcher.dispatch({type: 'STARTED', content: {}})
    })
  },
  stop: function(){
    dispatcher.dispatch({type: 'STOPPED', content: {}})
  }
}

export default actions