import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native';
import { getHistory, ScreenHeaderBtn, getLeaveType } from '../../../components'; // Import the functions
import { useRouter, Stack } from 'expo-router';
import {icons} from '../../../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';



const HistoryScreen = () => {
  const [history, setHistory] = useState(null); // initial state is null
  const router = useRouter();
  const [historyCount, setHistoryCount] = useState(0);
  const [currentHistoryCount, setCurrentHistoryCount] = useState(0); // Initialize with 0
  
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getHistory();
        setHistory(data);

        const [
          historyCountStr,
          currentHistoryCountStr,
        ] = await Promise.all([
          AsyncStorage.getItem('historycount'),
          AsyncStorage.getItem('currenthistorycount'),
        ]);

        setCurrentHistoryCount(Number(currentHistoryCountStr || '0'));
        setHistoryCount(Number(historyCountStr || '0'));

        await AsyncStorage.setItem('historycount', currentHistoryCountStr);


      } catch (error) {
        console.error('Failed to fetch history: ', error);
      }
    }

    fetchData(); // Execute fetch function
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{
            headerStyle: { backgroundColor: '#fc03a1'},
            headerShadowVisible: false,
            headerLeft: () => (
              <ScreenHeaderBtn 
                iconUrl={icons.left}
                dimension="60%"
                handlePress={() => router.replace('../Home/HomeScreen')}
              /> ),
            headerTitle:"  History",
            headerTitleStyle: { color: '#fff', fontSize: 24}

        }}
      />
      <ScrollView>
        {history && history.map((request, index) => (
          <View key={index} style={styles.requestContainer}>
            <Text style={styles.title}>
            <Text style={styles.infoText}>{getLeaveType(request.leaveid)} </Text>
            </Text>   
            <Text style={styles.infoText}>        Date Filed:  {new Date(request.datefiled).toLocaleDateString()}</Text>
            <Text style={styles.reqGroup}>

            <Text style={styles.infoText}>        Start Date: {request.inclusivedates}</Text>
            
            </Text>
            <Text style={styles.infoText}>        Duration: {request.duration} day/s</Text>
            <Text style={styles.infoText}>        Date {request.request_status}: {request.datereceived}</Text>

            <Text style={styles.infoText}>                                             Status: {request.request_status}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5', // dirty white
    padding: 10,
  },
  requestContainer: {
    marginVertical: 16,
    marginHorizontal: 24,
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    //color: '#2F4F4F',  
    fontWeight: 'bold', // make it bold to stand out
    textTransform: 'uppercase'
  },

  infoText: {
    fontSize: 15,
    color: '#fc03a1', // pink
    marginVertical: 5,
  },
});

export default HistoryScreen;
