const getLocalToken = ()=> {
  let token = window.localStorage.getItem('token');
  return token;
}

// set the localStorage with new Token
const setToken = (token)=> {
  window.localStorage.setItem('token', token);
}

const deleteToken = ()=> {
  window.localStorage.removeItem('token');
}

export default {
  setToken,
  getLocalToken,
  deleteToken
}