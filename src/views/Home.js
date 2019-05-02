import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import {Row, Col} from 'antd';
import styled from 'styled-components'
import { imgBgContainer, baseButton } from '../components/style-components'
import Countdown from 'react-countdown-now';
import moment from 'moment';

// import Btn from '../components/Btn';
// import API from '../API';
// let {auth} = API;
// import Cou

class Home extends Component {

  constructor(props) {
    super(props)
  }


  componentWillMount(){
    this.setState({date: moment('2019-05-22', 'YYYY-MM-DD').toDate()})
  }

  render() {
    // Random component
    const Completionist = () => <span>You are good to go!</span>;

    // Renderer callback with condition
    const renderer = ({ days, hours, minutes, seconds, completed }) => {
      if (completed) {
        // Render a completed state
        return <Completionist />;
      } else {
        // Render a countdown
        return <Date className="bold flex align-center">
        <p className="each">{days} <span className="unit">Days</span></p>
        <p className="each">{hours} <span className="unit">Hours</span></p>
        <p className="each">{minutes} <span className="unit">Minutes</span></p>
        <p className="each second">{seconds} <span className="unit">s</span></p>
        
        </Date>;
      }
    };
    return(
      <div>
        <Header
         className="w-100 relative"
         style={{'backgroundImage': `url(/img/home-1.png)`, height:  '800px'}}
         >
         <Cover className="absolute w-100  h-100 left-0 top-0" />
         <Row className="h-100-important">
           <Col span={10}  offset={3} className="h-100">
            <div className="h-100 flex align-center justify-center">
                <div className="t-left">
                  <h1 className="white-important">
                    Learn CSS, a visual styling front-end technologies via a interactive discovery learning with our premium tutorials.
                  </h1>
                  <h3 className="white-important">
                    A Capstone Project of a Master Degree -- from Instructional Technology and Media Program
                  </h3>
                  <div className="m-t-3">
                  {this.props.user ?
                   <Link className="no-text-decoration" to="/course"><Button className="bold">Continue on your course</Button></Link>
                   : <Link className="no-text-decoration" to="/course"><Button className="bold">Start your journey</Button></Link>}
                  </div>
                </div>
            </div>
           </Col>
         </Row>
         
         </Header>

         <div className="m-t-20">
          <h1>Some of our awesome courses</h1>
          <h2>236 lessons • 15 Hours • 14 Courses</h2>
          <Tag className="m-auto">New Content Added Weekly</Tag>
         </div>

         <Header
         className="w-100 relative m-t-3"
         style={{background: '#363E49', height: '800px'}}
         >
         </Header>

         <div className="w-100 m-t-10 m-b-10 flex align-center justify-space-around flex-wrap" style={{padding: '1em'}}>
          <div>
            <h1 className="t-left">Graduation Countdown</h1>
            <Countdown
                
                date={this.state.date}
                renderer={renderer}
            />
          </div>
          <div className='flex-auto' style={{maxWidth: '600px'}}>
            <img className="w-100" src="/img/graduation.jpg" />
          </div>
         </div>
        <footer className="w-100 p-20 white flex justify-space-around align-center flex-wrap" style={{background: '#131026'}}>
          <p className='m-0 bold'>All Rights reserved. Made with ❤️ by Shuai</p>
          <div className="flex">
            <a className="m-r-1" href={`mailto:${this.props.user && this.props.user.email}`}>Contact me</a>
            <a  target="_blank" href="shuaiyuan.me">Who Am I</a>
          </div>
        </footer>
      </div>      
    )
  }
}

const Header = styled(imgBgContainer)`
  
`
const Cover = styled.div`
  animation: dim 1s forwards ease-in-out;
  background: #222;
  @keyframes dim {
    from {opacity: 0;}
    to {opacity: 0.4;}
  }

`
let Button = baseButton([15, 15, 15, 15], 300);
Button = styled(Button)`
  background: rgba(15,38,71,1);
  background: linear-gradient(45deg, rgba(15,38,71,1) 0%, rgba(15,63,158,1) 100%);
`
const Tag = styled.div`
  padding: 5px 10px;
  border-radius: 3px;
  color: #E35076;
  border: 2px solid #E35076;
  text-transform: uppercase;
  width: 300px;
`
const Date = styled.div`
  .each {
    font-size: 2em; color: #222;
    margin-right: 20px;
    .unit {
      margin-left: 5px; 
      font-size:  1em;
      color: #ddd;
    }
  }
  .each.second {
    font-size: 3em;
    color: #BA423F;
    .unit {
      font-size: .8em;
    }
  }
`

// const Input = styled(input)
export default Home