/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { Text, View } from "react-native";
import { Button, Thumbnail, Icon } from "native-base";
import styles from "./styles.js";
// Welcome image -> PNG assets.
const splashImage = require("../../../../assets/images/splash.png");

class Welcome extends Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    // Void. No state modifications.
  }

  render() {
    return (
      <View style={styles.containerBody}>
        <Thumbnail style={styles.thumbnail} square large source={splashImage} />
        <Text style={styles.introText}>{this.props.textHeading}</Text>
        <Button
          style={styles.buttonSubmitBtn}
          block
          iconRight
          dark
          onPress={this.props.navigateToDashboard}
        >
          <Text style={styles.buttonSubmit}>Continue </Text>
          <Icon name="arrow-forward" />
        </Button>
      </View>
    );
  }
}

export default Welcome;
