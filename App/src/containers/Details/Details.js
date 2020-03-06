import React, { Component } from "react";
import { Alert, View, Dimensions, Image } from "react-native";
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
import MapView from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { Col, Row, Grid } from "react-native-easy-grid";
import apiConsumer from "../../util/apiConsumer";
const dimensions = Dimensions.get("window");
const imageWidth = dimensions.width;
const imageUrlLocation = require("./static/halallocation.png");
import styles from "./styles.js";

class Details extends React.Component {
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

      // this.goBack();
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

  render() {
    let imageUrl = require("./static/restaurantdemo.jpeg");

    if (this.state.isReady !== true) {
      return <Spinner style={styles.spinner} color="#000000" />;
    }

    const origin = {
      latitude: this.state.restaurant.location.coordinates[1],
      longitude: this.state.restaurant.location.coordinates[0]
    };
    const destination = {
      latitude: this.state.user.location.coordinates[1],
      longitude: this.state.user.location.coordinates[0]
    };
    const GOOGLE_MAPS_APIKEY = "AIzaSyAsuWCY1t7MYV7fvlwO3G6AtPADDYuWrvs";

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
        <Content scrollIndicatorInsets={{ right: 1 }}>
          {/* <View style={styles.imageWrapper}> */}
          <Image style={styles.image} source={imageUrl} />
          {/* </View> */}

          <View style={styles.view}>
            <View style={styles.container}>
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
                onPress={this.getDirectionsOpenGoogleMaps}
              >
                <Text style={styles.buttonSubmit}>Call</Text>
              </Button>

              <Text style={styles.defaulText}>
                NativeBase has now made it easy for developers, to access the
                any of its components using ref, along with its associated React
                Native elements. NativeBase has now made it easy for developers,
                to access the any of its components using ref.
              </Text>
              <H3 style={styles.subTitle}>Business Hours</H3>
              <Grid>
                <Col style={{ width: 100 }}>
                  <Text>Monday</Text>
                  <Text>Tuesday</Text>
                  <Text>Wednesday</Text>
                  <Text>Thursday</Text>
                  <Text>Friday</Text>
                  <Text>Saturday</Text>
                  <Text>Sunday</Text>
                </Col>
                <Col>
                  <Text style={{ textAlign: "right" }}>
                    {this.state.restaurant.hours[0].time}
                  </Text>
                  <Text style={{ textAlign: "right" }}>
                    {this.state.restaurant.hours[1].time}
                  </Text>
                  <Text style={{ textAlign: "right" }}>
                    {this.state.restaurant.hours[2].time}
                  </Text>
                  <Text style={{ textAlign: "right" }}>
                    {this.state.restaurant.hours[3].time}
                  </Text>
                  <Text style={{ textAlign: "right" }}>
                    {this.state.restaurant.hours[4].time}
                  </Text>
                  <Text style={{ textAlign: "right" }}>
                    {this.state.restaurant.hours[5].time}
                  </Text>
                  <Text style={{ textAlign: "right" }}>
                    {this.state.restaurant.hours[6].time}
                  </Text>
                </Col>
              </Grid>
              <H3 style={styles.subTitle}>Location</H3>
              <MapView
                style={{
                  flex: 1,
                  height: 250,
                  // width: 00,
                  marginTop: 20
                }}
                showsUserLocation
                initialRegion={{
                  latitude: this.state.restaurant.location.coordinates[1],
                  longitude: this.state.restaurant.location.coordinates[0],
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421
                }}
              >
                <MapView.Marker
                  coordinate={{
                    latitude: this.state.restaurant.location.coordinates[1],
                    longitude: this.state.restaurant.location.coordinates[0]
                  }}
                  tracksViewChanges={false}
                  title={this.state.restaurant.name}
                  image={imageUrlLocation}
                />
                <MapViewDirections
                  origin={origin}
                  destination={destination}
                  apikey={GOOGLE_MAPS_APIKEY}
                  strokeWidth={3}
                  strokeColor="hotpink"
                />
              </MapView>
              <Button
                style={styles.buttonSubmitBtn}
                block
                onPress={this.getDirectionsOpenGoogleMaps}
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
