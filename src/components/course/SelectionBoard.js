import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Btn from '../Btn';


class SelectionBoard extends Component {

  render() {
    const List = this.props.links.map( i => {
      return (
        <Link key={i} to={`${this.props.url}/${i}`} className="m-w-10">
          <Btn text={i} />
        </Link>
      )
    })

    return (
      <div className="flex m-10">
        {List}
      </div>
    )
  }
}

export default SelectionBoard