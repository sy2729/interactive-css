import React, { Component } from 'react';

import Btn from '../components/Btn';
import API from '../API';
let {auth} = API;

class Test extends Component {

  constructor(props) {
    super(props)
  }

  login = ()=>{
    auth.login()
      .then((user)=> { 
        console.log(user)
      });
  }

  getUser() {
    let user = auth.getUser();
    console.log(user)
  }
  componentWillMount() {
    auth.observer().then(user=> console.log(user))
  }
  
  logout() {
    auth.logOut().then(()=> {
      console.log('logout succeessfully')
    })
  }

  render() {
    return(
      <div>
        <Btn text={"Login"}  onClick={this.login} />
        <Btn text={"Get User"}  onClick={this.getUser} />
        <Btn text={"Login Out"}  onClick={this.logout} />
      </div>      
    )
  }
}
function   login(){
  console.log(111)
  // API.auth();
}

export default Test