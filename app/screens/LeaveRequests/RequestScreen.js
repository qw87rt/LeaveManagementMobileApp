import React, { useState, useEffect } from 'react';
import { View, ScrollView, TextInput, StyleSheet, Button, Text, Alert, TouchableOpacity, Image, Platform, BackHandler } from 'react-native';
import { submitLeaveRequest } from '../../../components';
import { useRouter, Stack } from 'expo-router';
import { ScreenHeaderBtn, getLeaveBalance, getProtectedData, checkToken, refreshAccessToken } from '../../../components';
// import { useNetInfo } from '@react-native-community/netinfo';
import { icons } from '../../../constants';
import { Picker } from '@react-native-picker/picker';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { format, parseISO } from 'date-fns';
import { styles } from './RequestScreenStyles';



const initialLeaveTypes = [
  { label: 'Select type of leave..', value: 0 },
  { label: 'Vacation Leave', value: 1 },
  { label: 'Mandatory/Forced Leave', value: 2 },
  { label: 'Sick Leave', value: 3 },
  { label: 'Maternity Leave', value: 4 },
  { label: 'Paternity Leave', value: 5 },
  { label: 'Special Privilege Leave', value: 6 },
  { label: 'Solo Parent Leave', value: 7 },
  { label: 'Study Leave', value: 8 },
  { label: '10-Day VAWC Leave', value: 9 },
  { label: 'Rehabilitation Privilege', value: 10 },
  { label: 'Special Leave Benefits for Women', value: 11 },
  { label: 'Special Emergency (Calamity) Leave', value: 12 },
  { label: 'Adoption Leave', value: 13 },
  { label: 'Monetization of Leave Credits', value: 14 },
  { label: 'Terminal Leave', value: 15 },
  { label: 'Others', value: 16 },
]; 


const leaveDetails = {
  0: ['If not applicable, please select N/A', 'N/A'],
  1: ['Select      (required)', 'Within the Philippines', 'Abroad'],
  2: ['If not applicable, please select N/A', 'N/A'], // specify details for mandatory leave..
  3: ['Select      (required)', 'In Hospital', 'Out Patient'],
  4: ['If not applicable, please select N/A', 'N/A'],
  5: ['If not applicable, please select N/A', 'N/A'],
  6: ['Select      (required)', 'Within the Philippines', 'Abroad'],
  7: ['If not applicable, please select N/A', 'N/A'],
  8: ['Select      (required)', 'Completion of Masters Degree', 'BAR/Board Examination Review'],
  9: ['If not applicable, please select N/A', 'N/A'],
  10: ['If not applicable, please select N/A', 'N/A'],
  11: ['If not applicable, please select N/A', 'N/A'],
  12: ['If not applicable, please select N/A', 'N/A'],
  13: ['If not applicable, please select N/A', 'N/A'],
  14: ['If not applicable, please select N/A', 'N/A'],
  15: ['If not applicable, please select N/A', 'N/A'],
  16: ['If not applicable, please select N/A', 'N/A'],

  // other details...
};

const commutationOptions = [
  { label: 'Please specify (required)', value: 3 },
  { label: 'Not Requested', value: 2 },
  { label: 'Requested', value: 1 }
];

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const invalidCharacters = /[!@#$%^&*()"|?><{}]/;
  const [leaveBalance, setLeaveBalance] = useState(null);

  const [currentLeaveType, setLeaveType] = useState("");
  const [currentDetails, setDetails] = useState("");  
  const [additionalDetails, setAdditionalDetails] = useState('');
  const [duration, setDuration] = useState('');
  const [inclusiveDates, setInclusiveDates] = useState('');
  const [commutation, setCommutation] = useState("");


  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDates, setSelectedDates] = useState([]);
  
  const handleDatePress = (date) => {
    const formattedDate = format(parseISO(date.dateString), 'MMMM dd, yyyy');
   // setSelectedDates((prevDates) => [...prevDates, formattedDate]);
    //setInclusiveDates(selectedDates.concat(formattedDate).join(', '));
    setSelectedDates([formattedDate]); // Update the state with the new date
  setInclusiveDates(formattedDate);
    setShowCalendar(false);
  };

  const handleRemoveDate = (index) => {
    const updatedSelectedDates = [...selectedDates];
    updatedSelectedDates.splice(index, 1);
    setSelectedDates(updatedSelectedDates);
    setInclusiveDates(updatedSelectedDates.join(', '));
  };




  useEffect(() => {
    const checkAndFetchData = async () => {
      try {
        //setIsLoading(true);

        const isValid = await checkToken();
  
        if (!isValid) {
          console.log('Access token is expired or invalid.');
          console.log('Fetching a new access token...');
  
          // refresh the access token if it has expired
          await refreshAccessToken();
  
          console.log('New access token fetched.');
        }
  
  
    const fetchLeaveBalance = async () => {
      const dataArray = await getLeaveBalance();
      if (dataArray.length > 0) {
        setLeaveBalance(dataArray[0]);
      }
    };
  
    fetchLeaveBalance();
      } catch (error) {
        console.error(error);
      } finally {
        //setIsLoading(false);
      }
    };
  
  
    // Function call
    checkAndFetchData();
  }, []);
  



