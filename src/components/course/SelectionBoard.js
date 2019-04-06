import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Btn from '../Btn';
import {Icon} from 'antd';


class SelectionBoard extends Component {

  render() {
    const List = this.props.links.map( (i, index) => {
      return (
        <Link key={i} to={`${this.props.url}/${index + 1}`} className="m-w-10">
          <div className="m-t-1">
            <Btn text={i} finished={this.props.finished && this.props.finished[index]}/>
          </div>
        </Link>
      )
    })

    return (
      <div className="flex m-10 flex-wrap">
        {this.props.links && this.props.links.length > 0 ? List : <Icon className="white t-3 m-1" type="loading" />}
      </div>
    )
  }
}

export default SelectionBoard