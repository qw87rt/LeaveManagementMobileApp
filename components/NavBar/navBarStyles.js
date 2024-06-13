// NavBarStyles.js
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fc03a1',
    paddingVertical: 10,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    borderWidth: 4, // border width in pixels
    borderColor: '#ccc', // border color
    borderRadius: 10,
  },
  link: {
    textDecorationLine: 'none',
  },
  linkText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#fff',
  },
  countText: {
    color: '#ffd700', // This will make the count text red
  },
  linkTextContainer: {
    flexDirection: 'row', // Aligns children horizontally
    alignItems: 'center', // Centers children vertically
  },
});
