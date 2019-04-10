import React, { Component } from 'react';
import styled from 'styled-components';
import { Row, message } from 'antd';
import { Route } from 'react-router-dom'
import { connect } from "react-redux";
import { BgContainer } from '../components/style-components';
import CourseDetail from './CourseDetail';

import SelectionBoard from '../components/course/SelectionBoard';
import API from '../API';
// import Intro from '../components/course/Intro';
// import PreviewPanel from '../components/course/PreviewPanel';


function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      render={props => (
        // pass the sub-routes down to keep nesting
        <route.component {...props} routes={route.routes} />
      )}
    />
  );
}

class CourseBoard extends Component {

  constructor() {
    super();
    this.state = {
      links: []
    }
  }

  componentWillMount(){
    // redirect to home if not login
    if(!this.props.user) {
      message.warning('please log in first')
      this.props.history.push("/")
      return
    }

    setTimeout(()=>{
      API.getCourseInfo()
        .then(({data})=>{
          data.shift();
          let courseData = data.map(i=>i.name);
          this.setState({links: courseData})
        })
      API.getFinishedStatus(this.props.user.uid)
        .then(({data})=>{
          data.shift();
          this.setState({finished: data})
        })
    },1000)
  }

  render(){    
    return (
      <Board>
        {/* {} */}
        <Row style={{height: '100%'}}>
          <Route
            exact
            path={this.props.match.path}
            component={()=> <SelectionBoard url={this.props.match.url} links={this.state.links} finished={this.state.finished} />}
          />
          <Route path={`${this.props.match.path}/:id`} component={CourseDetail} />
        </Row>
      </Board>
      
    )
  }
}


const Board = styled(BgContainer)`
  width: 100%;
  height: calc(100vh - 64px);
`;


const mapStateToProps = state => {
  return { posts: state.posts, user: state.user };
};

export default connect(
  mapStateToProps
)(CourseBoard);

// export default 