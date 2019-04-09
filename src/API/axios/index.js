import config from '../config';
import axios from 'axios';
import tokenActions from './token';

// set the request url with the token configuration
axios.defaults.baseURL = config.databaseURL;

// ?auth=${tokenActions.getLocalToken()
// console.log(axios.defaults.baseURL)

export default {
  getCourseInfo(){
    return axios.get('/course.json')
      .then(data=> {
        return data
      })
  },

  addFinishedStatus(userID, courseID){
    let query = '/finished/';
    if(!userID || !courseID) {return}
    query += `${userID}/${courseID}`;

    // let data={};
    // data[courseID] = true;

    return axios.put(query + '.json',true)
      .then(data=> {
        return data
      })
  },

  getFinishedStatus(userID, courseID){
    let query = '/finished/';
    if(!userID) {return}
    query += userID
    query += courseID ? `/${courseID}` : '';
    return axios.get(query + '.json')
      .then(data=> {
        return data
      })
  },
  
  async updateThumbs(userID, courseID, knowledgeID) {
    if(!userID || !courseID || !knowledgeID) {return}
    let query = `/course/${courseID}/study/${knowledgeID}/up`
    let current = await axios.get(query + '.json')
    current = current.data;
    return axios.put(query + '.json', current - 0 + 1)
          .then(({data})=>{
            return data
          })
  }
}
