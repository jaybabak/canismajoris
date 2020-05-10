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
      images: [
        {
          id: "WpIAc9by5iU",
          thumbnail:
            "https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1934&q=80",
          title: "Led Zeppelin - Stairway To Heaven",
        },
        {
          id: "sNPnbI1arSE",
          thumbnail:
            "https://images.unsplash.com/photo-1528605248644-14dd04022da1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
          title: "Eminem - My Name Is",
        },
        {
          id: "VOgFZfRVaww",
          thumbnail:
            "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80",
          title: "",
        },
        {
          id: "WpIAc9by5iU",
          thumbnail: "https://picsum.photos/650/650",
          title: "Led Zeppelin - Stairway To Heaven",
        },
        {
          id: "sNPnbI1arSE",
          thumbnail: "https://picsum.photos/650/650",
          title: "Eminem - My Name Is",
        },
        {
          id: "VOgFZfRVaww",
          thumbnail: "https://picsum.photos/650/650",
          title: "",
        },
      ],
      activeSlide: 0,
    };
  }

  async componentDidMount() {
    // Void. No state modifications.
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
        {/* <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text> */}
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
          backgroundColor: "rgba(0,0,0,1)",
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
