import React, { Component } from 'react';
import { HightLightCircle, baseButton } from './style-components';

class Btn extends Component {
  constructor(props){
    super(props);
  }

  render() {

    return (
      <>
        <Button className="flex align-center justify-space-between" onClick={this.props.onClick}>
          <span className='p-w-10'>{this.props.text}</span>
          <HightLightCircle />
        </Button>
      </>
    )
  }

}

const Button = baseButton([10,24,10,24], 200);

export default Btn;