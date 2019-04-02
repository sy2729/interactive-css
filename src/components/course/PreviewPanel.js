import React, { Component } from 'react';
import styled from 'styled-components';

import { bgContainer as BgContainer } from '../style-components';

class PreviewPanel extends Component {
  

  componentDidMount(){
    //add the html
    this.updateHTML(this.props.htmlData)
    //add the style
    this.updateStyle(this.props.styleData || '')
  }

  componentDidUpdate() {
    this.updateHTML(this.props.htmlData)
    this.updateStyle(this.props.styleData || '')
  }

  updateHTML(string) {
    this.refs.ifr.contentDocument.body.innerHTML = string || `<div>Hello World</div>`;
  }

  updateStyle(string) {
    let styleEl = this.refs.ifr.contentDocument.querySelector('style');
    if(styleEl) {
      styleEl.innerHTML = string
    }else {
      let styleEl = document.createElement('style');
      styleEl.textContent = string;
      let head = this.refs.ifr.contentDocument.querySelector('head');
      head.appendChild(styleEl)
    }
  }

  render() {
    return (
      <WindowWrapper className="w-50 relative">
        <iframe className='w-100 h-100' ref='ifr' frameBorder="0">
        </iframe>
        <div className="window-prompt absolute top-1 right-1 opa-0">
          The PreviewPanel
        </div>
      </WindowWrapper>
      // <BgContainer
      //    className="w-100 h-100 p-20" 
      //    bgColor="red" 
      //    boxShadow="none"
      //    >
      //   <div className="w-100 h-100" dangerouslySetInnerHTML={{__html: this.props.htmldata}}></div>
      // </BgContainer>
    )
  }
}

const WindowWrapper = styled.div`
  border-left:  2px solid #ddd;
  .window-prompt {
    border: 1px solid #ddd;
    transition: opacity .6s;
    padding: 10px;
    pointer-events: none;
  }
  &:hover {
    .window-prompt {
      opacity: 1;
    }
  }

`

export default PreviewPanel