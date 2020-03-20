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

class Welcome extends Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {}

  render() {
    return (
      <View style={styles.containerBody}>
        <Thumbnail
          style={styles.thumbnail}
          square
          large
          source={{ uri: "https://i.lensdump.com/i/j13iQZ.png" }}
        />
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
