import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom'
import Loadable from 'react-loadable';
import { Row, Col, Icon } from 'antd';
import Intro from '../components/course/Intro';
import API from '../API'

import styled from  'styled-components';

function Loading() {
  return <div>Loading...</div>;
}

class CourseDetail extends Component {

  constructor() {
    super()
    this.state = {
      introData: null,
      introOpen:  true,
      smallWindow: false
    };
    this.LoadableComponent = Loadable({
      loader: () => import(`../components/course/${this.props.match.params.id}`),
      loading: Loading,
    });
  }
  
  detectWindow(){
    let width = window.innerWidth;
    if(width < 768) {
      this.setState({smallWindow: true})
    }else {
      this.setState({smallWindow: false})
    }
  }

  componentWillMount() {
    API.getCourseInfo()
      .then(res=> {
        this.setState({
          introData: res.data
        })
      })
  }

  componentDidMount(){
    // detect the window width and give alert
    let width = window.innerWidth;
    if(width < 768) {
      this.setState({smallWindow: true})
    }

    window.addEventListener('resize', this.detectWindow.bind(this));
  }

  componentWillReceiveProps() {
    this.LoadableComponent = Loadable({
      loader: () => import(`../components/course/${this.props.match.params.id}`),
      loading: Loading,
    });
  }

  componentWillUnmount(){
    window.removeEventListener('resize', this.detectWindow);
  }

  controlIntro(state){
    this.setState({
      introOpen: state
    })
  }


  render(){
    return (
      <div className="relative">
        {this.state.smallWindow ?
        <div className="absolute left-0 top-0 w-100 h-100vh flex align-center justify-center white"  style={{zIndex:  5}}>
          <h1>Please Use Laptop with larger window for better experience!</h1>
        </div> :
        <Row className="over-hidden w-100">
          <Col className="h-100" span={this.state.introOpen ? 6 : 0} style={{minWidth: "300px", height: 'calc(100vh - 64px)'}}>
          {this.state.introData ?
           <Intro
            closeIntro = {()=>this.controlIntro(false)}
            introData={this.state.introData[this.props.match.params.id]}>
            </Intro> : null}
          </Col>
          <Col span={this.state.introOpen ? 18 : 24} style={{height: 'calc(100vh - 64px)'}}>
            <this.LoadableComponent />;
          </Col>
          {/* <p>CourseDetail {this.id}</p> */}
          {this.state.introOpen ? null :
            <LeftIcon onClick={()=>this.controlIntro(true)} className="absolute circle flex align-center justify-center pointer">
              <Icon type="right" />
          </LeftIcon>}
        </Row>
        }
      </div>
    )
  }
}

const LeftIcon = styled.div`
  left: 0;
  top: 10%;
  transform: translateX(-50%);
  width: 60px;
  height: 60px;
  background: #282B33;
  color: #fff;
  font-size: 2em;
  transition: all .6s;
  

  &:hover {
    background: #4091F7;
    transform: translateX(-40%) !important;
  }

`

export default CourseDetail