import React, { Component } from 'react';
import PreviewPanel from "./PreviewPanel";
import {Select, Input,  Button} from "antd";
import Codes from "./Codes";
import { BgContainer } from '../style-components';
import hljs from 'highlight.js';
import css from 'highlight.js/lib/languages/css';
import 'highlight.js/styles/atom-one-dark.css';

// Font Course
// font-size font-family color font-weight
const Option = Select.Option;
const propertyData = {
  'font-size': {
    options: ['10px', '16px', '20px', '25px', '1em', '2em'],
    explaination: `There a a few options you can use as the unit when measuring the font-size, such as 'px', 'em', 'rem' etc.`
  },
  'color': {
    options: ['red', 'green', 'blue', '#222', '#123412'],
    explaination: `as we have introduced in the last section`
  },
  'font-family': {
    options: ['monospace', 'helvetica', 'Arial'],
    explaination: `introduction about font-family`
  },
  'font-weight': {
    options: ['bold', 'thin', '100', '300', '700'],
    explaination: `introduction about font-weight`
  },
};

let finalValue =  {};

  

let left, right = '';

class Course03 extends Component {
  constructor(){
    super();
    this.state = {
      htmlString: '<p>Hello World</p>',
      styleString: 'p { property : value;}',
      mode: 'watch',
      //需要特定的代码当前属性的代码
      explaination: null,
      valueOptions: null,
      currentProperty: null,
      selectValue: null
    }
    
  }
  
  selectProperty(v){
    let {options, explaination} = propertyData[v];
    this.setState({currentProperty: v})
    this.setState({
      explaination,
      valueOptions: options,
      selectValue: null
    })
    this.constructCSS('property', v)
  }

  selectValue(v) {
    this.setState({selectValue: v})
    this.constructCSS('css', this.state.currentProperty, v)
  }
  typeInValue(v) {
    this.setState({selectValue: null})
    this.constructCSS('css', this.state.currentProperty, v)
  }

  constructCSS(type, propertyName, valueName){
    if(type==='property') {
      finalValue[propertyName] = null;
    }else {
      finalValue[propertyName] = valueName;
    }

    let cssStringTemplate = 'p {\r\n$xx\r\n}';
    let strings  = '';
    // console.log(finalValue)
    for (let i in finalValue) {
      strings += `  ${i} : ${finalValue[i]}; \r\n`
    }
    cssStringTemplate = cssStringTemplate.replace('$xx', strings);
    // console.log(cssStringTemplate)
    this.setState({'styleString': cssStringTemplate})
  }


  switchMode(newMode){
    this.setState({mode: newMode})
  }

  editorValueChanged(value, type) {
    if (type ===  'css') {
      this.setState({styleString: value})
    }else {
      this.setState({htmlString: value})
    }
  }

  componentDidMount(){
    hljs.highlightBlock(this.refs.codes)
  }

  render(){

    const Options = [];
    for (let i in propertyData){
      Options.push(<Option value={i} key={i}>{i}</Option>)
    }

    let valueOptions = [];
    if(this.state.valueOptions) {
      valueOptions = this.state.valueOptions.map((i)=><Button onClick={()=>this.selectValue(i)} className="m-r-1" key={i}>{i}</Button>)
    }

    return (
      <div className="flex bg-white h-100">
        <div className="flex flex-column w-50">
          <BgContainer className="h-50 relative over-auto t-left" bgColor="#fff">
            {/* ******** The Start **********/}
            <p  className="m-10">Normally there are four common properties we will set on the text</p>
            <pre className="m-10" ref="codes">
              <code>{'//font-weight, font-size, color, font-weight'}</code>
            </pre>
            <div className="m-1">
              <div className="flex">
                <Select
                  onChange={this.selectProperty.bind(this)}
                  style={{width:  '140px'}}
                  >
                  {Options}
                </Select>
                <Input placeholder={this.state.selectValue || "either type in the value or select from below"} allowClear onChange={(e)=>this.typeInValue(e.target.value)} />
              </div>
              <div className="flex m-t-1">
                {valueOptions}
              </div>
              <div className="t-justify m-10">
                {this.state.explaination}
              </div>
            </div>


            {/* ******** The End **********/}
            <div className={`cover white flex align-center justify-center absolute top-0 left-0 w-100 h-100 ${this.state.mode === 'watch' ? '' : 'active'}`}>
              <h2>Not Usable When Edit</h2>
            </div>
          </BgContainer>


          <Codes
            mode={this.state.mode}
            switchMode={(e)=>this.switchMode(e)}
            htmlData = {this.state.htmlString}
            styleData = {this.state.styleString}
            valueChanged={(e, type)=>{this.editorValueChanged(e, type)}}/>
        </div>
        <PreviewPanel htmlData={this.state.htmlString}  styleData = {this.state.styleString}/>
      </div>
    )
  }
}

// const Course = CourseHOC(Course01)

export default Course03