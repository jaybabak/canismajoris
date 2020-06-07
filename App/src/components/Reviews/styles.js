import { StyleSheet, Dimensions, Platform } from "react-native";
const { width: screenWidth } = Dimensions.get("window");

const styles = StyleSheet.create({
  item: {
    width: screenWidth - 30,
    height: screenWidth,
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: "white",
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "cover",
  },
  ratingText: {
    padding: 20,
  },
  reviewDate: {
    color: "#AAAAAA",
  },
  card: {
    borderBottomWidth: 1,
    borderBottomColor: "#E2E2E2",
    // backgroundColor: "red",
  },
  cardBottom: {
    borderTopWidth: 1,
    borderTopColor: "#E2E2E2",
    // backgroundColor: "red",
  },
  white: {
    color: "white",
    fontWeight: "700",
  },
  red: {
    color: "red",
  },
  moreButton: {
    marginTop: 30,
    marginBottom: 20,
  },
});

export default styles;
