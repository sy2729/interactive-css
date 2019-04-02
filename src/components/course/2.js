import React, { Component } from 'react';
import PreviewPanel from "./PreviewPanel";
import { SketchPicker } from 'react-color';
import Codes from "./Codes";
import { BgContainer } from '../style-components';
import { Radio } from 'antd';

const RadioGroup = Radio.Group

class Course02 extends Component {

  constructor(){
    super();
    this.state = {
      htmlString: '<h1>Hello World</h1>',
      styleString: 'h1 {color: red;}',
      colorValueType: 'hex',
      colorValue: undefined,
      mode: 'watch'
    }
  }

  handleChangeComplete(e) {
    let value = e[this.state.colorValueType];
    value = this.state.colorValueType === 'rgb' ? `rgba(${value.r}, ${value.g}, ${value.b}, ${value.a})` : value;
    this.setState({
      colorValue: value,
      styleString: `h1 {color: ${value};}`
    })
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
    return (
      <div className="flex bg-white h-100">
        <div className="flex flex-column w-50">
          <BgContainer className="h-50 relative over-auto" bgColor="#fff">
            <h3 className="white m-10">Select the color to style the font</h3>
            <SketchPicker
               className="m-auto"
               color={this.state.colorValue  || '#222'}
               onChangeComplete={ this.handleChangeComplete.bind(this) }
              />
            <div className="m-10">Select the Color Mode</div>
            <RadioGroup name="radiogroup" defaultValue={'hex'} onChange={(e)=>{this.setState({colorValueType: e.target.value})}}>
              <Radio value={'hex'}>Hex Code</Radio>
              <Radio value={'rgb'}>RGB</Radio>
              <Radio value={3} disabled={true}>You could also use something like 'red'</Radio>
            </RadioGroup>
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


export default Course02