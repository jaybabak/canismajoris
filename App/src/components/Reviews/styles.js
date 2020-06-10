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
  cardWrapper: {
    marginBottom: 30,
    borderBottomColor: "red",
    borderBottomWidth: 5,
  },
  card: {
    borderBottomWidth: 1,
    borderBottomColor: "#E2E2E2",
  },
  cardBottom: {
    borderTopWidth: 1,
    borderTopColor: "#E2E2E2",
  },
  name: {
    color: "black",
  },
  white: {
    color: "white",
    fontWeight: "700",
  },
  red: {
    color: "red",
  },
  moreButton: {
    marginBottom: 70,
  },
  star: {
    flex: 1,
    height: undefined,
    width: 120,
  },
  logo: {
    // flex: 1,
    height: 40,
    width: 60,
  },
  yelp_branding: { flexDirection: "row", flexWrap: "wrap" },
  yelp_text: {
    color: "#AAAAAA",
    paddingTop: 15,
    marginRight: 10,
  },
});

export default styles;
