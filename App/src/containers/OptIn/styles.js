import { StyleSheet, Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  videoStyles: {
    width: screenWidth,
    height: screenHeight,
    flex: 1,
  },
  videoStylesLocal: {
    position: "absolute",
    right: 20,
    bottom: 20,
    width: 100,
    height: 150,
    zIndex: 100,
    borderRadius: 6,
    borderRadius: 4,
    borderWidth: 2.5,
    borderColor: "white",
    backgroundColor: "white",
  },
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
  btnActionText: {
    color: "white",
  },
  buttonSubmitBtn: {
    marginTop: 10,
    backgroundColor: "red",
    color: "white",
  },
  iconQuestion: {
    fontSize: 20,
    color: "red",
  },
  formWrapper: {
    marginTop: 0,
  },
  formItem: {
    // backgroundColor: 'white',
  },
  spinner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  thumbnail: {
    width: screenWidth,
    height: 400,
    alignSelf: "center",
  },
  privacyPolicyBtn: {
    color: "black",
    marginTop: 10,
    backgroundColor: "#ffffff",
  },
  privacyPolicy: {
    color: "red",
  },
});

export default styles;
