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
const { width: screenWidth } = Dimensions.get("window");

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
    console.log(this.state);
    // Void. No state modifications.
  }

  componentWillMount() {
    console.log(this.props);
    // Default image if no photo provides by api.
    // if (!this.props.extra[0].hasOwnProperty("reviews")) {
    //   this.setState({
    //     images: [
    //       {
    //         id: "0",
    //         thumbnail:
    //           "https://canismajoris.s3.amazonaws.com/noimageavailabledark.png",
    //         title: this.props.name,
    //       },
    //     ],
    //   });
    // }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }

  render() {
    if (!this.props.extra[0].hasOwnProperty("reviews")) {
      return (
        <React.Fragment>
          <Text>No reviews available for this restaurant.</Text>
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        {this.state.reviews.map((value, index) => (
          <Card key={index}>
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
                  <Text>{value.thumbnail.user.name}</Text>
                  <Text note>
                    Gives this restaurant a {value.thumbnail.rating}
                  </Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
              <Text style={styles.ratingText}>{value.thumbnail.text}</Text>
            </CardItem>
            <CardItem style={styles.cardBottom}>
              <Left>
                <Button
                  transparent
                  onPress={() =>
                    serviceContainer.openUrl(value.thumbnail.user.profile_url)
                  }
                >
                  <Text style={styles.red}>View user profile</Text>
                </Button>
              </Left>
              <Right>
                <Text style={styles.reviewDate}>
                  {value.thumbnail.time_created.split(" ")[0]}
                </Text>
              </Right>
            </CardItem>
          </Card>
        ))}
        {/* <Button
          style={styles.moreButton}
          transparent
          onPress={() => serviceContainer.openUrl(this.state.url)}
        >
          <Icon style={styles.red} active name="ios-arrow-forward" />
          <Text style={styles.red}>Read more reviews...</Text>
        </Button> */}
      </React.Fragment>
    );
  }
}

export default Reviews;
