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
import "react-native-gesture-handler";
import RegisterScreen from "./src/containers/RegisterScreen/RegisterScreen";
import Dashboard from "./src/containers/Dashboard/Dashboard";
import Details from "./src/containers/Details/Details";
import OptIn from "./src/containers/OptIn/OptIn";
import Welcome from "./src/components/Authenticated/Welcome/Welcome";
import Login from "./src/components/Forms/Login/Login";
import styles from "./styles.js";
// Utility manager
import loginManager from "./src/services/loginManager";
// Services manager
import serviceContainer from "./src/services/serviceContainer";
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
    this.serverDownMessage = this.serverDownMessage.bind(this);
    // In it's own function so that refresh/reload functioanlity works
    // originally part of component did mount function.
    this.authenticate = this.authenticate.bind(this);
  }

  async componentDidMount() {
    // initally show loading screen.
    this.setState({
      isReady: false,
    });
    // Get current user co-ordinates.
    this.getLocation();
    // Check if user is already logged in to the app.
    this.authenticate();

    // Ensure that the user is only shown mailing list popup once.
    const displayedMailingListToUser = await serviceContainer.getStorageData(
      "mailingList"
    );

    if (!displayedMailingListToUser) {
      await serviceContainer.setStorageData(
        "mailingList", // Key.
        "@!///#%^" // Value (true)
      );

      // Mailing list sign up.
      Alert.alert(
        "Subscribe to Mailing List",
        "Be the first to know about special promotions, product information and updates from Jyze!",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Canceled"),
            style: "destructive",
          },
          {
            text: "Subscribe",
            onPress: () => this.props.navigation.navigate("OptIn"),
          },
        ],
        { cancelable: true }
      );
    }
  }

  async authenticate() {
    // Check if user data is stored.
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
          errors: {
            serverError: false,
          },
        });

        console.log("longitude: ", this.state.location.lon);
        console.log("latitude: ", this.state.location.lat);

        await loginManager.updateUser(getTheUser.data.user.email, "location", [
          this.state.location.lon,
          this.state.location.lat,
        ]);

        return;
      }
    }

    // Disable the loading screen.
    // this.serverDownMessage();

    this.setState({
      // errors: {
      //   serverError: true,
      // },
      isReady: true,
    });
    return;
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
            errors: {
              serverError: false,
            },
          });
        }
      } else {
        this.setState({
          errors: loginResults,
          isReady: true,
          password: "",
        });
        console.log("Failed login results!", loginResults);
        console.log("STATE", this.state);
      }
    } catch (err) {
      this.setState({
        isReady: true,
        errors: {
          serverError: true,
        },
      });

      // this.serverDownMessage();

      console.log(err);
    }
  }

  async onLogout() {
    Alert.alert(
      "Are you sure?",
      'Clicking "Yes" will log you out',
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
    var location = {
      lat: null,
      lon: null,
    };
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          location: {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          },
          locationNow: `Your location is: ${position.coords.latitude}/${position.coords.longitude}`,
        });
        location.lat = position.coords.latitude;
        location.lon = position.coords.longitude;
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

    return location;
  }

  navigateToRegisterScreen() {
    this.props.navigation.navigate("Register"); //pass params to this object to pass current vixomplant instance
  }

  // Is guest param for the Login component to trigger
  navigateToDashboard(isGuest) {
    const location = this.getLocation();
    return this.props.navigation.navigate("Dashboard", {
      guest: true,
      location: location,
    });

    // Uncomment for authenticated routes to getRestaurants (read comments below)
    // if (!isGuest) {
    //   // Temporary fix -> Using guest route to get restaurants
    //   // Faking it atm using guest route since current authenticated function in backend relies in user field location to retrieve results
    //   // Switch to using params provided by app -> similar to guest route. (instead of db fields in user collection)
    //   return this.props.navigation.navigate("Dashboard", {
    //     guest: true,
    //     location: location,
    //   });
    //   // Using below when authenticated request is needed -> USER object is sent back since access token is being checked
    //   // inside the apiConsumer.getRerstaurants function
    //   // WORKAROUND -> currently use anonmyous/guest route
    //   // return this.props.navigation.navigate("Dashboard"); //pass params to this object to pass current vixomplant instance
    // }
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

  serverDownMessage() {
    Alert.alert(
      "Server error.",
      "We really apoogize for this, please keep checking back in a short while. We'll be back up soon!",
      [
        {
          text: "Okay",
          onPress: () => console.log("Okay"),
        },
      ],
      { cancelable: true }
    );
  }

  render() {
    if (this.state.isReady !== true) {
      return <Spinner style={styles.spinner} color="red" />;
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

        <Content style={{ position: "relative" }}>
          {/* Error incase server is unreachable */}
          {this.state.errors.serverError ? (
            <View style={styles.defaultMessageContainer}>
              <Text style={styles.defaultMessage}>
                Looks like we're are experiencing some technical issues, try
                logging in or try again later.
              </Text>
              {/* <Button
                style={styles.buttonSubmitBtn}
                block
                info
                onPress={this.authenticate}
              >
                <Text>Retry</Text>
              </Button> */}
            </View>
          ) : null}
          {/* END Error incase server is unreachable */}

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
