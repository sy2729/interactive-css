import React, { Component } from 'react';
import PreviewPanel from "./PreviewPanel";
import Codes from "./Codes";
import { BgContainer } from '../style-components';



const CourseHOC = (Compo)=> 
  ({ children, ...props })  => {
  
    class NewComp extends Component {
      constructor(){
        super();
        this.state = {
          htmlString: '',
          styleString: '',
          mode: 'watch',
          //需要特定的代码当前属性的代码
        }
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
      //需要添加customized的组件方法

      render(){
        return (
          <Compo {...this.props}>
            <div className="flex bg-white h-100"></div>
            <div className="flex flex-column w-50">
              <BgContainer className="h-50 relative over-auto" bgColor="#fff">
                <h1>Tesdt</h1>
                {/* 需要放置自己的组件信息 ，并绑定以上方法 */}
                <div className={`cover white flex align-center justify-center absolute top-0 left-0 w-100 h-100 ${this.state.mode === 'watch' ? '' : 'active'}`}>
                  Not Usable When Edit
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
          </Compo>
        )
      }
    }
  return <NewComp />
}

export default CourseHOC