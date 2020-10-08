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
    position: "relative",
    flex: 1,
    alignItems: "stretch",
    alignContent: "flex-start",
    padding: 5,
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
    // backgroundColor: '#E2E2E2',
    textAlign: "center",
  },
  thumbnail: {
    alignSelf: "center",
  },
  near: {
    color: "#454545",
    fontWeight: "400",
    fontStyle: "italic",
    // width: 60,
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
  distanceField: {
    fontSize: 12,
    color: "#fa2500",
    fontWeight: "600",
    textAlign: "center",
    width: 60,
  },
  distanceContainer: {
    marginTop: 5,
    paddingTop: 4,
    paddingBottom: 4,
    borderColor: "red",
    borderWidth: 1,
    borderRadius: 25,
    // height: 30,
    backgroundColor: "white",
  },
  logo: {
    // flex: 1,
    height: screenHeight,
    width: screenWidth,
  },
  no_results: {
    marginTop: -40,
    position: "relative",
  },
  no_results_text: {
    position: "absolute",
    top: 50,
    left: 0,
    right: 0,
    alignItems: "center",
    paddingLeft: 40,
    paddingRight: 40,
    textAlign: "center",
    color: "white",
    fontSize: 17,
    fontWeight: "800",
    paddingTop: 150,
  },
  no_results_subtext: {
    position: "absolute",
    top: 100,
    left: 0,
    right: 0,
    alignItems: "center",
    paddingLeft: 40,
    paddingRight: 40,
    textAlign: "center",
    color: "white",
    fontSize: 13,
    fontWeight: "600",
    paddingTop: 150,
  },
  // listItem: {
  //   backgroundColor: "white",
  // },
});

export default styles;
