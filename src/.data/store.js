import {createStore} from 'redux';

let stateChanger = (state, action) => {
  if(state === undefined) {
    return {}
  }else {
    switch(action.type) {
      case 'GET_POST':
      return Object.assign({}, state, {
        posts: action.payload
      })
      break;

      case 'GET_USER_POST':
      return Object.assign({}, state, {
        userPosts: action.payload
      })
      break;

      case 'GET_ONE_POST':
      return Object.assign({}, state, {
        currentPost: action.payload
      })
      break;

      // case 'LOGIN':
      // return Object.assign({}, state, {
      //   user: action.payload
      // })
      // break;

      case 'GET_USER':
      return Object.assign({}, state, {
        user: action.payload
      })
      break;

      case 'GET_DISPLAY_USER':
      return Object.assign({}, state, {
        displayUser: action.payload
      })
      break;

      case 'LOG_OUT':
      delete state.user;
      return Object.assign({}, state)
      break;

      default:
        return state
    }
    
  }
}

const store = createStore(stateChanger)


export default store;