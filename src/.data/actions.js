const GET_USER = 'GET_USER';
const LOG_OUT = 'LOG_OUT';



export default {
  getUser(content){
    return {
      type: GET_USER,
      payload: content
    }
  },

  logOut() {
    return {
      type: LOG_OUT,
      payload: {}
    }
  }

} 
