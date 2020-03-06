/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { Text, View } from "react-native";
import { Button } from "native-base";
import styles from "./styles.js";

class Welcome extends Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {}

  render() {
    return (
      <View style={styles.containerBody}>
        <Text style={styles.introText}>{this.props.textHeading}</Text>
        <Button
          style={styles.buttonSubmitBtn}
          block
          success
          onPress={this.props.navigateToDashboard}
        >
          <Text style={styles.buttonSubmit}>
            Find Halal Restaurants Nearby...
          </Text>
        </Button>
      </View>
    );
  }
}

export default Welcome;
