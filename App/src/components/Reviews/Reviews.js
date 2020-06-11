/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { View, Dimensions, Image } from "react-native";
import {
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right,
} from "native-base";
import serviceContainer from "../../services/serviceContainer";
import styles from "./styles.js";

// Finder image -> magnifying glass.
const star_0 = require("./static/large_0.png");
const star_1 = require("./static/large_1.png");
const star_1_5 = require("./static/large_1_5.png");
const star_2 = require("./static/large_2.png");
const star_2_5 = require("./static/large_2_5.png");
const star_3 = require("./static/large_3.png");
const star_3_5 = require("./static/large_3_5.png");
const star_4 = require("./static/large_4.png");
const star_4_5 = require("./static/large_4_5.png");
const star_5 = require("./static/large_5.png");
const yelp_logo = require("./static/yelp.png");

class Reviews extends Component {
  constructor(props) {
    super(props);
    if (this.props.extra[0].hasOwnProperty("reviews")) {
      this.state = {
        reviews: this.props.extra[0].hasOwnProperty("reviews")
          ? this.props.extra[0].reviews.map((value, index) => {
              return {
                id: index,
                thumbnail: value,
              };
            })
          : null,
        url: this.props.extra[0].reviews[0].url,
      };
    }
  }

  async componentDidMount() {
    // Void. No state modifications.
  }

  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }

  // Returns the proper image based on star rating
  starRatingImage(rating) {
    switch (rating) {
      case 0:
        return (
          <Image resizeMode={"contain"} style={styles.star} source={star_0} />
        );
      case 1:
        return (
          <Image resizeMode={"contain"} style={styles.star} source={star_1} />
        );
      case 1.5:
        return (
          <Image resizeMode={"contain"} style={styles.star} source={star_1_5} />
        );
      case 2:
        return (
          <Image resizeMode={"contain"} style={styles.star} source={star_2} />
        );
      case 2.5:
        return (
          <Image resizeMode={"contain"} style={styles.star} source={star_2_5} />
        );
      case 3:
        return (
          <Image resizeMode={"contain"} style={styles.star} source={star_3} />
        );
      case 3.5:
        return (
          <Image resizeMode={"contain"} style={styles.star} source={star_3_5} />
        );
      case 4:
        return (
          <Image resizeMode={"contain"} style={styles.star} source={star_4} />
        );
      case 4.5:
        return (
          <Image resizeMode={"contain"} style={styles.star} source={star_4_5} />
        );
      case 5:
        return (
          <Image resizeMode={"contain"} style={styles.star} source={star_5} />
        );
      default:
        return (
          <Image resizeMode={"contain"} style={styles.star} source={star_5} />
        );
    }
  }

  render() {
    if (!this.props.extra[0].hasOwnProperty("reviews")) {
      return (
        <React.Fragment>
          <Text style={styles.moreButton}>
            No reviews available for this restaurant.
          </Text>
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        {this.state.reviews.map((value, index) => (
          <Card style={styles.cardWrapper} key={index}>
            <CardItem style={styles.card}>
              <Left>
                <Thumbnail
                  source={{
                    uri: value.thumbnail.user.image_url
                      ? value.thumbnail.user.image_url
                      : "https://canismajoris.s3.amazonaws.com/profile.png",
                  }}
                />
                <Body>
                  <Text style={styles.name}>{value.thumbnail.user.name}</Text>
                  {this.starRatingImage(value.thumbnail.rating)}
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
              <Text style={styles.ratingText}>{value.thumbnail.text}</Text>
            </CardItem>
            <CardItem style={styles.cardBottom}>
              <Left>
                {/* <Button
                  transparent
                  onPress={() =>
                    serviceContainer.openUrl(value.thumbnail.user.profile_url)
                  }
                >
                  <Text style={styles.red}>View user profile</Text>
                </Button> */}
              </Left>
              <Right>
                <Text style={styles.reviewDate}>
                  Posted on
                  {" " + value.thumbnail.time_created.split(" ")[0]}
                </Text>
              </Right>
            </CardItem>
          </Card>
        ))}
        <Button
          style={styles.moreButton}
          transparent
          onPress={() => serviceContainer.openUrl(this.state.url)}
        >
          <Icon style={styles.red} active name="ios-arrow-forward" />
          <Text style={styles.red}>More reviews</Text>
        </Button>
        <View style={styles.yelp_branding}>
          <Text style={styles.yelp_text}>Reviews provided by</Text>
          <Image
            resizeMode={"contain"}
            style={styles.logo}
            source={yelp_logo}
          />
        </View>
      </React.Fragment>
    );
  }
}

export default Reviews;
