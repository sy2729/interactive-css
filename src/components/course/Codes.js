import React, { Component } from 'react';
import { message,  Icon } from 'antd';
import styled from 'styled-components';
import hljs from 'highlight.js';
import css from 'highlight.js/lib/languages/css';
import html from 'highlight.js/lib/languages/css';
import 'highlight.js/styles/atom-one-dark.css';
import CSSEditor from './CSSEditor';
import HTMLEditor from './HTMLEditor';

import {baseButton} from '../style-components';

hljs.registerLanguage('css', css);

class Codes extends Component {

  constructor() {
    super();
    this.state = {
      editorTypeState: 'css'
    }
  }
  
  componentDidMount(){
    this.highLight();
  }

  componentDidUpdate(){
    this.highLight();
  }

  highLight(){
    if(this.props.mode === 'watch') {
      hljs.highlightBlock(this.refs.codes)
    }
  }

  switchMode(){
    let newMode = this.props.mode === 'watch'  ? 'edit' : 'watch';
    this.props.switchMode(newMode)
    let messageText = this.props.mode === 'watch' ? 
    "Now in the Edit Mode,  Do some hands-on coding!" :
    "Now in the Watch Mode,  Enjoy the interactivity!"
    message.info(messageText);
  }

  render() {
    const CodeWatchContainer = this.state.editorTypeState === 'css'  ? 
      <pre>
        <code className='css' ref='codes' style={{minHeight: '50vh',  padding: '30px'}}>
          {this.props.styleData}
        </code>
      </pre> :
      <pre>
        <code className='html' ref='codes' style={{minHeight: '50vh',  padding: '30px'}}>
          {this.props.htmlData}
        </code>
      </pre>;
    const Editor = this.state.editorTypeState === 'css'  ? 
        <CSSEditor 
        valueChanged={(e)=>this.props.valueChanged(e, 'css')}
        ref='codes'
        styleData={this.props.styleData}/> :
        <HTMLEditor
        valueChanged={(e)=>this.props.valueChanged(e, 'html')}
        ref='codes'
        htmlData={this.props.htmlData} />
    return (
      <div className="h-50 t-left relative over-auto">
        <LanguagePanel
          style={{padding: '3px 0 0 3px', width: '100px', zIndex: 2}} 
          className={`absolute flex justify-space-around ${this.props.mode === 'watch' ? "white" : "gray"}`}>
          <p  
           onClick={()=>this.setState({editorTypeState: 'html'})}
           className={`pointer ${this.state.editorTypeState ===  'html' ? 'active' : ''}`}
           >HTML</p>
          <p> | </p>
          <p 
           onClick={()=>this.setState({editorTypeState: 'css'})}
           className={`pointer ${this.state.editorTypeState ===  'html' ? '' : 'active'}`}
           >CSS</p>
        </LanguagePanel>
        <Button
          style={{zIndex: 2}}
          className="absolute right-1 top-1 pointer"
          onClick={this.switchMode.bind(this)}
          >{this.props.mode ===  'watch'  ? 'Edit the code' : 'Watch the code'} {' '}
            <Icon type="setting" />
          </Button>
        { this.props.mode === 'watch' ?
           CodeWatchContainer
           :
           Editor
        }
      </div>
    )
  }
}

const Button = baseButton([5, 10, 5,  10], 130, {boxShadow: 'none'});
const LanguagePanel = styled.div`
  &.white {
    p {
      color: gray;
    }
    p.active {
      color: inherit;
    }
  }

  &.gray {
    p.active {
      color: #30373F;
    }
  }
`

export default Codes

/**
 * 
 * 
 * 
 */