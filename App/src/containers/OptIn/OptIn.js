import React, { Component } from "react";
import { Alert, View } from "react-native";
import {
  Container,
  Content,
  Header,
  Left,
  Body,
  Right,
  Title,
  Button,
  Icon,
  Text,
  Spinner,
  Item,
  Input,
  Thumbnail,
} from "native-base";
import optInForm from "../../services/optInForm";
import serviceContainer from "../../services/serviceContainer";
// import optInForm from "../../services/optInForm";
import styles from "./styles.js";
// Welcome image -> PNG assets.
const optInImage = require("../../../assets/images/splash_optin_2.jpg");

class OptIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      avatar: "https://i.ibb.co/7J4pNLr/profilephoto.png",
      name: "",
      email: "",
      city: "",
      errors: {},
    };

    this.goBack = this.goBack.bind(this);
    this.changeField = this.changeField.bind(this);
    this.submitRegistrationForm = this.submitRegistrationForm.bind(this);
    this.openWebsite = this.openWebsite.bind(this);
  }

  componentDidMount() {
    console.log("register screen");

    this.setState({
      isReady: true,
    });
  }

  async openWebsite() {
    // website URL on YELP
    var privacyPolicy = "http://localhost:8000/privacy-policy";
    // Make call to provide parameter as phonumber to makeCall service.
    await serviceContainer.openUrl(privacyPolicy);
  }

  goBack() {
    this.props.navigation.goBack();
  }

  async submitRegistrationForm() {
    // Upon submission set state to false.
    this.setState({
      isReady: false,
    });

    var form = await optInForm.validate(this.state);

    this.setState({
      errors: form,
    });

    /*
     * FORM FAILED
     */
    if (form.success == false) {
      this.setState({
        isReady: true,
      });

      //alert message for user if errors with form
      Alert.alert(
        "Please check form again!",
        "Review the form fields.",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ],
        { cancelable: false }
      );
      return;
    }

    const formResult = await optInForm.submit(this.state, this);

    /*
     * USER SUCCESSFULLY SIGNED UP
     */
    if (formResult.data.success == true) {
      this.setState({
        isReady: true,
      });

      return Alert.alert(
        "Registered for BETA Launch",
        "Thank you " +
          this.state.name +
          ", We will notify you when we launch in " +
          this.state.city +
          "!",
        [{ text: "OK", onPress: () => this.props.navigation.navigate("Home") }],
        { cancelable: false }
      );
    }

    // Form failed otherwise
    this.setState({
      isReady: true,
    });

    Alert.alert(
      "Ooop!",
      "Sorry it looks something isn't right, please try again.",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => console.log("Ok pressed"),
          style: "destructive",
        },
      ],
      { cancelable: false }
    );
  }

  changeField(e, ref) {
    var state = {};
    state[e] = ref;
    this.setState(state);
  }

  render() {
    if (this.state.isReady !== true) {
      return <Spinner style={styles.spinner} color="#000000" />;
    }

    return (
      <Container style={{ backgroundColor: "white" }}>
        <Header noLeft>
          <Left>
            <Button transparent onPress={this.goBack}>
              <Icon
                style={styles.iconQuestion}
                type="FontAwesome"
                name="arrow-left"
              />
            </Button>
          </Left>
          <Body>
            <Title>Mailing List</Title>
          </Body>
          <Right></Right>
        </Header>
        <Content>
          <Thumbnail
            style={styles.thumbnail}
            square
            large
            source={optInImage}
          />
          <View style={styles.view}>
            <View style={styles.container}>
              <Item
                error={this.state.errors.name ? true : false}
                style={styles.formWrapper}
              >
                <Input
                  style={styles.formItem}
                  autoCapitalize="none"
                  value={this.state.name}
                  placeholder={this.state.name ? this.state.name : "Name"}
                  onChangeText={(value) => this.changeField("name", value)}
                />
              </Item>
              <Item
                error={this.state.errors.email ? true : false}
                style={styles.formWrapper}
              >
                <Input
                  style={styles.formItem}
                  autoCapitalize="none"
                  value={this.state.email}
                  placeholder={
                    this.state.email ? this.state.email : "Email address"
                  }
                  onChangeText={(value) => this.changeField("email", value)}
                />
              </Item>
              <Item
                error={this.state.errors.city ? true : false}
                style={styles.formWrapper}
              >
                <Input
                  style={styles.formItem}
                  value={this.state.city}
                  placeholder={this.state.city ? this.state.city : "City"}
                  onChangeText={(value) => this.changeField("city", value)}
                />
              </Item>
              <Button
                style={styles.buttonSubmitBtn}
                block
                onPress={this.submitRegistrationForm}
              >
                <Text style={styles.buttonSubmit}>Subscribe</Text>
              </Button>
            </View>
            <Text
              style={{
                alignSelf: "center",
                marginTop: 30,
                color: "#AEAEAE",
                paddingLeft: 10,
                paddingRight: 10,
                textAlign: "center",
              }}
            >
              Thank you for signing up to our mailing list, we don't share
              personal information with external third parties. Review our
              privacy policy to find out more.
            </Text>
            <Button
              style={styles.privacyPolicyBtn}
              // bordered
              block
              light
              onPress={this.openWebsite}
            >
              <Text style={styles.privacyPolicy}>Privacy Policy</Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}

// Later on in your styles..
export default OptIn;
