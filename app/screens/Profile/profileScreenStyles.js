import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
 container: {
    flex: 1,
    backgroundColor: 'white', 
    padding: 40,
    justifyContent: 'center',
  },
  infoText: {
    padding: 3,
    paddingLeft: 30,
    color: '#2F4F4F', 
    fontSize: 20,
    marginVertical: 5,
    borderColor: '#fc03a1',
    borderWidth: 2,
    borderRadius: 12,
    marginBottom: 10,
  },
  labelText:{
color: '#fc03a1',
fontWeight: 'bold',
marginBottom: -3
  },
  logoutButton: {
    backgroundColor: '#fc03a1', //set your button's color
    padding: 10, // gives the button some room
    borderRadius: 5, // makes your button rounder
    justifyContent: 'center', 
    alignItems: 'center', 
    marginTop: 20 //5 space from the top of the container
  },
  buttonText: {
    color: 'white', // makes your button text white
  },
  
});
