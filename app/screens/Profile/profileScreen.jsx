import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { getProfileData, logout } from '../../../components'; // Import the functions
import { useRouter, Stack } from 'expo-router';
import {ScreenHeaderBtn} from '../../../components';
import {icons} from '../../../constants';

const ProfileScreen = () => {
  const [userData, setUserData] = useState(null); // initial state is null
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProfileData();
        setUserData(data);
      } catch (error) {
        console.error('Failed to fetch user data: ', error);
      }
    }

    fetchData(); // Execute fetch function
  }, []);

  const handleLogout = async () => {
    try {
      Alert.alert(
        'Logout Confirmation',
        'Are you sure you want to log out?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Logout',
            onPress: async () => {
              await logout();
              router.replace('../../screens/loginScreen');
            },
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.error('Failed to log out: ', error);
    }
  };

  // const user = userData && userData[0];
  const user = userData;



  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
            headerStyle: { backgroundColor: '#fc03a1'},
            headerShadowVisible: false,
            headerBackVisible: false,
            headerLeft: () => (
              <ScreenHeaderBtn 
                iconUrl={icons.left}
                dimension="60%"
                handlePress={() => router.back()}
              /> ),
            headerTitle:"  Profile",
            headerTitleStyle: { color: '#fff', fontSize: 24}

        }}
      />
      {user && (
        <View style={styles.Container}>

          <Text style={styles.labelText}> User ID</Text>
          <Text style={styles.infoText}>{user.userid}</Text>

          <Text style={styles.labelText}> Last Name</Text>
          <Text style={styles.infoText}>{user.lastname}</Text>

          <Text style={styles.labelText}> First Name</Text>
          <Text style={styles.infoText}>{user.firstname}</Text>

          <Text style={styles.labelText}> Middle Name</Text>
          <Text style={styles.infoText}>{user.middlename}</Text>

          <Text style={styles.labelText}> Contact Number</Text>
          <Text style={styles.infoText}>{user.contactnumber}</Text>

          <Text style={styles.labelText}> Department/Office</Text>
          <Text style={styles.infoText}>{user.department}</Text>

          <Text style={styles.labelText}> Position</Text>
          <Text style={styles.infoText}>{user.position}</Text>

          <Text style={styles.labelText}> Salary</Text>
          <Text style={styles.infoText}>{user.salary}</Text>

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
       <Text style={styles.buttonText}>Logout</Text>
</TouchableOpacity>
        </View>
//should be at line 91 but cant add comment there 
          //<TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
       // <Text style={styles.buttonText}>Logout</Text>
//</TouchableOpacity>
      )}
   
    
    </View>
  );
}



const styles = StyleSheet.create({
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

export default ProfileScreen;
