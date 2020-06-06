/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { Text, View } from "react-native";
import Carousel, {
  ParallaxImage,
  Pagination,
} from "react-native-snap-carousel";
import { Dimensions } from "react-native";
import styles from "./styles.js";
const { width: screenWidth } = Dimensions.get("window");

class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: this.props.extra[0].hasOwnProperty("photos")
        ? this.props.extra[0].photos.map((value, index) => {
            return {
              id: index,
              thumbnail: value,
            };
          })
        : null,

      activeSlide: 0,
    };
  }

  async componentDidMount() {
    // Void. No state modifications.
  }

  componentWillMount() {
    console.log(this.props);
    // Default image if no photo provides by api.
    if (!this.props.extra[0].hasOwnProperty("photos")) {
      this.setState({
        images: [
          {
            id: "0",
            thumbnail:
              "https://canismajoris.s3.amazonaws.com/noimageavailabledark.png",
            title: this.props.name,
          },
        ],
      });
    }
  }

  _renderItem({ item, index }, parallaxProps) {
    return (
      <View removeClippedSubviews={true} style={styles.item}>
        <ParallaxImage
          source={{ uri: item.thumbnail }}
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0.6}
          {...parallaxProps}
        />
      </View>
    );
  }

  get pagination() {
    const { images, activeSlide } = this.state;
    return (
      <Pagination
        dotsLength={images.length}
        activeDotIndex={activeSlide}
        // containerStyle={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 8,
          backgroundColor: "#E61E25",
        }}
        inactiveDotStyle={
          {
            // Define styles for inactive dots here
          }
        }
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    );
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.activeSlide !== nextState.activeSlide) {
      return true;
    }
    return false;
  }

  render() {
    return (
      <React.Fragment>
        <Carousel
          sliderWidth={screenWidth - 30}
          sliderHeight={screenWidth}
          itemWidth={screenWidth}
          data={this.state.images}
          renderItem={this._renderItem}
          hasParallaxImages={true}
          onSnapToItem={(index) => this.setState({ activeSlide: index })}
        />
        {this.pagination}
      </React.Fragment>
    );
  }
}

export default Slider;
