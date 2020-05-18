import React from "react";
import { Alert, View, Modal } from "react-native";
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
} from "native-base";
import { OpenMapDirections } from "react-native-navigation-directions";
import apiConsumer from "../../services/apiConsumer";
import RestaurantListView from "../../components/RestaurantListView/RestaurantListView";
import MapOverview from "../../components/MapOverview/MapOverview";
import styles from "./styles.js";
// Finder image -> magnifying glass.
const splashImage = require("../../../assets/images/splash_1.png");

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      name: "",
      lastName: "",
      accessToken: "",
      locationNow: "",
      errorRetrievingLocation: false,
      errors: {},
      restaurants: [],
      loadedRestaurants: false,
      mapMode: false,
      user: null,
    };

    this.goBack = this.goBack.bind(this);
    this.goToDetailsPage = this.goToDetailsPage.bind(this);
    this.switchToMapMode = this.switchToMapMode.bind(this);
    this.changeField = this.changeField.bind(this);
    this.retrieveRestaurantsByLatLong = this.retrieveRestaurantsByLatLong.bind(
      this
    );
    this.getDirectionsOpenMapsApp = this.getDirectionsOpenMapsApp.bind(this);
  }

  componentDidMount() {
    this.setState({
      isReady: true,
    });
  }

  async retrieveRestaurantsByLatLong() {
    this.setState({
      isReady: false,
    });

    try {
      const restaurants = await apiConsumer.getRestaurants();

      if (restaurants.data.success == true) {
        this.setState({
          isReady: true,
          restaurants: restaurants.data.results.restaurants,
          loadedRestaurants: true,
          user: restaurants.data.user,
        });
      }

      console.log(this.state);

      if (restaurants.hasOwnProperty("error")) {
        this.setState({
          isReady: true,
        });
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
      }
    } catch (e) {
      console.log(e);

      this.setState({
        isReady: true,
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
      user: this.state.user,
    });
  }

  switchToMapMode() {
    this.setState({
      mapMode: !this.state.mapMode,
    });
  }

  getDirectionsOpenMapsApp(restaurant) {
    // Set d for car or w for walk -> none for user's default preference
    const transportPlan = "d";

    // Location of user
    const startPoint = {
      longitude: this.state.user.location.coordinates[0],
      latitude: this.state.user.location.coordinates[1],
    };

    // Location of restaurant
    const endPoint = {
      longitude: restaurant.location.coordinates[0],
      latitude: restaurant.location.coordinates[1],
    };

    // Open the default maps application available on users device
    OpenMapDirections(startPoint, endPoint, transportPlan).then((res) => {
      console.log(res);
    });
  }

  render() {
    if (this.state.isReady !== true) {
      return <Spinner style={styles.spinner} color="red" />;
    } else if (
      this.state.loadedRestaurants == true &&
      this.state.restaurants.length == 0
    ) {
      listView = <Text note>No halal restauarants found nearby.</Text>;
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
              source={splashImage}
            />
          )}

          <View style={styles.view}>
            <View style={styles.container}>
              {this.state.loadedRestaurants ? null : (
                <Button
                  style={styles.buttonSubmitBtn}
                  onPress={this.retrieveRestaurantsByLatLong}
                >
                  <Text style={styles.buttonSubmit}>
                    Find Halal Restaurants Nearby
                  </Text>
                </Button>
              )}
            </View>
          </View>
          <RestaurantListView
            loadedRestaurants={this.state.loadedRestaurants}
            restaurants={this.state.restaurants}
            goToDetailsPage={this.goToDetailsPage}
            switchToMapMode={this.switchToMapMode}
          />
        </Content>

        {/* Map Mode Modal Window
         *
         * - This window provides the modal for the map
         * - mode listing view mode/
         */}
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.mapMode}
          style={styles.modalStyles}
        >
          <View>
            <View style={styles.modalContainer}>
              {/* Full screen map overlay */}
              <MapOverview
                loadedRestaurants={this.state.loadedRestaurants}
                user={this.state.user}
                restaurants={this.state.restaurants}
                switchToMapMode={this.switchToMapMode}
                getDirectionsOpenMapsApp={this.getDirectionsOpenMapsApp}
                goToDetailsPage={this.goToDetailsPage}
              />
              {/* Hide map button */}
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
        {/* End Modal section */}
      </Container>
    );
  }
}

// Later on in your styles..
export default Dashboard;
