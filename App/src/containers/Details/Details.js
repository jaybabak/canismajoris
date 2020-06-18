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
  H3,
  Badge,
} from "native-base";
import { OpenMapDirections } from "react-native-navigation-directions";
import { AdMobBanner } from "react-native-admob";
import MapDetails from "../../components/MapDetails/MapDetails";
import BusinessHours from "../../components/BusinessHours/BusinessHours";
import Slider from "../../components/Slider/Slider";
import OpenOrClosedStatus from "../../components/OpenOrClosedStatus/OpenOrClosedStatus";
import Reviews from "../../components/Reviews/Reviews";
import apiConsumer from "../../services/apiConsumer";
import serviceContainer from "../../services/serviceContainer";
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
      mapMode: false,
      user: null,
      restaurant: null,
      error: false,
      displayAd: true,
    };

    this.goBack = this.goBack.bind(this);
    this.changeField = this.changeField.bind(this);
    this.getRestaurantDetails = this.getRestaurantDetails.bind(this);
    this.getDirectionsOpenMapsApp = this.getDirectionsOpenMapsApp.bind(this);
    this.makeCall = this.makeCall.bind(this);
    this.openWebsite = this.openWebsite.bind(this);
    this.hideAd = this.hideAd.bind(this);
  }

  componentDidMount() {
    this.getRestaurantDetails();

    const currentUser = this.props.navigation.getParam("user");

    this.setState({ user: currentUser });
  }

  async makeCall() {
    // Make call to provide parameter as phonumber to makeCall service.
    await serviceContainer.makeCall(this.state.restaurant.phone);
  }

  async openWebsite() {
    // website URL on YELP
    var restaurantWebsite = this.state.restaurant.url;
    // Make call to provide parameter as phonumber to makeCall service.
    await serviceContainer.openUrl(restaurantWebsite);
  }

  async getRestaurantDetails() {
    this.setState({
      isReady: false,
    });

    const rid = this.props.navigation.getParam("rid");

    try {
      const restaurant = await apiConsumer.getRestaurantById(rid);

      if (restaurant.status == 200) {
        this.setState({
          isReady: true,
          restaurant: restaurant.data.results,
        });

        console.log(this.state);
      }
    } catch (e) {
      console.log(e);

      this.setState({
        error: true,
      });

      Alert.alert(
        "Sorry!",
        "Could not reach the server, check your connection.",
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

      this.props.navigation.goBack();
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

  hideAd(error) {
    // Console error
    console.log(error);
    // Disable the ad unit
    this.setState({
      displayAd: false,
    });
  }

  getDirectionsOpenMapsApp() {
    // Set d for car or w for walk -> none for user's default preference
    const transportPlan = "d";

    // Location of user
    const startPoint = {
      longitude: this.state.user.location.coordinates[0],
      latitude: this.state.user.location.coordinates[1],
    };

    // Location of restaurant
    const endPoint = {
      longitude: this.state.restaurant.location.coordinates[0],
      latitude: this.state.restaurant.location.coordinates[1],
    };

    // Open the default maps application available on users device
    OpenMapDirections(startPoint, endPoint, transportPlan).then((res) => {
      console.log(res);
    });
  }

  render() {
    if (this.state.isReady !== true) {
      return <Spinner style={styles.spinner} color="red" />;
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
            {/* <Button transparent onPress={this.switchToMapMode}>
              <Icon
                style={styles.iconQuestion}
                type="FontAwesome"
                name="share"
              />
            </Button> */}
          </Right>
        </Header>
        <Content
          // style={{ paddingTop: 10 }}
          scrollIndicatorInsets={{ right: 1 }}
          // style={{ backgroundColor: "#E61E25" }}
        >
          <MapDetails
            lat={this.state.restaurant.location.coordinates[1]}
            long={this.state.restaurant.location.coordinates[0]}
            restaurantName={this.state.restaurant.name}
            userLat={this.state.user.location.coordinates[1]}
            userLong={this.state.user.location.coordinates[0]}
          />

          <View style={{ backgroundColor: "white" }}>
            {/* <View style={styles.view}> */}
            <View style={styles.container}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  marginTop: 5,
                  marginBottom: 10,
                }}
              >
                {/* @TODO Restaurant open or closed
                 * commented out for now due to data in database not being consistent
                 * (all strings and some are closed instead of propery formatted times)
                 */}
                {/* <OpenOrClosedStatus
                  hoursOfOperation={this.state.restaurant.hours}
                /> */}
                {/* Restaurant open or closed */}
              </View>
              {/* Start Header */}
              <H1 style={styles.title}>{this.state.restaurant.name}</H1>
              <H3 style={styles.subTitle}>{this.state.restaurant.category}</H3>

              {this.state.restaurant.hasOwnProperty("phone") ? (
                <Button
                  style={styles.buttonSubmitBtn}
                  block
                  bordered
                  success
                  onPress={this.makeCall}
                >
                  <Text style={styles.buttonSubmit}>Call</Text>
                </Button>
              ) : null}

              {/* Directions button */}
              <Button
                style={styles.buttonSubmitBtn}
                bordered
                danger
                block
                onPress={this.getDirectionsOpenMapsApp}
              >
                <Text style={styles.buttonSubmit}>Directions</Text>
              </Button>
              {/* Directions button */}

              {/* Website button */}
              {this.state.restaurant.hasOwnProperty("url") ? (
                <Button
                  style={styles.buttonSubmitBtn}
                  bordered
                  block
                  onPress={this.openWebsite}
                >
                  <Text style={styles.buttonSubmit}>Website</Text>
                </Button>
              ) : null}
              {/* Wesbite button */}

              {/* Address card/label */}
              <Card>
                <CardItem>
                  <Body>
                    <Text style={styles.label}>Address</Text>
                    {/* <Text>{`${this.state.restaurant.address[0].name}, ${this.state.restaurant.address[1].name}`}</Text> */}
                    {this.state.restaurant.address
                      .slice(0, 3)
                      .map((value, index) => (
                        <Text
                          key={index}
                        >{`${value.street[0].name}, ${value.city}`}</Text>
                      ))}
                  </Body>
                </CardItem>
              </Card>
              {/* Address card/label */}
              {/* End Header Component */}

              {/* Business Hours/Component */}
              <H3 style={styles.subTitle}>Business Hours</H3>
              <BusinessHours restaurant={this.state.restaurant} />
              {/* Location Map Component */}

              {/* Start Slider/Carousel */}
              <H3 style={styles.subTitle}>Photos</H3>
              <Slider {...this.state.restaurant} />
              {/* Start Slider/Carousel */}

              {/* Ads */}
              {this.state.displayAd ? (
                <View style={styles.ad}>
                  <AdMobBanner
                    style={styles.adUnit}
                    adSize="mediumRectangle"
                    adUnitID="ca-app-pub-9030422041041163/4912970310"
                    // adUnitID="ca-app-pub-3940256099942544/2934735716" // Test ad.
                    // testDevices={[AdMobBanner.simulatorId]}
                    onAdFailedToLoad={(error) => this.hideAd(error)}
                  />
                </View>
              ) : null}
              {/* End Ads */}

              {/* Start Reviews */}
              <H3 style={styles.subTitle}>Reviews</H3>
              <Reviews {...this.state.restaurant} />

              {/* Start Reviews */}

              <Text style={styles.defaulText}>DISCLAIMER:</Text>
              <Text note>
                We do our best to ensure the restaurants we list are halal and
                carry a valid halal certification, however, we recommend you
                check with the restaurant to ensure it is halal before placing
                an order.
              </Text>
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}

// Later on in your styles..
export default Details;
