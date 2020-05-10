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
    // Void. No state modifications.
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
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
