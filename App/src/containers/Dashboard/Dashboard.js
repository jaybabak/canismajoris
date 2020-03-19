import React, { Component } from "react";
import { Alert, View, Modal, Dimensions } from "react-native";
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
  Thumbnail,
  List,
  ListItem
} from "native-base";
import { OpenMapDirections } from "react-native-navigation-directions";
import MapView from "react-native-maps";
import apiConsumer from "../../util/apiConsumer";
import styles from "./styles.js";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const imageUrlLocation = require("./static/halallocation3.png");

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
      loadedRestaurants: false,
      mapMode: false,
      user: null
    };

    this.goBack = this.goBack.bind(this);
    this.goToDetailsPage = this.goToDetailsPage.bind(this);
    this.switchToMapMode = this.switchToMapMode.bind(this);
    this.changeField = this.changeField.bind(this);
    this.clickMarker = this.clickMarker.bind(this);
    this.retrieveRestaurantsByLatLong = this.retrieveRestaurantsByLatLong.bind(
      this
    );
    this.getDirectionsOpenMapsApp = this.getDirectionsOpenMapsApp.bind(this);
  }

  componentDidMount() {
    this.setState({
      isReady: true
    });
  }

  clickMarker() {}

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
          loadedRestaurants: true,
          user: restaurants.data.user
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

      this.setState({
        isReady: true
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

      this.goBack();
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

  goToDetailsPage(theRestaurantId) {
    this.props.navigation.navigate("Details", {
      rid: theRestaurantId,
      user: this.state.user
    });
  }

  switchToMapMode() {
    this.setState({
      mapMode: !this.state.mapMode
    });
  }

  getDirectionsOpenMapsApp(restaurant) {
    // Set d for car or w for walk -> none for user's default preference
    const transportPlan = "d";

    // Location of user
    const startPoint = {
      longitude: this.state.user.location.coordinates[0],
      latitude: this.state.user.location.coordinates[1]
    };

    // Location of restaurant
    const endPoint = {
      longitude: restaurant.location.coordinates[0],
      latitude: restaurant.location.coordinates[1]
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
    var listView = null;

    if (this.state.loadedRestaurants == true) {
      listView = this.state.restaurants.map((value, index) => {
        return (
          <ListItem
            avatar
            key={index}
            onPress={() => this.goToDetailsPage(value._id)}
          >
            <Left>
              <Thumbnail
                source={{ uri: "https://i.lensdump.com/i/jILOUm.png" }}
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
          <Right>
            {this.state.loadedRestaurants ? (
              <Button transparent onPress={this.switchToMapMode}>
                <Icon
                  style={styles.iconQuestion}
                  type="FontAwesome"
                  name="map"
                />
              </Button>
            ) : null}
          </Right>
        </Header>
        <Content>
          {this.state.loadedRestaurants ? null : (
            <Thumbnail
              style={styles.thumbnail}
              square
              large
              source={{ uri: "https://i.ibb.co/7J4pNLr/profilephoto.png" }}
            />
          )}

          <View style={styles.view}>
            <View style={styles.container}>
              {this.state.loadedRestaurants ? null : (
                <Button
                  style={styles.buttonSubmitBtn}
                  block
                  onPress={this.retrieveRestaurantsByLatLong}
                >
                  <Text style={styles.buttonSubmit}>Search</Text>
                </Button>
              )}
            </View>
          </View>
          <List>{listView}</List>
        </Content>

        {/* Map Mode Modal Window
         *
         * - This window provides the modal for the map
         * - mode listing view mode/
         *
         */}
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.mapMode}
          style={styles.modalStyles}
        >
          <View>
            <View style={styles.modalContainer}>
              {this.state.loadedRestaurants ? (
                <MapView
                  style={{
                    flex: 1,
                    height: screenHeight,
                    width: screenWidth
                  }}
                  showsUserLocation
                  initialRegion={{
                    latitude: this.state.user.location.coordinates[1],
                    longitude: this.state.user.location.coordinates[0],
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
                  }}
                >
                  {this.state.restaurants.map((marker, index) => (
                    <MapView.Marker
                      key={index}
                      coordinate={{
                        latitude: marker.location.coordinates[1],
                        longitude: marker.location.coordinates[0]
                      }}
                      image={imageUrlLocation}
                      tracksViewChanges={false}
                      title={marker.name}
                    >
                      {/* <MapView.Callout tooltip style={styles.toolTip}> */}
                      <MapView.Callout style={{ flex: 1 }}>
                        <View style={{ alignItems: "center" }}>
                          <Icon
                            style={styles.iconMarker}
                            type="FontAwesome"
                            name="map-marker"
                          />
                          <Text style={styles.label}>{marker.name}</Text>
                          <Button
                            small
                            block
                            iconLeft
                            onPress={() => {
                              this.switchToMapMode();
                              this.goToDetailsPage(marker._id);
                            }}
                            style={styles.btnActionMarker}
                          >
                            <Icon name="arrow-forward" />
                            <Text>View</Text>
                          </Button>
                          <Button
                            small
                            block
                            iconLeft
                            onPress={() => {
                              this.getDirectionsOpenMapsApp(marker);
                            }}
                            style={styles.btnActionMarkerDirections}
                          >
                            <Icon name="map-marker" type="FontAwesome" />
                            <Text>Navigate</Text>
                          </Button>
                        </View>
                      </MapView.Callout>
                    </MapView.Marker>
                  ))}
                </MapView>
              ) : null}
              <Button
                rounded
                style={styles.buttonSubmitCloseBtn}
                block
                onPress={() => {
                  this.switchToMapMode();
                }}
              >
                <Text>Hide Map</Text>
              </Button>
            </View>
          </View>
        </Modal>
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
