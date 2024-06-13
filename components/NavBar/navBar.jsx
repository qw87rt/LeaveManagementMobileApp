import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './navBarStyles';
import { useRouter, Stack } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NavBar = () => {
  const router = useRouter();
  const [notifCount, setNotifCount] = useState(0);
  const [historyCount, setHistoryCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [currentNotifCount, setCurrentNotifCount] = useState(0); // Initialize with 0
  const [currentHistoryCount, setCurrentHistoryCount] = useState(0); // Initialize with 0
  const [currentPendingCount, setCurrentPendingCount] = useState(0); // Initialize with 0
  const [notifSubtraction, setNotifSubtraction] = useState(0);
  const [historySubtraction, setHistorySubtraction] = useState(0);
  const [pendingSubtraction, setPendingSubtraction] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      const [
        notifCountStr,
        historyCountStr,
        pendingCountStr,
        currentNotifCountStr,
        currentHistoryCountStr,
        currentPendingCountStr,
      ] = await Promise.all([
        AsyncStorage.getItem('notifCount'),
        AsyncStorage.getItem('historycount'),
        AsyncStorage.getItem('pendingcount'),
        AsyncStorage.getItem('currentnotifCount'),
        AsyncStorage.getItem('currenthistorycount'),
        AsyncStorage.getItem('currentpendingcount'),
      ]);

      setCurrentNotifCount(Number(currentNotifCountStr || '0'));
      setCurrentHistoryCount(Number(currentHistoryCountStr || '0'));
      setCurrentPendingCount(Number(currentPendingCountStr || '0'));
      
      setNotifCount(Number(notifCountStr || '0'));
      setHistoryCount(Number(historyCountStr || '0'));
      setPendingCount(Number(pendingCountStr || '0'));

      


      setNotifSubtraction(Number(currentNotifCountStr || '0') - Number(notifCountStr || '0'));
      setHistorySubtraction(Number(currentHistoryCountStr || '0') - Number(historyCountStr || '0'));
      setPendingSubtraction(Number(currentPendingCountStr || '0') - Number(pendingCountStr || '0'));
    };

    fetchCounts();
  }, []);

  return (
    <View style={styles.navBar}>
    <TouchableOpacity style={styles.link} onPress={() => {
      router.push('../Navbar/History');
    }}>
      <View style={styles.linkTextContainer}>
        <Text style={styles.linkText}>History  </Text>
        {historySubtraction > 0 && 
          <Text style={[styles.linkText, styles.countText]}>({historySubtraction})</Text>
        }
        </View>
    </TouchableOpacity>
    <TouchableOpacity style={styles.link} onPress={() => {
      router.push('../Navbar/PendingReq');
    }}>
      <View style={styles.linkTextContainer}>
      <Text style={styles.linkText}>Pending Requests  </Text>
      {pendingSubtraction > 0 && 
        <Text style={[styles.linkText, styles.countText]}>({pendingSubtraction})</Text>
      }
      </View>
    </TouchableOpacity>
    <TouchableOpacity style={styles.link} onPress={() => {
      router.push('../Navbar/Notifications');
    }}>
      <View style={styles.linkTextContainer}>
      <Text style={styles.linkText}>Notifications  </Text>
      {notifSubtraction > 0 && 
        <Text style={[styles.linkText, styles.countText]}>({notifSubtraction})</Text>
      }
      </View>
    </TouchableOpacity>
  </View>
  );
};

export default NavBar;
