import React from 'react';
// import {Editor, EditorState} from 'draft-js';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-css';
import "prismjs/themes/prism.css";

class MyEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    // this.state = {
    //   editorState: EditorState.createEmpty(),
    // };
    // this.onChange = (editorState) => {
    //   console.log(editorState.target.value)
    //   this.setState({editorState})
    // };
  }

  componentWillMount(){
    this.setState({
      code: this.props.styleData
    })
  }

  valueChanged(code){
    this.setState({ code })
    this.props.valueChanged(code)
  }

  render() {
    return (
      <Editor
        placeholder="Type some code…"
        value={this.state.code}
        onValueChange={code => this.valueChanged(code)}
        highlight={code => highlight(code, languages.css, 'css')}
        padding={30}
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 12,
        }}
      />
    );
  }
}

export default MyEditor;