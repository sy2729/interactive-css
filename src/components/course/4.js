import React, { Component } from 'react';
import PreviewPanel from "./PreviewPanel";
import {Select, Input, Tooltip,  Button} from "antd";
import Codes from "./Codes";
import { BgContainer } from '../style-components';


// Font Course
// font-size font-family color font-weight
const Option = Select.Option;
const propertyData = {
  'border': {
    borderColor: ['red', 'green', 'purple', '#bbb', 'rgba(122,145,241, 0)'],
    borderStyle: ['solid', 'dashed', 'dotted', 'inset', 'double', 'groove', 'ridge', 'outset']
  },
  background: ['red', 'green', 'purple', '#bbb', 'rgba(122,145,241, 0)'],
};

let initStyle =  'body {background: pink;} \r\n';

class Course04 extends Component {
  constructor(){
    super();
    this.state = {
      htmlString: '<div>This is a div</div>',
      styleString: ``,
      mode: 'watch',
      //需要特定的代码当前属性的代码
      styleObject: {
        margin: {
          num: undefined,
        },
        padding: {
          num: undefined
        },
        border: {
          num: undefined,
          style: undefined,
          color: undefined
        },
        background: {
          num: undefined
        }
      }
    }
    
  }

  inputValue(e, type) {
    const { value } = e.target;
      const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
      if (!((!Number.isNaN(value) && reg.test(value)) || value === '' || value === '-')) {
        return
      }
    let styleObject = this.state.styleObject;
    styleObject[type].num = `${value}px`;
    this.setState({styleObject})
    this.constructCSS()
  }

  selectValue(value, type, subType){
    let styleObject = this.state.styleObject;

    if(type === 'border') {
      styleObject.border[subType] = value;
    }else {
      styleObject[type].num = value;
    }
    
    this.setState({styleObject})
    this.constructCSS()
  }

  constructCSS(){
    let template = 'div {\r\n$xx\r\n}'
    let styleObject = this.state.styleObject
    let string = '';
    for (let i in styleObject) {
      if(i !== 'border') {
        for (let j in styleObject[i]) {
          if(styleObject[i][j]) {
            string += `${i}: ${styleObject[i][j]}; \r\n`
          }
        }
      }else {
        string += styleObject[i].num ? `border-width: ${styleObject[i].num}; \r\n` : '';
        string += styleObject[i].style ? `border-style: ${styleObject[i].style}; \r\n` : '';
        string += styleObject[i].color ? `border-color: ${styleObject[i].color}; \r\n` : '';
      }
    }
    template = template.replace('$xx', string);
    let prevStyle = initStyle;
    prevStyle += template
    this.setState({styleString: prevStyle})
    // console.log(template)
  }

  componentWillMount(){
    this.setState({styleString: initStyle})
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

  render(){
    // const marginOptions = propertyData.margin.background.map((i)=><Option key={i} value={i}>{i}</Option>)
    // const paddingOptions = propertyData.padding.background.map((i)=><Option key={i} value={i}>{i}</Option>)
    const borderOptions = propertyData.border.borderColor.map((i)=><Option key={i} value={i}>{i}</Option>)
    const borderStyles = propertyData.border.borderStyle.map((i)=><Option key={i} value={i}>{i}</Option>)
    const backgroundOptions = propertyData.background.map((i)=><Option key={i} value={i}>{i}</Option>)
    

    return (
      <div className="flex bg-white h-100">
        <div className="flex flex-column w-50">
          <BgContainer className="h-50 relative over-auto t-left" bgColor="#fff">
            {/* ******** The Start **********/}
            <div className="m-1">
              <h1>MARGIN</h1> <h3>Set the margin of the box</h3>
              <div className="flex">
                <Tooltip
                  trigger={['focus']}
                  title='input number'
                  placement="topLeft"
                  overlayClassName="numeric-input"
                  className="flex-1"
                >
                  <Input onChange={(e)=>this.inputValue(e, 'margin')}  placeholder={'unit: px'}/>
                </Tooltip>
                {/* <Select onSelect={(value)=>this.selectValue(value, 'margin')} placeholder="select the color for the margin color" className="flex-1">
                  {marginOptions}
                </Select> */}
              </div>
            </div>

            <div className="m-1">
              <h1>PADDING</h1> <h3>Set the padding of the box</h3>
              <div className="flex">
                <Tooltip
                  trigger={['focus']}
                  title='input number'
                  placement="topLeft"
                  overlayClassName="numeric-input"
                  className="flex-1"
                >
                  <Input onChange={(e)=>this.inputValue(e, 'padding')}  placeholder={'unit: px'}/>
                </Tooltip>
                {/* <Select onSelect={(value)=>this.selectValue(value, 'padding')} placeholder="select the color for the padding color" className="flex-1">
                  {paddingOptions}
                </Select> */}
              </div>
            </div>

            <div className="m-1">
              <h1>BORDER</h1> <h3>Set the border of the box</h3>
              <div className="flex">
                <Tooltip
                  trigger={['focus']}
                  title='input number'
                  placement="topLeft"
                  overlayClassName="numeric-input"
                  className="flex-1"
                >
                  <Input onChange={(e)=>this.inputValue(e, 'border')}  placeholder={'unit: px'}/>
                </Tooltip>
                <Select onSelect={(value)=>this.selectValue(value,'border', 'style')} placeholder="select the style for the border" className="flex-1">
                  {borderStyles}
                </Select>
                <Select onSelect={(value)=>this.selectValue(value,'border', 'color')} placeholder="select the color for the border" className="flex-1">
                  {borderOptions}
                </Select>
              </div>
            </div>

            <div className="m-1">
              <h1>BackGround</h1> <h3>Set the background of the box</h3>
              <div className="flex">
                <Select onSelect={(value)=>this.selectValue(value,'background')} placeholder="select the style for the background" className="flex-1">
                  {backgroundOptions}
                </Select>
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

export default Course04