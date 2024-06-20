import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
container: {   
    fontSize: 14,
    marginTop: 4,
    marginBottom: 15,
    marginLeft: 12,
    marginRight: 12,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 9,
    marginBottom: 3
  },
  note: {
    fontSize: 12,
    fontStyle: 'italic',
  },
  picker: {
    ...Platform.select({
      ios: {
        borderWidth: 1,
        borderColor: '#fc03a1',
        borderRadius: 8,
        marginBottom: 12,
        padding: 10,
      },
      android: {
        borderWidth: 1,
        borderColor: '#fc03a1',
        borderRadius: 8,
        marginBottom: 12,
        padding: 10,
      },
      web: {
        borderWidth: 1,
        borderColor: '#fc03a1',
        borderRadius: 8,
        marginBottom: 12,
        padding: 10,
      },
    }),
  },
  input: {
    height: 40,
    borderColor: '#fc03a1',
    borderWidth: 1,
    marginBottom: 23,
    borderRadius: 5,
    padding: 10
  },
  button: {
    backgroundColor: '#fc03a1',
    borderRadius: 8,
    // width: '80%',
    padding: 11,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 15,
    color: '#fff'
  },
  disabledButton: {
    backgroundColor: '#fd67c6',
 },
 inclusiveDatesContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 16,
},
calendarIcon: {
  width: 18,
  height: 18,
  marginLeft: -30,
  marginBottom: 25
},
calendar: {
  marginBottom: 16,
},
selectedDateContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 8,
},
selectedDate: {
  flex: 1,
  marginRight: 8,
},
closeIcon: {
  width: 16,
  height: 16,
},
});
