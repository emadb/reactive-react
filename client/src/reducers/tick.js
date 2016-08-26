import buildReducer from '../redux/buildReducer'

export default buildReducer({
  'STARTED': (state, action) => {
    return {running: true}
  },
  'STOPPED': (state, action) => {
    return {running: false}
  },
  'tick': (state, action) => {
    if (state.running){
      return { ticks: action.data.timer }  
    }
    return {ticks: state.ticks} 
  },
  'tack': (state, action) => { 
    if (state.running){
      return { tacks: action.data.timer }  
    }
    return {tacks: state.tacks}
  }
})
