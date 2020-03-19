/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { Alert } from "react-native";
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Title,
  Button,
  Icon,
  Spinner
} from "native-base";
import { createStackNavigator, createAppContainer } from "react-navigation";
import RegisterScreen from "./src/containers/RegisterScreen/RegisterScreen";
import Dashboard from "./src/containers/Dashboard/Dashboard";
import Details from "./src/containers/Details/Details";
import Welcome from "./src/components/Authenticated/Welcome/Welcome";
import Login from "./src/components/Forms/Login/Login";
import styles from "./styles.js";

// Utility manager
import loginManager from "./src/util/loginManager";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: {
        lat: null,
        lon: null
      },
      locationNow: "",
      email: "",
      password: "",
      authenticated: false,
      textHeading: "...",
      isReady: false,
      tokens: false,
      errors: {},
      user: {}
    };
    this.getLocation = this.getLocation.bind(this);
    this.onLogout = this.onLogout.bind(this);
    this.login = this.login.bind(this);
    this.changeUsername = this.changeUsername.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.navigateToRegisterScreen = this.navigateToRegisterScreen.bind(this);
    this.navigateToDashboard = this.navigateToDashboard.bind(this);
  }

  async componentDidMount() {
    this.getLocation();

    const userLoggedIn = await loginManager.getStorageData("@id");
    const accessToken = await loginManager.getStorageData("@app_access_token");
    // check if user is returning and attemps to login
    if (userLoggedIn && accessToken) {
      let that = this;
      const getTheUser = await loginManager.getUser(accessToken);

      if (getTheUser) {
        this.setState({
          authenticated: true,
          isReady: true,
          textHeading: "Welcome back, " + getTheUser.data.user.name
        });

        console.log("longitude: ", this.state.location.lon);
        console.log("latitude: ", this.state.location.lat);

        const updateUserLocation = await loginManager.updateUser(
          getTheUser.data.user.email,
          "location",
          [this.state.location.lon, this.state.location.lat]
        );

        return;
      }

      this.setState({
        isReady: true
      });

      return;
    }

    // Disable the loading screen.
    this.setState({
      isReady: true
    });
  }

  async login() {
    let that = this;

    // Show the loading screen.
    this.setState({
      isReady: false
    });

    try {
      var loginResults = await loginManager.loginUser(
        that.state.email,
        that.state.password,
        that
      );

      if (loginResults.success == true) {
        // console.log('Succesful login results!', loginResults);
        this.setState({
          accessToken: loginResults.accessToken
        });

        var getUserData = await loginManager.getUser(this.state.accessToken);
        this.setState({
          user: getUserData.data.user
        });

        this.getLocation();

        await loginManager.updateUser(getUserData.data.user.email, "location", [
          this.state.location.lon,
          this.state.location.lat
        ]);

        var authenticated = await loginManager.authenticate(that);
        if (authenticated) {
          this.setState({
            textHeading: "Hello " + getUserData.data.user.name,
            authenticated: true,
            isReady: true
          });
        }
      } else {
        this.setState({
          errors: loginResults,
          isReady: true,
          password: ""
        });
        console.log("Failed login results!", loginResults);
      }
    } catch (err) {
      this.setState({
        isReady: true
      });

      Alert.alert(
        "Sorry something is wrong",
        "Please check your connection and try again.",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ],
        { cancelable: false }
      );
      console.log(err);
    }
  }

  async onLogout() {
    try {
      loginManager.clearAsyncStorage();
      this.setState({
        authenticated: false,
        tokens: false,
        email: "",
        password: "",
        textHeading: "..."
      });

      Alert.alert(
        "Logged out!",
        "Help screen will be available soon!",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ],
        { cancelable: false }
      );
    } catch (e) {
      console.log(e);
    }
  }

  getLocation() {
    navigator.geolocation.getCurrentPosition(
      position => {
        console.log(position);
        this.setState({
          location: {
            lat: position.coords.latitude,
            lon: position.coords.longitude
          },
          locationNow: `Your location is: ${position.coords.latitude}/${position.coords.longitude}`
        });
      },
      error => {
        Alert.alert(
          "Error Retrieving Location",
          "Could not determine your location, ensure location services are turned on.",
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            },
            { text: "OK", onPress: () => console.log("OK Pressed") }
          ],
          { cancelable: false }
        );
        console.log(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 30000
      }
    );
  }

  navigateToRegisterScreen() {
    this.props.navigation.navigate("Register"); //pass params to this object to pass current vixomplant instance
  }
  navigateToDashboard() {
    this.props.navigation.navigate("Dashboard"); //pass params to this object to pass current vixomplant instance
  }

  changeUsername(e) {
    this.setState({
      email: e
    });
  }

  changePassword(e) {
    this.setState({
      password: e
    });
  }

  render() {
    var loadingIcon = <Spinner style={styles.spinner} color="#F39034" />;

    if (this.state.isReady !== true) {
      return loadingIcon;
    }

    return (
      <Container
        backgroundColor="#E2E2E2"
        style={styles.container.backgroundColor}
      >
        <Header noLeft>
          <Left>
            <Button onPress={this.onLogout} transparent>
              <Icon
                style={styles.iconQuestion}
                type="FontAwesome"
                name="question-circle"
              />
            </Button>
          </Left>
          <Body>
            <Title>Canis Majoris</Title>
          </Body>
          <Right>
            <Button onPress={this.getLocation} transparent>
              <Icon
                type="FontAwesome"
                style={styles.iconLocation}
                name="map-pin"
              />
            </Button>
          </Right>
        </Header>
        {/* Rengder either the login form or welcome screen */}
        {this.state.authenticated ? (
          <Welcome
            navigateToDashboard={this.navigateToDashboard}
            textHeading={this.state.textHeading}
          />
        ) : (
          <Login
            errors={this.state.errors}
            email={this.state.email}
            navigateToRegisterScreen={this.navigateToRegisterScreen}
            changePassword={this.changePassword}
            changeUsername={this.changeUsername}
            login={this.login}
          />
        )}
      </Container>
    );
  }
}

const HomeStack = createStackNavigator(
  {
    Home: App,
    Register: RegisterScreen,
    Dashboard: Dashboard,
    Details: Details
  },
  {
    headerMode: "none"
  }
);

export default createAppContainer(HomeStack);
