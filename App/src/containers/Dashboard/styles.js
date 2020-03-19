import { StyleSheet, Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 0
  },
  buttonText: {
    fontSize: 18,
    fontFamily: "Gill Sans",
    textAlign: "center",
    margin: 10,
    color: "#ffffff",
    backgroundColor: "transparent"
  },
  view: {
    position: "relative",
    flex: 1,
    alignItems: "stretch",
    // justifyContent: "",
    alignContent: "flex-start",
    padding: 5
    // borderRadius: 4,
    // borderWidth: 0.5,
    // borderColor: 'red'
  },
  viewBottom: {
    position: "relative",
    flex: 1,
    alignItems: "stretch",
    // justifyContent: "",
    alignContent: "flex-start",
    padding: 5
    // borderRadius: 4,
    // borderWidth: 0.5,
    // borderColor: 'red'
  },
  btnAction: {
    backgroundColor: "red",
    color: "white"
  },
  btnActionMarker: {
    backgroundColor: "red",
    color: "white"
  },
  btnActionText: {
    color: "white"
  },
  buttonSubmitBtn: {
    marginTop: 10,
    backgroundColor: "red",
    color: "white"
  },
  iconQuestion: {
    fontSize: 20,
    color: "red"
  },
  formWrapper: {
    marginTop: 0
  },
  formItem: {
    // backgroundColor: 'white',
  },
  spinner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: '#E2E2E2',
    textAlign: "center"
  },
  thumbnail: {
    // justifyContent: 'center',
    alignSelf: "center"
  },
  near: {
    color: "green"
  },
  far: {
    color: "blue"
  },
  modalStyles: {
    backgroundColor: "black",
    opacity: 0.7,
    marginTop: 22
  },
  modalContainer: {
    height: screenHeight,
    width: screenWidth,
    justifyContent: "flex-end",
    alignItems: "stretch"
  },
  buttonSubmitCloseBtn: {
    marginTop: 10,
    backgroundColor: "red",
    color: "white",
    position: "absolute",
    bottom: 30,
    right: 30
  },
  imageWrapper: {
    flex: 1,
    alignItems: "stretch"
  },
  image: {
    flex: 1
  },
  toolTip: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10
  },
  label: {
    marginBottom: 7
  },
  iconMarker: {
    marginBottom: 7,
    color: "red",
    fontSize: 36
  }
});

export default styles;