const handleSubmit = () => {

    
  let reasonID;
  if (currentDetails === "Within the Philippines") {
    reasonID = 1;
  } else if (currentDetails === "Abroad") {
    reasonID = 2;
  } else if (currentDetails === "In Hospital") {
    reasonID = 3;
  } else if (currentDetails === "Out Patient") {
    reasonID = 4;
  } else if (currentDetails === "Completion of Masters Degree") {
    reasonID = 6;
  } else if (currentDetails === "BAR/Board Examination Review") {
    reasonID = 7;
  } else {
    reasonID = 8;
  }

  if (currentLeaveType === 0) {
    Alert.alert('Error', `Please select a type of leave.`);
    setIsLoading(false);
    return;
  }

  if ([1, 6, 3, 8].includes(currentLeaveType)) {
    if (reasonID === 8) {
      Alert.alert('Error', `Please provide additional details for your leave.`);
      setIsLoading(false);
      return;
    } else if (additionalDetails === '') {
      Alert.alert('Error', `Please provide additional details.`);
      setIsLoading(false);
      return;
    }
  }

  if ([1, 2, 3, 6, 7, 14].includes(currentLeaveType)) {

    if (currentLeaveType === 1) {

        if (leaveBalance.vacation < parseFloat(duration)) {
          Alert.alert(
            'Error',
            `The duration of your leave (${duration} days) exceeds your current leave balance. Please adjust your request accordingly.`
        );
        setIsLoading(false);
        return;
      }
    } else if (currentLeaveType === 2) {
      if (leaveBalance.forcedleave < parseFloat(duration)) {
        Alert.alert(
          'Error',
          `The duration of your leave (${duration} days) exceeds your current leave balance. Please adjust your request accordingly.`
      );
      setIsLoading(false);
      return;
    }
    } else if (currentLeaveType === 6) {
      if (leaveBalance.special_privilege_leave < parseFloat(duration)) {
        Alert.alert(
          'Error',
          `The duration of your leave (${duration} days) exceeds your current leave balance. Please adjust your request accordingly.`
      );
      setIsLoading(false);
      return;
    }
    } else if (currentLeaveType === 7) {
      if (leaveBalance.solo_parent_leave < parseFloat(duration)) {
        Alert.alert(
          'Error',
          `The duration of your leave (${duration} days) exceeds your current leave balance. Please adjust your request accordingly.`
      );
      setIsLoading(false);
      return;
    }
    } else if (currentLeaveType === 14) {
      if (leaveBalance.vacation < parseFloat(duration)) {
        Alert.alert(
          'Error',
          `The duration of your leave (${duration} days) exceeds your current leave balance. Please adjust your request accordingly.`
      );
      setIsLoading(false);
      return;
    }    }
  }

  if ([11].includes(currentLeaveType)) {
    if (additionalDetails === '') {
      Alert.alert('Error', `Please provide additional details.`);
      setIsLoading(false);
      return;
    }
  }

  if (duration === '') {
    Alert.alert('Error', 'Please provide duration of leave.');
    setIsLoading(false);
    return;
  } else if (inclusiveDates === '') {
    Alert.alert('Error', 'Please provide inclusive dates.');
    setIsLoading(false);
    return;
  } else if (commutation == 3 || commutation == '' || commutation == "") {
    console.log("commutation empty");
    Alert.alert('Error', 'The commutation field is empty');
    setIsLoading(false);
    return;
  }


  if (invalidCharacters.test(additionalDetails) || invalidCharacters.test(duration) || invalidCharacters.test(inclusiveDates)) {
    Alert.alert('Error', 'Please, do not include invalid characters.');
    setIsLoading(false);
    return;
  }

  Alert.alert(
    'Confirmation',
    'By submitting this form, you acknowledge that the provided data are correct. Are you sure you want to proceed?',
    [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Submit',
        onPress: () => {
          console.log('reasonid', reasonID);
          let leaveRequestData = {
            leaveid: currentLeaveType,
            reasonid: reasonID,
            inclusivedates: inclusiveDates,
            duration: duration,
            description: additionalDetails,
            commutation: commutation,
          };
          submitLeaveRequest(leaveRequestData)
            .then(response => {
              console.log(response);
              Alert.alert(`Request Submitted`);
              router.replace('../Home/HomeScreen');
            })
            .catch(error => {
              console.error(error);
            })
            .finally(() => {
              setIsLoading(false);
            });
        },
      },
    ],
    { cancelable: false }
  );
};


  return (
    <ScrollView style={styles.container}>
     <Stack.Screen
  options={{
    headerStyle: { backgroundColor: '#fc03a1' },
    headerShadowVisible: false,
    headerBackVisible: false,
    headerLeft: () => (
      <ScreenHeaderBtn
        iconUrl={icons.left}
        dimension="60%"
        handlePress={() => {
          if (currentLeaveType != 0 || duration != '' || inclusiveDates != '') {
                console.log('data')
            Alert.alert(
              'Discard Form Data?',
              'You have unsaved changes. Are you sure you want to discard them?',
              [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Discard', onPress: () => router.back() },
              ]
            );
          } else {
            console.log('no data')

            router.back();
          }
        }}
      />
    ),
    headerTitle: " Application",
    headerTitleStyle: { color: '#fff', fontSize: 24 }
  }}
/>

      <Text style={styles.header}>Leave Type</Text>
      
          <Picker
          
    selectedValue={currentLeaveType}
    onValueChange={(itemValue) => setLeaveType(itemValue)}
    style={styles.picker}
    >
    {initialLeaveTypes.map((leaveType) => (
      <Picker.Item key={leaveType.value} label={leaveType.label} value={leaveType.value} />
    ))}
        </Picker>
        

        <Text style={styles.header}>Additional Details</Text>

      
     
 
      <Picker 
 selectedValue={currentDetails} 
 onValueChange={(itemValue) => setDetails(itemValue)} 
 style={styles.picker}
>
 {leaveDetails[currentLeaveType] && leaveDetails[currentLeaveType].map((detail, index) => (
   <Picker.Item key={index} label={detail} value={detail} /> 
 ))}
</Picker>

 

<Text style={styles.note}>In case of sick related leave, please specify (e.g., fever, headache)</Text>


      <TextInput
        style={styles.input}
        placeholder="Please Specify"
        value={additionalDetails}
        onChangeText={text => setAdditionalDetails(text)}
      />
 <Text style={styles.header}>Number of Working Days</Text>
      <TextInput
        style={styles.input}
        placeholder="Duration"
        value={duration}
        onChangeText={text => setDuration(text.replace(/[^0-9.]/g, ''))}
        keyboardType='numeric'
      />
      
 <Text style={styles.header} >Inclusive Dates</Text>
 <View style={styles.inclusiveDatesContainer}>
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="(MM/DD/YYYY)"
          value={inclusiveDates}
          onChangeText={(text) => setInclusiveDates(text)}
        />
       <TouchableOpacity
          onPress={() => {
          setShowCalendar((prevState) => !prevState);
          }}
        >
              <Image source={icons.calendar} style={styles.calendarIcon} />
        </TouchableOpacity>
      </View>


     
      {showCalendar && (
        <Calendar
          onDayPress={handleDatePress}
          style={styles.calendar}
          theme={{
            calendarBackground: '#fff',
            textSectionTitleColor: '#b6c1cd',
            selectedDayBackgroundColor: '#fc03a1',
            selectedDayTextColor: '#ffffff',
            todayTextColor: '#fc03a1',
            dayTextColor: '#2d4150',
            textDisabledColor: '#d9e1e8',
            dotColor: '#fc03a1',
            selectedDotColor: '#ffffff',
            arrowColor: '#fc03a1',
            disabledArrowColor: '#d9e1e8',
            monthTextColor: '#fc03a1',
            indicatorColor: '#fc03a1',
            textDayFontWeight: '300',
            textMonthFontWeight: 'bold',
            textDayHeaderFontWeight: '300',
            textDayFontSize: 16,
            textMonthFontSize: 16,
            textDayHeaderFontSize: 14,
          }}
        />
      )}




<Text  style={styles.header} >Commutation</Text>
      <Picker
         style={styles.picker}
        selectedValue={commutation}
        onValueChange={(itemValue) => setCommutation(itemValue)}
      >
        {commutationOptions.map((option) => (
          <Picker.Item key={option.value} label={option.label} value={option.value} />
        ))}
      </Picker>

      <TouchableOpacity 
 style={[styles.button, isLoading ? styles.disabledButton : {}]} 
 onPress={handleSubmit}
 disabled={isLoading}
>
 <Text style={styles.buttonText}>{isLoading ? 'Submitting Request. Please wait..' : 'Submit'}</Text>
</TouchableOpacity>


    </ScrollView>
  );
}

