import React, { Component } from 'react';
import styled from 'styled-components';
import marked from 'marked'
import { Link } from 'react-router-dom'
// import highlight from 'highlight.js'
// import '../../js-highlight.css';
// import ReactMarkdown from 'react-markdown';
// import CodeBlock from '../CodeBlock';
import { connect } from "react-redux";
import { BgContainer, baseButton } from '../style-components';
import { Icon, message, Tooltip } from 'antd'

import API from '../../API'

// highlight.configure({
//   tabReplace: '  ',
//   classPrefix: 'hljs-',
//   languages: ['CSS', 'HTML, XML', 'JavaScript', 'PHP', 'Python', 'Stylus', 'TypeScript', 'Markdown']
// })
// marked.setOptions({
//   highlight (code) {
//     return highlight.highlightAuto(code).value
//   }
// })

class Intro extends Component {
  constructor(){
    super();
    this.state = {
      finished: false,
      studyPanel: false
    }
  }

  componentWillMount() {
    let path = window.location.hash.split('/');
    this.id = path[2] - 0;
    this.url = path[1];
    this.getFinishedStatus();
  }

  componentWillReceiveProps() {
    let path = window.location.hash.split('/');
    this.id = path[2] - 0;
    this.url = path[1];
    this.setState({finished: false})
    this.getFinishedStatus();
    
  }

  shouldComponentUpdate(nextProp, nextState){
    let newPropName = nextProp.introData && nextProp.introData.name;
    let oldPropName = this.props.introData && this.props.introData.name;
    if(newPropName === oldPropName && this.state.finished === nextState.finished && this.state.studyPanel === nextState.studyPanel) {
      return false
    }else {
      return true
    }
  }

  getFinishedStatus(){
    setTimeout(()=>{
      API.getFinishedStatus(this.props.user && this.props.user.uid, this.id)
      .then(({data})=>{
        this.setState({finished: data})
      })
    }, 1000)
  }

  //prevent jump to unexisted section
  jump(e,direction){
    if(direction === 'last' && this.id <= 1) {
      message.warning('this the first section')
      e.preventDefault();
      return
    }
    if(direction === 'next' && this.id >= 10) {
      message.warning('this the last section')
      e.preventDefault();
      return
    }
  }

  finish() {
    API.addFinishedStatus(this.props.user.uid, this.id)
      .then(({data})=>{
        if(data) {
          this.setState({finished: true})
        }
      })
  }

  thumbsUp(e, name) {
    let el = e.currentTarget;
    API.updateThumbs(this.props.user.uid, this.id, name)
      .then(data=>{
        let child = el.querySelector('svg');
        child.classList.add('active')
      })
  }

  render() {
    
    // console.log(this.props.introData.study)
    const markedHtml = this.props.introData ? marked(this.props.introData.intro) : null;

    const externalList = [];
    if(this.props.introData.study) {
      let data = this.props.introData.study;
      for(let i in data) {
        externalList.push(
          <li className="white flex justify-space-between align-center" key={data[i].title}>
            <a target='_blank' href={data[i].url || 'javascript: ;'}>{i} - {data[i].title}</a>
            <Tooltip className="white pointer"
              title={`${data[i].up || 0} people think it's useful`}
              onClick={(e)=>this.thumbsUp(e, i)}
            >
              <Icon type="like" />
            </Tooltip>
          </li>
        )
      }
    }
    const studyPanel =
      <StudyPanel className={`w-100 ${this.state.studyPanel ? '' : 'opa-0'}`} style={{height: '400px'}}>
        <p className="header w-100 p-1 t-left">Extenal Study Resources</p>
        <ul className="p-1 list" style={{padding: '0 !important'}}>
          {externalList}
        </ul>
      </StudyPanel>

    return (
      <BgContainer className="white w-100 h-100 p-20 relative" boxShadow="5px 0px 7px 0px rgba(41,41,41,1)">
        <Icon className="absolute right-1 pointer" style={{fontSize: '2em'}} type="close" onClick={()=>this.props.closeIntro()} />
        <h1 className="m-t-2">{this.props.introData && this.props.introData.name || 'Title - no Data yet - in Dev'}</h1>
        {this.props.introData ? <div className="t-justify" dangerouslySetInnerHTML={{__html: markedHtml}}/> : 'no data yet - in dev' }

        <Button className={`m-2 f-right`} onClick={this.finish.bind(this)} finished={this.state.finished}>
          <Icon type="check-circle" />
          <span className="p-w-10">Finish</span>
        </Button>


        <div className="absolute left-0 bottom-0 w-100">
          {studyPanel}
          {/* {this.state.studyPanel ? studyPanel : null} */}
          <div className="fixed flex w-100 align-center" style={{bottom: '10px', fontSize: '2em'}}>
            <Link className='pointer flex-1' onClick={(e)=>this.jump(e,'last')} to={`/${this.url}/${this.id - 1}`}>
              <Icon type="left"/>
            </Link>
            <Icon type="bars" className="flex-1 pointer" onClick={()=>this.setState({studyPanel: !this.state.studyPanel})} />
            <Link className='pointer flex-1' onClick={(e)=>this.jump(e,'next')} to={`/${this.url}/${this.id + 1}`}>
              <Icon type="right" className="w-50"/>
            </Link>
          </div>
        </div>
      </BgContainer>
    )
  }
}

let Button = baseButton([7, 15, 7, 15])
Button = styled(Button)`
  color: ${(props)=>props.finished ? '#42E133' : 'inherited'};
`
const StudyPanel = styled.div`
  transition: opacity .5s;
  background: #1B2424;
  .header {
    background: #272C33;
  }

  .list > li {
    svg.active {
      color: #4091F7;
    }
  }
`


const mapStateToProps = state => {
  return { posts: state.posts, user: state.user };
};

export default connect(
  mapStateToProps
)(Intro);

