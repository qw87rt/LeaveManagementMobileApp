import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, Platform } from 'react-native';
import { getNotifications } from '../../../components'; // Import the functions
import * as Notifications from 'expo-notifications';
import { useRouter, Stack } from 'expo-router';
import {ScreenHeaderBtn} from '../../../components';
import {icons} from '../../../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';



const NotificationsScreen = () => {
  const [notifications, setNotifications] = useState(null);
  const [notifCount, setNotifCount] = useState(0);
  

  const [currentNotifCount, setCurrentNotifCount] = useState(0); // Initialize with 0
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getNotifications();
        setNotifications(data);

        const [
          notifCountStr,
          currentNotifCountStr,
        ] = await Promise.all([
          AsyncStorage.getItem('notifCount'),
          AsyncStorage.getItem('currentnotifCount'),
        ]);

        setCurrentNotifCount(Number(currentNotifCountStr || '0'));
        
        setNotifCount(Number(notifCountStr || '0'));


    

        // Update values in AsyncStorage
        await AsyncStorage.setItem('notifCount', currentNotifCountStr);

      } catch (error) {
        console.error('Failed to fetch notifications: ', error);
      }
    }

    fetchData();

    if (Platform.OS !== 'web') {
      showNotification();
    }
  }, []);

  const showNotification = async () => {
    await Notifications.requestPermissionsAsync();
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Notification",
        body: 'This is a sample notification',
      },
      trigger: null, // Show notification immediately
    });

    console.log("Sample Notification Scheduled");
  };

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
            headerTitle:"  Notifications",
            headerTitleStyle: { color: '#fff', fontSize: 24}

        }}
      />
      <ScrollView>
        {notifications && notifications.map((notification) => (
          <View key={notification.notificationid} style={styles.requestContainer}>
            <Text style={styles.infoText}>{new Date(notification.created_at).toLocaleDateString()}</Text>
            <Text style={styles.infoText}>       Message: {notification.message}</Text>
            
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
    marginVertical: 10,
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
  infoText: {
    fontSize: 16,
    color: '#fc03a1', // pink
    marginVertical: 5,
  },
});

export default NotificationsScreen;
