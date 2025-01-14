import { StyleSheet, Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  videoStyles: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'flex-start',
    // padding: 5,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    // backgroundColor: "black",
    flex: 1,
    // paddingLeft: 15,
    // paddingRight: 15,
    // borderRadius: 5
  },
  videoStylesLocal: {
    position: "absolute",
    right: 20,
    bottom: 20,
    width: 100,
    height: 150,
    zIndex: 100,
    //remove the white border top and bottom
    borderRadius: 6,
    borderRadius: 4,
    borderWidth: 2.5,
    borderColor: "white",
    backgroundColor: "white",
    // backgroundColor: "black",
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
    // justifyContent: "",
    alignContent: "flex-start",
    padding: 5,
    // borderRadius: 4,
    // borderWidth: 0.5,
    // borderColor: 'red'
  },
  btnAction: {
    backgroundColor: "#E61E25",
    color: "white",
  },
  btnActionText: {
    color: "white",
  },
  buttonSubmitBtn: {
    marginTop: 10,
    backgroundColor: "#E61E25",
    color: "white",
  },
  iconQuestion: {
    fontSize: 20,
    color: "red",
  },
  formWrapper: {
    marginTop: 10,
    backgroundColor: "white",
    borderRadius: 5,
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
    // justifyContent: 'center',
    width: screenWidth,
    height: 200,
    alignSelf: "center",
  },
  defaulText: {
    marginTop: 5,
    marginBottom: 10,
    color: "grey",
    fontSize: 14,
    // marginTop: 10
  },
});

export default styles;
