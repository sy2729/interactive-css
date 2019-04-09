import React, { Component } from 'react';
import PreviewPanel from "./PreviewPanel";
import {Select, Icon} from "antd";
import Codes from "./Codes";
import { BgContainer } from '../style-components';
import hljs from 'highlight.js';
import css from 'highlight.js/lib/languages/css';
import 'highlight.js/styles/atom-one-dark.css';
// import CourseHOC from "./CourseTemplate";

const Option = Select.Option;
const propertyData = ['color', 'margin'];
const selector = {
  color: ['red', 'black', 'green'],
  margin: ['10px', '20px', '30px'],
};
  

let left, right = '';

class Course01 extends Component {
  constructor(){
    super();
    this.state = {
      htmlString: '<p>Hello World</p>',
      styleString: 'p { property : value;}',
      mode: 'watch',
      //需要特定的代码当前属性的代码
      property: selector[propertyData[0]],
      value: selector[propertyData[0]][0]
    }
    
  }
  handleProvinceChange(value) {
    if(left != value) right = '';
    left = value;
    this.setState({
      property: selector[value],
      value: selector[value][0],
      styleString: `p {${left}: ${right}};`
    });
  }

  onSecondCityChange(value) {
    right = value
    this.setState({
      value: value,
      styleString: `p {${left}: ${right}}`
    });
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
    const {property} = this.state
    return (
      <div className="flex bg-white h-100">
        <div className="flex flex-column w-50">
          <BgContainer className="h-50 relative over-auto t-left" bgColor="#fff">
            {/* ******** The Start **********/}
            <p  className="m-10">Normally the most basic syntax of CSS is presented as follow:</p>
            <pre className="m-10" ref="codes">
              <code className="css">{'[cssSelector] {propertyName:  value ;}'}</code>
            </pre>
            <div className="selectors flex w-100 justify-space-around m-t-2 bold">
              <p>{'p {'}</p>
              <Select
                defaultValue={selector[0]}
                style={{ width: 120 }}
                onChange={this.handleProvinceChange.bind(this)}
              >
                {propertyData.map(each => <Option key={each}>{each}</Option>)}
              </Select>
              <p>{':'}</p>
              <Select
                style={{ width: 120 }}
                value={this.state.value}
                onChange={this.onSecondCityChange.bind(this)}
              >
                {property.map(each => <Option key={each}>{each}</Option>)}
              </Select>
              <p>{' ; }'}</p>
            </div>
            {/* ******** The End **********/}
            <div className={`cover white flex align-center justify-center absolute top-0 left-0 w-100 h-100 ${this.state.mode === 'watch' ? '' : 'active'}`}>
              <h2>Not Usable When Edit <Icon className="m-l-1" type="eye-invisible" /></h2>
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

export default Course01