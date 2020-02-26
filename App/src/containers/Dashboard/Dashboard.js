import React, { Component } from "react";
import {
  Animated,
  Alert,
  Platform,
  StyleSheet,
  View,
  DeviceEventEmitter
} from "react-native";
import {
  Container,
  Content,
  Header,
  Left,
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
  ListItem
} from "native-base";
import apiConsumer from "../../util/apiConsumer";
import AsyncStorage from "@react-native-community/async-storage";
import styles from "./styles.js";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      avatar: "https://i.ibb.co/7J4pNLr/profilephoto.png",
      name: "",
      lastName: "",
      accessToken: "",
      locationNow: "",
      errorRetrievingLocation: false,
      errors: {},
      restaurants: [],
      loadedRestaurants: false
    };

    this.goBack = this.goBack.bind(this);
    this.changeField = this.changeField.bind(this);
    this.retrieveRestaurantsByLatLong = this.retrieveRestaurantsByLatLong.bind(
      this
    );
  }

  componentDidMount() {
    this.setState({
      isReady: true
    });
  }

  async retrieveRestaurantsByLatLong() {
    this.setState({
      isReady: false
    });

    try {
      const restaurants = await apiConsumer.getRestaurants();

      if (restaurants.data.success == true) {
        console.log(restaurants.data);
        this.setState({
          isReady: true,
          restaurants: restaurants.data.results.sorted,
          loadedRestaurants: true
        });
      }

      console.log(this.state);

      if (restaurants.hasOwnProperty("error")) {
        this.setState({
          isReady: true
        });
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
      }
    } catch (e) {
      console.log(e);
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
    if (this.state.isReady !== true) {
      return <Spinner style={styles.spinner} color="#000000" />;
    }
    var listView = null;

    if (this.state.loadedRestaurants == true) {
      listView = this.state.restaurants.map((value, index) => {
        return (
          <ListItem avatar key={index}>
            <Left>
              <Thumbnail
                source={{ uri: "https://i.ibb.co/7J4pNLr/profilephoto.png" }}
              />
            </Left>
            <Body>
              <Text>{value.name}</Text>
              <Text note>{value.address[0].address}</Text>
            </Body>
            <Right>
              <NearOrFar category={value.category} />
            </Right>
          </ListItem>
        );
      });
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
            <Title>Dashboard</Title>
          </Body>
          <Right></Right>
        </Header>
        <Content>
          <Thumbnail
            style={styles.thumbnail}
            square
            large
            source={{ uri: "https://i.ibb.co/7J4pNLr/profilephoto.png" }}
          />

          <View style={styles.view}>
            <View style={styles.container}>
              {/* <Text>{this.state.locationNow}</Text> */}
              <Button
                style={styles.buttonSubmitBtn}
                block
                onPress={this.retrieveRestaurantsByLatLong}
              >
                <Text style={styles.buttonSubmit}>Search</Text>
              </Button>
            </View>
          </View>
          <List>{listView}</List>
        </Content>
      </Container>
    );
  }
}

function NearOrFar(prop) {
  if (prop.category) {
    return (
      <Text style={styles.near} note>
        {prop.category}
      </Text>
    );
  }
}

// Later on in your styles..
export default Dashboard;
