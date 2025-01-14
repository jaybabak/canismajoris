import { StyleSheet, Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'flex-start',
    // backgroundColor: '#E2E2E2',
    padding: 20,
  },
  containerCenter: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: '#E2E2E2',
    textAlign: "center",
    // padding: 20
  },
  containerBody: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 20,
    paddingTop: 0,
    // backgroundColor: '#E2E2E2',
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5,
  },
  iconQuestion: {
    fontSize: 26,
    color: "red",
  },
  iconLocation: {
    fontSize: 20,
    color: "red",
  },
  blueText: {
    color: "blue",
  },
  redText: {
    color: "red",
  },
  blackText: {
    color: "black",
    marginTop: 10,
  },
  whiteText: {
    color: "white",
    // marginTop: 10,
  },
  introText: {
    color: "black",
    marginTop: 20,
    marginBottom: 1,
    fontSize: 22,
  },
  buttonSubmit: {
    marginTop: 10,
    color: "white",
    backgroundColor: "#E61E25",
  },
  buttonRegister: {
    marginTop: 10,
    color: "blue",
  },
  spinner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: '#E2E2E2',
    textAlign: "center",
  },
  thumbnail: {
    // justifyContent: 'center',
    alignSelf: "center",
  },
  skip: {
    // backgroundColor: "#fafafa",
    marginTop: 10,
    borderColor: "#e3e3e3",
    textAlign: "right",
    alignSelf: "flex-end",
    paddingRight: 40,
  },
  skipText: {
    color: "red",
  },
  formField: {
    marginTop: 10,
    backgroundColor: "white",
    borderRadius: 5,
  },
  placeholder: {
    color: "black",
  },
  thumbnail: {
    // justifyContent: 'center',
    width: screenWidth,
    height: 400,
    alignSelf: "center",
  },
});

export default styles;
