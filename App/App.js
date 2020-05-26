/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

// DISABLE YELLOW BOX WARNING!!!
console.ignoredYellowBox = false;

import React, { Component } from "react";
import { Alert, Animated } from "react-native";
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Title,
  Button,
  Icon,
  Spinner,
  Text,
  View,
  Content,
} from "native-base";

import { createStackNavigator, createAppContainer } from "react-navigation";
import RegisterScreen from "./src/containers/RegisterScreen/RegisterScreen";
import Dashboard from "./src/containers/Dashboard/Dashboard";
import Details from "./src/containers/Details/Details";
import OptIn from "./src/containers/OptIn/OptIn";
import Welcome from "./src/components/Authenticated/Welcome/Welcome";
import Login from "./src/components/Forms/Login/Login";
import styles from "./styles.js";
// Utility manager
import loginManager from "./src/services/loginManager";
// Location services.
navigator.geolocation = require("@react-native-community/geolocation");

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: {
        lat: null,
        lon: null,
      },
      locationNow: "",
      email: "",
      password: "",
      authenticated: false,
      textHeading: "...",
      isReady: false,
      tokens: false,
      errors: {},
      user: {},
    };
    this.getLocation = this.getLocation.bind(this);
    this.onLogout = this.onLogout.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.changeUsername = this.changeUsername.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.navigateToRegisterScreen = this.navigateToRegisterScreen.bind(this);
    this.navigateToDashboard = this.navigateToDashboard.bind(this);
  }

  async componentDidMount() {
    this.getLocation();

    const userLoggedIn = await loginManager.getStorageData("@id");
    const accessToken = await loginManager.getStorageData("@app_access_token");

    // Check if user is returning and attemps to login.
    if (userLoggedIn && accessToken) {
      const getTheUser = await loginManager.getUser(accessToken);

      // If server and user info is retrieved = success.
      if (getTheUser) {
        this.setState({
          authenticated: true,
          isReady: true,
          textHeading: "Welcome back, " + getTheUser.data.user.name + "!",
        });

        console.log("longitude: ", this.state.location.lon);
        console.log("latitude: ", this.state.location.lat);

        await loginManager.updateUser(getTheUser.data.user.email, "location", [
          this.state.location.lon,
          this.state.location.lat,
        ]);

        return;
      }

      this.setState({
        errors: {
          serverError: true,
        },
        isReady: true,
      });
      return;
    }

    // OPT-IN BETA RELEASE SIGN UP
    Alert.alert(
      "Operating in Ottawa Only",
      "The service is currently only available to Ottawa and surrounding areas, however, you can opt-in to be notified when we begin to operate in your city!",
      [
        {
          text: "Continue",
          onPress: () => console.log("Canceled"),
        },
        {
          text: "Opt-in ",
          onPress: () => this.props.navigation.navigate("OptIn"),
          style: "destructive",
        },
      ],
      { cancelable: true }
    );

    // Disable the loading screen.
    this.setState({
      isReady: true,
    });
  }

  async login() {
    let that = this;

    // Show the loading screen.
    this.setState({
      isReady: false,
    });

    try {
      var loginResults = await loginManager.loginUser(
        that.state.email,
        that.state.password,
        that
      );

      if (loginResults.success == true) {
        this.setState({
          accessToken: loginResults.accessToken,
        });

        var getUserData = await loginManager.getUser(this.state.accessToken);
        this.setState({
          user: getUserData.data.user,
        });

        this.getLocation();

        await loginManager.updateUser(getUserData.data.user.email, "location", [
          this.state.location.lon,
          this.state.location.lat,
        ]);

        // Authenticate user.
        var authenticated = await loginManager.authenticate(that);
        // If user is authenticated.
        if (authenticated) {
          this.setState({
            textHeading: "Hello " + getUserData.data.user.name + "!",
            authenticated: true,
            isReady: true,
          });
        }
      } else {
        this.setState({
          errors: loginResults,
          isReady: true,
          password: "",
        });
        console.log("Failed login results!", loginResults);
      }
    } catch (err) {
      this.setState({
        isReady: true,
      });

      Alert.alert(
        "Sorry something is wrong",
        "Please check your connection and try again.",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ],
        { cancelable: false }
      );
      console.log(err);
    }
  }

  async onLogout() {
    Alert.alert(
      "Are you sure?",
      "Would like to logout?",
      [
        {
          text: "No",
          style: "cancel",
        },
        { text: "Yes", onPress: () => this.logout(), style: "destructive" },
      ],
      { cancelable: false }
    );
  }

  async logout() {
    try {
      loginManager.clearAsyncStorage();
      this.setState({
        authenticated: false,
        tokens: false,
        email: "",
        password: "",
        textHeading: "...",
      });

      Alert.alert(
        "Signed Out",
        "You are now logged out",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
    } catch (e) {
      console.log(e);
    }
  }

  getLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
        this.setState({
          location: {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          },
          locationNow: `Your location is: ${position.coords.latitude}/${position.coords.longitude}`,
        });
      },
      (error) => {
        Alert.alert(
          "Error Retrieving Location",
          "Could not determine your location, ensure location services are turned on.",
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
            { text: "OK", onPress: () => console.log("OK Pressed") },
          ],
          { cancelable: false }
        );
        console.log(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 30000,
      }
    );
  }

  navigateToRegisterScreen() {
    this.props.navigation.navigate("Register"); //pass params to this object to pass current vixomplant instance
  }
  navigateToDashboard(isGuest) {
    if (!isGuest) {
      return this.props.navigation.navigate("Dashboard"); //pass params to this object to pass current vixomplant instance
    }

    return this.props.navigation.navigate("Dashboard", {
      guest: true,
      location: this.state.location,
    });
  }

  changeUsername(e) {
    this.setState({
      email: e,
    });
  }

  changePassword(e) {
    this.setState({
      password: e,
    });
  }

  render() {
    var loadingIcon = <Spinner style={styles.spinner} color="#F39034" />;

    if (this.state.isReady !== true) {
      return loadingIcon;
    }

    return (
      <Container style={styles.backgroundColor}>
        {this.state.authenticated ? (
          <Header noLeft>
            <Left>
              <Button onPress={this.onLogout} transparent>
                <Icon
                  style={styles.iconQuestion}
                  type="FontAwesome"
                  name="sign-out"
                />
              </Button>
            </Left>
            <Body>
              <Title>Jyze</Title>
            </Body>
            <Right>
              {/* <Button onPress={this.getLocation} transparent>
                <Icon
                  type="FontAwesome"
                  style={styles.iconLocation}
                  name="map-pin"
                />
              </Button> */}
            </Right>
          </Header>
        ) : null}

        {/* Error incase server is unreachable */}
        {this.state.errors.serverError ? (
          <View style={styles.defaultMessageContainer}>
            <Text style={styles.defaultMessage}>
              Looks like we're are experiencing some issues, try again later.
            </Text>
          </View>
        ) : null}
        {/* END Error incase server is unreachable */}

        <Content>
          {/* Rengder either the login form or welcome screen */}
          {this.state.authenticated ? (
            <Welcome
              navigateToDashboard={this.navigateToDashboard}
              textHeading={this.state.textHeading}
              navigation={this.props.navigation}
            />
          ) : (
            <Login
              errors={this.state.errors}
              email={this.state.email}
              navigateToRegisterScreen={this.navigateToRegisterScreen}
              navigateToDashboard={this.navigateToDashboard}
              changePassword={this.changePassword}
              changeUsername={this.changeUsername}
              login={this.login}
            />
          )}
        </Content>
      </Container>
    );
  }
}

const HomeStack = createStackNavigator(
  {
    Home: App,
    Register: RegisterScreen,
    Dashboard: Dashboard,
    Details: Details,
    OptIn: OptIn,
  },
  {
    headerMode: "none",
  }
);

export default createAppContainer(HomeStack);
