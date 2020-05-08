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
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
// import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import styles from "./styles.js";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const imageUrlLocation = require("./static/halallocation3.png");
const mapStyle = [
  {
    elementType: "geometry",
    stylers: [
      {
        color: "#1d2c4d",
      },
    ],
  },
  {
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#8ec3b9",
      },
    ],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#1a3646",
      },
    ],
  },
  {
    featureType: "administrative.country",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#4b6878",
      },
    ],
  },
  {
    featureType: "administrative.land_parcel",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#64779e",
      },
    ],
  },
  {
    featureType: "administrative.province",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#4b6878",
      },
    ],
  },
  {
    featureType: "landscape.man_made",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#334e87",
      },
    ],
  },
  {
    featureType: "landscape.natural",
    elementType: "geometry",
    stylers: [
      {
        color: "#023e58",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [
      {
        color: "#283d6a",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#6f9ba5",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#1d2c4d",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#023e58",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#3C7680",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [
      {
        color: "#304a7d",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#98a5be",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#1d2c4d",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [
      {
        color: "#2c6675",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#255763",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#b0d5ce",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#023e58",
      },
    ],
  },
  {
    featureType: "transit",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#98a5be",
      },
    ],
  },
  {
    featureType: "transit",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#1d2c4d",
      },
    ],
  },
  {
    featureType: "transit.line",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#283d6a",
      },
    ],
  },
  {
    featureType: "transit.station",
    elementType: "geometry",
    stylers: [
      {
        color: "#3a4762",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        color: "#0e1626",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#4e6d70",
      },
    ],
  },
];
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
        provider={PROVIDER_GOOGLE}
        style={{
          flex: 1,
          height: screenHeight,
          width: screenWidth,
        }}
        customMapStyle={mapStyle}
        showsUserLocation
        initialRegion={{
          latitude: this.state.user.location.coordinates[1],
          longitude: this.state.user.location.coordinates[0],
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {this.state.restaurants.map((marker, index) => (
          <MapView.Marker
            key={index}
            coordinate={{
              latitude: marker.location.coordinates[1],
              longitude: marker.location.coordinates[0],
            }}
            // image={imageUrlLocation}
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
