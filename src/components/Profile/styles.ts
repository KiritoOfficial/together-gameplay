import { StyleSheet } from "react-native";
import { theme } from "../../global/styles/theme";

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  user: {
    flexDirection: 'row'
  },
  greeting: {
    fontFamily: theme.fonts.title500,
    fontSize: 24,
    color: theme.colors.heading,
    marginRight: 6
  },
  username: {
    fontFamily: theme.fonts.title700,
    color: theme.colors.heading,
    fontSize: 24
  },
  message: {
    fontFamily: theme.fonts.text400,
    color: theme.colors.heading,
  },
  containerModal: {
    flex: 1,
    marginTop: 800,
  },
  overlay: {
    flex: 1,
    backgroundColor: theme.colors.overlay
  },
  bar: {
    borderRadius: 2,
    backgroundColor: theme.colors.secondary30,
    alignSelf: 'center',
    marginTop: 27
  },
  singOut: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 50
  },
  button: {
    width: 160,
    height: 56,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10
  },
  text: {
    flex: 1,
    color: theme.colors.heading,
    fontFamily: theme.fonts.text500,
    fontSize: 15,
    textAlign: 'center'
  },
  title: {
    flex: 1,
    color: theme.colors.heading,
    fontFamily: theme.fonts.title500,
    fontSize: 24,
    textAlign: 'center'
  },
  game: {
    flex: 1,
    color: theme.colors.heading,
    fontFamily: theme.fonts.title700,
    fontSize: 24
  },
  play: {
    flex: 1,
    color: theme.colors.primary,
    fontFamily: theme.fonts.title700,
    fontSize: 24
  }
})