/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { View, Dimensions } from "react-native";
import { Button, Icon, Text } from "native-base";
import MapView from "react-native-maps";
import styles from "./styles.js";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const imageUrlLocation = require("./static/halallocation3.png");

class MapOverview extends Component {
  constructor(props) {
    super(props);
    this.state = { ...props };
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    // Return null of restaurants aren't loaded
    if (!this.state.loadedRestaurants) {
      return null;
    }
    // Return null of no restaurants found
    if (this.state.restaurants.length == 0) {
      return null;
    }

    return (
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
                    this.props.switchToMapMode();
                    this.props.goToDetailsPage(marker._id);
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
                    this.props.getDirectionsOpenMapsApp(marker);
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
    );
  }
}

export default MapOverview;
