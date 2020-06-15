/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from "react";
import { Left, Body, Right, Text, List, ListItem } from "native-base";
import { View, Image } from "react-native";
import styles from "./styles.js";
// Splash image -> Jyze.
const image = require("./static/noimageavailabledark.png");

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
      // return <Text>No nearby halal restaurants found.</Text>;
      return (
        <View style={styles.no_results}>
          <Image resizeMode={"cover"} style={styles.logo} source={image} />
          <Text style={styles.no_results_text}>
            Sorry, it looks like there aren't any Halal options nearby.
          </Text>
          <Text style={styles.no_results_subtext}>
            Currently only available in the Ottawa (and surrounding) regions.
          </Text>
        </View>
      );
    }

    // Return all the rstaurants found nearby sorted by distance.
    return (
      <List style={{ backgroundColor: "white" }}>
        {this.state.restaurants.map((restaurant, index) => {
          return (
            <ListItem
              avatar
              key={index}
              onPress={() => this.props.goToDetailsPage(restaurant._id)}
              style={{ backgroundColor: "white" }}
              style={styles.listItem}
            >
              <Left style={styles.distanceContainer}>
                <Text style={styles.distanceField}>
                  {(
                    Math.round((restaurant.dist.calculated / 1000) * 10) / 10
                  ).toFixed(1)}{" "}
                  KM
                </Text>
                {/* <Text style={styles.distanceField}>KM</Text> */}
              </Left>
              <Body>
                <Text>{restaurant.name}</Text>
                {/* <Text note>{restaurant.address[0].name}</Text>
                <Text note>{restaurant.address[1].name}</Text> */}
                {restaurant.address.map((value, index) => (
                  <Text key={index} note>{`${value.street[0].name}, ${
                    value.city.split(",", 1)[0]
                  }`}</Text>
                ))}
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
