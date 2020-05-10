/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from "react";
import { Left, Body, Right, Text, List, ListItem } from "native-base";
import styles from "./styles.js";

class RestaurantListView extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { ...props };
  }

  componentDidMount() {
    // Void. No state modifications.
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
        {this.state.restaurants.map((restaurant, index) => {
          return (
            <ListItem
              avatar
              key={index}
              onPress={() => this.props.goToDetailsPage(restaurant._id)}
            >
              <Left>
                <Text style={styles.distanceField}>
                  {(
                    Math.round((restaurant.dist.calculated / 1000) * 10) / 10
                  ).toFixed(1)}
                </Text>
                <Text style={styles.distanceField}>KM</Text>
              </Left>
              <Body>
                <Text>{restaurant.name}</Text>
                <Text note>{restaurant.address[0].address}</Text>
              </Body>
              <Right>
                <NearOrFar category={restaurant.category} />
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
