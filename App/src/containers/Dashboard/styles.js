import { StyleSheet, Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 0,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: "Gill Sans",
    textAlign: "center",
    margin: 10,
    color: "#ffffff",
    backgroundColor: "transparent",
  },
  view: {
    width: screenWidth,
    height: screenHeight,
    // backgroundColor: "#E61E25",
    backgroundColor: "white",
  },
  viewBottom: {
    position: "relative",
    flex: 1,
    alignItems: "stretch",
    alignContent: "flex-start",
    padding: 5,
  },
  btnAction: {
    backgroundColor: "red",
    color: "white",
  },
  btnActionMarker: {
    backgroundColor: "red",
    color: "white",
  },
  btnActionMarkerDirections: {
    backgroundColor: "black",
    color: "white",
    marginTop: 7,
  },
  btnActionText: {
    color: "white",
  },
  buttonSubmit: {
    color: "white",
    // color: "red",
  },
  buttonSubmitBtn: {
    marginTop: 40,
    // backgroundColor: "white",
    backgroundColor: "#E61E25",
    color: "white",
    justifyContent: "center",
    alignSelf: "center",
  },
  iconQuestion: {
    fontSize: 20,
    color: "red",
  },
  formWrapper: {
    marginTop: 0,
  },
  spinner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: '#E2E2E2',
    textAlign: "center",
  },
  thumbnail: {
    marginTop: 80,
    width: 200,
    height: 250,
    alignSelf: "center",
  },
  logo: {
    marginTop: 30,
    width: 150,
    height: 250,
    alignSelf: "center",
  },
  near: {
    color: "green",
  },
  far: {
    color: "blue",
  },
  modalStyles: {
    backgroundColor: "black",
    opacity: 0.7,
    marginTop: 22,
  },
  modalContainer: {
    height: screenHeight,
    width: screenWidth,
    justifyContent: "flex-end",
    alignItems: "stretch",
  },
  buttonSubmitCloseBtn: {
    marginTop: 10,
    backgroundColor: "red",
    color: "white",
    position: "absolute",
    bottom: 30,
    right: 30,
  },
  imageWrapper: {
    flex: 1,
    alignItems: "stretch",
  },
  image: {
    flex: 1,
  },
  toolTip: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
  },
  label: {
    marginBottom: 7,
  },
  iconMarker: {
    marginBottom: 7,
    color: "red",
    fontSize: 36,
  },
  ad: {
    marginTop: 30,
    marginBottom: 30,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: '#E2E2E2',
    textAlign: "center",
  },
  adUnit: {
    width: 700,
    height: 50,
  },
});

export default styles;
