import { StyleSheet, Dimensions, Platform } from "react-native";
const { width: screenWidth } = Dimensions.get("window");

const styles = StyleSheet.create({
  item: {
    width: screenWidth - 30,
    height: screenWidth - 30
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: "white",
    borderRadius: 8
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "cover"
  }
});

export default styles;