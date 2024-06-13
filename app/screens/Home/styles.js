import { StyleSheet } from 'react-native';


export const styles = StyleSheet.create({
  backgroundColor: {
    backgroundColor: '#FFE8E6',
  },
  container: {
    marginTop: 0,//0
    padding: 58,
    alignItems: 'center',     // centers content horizontally
    justifyContent: 'center',
    fontFamily: 'system-ui' // centers content vertically 
  },
  text: {
    color: '#708090', // primary color
    marginBottom: 5,
    fontSize: 14,
    fontStyle: 'italic',
    borderBottomWidth: 1, // Adding a bottom border to simulate underline
    borderBottomColor: '#708090', // Same color as text for the underline effect
  },
  label: {
    color: '#2F4F4F', // primary color
    borderRadius: 5,
    marginBottom: 5,
    fontSize: 14,
    width: '100%', // Ensure text takes full width
    fontWeight: 'bold',
  },
  title: {
    color: '#2F4F4F', // primary color
    marginBottom: 15, // increase marginBottom for better visibility
    fontSize: 40,
    fontWeight: 'bold', // make it bold to stand out
    textTransform: 'uppercase'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20
  },
  button: {
    marginLeft: 20,
    backgroundColor: '#fc03a1',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,   // Separation between buttons
    alignItems: 'center',
  },
  image: {
    width: '85%', 
    height: 150, 
    resizeMode: 'contain', 
    marginLeft: '5%',
  },
});
