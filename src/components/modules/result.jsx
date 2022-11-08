import React from "react";
import Item from "./item";

export default class Result extends React.Component {
  render() {
    return (
      <ul>
        {this.props.items.map((item, index) => (
          <Item item={item} key={index} />
        ))}
      </ul>
    );
  }
}
