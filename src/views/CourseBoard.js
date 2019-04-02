import React, { Component } from 'react';
import styled from 'styled-components';
import { Row, Col } from 'antd';
import { Route } from 'react-router-dom'

import { BgContainer } from '../components/style-components';
import CourseDetail from './CourseDetail';

import SelectionBoard from '../components/course/SelectionBoard';
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
      links: ['1','2','3']
    }
  }

  render(){    
    // console.log(SelectionBoard)
    //  (
    //   <div>
    //     <Link to={`${this.props.match.url}/01`}>01</Link>
    //     <Link to={`${this.props.match.url}/02`}>02</Link>
    //     <Link to={`${this.props.match.url}/03`}>03</Link>
    //   </div>
    // )
    return (
      <Board>
        <Row style={{height: '100%'}}>
          <Route
            exact
            path={this.props.match.path}
            component={()=> <SelectionBoard url={this.props.match.url} links={this.state.links} />}
          />
          <Route path={`${this.props.match.path}/:id`} component={CourseDetail} />
          {/* <Col className="h-100" span={6} style={{minWidth: "300px"}}>
            <Intro></Intro>
          </Col>
          <Col className="h-100" span={10}>
            <PreviewPanel htmldata={'<h1>test</h1><p>test</p>'}/>
          </Col> */}
        </Row>
      </Board>
      
    )
  }
}


const Board = styled(BgContainer)`
  width: 100%;
  height: calc(100vh - 64px);
`;


export default CourseBoard