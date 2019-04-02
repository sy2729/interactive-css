import React, { Component } from 'react';
import styled from 'styled-components';
import marked from 'marked'
import { Link } from 'react-router-dom'
// import highlight from 'highlight.js'
// import '../../js-highlight.css';
// import ReactMarkdown from 'react-markdown';
// import CodeBlock from '../CodeBlock';
import { BgContainer, baseButton } from '../style-components';
import { Icon, message } from 'antd'

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
    super()
  }

  componentWillMount() {
    let path = window.location.hash.split('/');
    this.id = path[2] - 0;
    this.url = path[1];
  }

  componentWillReceiveProps() {
    let path = window.location.hash.split('/');
    this.id = path[2] - 0;
    this.url = path[1];
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

  render() {
    // console.log(this.state.introData)
    const markedHtml = this.props.introData ? marked(this.props.introData.intro) : null;
    return (
      <BgContainer className="white w-100 h-100 p-20" boxShadow="5px 0px 7px 0px rgba(41,41,41,1)">
        <Icon className="absolute right-1 pointer" style={{fontSize: '2em'}} type="close" onClick={()=>this.props.closeIntro()} />
        <h1 className="m-t-2">{this.props.introData && this.props.introData.name || 'Title - no Data yet - in Dev'}</h1>
        {/* <p className="t-left">{this.state.introData && this.state.introData['01'].intro}</p> */}
        {this.props.introData ? <div className="t-justify" dangerouslySetInnerHTML={{__html: markedHtml}}/> : 'no data yet - in dev' }

        <Button className="m-2 f-right">
          <Icon type="check-circle" />
          <span className="p-w-10">Finish</span>
        </Button>
        <div className="fixed flex w-100 justify-space-between" style={{bottom: '10px', fontSize: '2em'}}>
          <Link className='pointer' onClick={(e)=>this.jump(e,'last')} to={`/${this.url}/${this.id - 1}`}><Icon type="left-circle" /></Link>
          <Link className='pointer' onClick={(e)=>this.jump(e,'next')} to={`/${this.url}/${this.id + 1}`}><Icon type="right-circle" /></Link>
        </div>

      </BgContainer>
    )
  }
}

const Button = baseButton([7, 15, 7, 15])

export default Intro