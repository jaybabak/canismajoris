/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { Text, Badge } from "native-base";

class OpenOrClosedStatus extends Component {
  constructor(props) {
    super(props);
    this.state = { ...props };
  }

  async componentDidMount() {
    console.log(this.props);
    // Void. Left empty.
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    if (this.state.isOpen === null) {
      return (
        <Badge warning>
          <Text style={{ alignSelf: "flex-end" }}>Possibly open</Text>
        </Badge>
      );
    }

    //use warning attribute to render yellow maybe open button.
    return this.state.isOpen ? (
      <Badge success>
        <Text style={{ alignSelf: "flex-end" }}>Open</Text>
      </Badge>
    ) : (
      <Badge>
        <Text style={{ alignSelf: "flex-end" }}>Currently Closed</Text>
      </Badge>
    );
  }
}

export default OpenOrClosedStatus;
