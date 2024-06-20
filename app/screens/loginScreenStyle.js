import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // marginTop: 110,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '80%',
    height: 45,
    borderWidth: 2,
    padding: 11,
    borderColor: '#D46A7E',
    color: '#D46A7E',
    borderRadius: 8,
    marginBottom: 18,
    marginTop: 30

  },
  button: {
    backgroundColor: '#fc03a1',
    borderRadius: 8,
    width: '80%',
    padding: 11,
    alignItems: 'center',
    marginTop: 12

  },
  buttonText: {
    fontSize: 15,
    color: '#fff'
  },
  image: {
    width: '85%', 
    height: 150, 
    resizeMode: 'contain', 
  },
  contactInfo: {
    marginTop: 20,
    fontSize: 14,
    color: '#666',
  },
  disabledButton: {
    backgroundColor: '#fd67c6', //fd03cb
 },
 passwordInput: {
  width: '100%',
  height: 45,
  borderWidth: 2,
  padding: 11,
  borderColor: '#D46A7E',
  color: '#D46A7E',
  borderRadius: 8,
},
 passwordContainer: {
  width: '80%',
  flexDirection: 'row',
  alignItems: 'center',
 },
 passwordToggleContainer: {
  height: 35,
  width: 50,
  alignItems: 'center',
  marginLeft: -53,
 },
 passwordToggleIcon: {
  width: 18,
  height: 18,
  margin: 7.5,
 }
});
