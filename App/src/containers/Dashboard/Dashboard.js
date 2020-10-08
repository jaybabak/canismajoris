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
import { AdMobBanner } from "react-native-admob";
import apiConsumer from "../../services/apiConsumer";
import RestaurantListView from "../../components/RestaurantListView/RestaurantListView";
import MapOverview from "../../components/MapOverview/MapOverview";
import styles from "./styles.js";
// Static assets
const logo = require("./static/splash.png");
const image = require("./static/search-food.gif");

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
      displayAd: true,
    };

    this.goBack = this.goBack.bind(this);
    this.goToDetailsPage = this.goToDetailsPage.bind(this);
    this.switchToMapMode = this.switchToMapMode.bind(this);
    this.changeField = this.changeField.bind(this);
    this.retrieveRestaurantsByLatLong = this.retrieveRestaurantsByLatLong.bind(
      this
    );
    this.getDirectionsOpenMapsApp = this.getDirectionsOpenMapsApp.bind(this);
    this.hideAd = this.hideAd.bind(this);
  }

  componentDidMount() {
    this.setState({
      isReady: true,
    });
  }

  async retrieveRestaurantsByLatLong() {
    var restaurants = {};

    this.setState({
      isReady: false,
    });

    try {
      if (this.props.navigation.getParam("guest") == false) {
        restaurants = await apiConsumer.getRestaurants();
        if (restaurants.data.success == true) {
          this.setState({
            isReady: true,
            restaurants: restaurants.data.results.restaurants,
            loadedRestaurants: true,
            user: restaurants.data.user,
          });

          return;
        }
      } else {
        restaurants = await apiConsumer.getRestaurants(
          this.props.navigation.getParam("location")
        );

        if (restaurants.data.success == true) {
          var user = {
            location: {
              coordinates: [
                restaurants.data.results.long,
                restaurants.data.results.lat,
              ],
            },
          };

          
          this.setState({
            isReady: true,
            restaurants: restaurants.data.results.restaurants,
            loadedRestaurants: true,
            user: user,
          });

          return;
        }
      }

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

        return;
      }

      this.setState({
        isReady: true,
      });

      Alert.alert(
        "Sorry!",
        "Looks like we were unable to determine your location, try updating location permissions for Jyze and try again.",
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
    // console.log(this.state)
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

  hideAd(error) {
    // Console error
    console.log(error);
    // Disable the ad unit
    this.setState({
      displayAd: false,
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
            <Title>
              {this.state.loadedRestaurants ? (
                <Text>Restaurants</Text>
              ) : (
                <Text>Search</Text>
              )}
            </Title>
          </Body>
          <Right>
            {this.state.loadedRestaurants &&
            this.state.restaurants.length != 0 ? (
              <Button transparent onPress={this.switchToMapMode}>
                <Icon
                  style={styles.iconQuestion}
                  type="FontAwesome"
                  name="map-marker"
                />
              </Button>
            ) : null}
          </Right>
        </Header>

        {this.state.loadedRestaurants ? (
          <Content>
            {/* Ads @TODO -> REFACTOR into its own component */}
            {this.state.displayAd ? (
              <View style={styles.ad}>
                <AdMobBanner
                  style={styles.adUnit}
                  adSize="banner"
                  adUnitID="ca-app-pub-9030422041041163/3969539834"
                  // adUnitID="ca-app-pub-3940256099942544/2934735716" // Test ad.
                  // testDevices={[AdMobBanner.simulatorId]}
                  onAdFailedToLoad={(error) => this.hideAd(error)}
                />
              </View>
            ) : null}
            {/* End Ads */}
            <RestaurantListView
              loadedRestaurants={this.state.loadedRestaurants}
              restaurants={this.state.restaurants}
              goToDetailsPage={this.goToDetailsPage}
              switchToMapMode={this.switchToMapMode}
            />
          </Content>
        ) : (
          <Content style={{ backgroundColor: "#E61E25" }}>
            <View style={styles.view}>
              <View style={styles.container}>
                {this.state.loadedRestaurants ? null : (
                  <React.Fragment>
                    <Thumbnail
                      style={styles.thumbnail}
                      square
                      large
                      resizeMode="contain"
                      source={image}
                    />
                    <Button
                      style={styles.buttonSubmitBtn}
                      onPress={this.retrieveRestaurantsByLatLong}
                    >
                      <Text style={styles.buttonSubmit}>
                        Find Halal Restaurants Nearby
                      </Text>
                    </Button>
                    <Thumbnail
                      style={styles.logo}
                      square
                      large
                      resizeMode="contain"
                      source={logo}
                    />
                  </React.Fragment>
                )}
              </View>
            </View>
          </Content>
        )}

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
                location={this.props.navigation.getParam("location")}
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
                <Text>Close Map</Text>
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
