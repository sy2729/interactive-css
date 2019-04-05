import React, { Component } from 'react';
// import { BrowserRouter as Router, Route } from "react-router-dom";
import { HashRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import './App.css';

import Home from './views/Home'
import Test from './views/Test'
import CourseBoard from './views/CourseBoard';
import Nav from './components/Nav';
import API from './API';
import { getUser } from './.data/reducers';
let {auth} = API;

class App extends Component {

  componentWillMount() {
    // load the user login state when first load
    auth.observer().then(user=> {
      user && getUser(user) 
    })
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Nav user={this.props.user}></Nav>
          <Route path="/" exact component={()=><Home user={this.props.user} />}></Route>
          <Route path="/test" component={Test}></Route>
          <Route path="/course" component={CourseBoard}></Route>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return { posts: state.posts, user: state.user };
};

export default connect(
  mapStateToProps
)(App);

// export default App;
