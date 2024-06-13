import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, Text, TouchableOpacity } from 'react-native';
import { getProtectedData, checkToken, refreshAccessToken } from '../components';
import { useRouter, Stack } from 'expo-router';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFE8E6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: '#D46A7E',
    color: '#D46A7E'
  },
  button: {
    color: '#D46A7E',
    borderColor: '#D46A7E',
    borderWidth: 1
  }
});

const LoginScreen = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const router = useRouter();

  useEffect(() => {


    const checkAndFetchData = async () => {
      try {
        const isValid = await checkToken();
  
        if (!isValid) {
          console.log('Access token is expired or invalid.');
          console.log('Fetching a new access token...');
  
          // refresh the access token if it has expired
          await refreshAccessToken();
  
          console.log('New access token fetched.');
        }
  
        const response = await getProtectedData();
        if (response) {
          setData(response); // Update the state with the response data
        } else {
          setError(true);
        }
        router.replace('./screens/Home/HomeScreen');
        // router.push('./screens/Home/HomeScreen');
        

      } catch (error) {
        console.error('Error:', error);
        setError(true);
        router.replace('./screens/loginScreen');
        //router.push('./screens/loginScreen');
      }
  
      setLoading(false);
    };
  
  
    // Function call
    checkAndFetchData();
    
  }, []);


  
  
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{
            headerStyle: { backgroundColor: '#fc03a1'},
            headerShadowVisible: false,
            headerLeft: () => (
              <Text> </Text>
            ),
            headerTitle: "Leave Management System",
            headerTitleStyle: { color: '#fff', fontSize: 24}

        }}
      />
      <Text style={{ color: '#fc03a1', fontWeight: 'bold', fontStyle: 'italic', fontSize: 17 }}>Retrieving Data, Please Wait...</Text>
            {/* <TouchableOpacity 
        style={{backgroundColor: 'red', padding: 10, alignItems: 'center', justifyContent: 'center'}}
        onPress={() => {
            router.push('./screens/Home/HomeScreen');
        }}
      >
        <Text style={{color: 'white'}}>RELOAD</Text>
      </TouchableOpacity> */}


    </SafeAreaView>
  );
};

export default LoginScreen;


