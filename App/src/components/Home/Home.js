/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { Text, View } from "react-native";
import { Container } from "native-base";
import styles from "./styles.js";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {}

  render() {
    return (
      <Container
        backgroundColor="#E2E2E2"
        style={styles.container.backgroundColor}
      >
        <View style={styles.containerCenter}>
          <Text style={styles.introText}>TEST</Text>
        </View>
      </Container>
    );
  }
}

export default Home;
