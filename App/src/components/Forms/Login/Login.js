/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { Text, View } from "react-native";
import { Button, Input, Item } from "native-base";
import styles from "./styles.js";

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
        <Text style={styles.introText}>
          Hello there, please sign-in or register now!
        </Text>
        <Item error={this.props.errors.email ? true : false} regular>
          <Input
            autoCapitalize="none"
            value={this.props.email}
            placeholder="user@example.com"
            onChangeText={this.props.changeUsername}
          />
        </Item>
        <Item error={this.props.errors.password ? true : false} regular>
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
      </View>
    );
  }
}

export default Login;
