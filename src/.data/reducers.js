import actions from './actions';
import store from './store';

export const getUser = (user)=> {
  store.dispatch(actions.getUser(user))
};

export const logOut = ()=> {
  store.dispatch(actions.logOut())
}