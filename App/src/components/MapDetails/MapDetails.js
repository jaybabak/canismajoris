/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import MapView from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
const GOOGLE_MAPS_APIKEY = "AIzaSyAsuWCY1t7MYV7fvlwO3G6AtPADDYuWrvs";
const imageUrlLocation = require("./static/halallocation.png");

class MapDetails extends Component {
  constructor(props) {
    super(props);
    this.state = { ...props };
  }

  async componentDidMount() {
    // Void. No state modifications.
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    const origin = {
      latitude: this.state.userLat,
      longitude: this.state.userLong,
    };
    const destination = {
      latitude: this.state.lat,
      longitude: this.state.long,
    };

    return (
      <MapView
        style={{
          flex: 1,
          height: 250,
          marginTop: 0,
        }}
        showsUserLocation
        initialRegion={{
          latitude: this.state.lat,
          longitude: this.state.long,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <MapView.Marker
          coordinate={{
            latitude: this.state.lat,
            longitude: this.state.long,
          }}
          tracksViewChanges={false}
          title={this.state.restaurantName}
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
    );
  }
}

export default MapDetails;
