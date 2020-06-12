/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { Text, View } from "react-native";
import { Button, Input, Item, Thumbnail } from "native-base";
import styles from "./styles.js";
// Welcome background image -> PNG assets.
const splashImage = require("../../../../assets/images/splash_6.png");

class Login extends Component {
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
        <Text style={styles.introText}>Sign-in or register now!</Text>
        <Item
          style={styles.formField}
          error={this.props.errors.email ? true : false}
          regular
        >
          <Input
            style={styles.placeholder}
            autoCapitalize="none"
            value={this.props.email}
            placeholder="user@example.com"
            onChangeText={this.props.changeUsername}
          />
        </Item>
        <Item
          style={styles.formField}
          error={this.props.errors.password ? true : false}
          regular
        >
          <Input
            secureTextEntry={true}
            placeholder="Your password"
            onChangeText={this.props.changePassword}
          />
        </Item>
        <Button
          style={styles.buttonSubmit}
          block
          dark
          onPress={this.props.login}
        >
          <Text style={styles.whiteText}>Login</Text>
        </Button>
        <Button
          onPress={this.props.navigateToRegisterScreen}
          style={styles.buttonRegister}
          block
          bordered
          danger
        >
          <Text style={styles.whiteText}>Sign-up with a new account!</Text>
        </Button>
        <Button
          onPress={() => this.props.navigateToDashboard(true)} // true is for isGuest param
          style={styles.skip}
          block
          bordered
          light
        >
          <Text style={styles.skipText}>Skip</Text>
        </Button>
        <Text style={{ alignSelf: "center", marginTop: 30, color: "#AEAEAE" }}>
          Copyright Jyze.net. All Rights Reserved.
        </Text>
        {/* <Text style={{ alignSelf: "center", marginTop: 5 }}>
          Copyright Jyze.net. All Rights Reserved.
        </Text> */}
      </View>
    );
  }
}

export default Login;
