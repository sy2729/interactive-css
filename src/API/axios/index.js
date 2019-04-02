import config from '../config';
import axios from 'axios';
import tokenActions from './token';

// set the request url with the token configuration
axios.defaults.baseURL = config.databaseURL + `/course.json`;

// ?auth=${tokenActions.getLocalToken()
// console.log(axios.defaults.baseURL)

export default {
  getCourseInfo(){
    return axios.get('/')
      .then(data=> {
        return data
      })
  }
}