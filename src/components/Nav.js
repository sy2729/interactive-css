import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom'
import { Layout, Row, Col } from 'antd';
import { imgBgContainer } from './style-components';
import { Menu, Dropdown, Icon, message } from 'antd';

import { getUser, logOut } from '../.data/reducers';
import isEmpty from '../utils/emptyObj';
import API from '../API';

let {auth} = API;

/*-------*/
const {
  Header
} = Layout;
/*-------*/


/* component */
const menu = (<Menu>
  <Menu.Item>
    <span onClick={()=>logUserOut()}>LogOut</span>
  </Menu.Item>
  <Menu.Item>
    <Link to='/course'><span>All Course</span></Link>
  </Menu.Item>
</Menu>)
/* --------------------*/

  /* function */
  const logUserOut = ()=>{
    auth.logOut().then(()=> {
      logOut();
      message.info('Log out Successfully')
    })
  }

  const logIn = ()=>{
    auth.login()
      .then((user)=> { 
        getUser(user)
        message.success(`Welcome to Interactive CSS, ${user.displayName}`)
      });
  }
  /* --------------------*/



/* Main Component */
const Nav = (props)=> {


  let user = props.user ? props.user : {};
  let userInfo = !isEmpty(user) ?
    (<><Profile className="circle" style={{'backgroundImage': `url(${user.photoURL})`}} />
      <Dropdown overlay={menu}>
        <a className="white bold ant-dropdown-link" href="#">
          {user.displayName}<Icon type="down" />
        </a>
      </Dropdown></>) :
    <span className="pointer white" onClick={()=>logIn()}>Sign In</span>
    ;


  return (
    <Header>
      <Row className="flex align-center justify-space-around">
        <Col  xs={{span: 4}}>
          <Link to={'/'}><h1 className="white-important m-0">CSS Interactive</h1></Link>
          {/* <Logo style={{'backgroundImage': `url(/img/css.png)`}} /> */}
        </Col>
        <Col
           xs={{span: 12, offset:8}} md={{span: 5, offset:15}}
          >
          <div className='flex align-center justify-center'>
            {userInfo}
          </div>
        </Col>
      </Row>
    </Header>
  )
}


const Logo = styled(imgBgContainer)`
  width: 40px;
  height: 40px;
`
const Profile = styled(imgBgContainer)`
  width: 40px;
  height: 40px;
  margin-right: 10px;
`


export default Nav;