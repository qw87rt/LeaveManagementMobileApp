// pages/HomePage.js
import React, { useEffect, useState } from 'react';
import { getLeaveBalance, getProtectedData, checkToken, refreshAccessToken } from '../../../components';
import { useRouter, Stack } from 'expo-router';
import { format } from "date-fns";
import { styles } from './styles';

import { Image, 
  Button, 
  View, 
  Text, 
  ScrollView, 
  SafeAreaView, 
  TouchableOpacity, 
  Alert, 
  RefreshControl,
  Dimensions } from 'react-native';


import {
	icons,
	images
} from '../../../constants';


import {
	ScreenHeaderBtn,
	Login,
	Register,
	NavBar,
	LeaveCredits,
	Lists
} from '../../../components';




const HomeScreen = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [leaveBalance, setLeaveBalance] = useState(null);

  const [refreshing, setRefreshing] = useState(false);


  const router = useRouter();
  //const windowHeight = Dimensions.get('window').height;
  

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
    } catch (error) {
      console.error('Error:', error);
      setError(true);
      router.push('./screens/loginScreen');
    }

    setLoading(false);
  };

  const fetchLeaveBalance = async () => {
    const dataArray = await getLeaveBalance();
    if (dataArray.length > 0) {
      setLeaveBalance(dataArray[0]);
    }
  };

  fetchLeaveBalance();


  // Function call
  checkAndFetchData();
}, []);



const handleRefresh = async () => {
  setRefreshing(true);

  try {
    // Perform your refresh logic here
    // For example, call the necessary functions to fetch data
    const updatedLeaveBalance = await getLeaveBalance();
    if (updatedLeaveBalance.length > 0) {
      setLeaveBalance(updatedLeaveBalance[0]);
    }
    
  } catch (error) {
    console.error('Error refreshing data:', error);
  } finally {
    setRefreshing(false);
  }
};



  if(loading) {
    return(
      <>
      <Stack.Screen 
        options={{
            headerStyle: { backgroundColor: '#fc03a1'},
            headerShadowVisible: false,
            headerLeft: () => (
              <Text> </Text>
            ),
            headerRight: () => (
              <ScreenHeaderBtn 
                iconUrl={images.profile}
                dimension="60%"
                handlePress={() => router.push('../Profile/profileScreen')}
              />
            ),
            headerTitle: "Leave Management System-",
            headerTitleStyle: { color: '#fff', fontSize: 20}

        }}
      />
    <View style={styles.container}>
  
  <Text style={styles.title}>Leave Credits</Text>
 
  <Text><Text style={styles.label}>Vacation Balance:</Text><Text style={styles.text}> ...</Text></Text>
  <Text><Text style={styles.label}>Sick Leave Balance:</Text><Text style={styles.text}> ...</Text></Text>
  <Text><Text style={styles.label}>Forced Leave Balance:</Text><Text style={styles.text}> ...</Text></Text>
  <Text><Text style={styles.label}>Special Privilege Leave:</Text><Text style={styles.text}> ...</Text></Text>
  <Text><Text style={styles.label}>Solo Parent Leave:</Text><Text style={styles.text}> ...</Text></Text>

</View>
     </>
    ) 
  } 

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: styles.backgroundColor.backgroundColor }}>
    <ScrollView 
          style={styles.backgroundColor}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
            />
          }   >
        <Stack.Screen 
        options={{
            headerStyle: { backgroundColor: '#fc03a1'},
            headerShadowVisible: false,
            headerLeft: () => (
              <Text> </Text>
            ),
            headerRight: () => (
              <ScreenHeaderBtn 
                iconUrl={images.profile}
                dimension="60%"
                handlePress={() => router.push('../Profile/profileScreen')}
              />
            ),
            headerTitle: "Leave Management System",
            headerTitleStyle: { color: '#fff', fontSize: 16}

        }}
      />

<Image 
    source={images.logo} style={styles.image}
/>
      {data ? <Text>{JSON.stringify(data)}</Text> : 
    <Text></Text>
      }
    


    {leaveBalance ? (
  <>
    <View style={styles.container}>
  
      <Text style={styles.title}>Leave Credits</Text>

      <Text style={styles.text}>As of: {format(new Date(leaveBalance.updated_at), 'MMMM yyyy')}</Text>

      <Text><Text style={styles.label}>Vacation Balance:</Text><Text style={styles.text}> {leaveBalance.vacation}</Text></Text>
      <Text><Text style={styles.label}>Sick Leave Balance:</Text><Text style={styles.text}> {leaveBalance.sickleave}</Text></Text>
      <Text><Text style={styles.label}>Forced Leave Balance:</Text><Text style={styles.text}> {leaveBalance.forcedleave}</Text></Text>
      <Text><Text style={styles.label}>Special Privilege Leave:</Text><Text style={styles.text}> {leaveBalance.special_privilege_leave}</Text></Text>
      <Text><Text style={styles.label}>Solo Parent Leave:</Text><Text style={styles.text}> {leaveBalance.solo_parent_leave}</Text></Text>
     




      <View style={styles.buttonContainer}>

     <TouchableOpacity style={styles.button} onPress={() => {
        router.push('../LeaveRequests/RequestScreen');
      }}>
         <Text style={{ color: '#fff' }}>Apply For Leave</Text>
     </TouchableOpacity>

     
    

      </View>
    </View>
  </>
) : (


  <View style={styles.container}>
      <Text style={{ color: 'red', fontWeight: 'bold' }}>No internet connection.</Text>

      <Text style={styles.title}>Leave Credits</Text>
     
      <Text><Text style={styles.label}>Vacation Balance:</Text><Text style={styles.text}> ...</Text></Text>
      <Text><Text style={styles.label}>Sick Leave Balance:</Text><Text style={styles.text}> ...</Text></Text>
      <Text><Text style={styles.label}>Forced Leave Balance:</Text><Text style={styles.text}> ...</Text></Text>
      <Text><Text style={styles.label}>Special Privilege Leave:</Text><Text style={styles.text}> ...</Text></Text>
      <Text><Text style={styles.label}>Solo Parent Leave:</Text><Text style={styles.text}> ...</Text></Text>


      <View style={styles.buttonContainer}>

     <TouchableOpacity style={styles.button} onPress={() => {
        // router.push('../LeaveRequests/RequestScreen');
        Alert.alert(
          'Warning',
          'Please make sure your WiFi or mobile data is turned on. Contact 09101 1234 for inquiries.'
        );
        

      }}>
         <Text style={{ color: '#fff' }}>Apply For Leave</Text>
     </TouchableOpacity>


      </View>
    </View>


)}  
    </ScrollView>

    <View style={{ justifyContent: 'flex-end' }}>
      <NavBar />
    </View>

    </SafeAreaView>
  );
};

export default HomeScreen;
