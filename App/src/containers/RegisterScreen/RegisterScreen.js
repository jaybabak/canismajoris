import React, { Component } from "react";
import { Alert, View } from "react-native";
import {
  Container,
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
  Content,
} from "native-base";
import loginManager from "../../services/loginManager";
import styles from "./styles.js";

class RegisterScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      avatar: "https://i.ibb.co/7J4pNLr/profilephoto.png",
      name: "",
      lastName: "",
      password: "",
      email: "",
      mobileNumber: "",
      status: "OFFLINE",
      location: {
        type: "Point",
        coordinates: [0, 0],
      },
      errors: {},
    };

    this.goBack = this.goBack.bind(this);
    this.changeField = this.changeField.bind(this);
    this.submitRegistrationForm = this.submitRegistrationForm.bind(this);
  }

  componentDidMount() {
    console.log("register screen");

    this.setState({
      isReady: true,
    });
  }

  goBack() {
    this.props.navigation.goBack();
  }

  async submitRegistrationForm() {
    this.setState({
      isReady: false,
    });

    var form = await loginManager.validateUser(this.state);

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
        "Incomplete Form",
        "Review the registration form before proceeding",
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

    const formResult = await loginManager.addUser(this.state, this);

    /*
     * USER SUCCESSFULLY SIGNED UP
     */
    if (formResult.data.success == true) {
      this.setState({
        isReady: true,
      });

      return Alert.alert(
        "Successfully Signed up!.",
        "Proceed to login form now.",
        [
          {
            text: "Cancel",
            onPress: () => this.props.navigation.navigate("Home"),
            style: "cancel",
          },
          { text: "OK", onPress: () => this.props.navigation.navigate("Home") },
        ],
        { cancelable: false }
      );
    }

    /*
     * USER EMAIL IS NOT UNIQUE
     */

    if (formResult.data.message.code == 11000) {
      this.setState({
        isReady: true,
        errors: {
          email: true,
        },
      });

      return Alert.alert(
        "Sorry that email is taken.",
        "Try a differnt email address.",
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
    }

    // Error with form server side validation.
    this.setState({
      isReady: true,
    });

    return Alert.alert(
      "Sorry please review form!",
      "Ensure all the fields meet the requirements.",
      [
        {
          text: "Okay",
          style: "detructive",
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
            <Title>Register</Title>
          </Body>
          <Right></Right>
        </Header>
        <Content>
          <Thumbnail
            style={styles.thumbnail}
            square
            large
            source={{
              uri:
                "https://image.freepik.com/free-vector/people-line-waiting-pay_23-2148207099.jpg",
            }}
          />
          <View style={styles.view}>
            <View style={styles.container}>
              <Item
                error={this.state.errors.name ? true : false}
                style={styles.formWrapper}
                regular
              >
                <Input
                  style={styles.formItem}
                  autoCapitalize="words"
                  value={this.state.name}
                  placeholder={this.state.name ? this.state.name : "First name"}
                  onChangeText={(value) => this.changeField("name", value)}
                />
              </Item>
              <Text style={styles.defaulText}>Enter your first name only.</Text>
              <Item
                error={this.state.errors.lastName ? true : false}
                style={styles.formWrapper}
                regular
              >
                <Input
                  style={styles.formItem}
                  autoCapitalize="words"
                  value={this.state.lastName}
                  placeholder={
                    this.state.lastName ? this.state.lastName : "Last name"
                  }
                  onChangeText={(value) => this.changeField("lastName", value)}
                />
              </Item>
              <Text style={styles.defaulText}>Enter your last name only.</Text>
              <Item
                error={this.state.errors.email ? true : false}
                style={styles.formWrapper}
                regular
              >
                <Input
                  style={styles.formItem}
                  autoCapitalize="none"
                  value={this.state.email}
                  placeholder={
                    this.state.email ? this.state.email : "example@domain.com"
                  }
                  onChangeText={(value) => this.changeField("email", value)}
                />
              </Item>
              <Text style={styles.defaulText}>Enter your email address.</Text>
              <Item
                error={this.state.errors.password ? true : false}
                style={styles.formWrapper}
                regular
              >
                <Input
                  style={styles.formItem}
                  secureTextEntry={true}
                  placeholder="Password"
                  onChangeText={(value) => this.changeField("password", value)}
                />
              </Item>
              <Text style={styles.defaulText}>
                Password must be between 6 and 20 characters, and must include
                numbers and letters.
              </Text>
              <Item
                error={this.state.errors.mobileNumber ? true : false}
                style={styles.formWrapper}
                regular
              >
                <Input
                  style={styles.formItem}
                  value={this.state.mobileNumber}
                  placeholder={
                    this.state.mobileNumber
                      ? this.state.mobileNumber
                      : "Mobile number (optional)"
                  }
                  onChangeText={(value) =>
                    this.changeField("mobileNumber", value)
                  }
                />
              </Item>
              <Text style={styles.defaulText}>
                Country code followed by the area code. 1 6472226555
              </Text>
              <Button
                style={styles.buttonSubmitBtn}
                block
                onPress={this.submitRegistrationForm}
              >
                <Text style={styles.buttonSubmit}>Register</Text>
              </Button>
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}

// Later on in your styles..
export default RegisterScreen;
