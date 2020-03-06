import React, { Component } from "react";
import {
  Animated,
  Alert,
  Platform,
  StyleSheet,
  View,
  DeviceEventEmitter,
  Modal,
  Dimensions,
  Image
} from "react-native";
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
  Footer,
  FooterTab,
  Item,
  Input,
  Toast,
  Thumbnail,
  List,
  ListItem,
  H1,
  H3
} from "native-base";
import MapView from "react-native-maps";
import apiConsumer from "../../util/apiConsumer";
import AsyncStorage from "@react-native-community/async-storage";
const dimensions = Dimensions.get("window");
const imageWidth = dimensions.width;
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
        <Content>
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
                style={styles.buttonSubmitBtn}
                block
                onPress={this.getDirectionsOpenGoogleMaps}
              >
                <Text style={styles.buttonSubmit}>Directions</Text>
              </Button>
              <Text style={styles.defaulText}>
                NativeBase has now made it easy for developers, to access the
                any of its components using ref, along with its associated React
                Native elements. NativeBase has now made it easy for developers,
                to access the any of its components using ref, along with its
                associated React Native elements. NativeBase has now made it
                easy for developers, to access the any of its components using
                ref, along with its associated React Native elements.
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
