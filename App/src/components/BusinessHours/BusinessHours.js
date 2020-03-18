/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { Col, Grid } from "react-native-easy-grid";
import { Text } from "native-base";

class BusinessHours extends Component {
  constructor(props) {
    super(props);
    this.state = { ...props };
  }

  async componentDidMount() {}

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <Grid>
        <Col style={{ width: 100 }}>
          <Text>Monday</Text>
          <Text>Tuesday</Text>
          <Text>Wednesday</Text>
          <Text>Thursday</Text>
          <Text>Friday</Text>
          <Text>Saturday</Text>
          <Text>Sunday</Text>
        </Col>
        <Col>
          <Text style={{ textAlign: "right" }}>
            {this.state.restaurant.hours[0].time}
          </Text>
          <Text style={{ textAlign: "right" }}>
            {this.state.restaurant.hours[1].time}
          </Text>
          <Text style={{ textAlign: "right" }}>
            {this.state.restaurant.hours[2].time}
          </Text>
          <Text style={{ textAlign: "right" }}>
            {this.state.restaurant.hours[3].time}
          </Text>
          <Text style={{ textAlign: "right" }}>
            {this.state.restaurant.hours[4].time}
          </Text>
          <Text style={{ textAlign: "right" }}>
            {this.state.restaurant.hours[5].time}
          </Text>
          <Text style={{ textAlign: "right" }}>
            {this.state.restaurant.hours[6].time}
          </Text>
        </Col>
      </Grid>
    );
  }
}

export default BusinessHours;
