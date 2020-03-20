/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import {
  Left,
  Body,
  Right,
  Text,
  Thumbnail,
  List,
  ListItem
} from "native-base";
import styles from "./styles.js";

class RestaurantListView extends Component {
  constructor(props) {
    super(props);
    this.state = { ...props };
  }

  render() {
    // If no restaurants loaded.
    if (!this.state.loadedRestaurants) {
      return null;
    }

    // If 0 restaurants found at users location
    if (this.state.restaurants.length == 0) {
      return <Text>No nearby halal restaurants found.</Text>;
    }

    // Return all the rstaurants found nearby sorted by distance.
    return (
      <List>
        {this.state.restaurants.map((value, index) => {
          return (
            <ListItem
              avatar
              key={index}
              onPress={() => this.props.goToDetailsPage(value._id)}
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
        })}
      </List>
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

export default RestaurantListView;
