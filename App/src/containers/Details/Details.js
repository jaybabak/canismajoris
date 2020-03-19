import React, { Component } from "react";
import { Alert, View, Image } from "react-native";
import {
  Container,
  Content,
  Header,
  Left,
  Card,
  CardItem,
  Body,
  Right,
  Title,
  Button,
  Icon,
  Text,
  Spinner,
  H1,
  H3
} from "native-base";
import { OpenMapDirections } from "react-native-navigation-directions";
import MapDetails from "../../components/MapDetails/MapDetails";
import BusinessHours from "../../components/BusinessHours/BusinessHours";
import Slider from "../../components/Slider/Slider";
import apiConsumer from "../../util/apiConsumer";
import styles from "./styles.js";

// Image which appears at the to (restaurant photo).
const imageUrl = require("./static/restaurantdemo.jpeg");

class Details extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      accessToken: "",
      locationNow: "",
      errorRetrievingLocation: false,
      errors: {},
      restaurants: [],
      loadedRestaurants: false,
      mapMode: false,
      user: null,
      restaurant: null,
      error: false
    };

    this.goBack = this.goBack.bind(this);
    this.changeField = this.changeField.bind(this);
    this.getRestaurantDetails = this.getRestaurantDetails.bind(this);
    this.getDirectionsOpenMapsApp = this.getDirectionsOpenMapsApp.bind(this);
  }

  componentDidMount() {
    this.getRestaurantDetails();

    const currentUser = this.props.navigation.getParam("user");

    this.setState({ user: currentUser });
  }

  async getRestaurantDetails() {
    this.setState({
      isReady: false
    });

    const rid = this.props.navigation.getParam("rid");

    try {
      const restaurant = await apiConsumer.getRestaurantById(rid);

      if (restaurant.status == 200) {
        this.setState({
          isReady: true,
          restaurant: restaurant.data.results
        });

        console.log(this.state.restaurant);
      }
    } catch (e) {
      console.log(e);

      this.setState({
        error: true
      });

      Alert.alert(
        "Sorry!",
        "Could not reach the server, check your connection.",
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
    }
  }

  changeField(e, ref) {
    var state = {};
    state[e] = ref;
    this.setState(state);
  }

  goBack() {
    this.props.navigation.goBack();
  }

  getDirectionsOpenMapsApp() {
    // Set d for car or w for walk -> none for user's default preference
    const transportPlan = "d";

    // Location of user
    const startPoint = {
      longitude: this.state.user.location.coordinates[0],
      latitude: this.state.user.location.coordinates[1]
    };

    // Location of restaurant
    const endPoint = {
      longitude: this.state.restaurant.location.coordinates[0],
      latitude: this.state.restaurant.location.coordinates[1]
    };

    // Open the default maps application available on users device
    OpenMapDirections(startPoint, endPoint, transportPlan).then(res => {
      console.log(res);
    });
  }

  render() {
    if (this.state.isReady !== true) {
      return <Spinner style={styles.spinner} color="#000000" />;
    }

    return (
      <Container style={{ backgroundColor: "white" }}>
        <Header noLeft>
          <Left>
            <Button transparent onPress={this.goBack}>
              <Icon
                style={styles.iconQuestion}
                type="FontAwesome"
                name="arrow-left"
              />
            </Button>
          </Left>
          <Body>
            <Title>{this.state.restaurant.name}</Title>
          </Body>
          <Right>
            <Button transparent onPress={this.switchToMapMode}>
              <Icon
                style={styles.iconQuestion}
                type="FontAwesome"
                name="share"
              />
            </Button>
          </Right>
        </Header>
        <Content
          style={{ paddingTop: 10 }}
          scrollIndicatorInsets={{ right: 1 }}
        >
          {/* Start Slider/Carousel */}
          <Slider />
          {/* Start Slider/Carousel */}

          <View style={styles.view}>
            <View style={styles.container}>
              {/* Start Header */}
              <H1 style={styles.title}>{this.state.restaurant.name}</H1>
              <H3 style={styles.subTitle}>{this.state.restaurant.category}</H3>
              <Card>
                <CardItem>
                  <Body>
                    <Text style={styles.label}>Address</Text>
                    <Text>{`${this.state.restaurant.address[0].address}, ${this.state.restaurant.address[1].address}`}</Text>
                  </Body>
                </CardItem>
              </Card>
              <Button
                style={styles.buttonCallBtn}
                block
                success
                onPress={this.getDirectionsOpenMapsApp}
              >
                <Text style={styles.buttonSubmit}>Call</Text>
              </Button>

              {/* End Header Component */}

              <Text style={styles.defaulText}>
                NativeBase has now made it easy for developers, to access the
                any of its components using ref, along with its associated React
                Native elements. NativeBase has now made it easy for developers,
                to access the any of its components using ref.
              </Text>

              {/* Business Hours/Component */}
              <H3 style={styles.subTitle}>Business Hours</H3>
              <BusinessHours restaurant={this.state.restaurant} />

              {/* Location Map Component */}
              <H3 style={styles.subTitle}>Location</H3>
              <MapDetails
                lat={this.state.restaurant.location.coordinates[1]}
                long={this.state.restaurant.location.coordinates[0]}
                restaurantName={this.state.restaurant.name}
                userLat={this.state.user.location.coordinates[1]}
                userLong={this.state.user.location.coordinates[0]}
              />

              {/* Directions button */}
              <Button
                style={styles.buttonSubmitBtn}
                block
                onPress={this.getDirectionsOpenMapsApp}
              >
                <Text style={styles.buttonSubmit}>Directions</Text>
              </Button>
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}

// Later on in your styles..
export default Details;
