import React, { useState } from 'react';
import { Image, Button, TextInput, Alert, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { login } from '../../components';
import { useRouter, Stack } from 'expo-router';
import {images, icons} from '../../constants';
import { styles } from './loginScreenStyle';



const LoginScreen = () => {
  const [userID, setUserID] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const invalidCharacters = /[!@#$%^&*()"|?><{}]/;

  const handleLogin = async () => {
    setIsLoading(true);

    if (userID === '') {
        Alert.alert('Error', 'Username can not be blank.');
      setIsLoading(false);
        return;
    } else if (password === '') {
        Alert.alert('Error', 'Password can not be blank.');
      setIsLoading(false);
        return;
    } else if (invalidCharacters.test(userID) || invalidCharacters.test(password)) {
      Alert.alert('Error', 'User ID and Password contain invalid characters.');
    setIsLoading(false);
      return;
  }
    
  


    try {
      await login(userID, password);
      console.log('success');
      router.replace('./Home/HomeScreen');
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Login Failed', 'Invalid credentials. Please try again.');
      console.log('Failed, invalid user');
    } finally {
      setIsLoading(false);
    }

   
 };

 const togglePasswordVisibility = () => {
  setShowPassword((prevState) => !prevState); // Use previous state to toggle showPassword
};

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{
            headerStyle: { backgroundColor: '#fc03a1'},
            headerShadowVisible: false,
            headerLeft: () => (
              <Text> </Text>
            ),
            headerTitle: "Authentication",
            headerTitleStyle: { color: '#fff', fontSize: 24}

        }}
      />

      <Image 
           source={images.logo} style={styles.image}
      />

      <TextInput
        style={styles.input}
        placeholder="User ID"
        value={userID}
        onChangeText={text => setUserID(text.replace(/[^0-9]/g, ''))}
        keyboardType='numeric'
      />
  

<View style={styles.passwordContainer}>
      <TextInput
        style={styles.passwordInput}
        placeholder="Password"
        value={password}
        onChangeText={text => setPassword(text.replace(/[^a-zA-Z0-9]/g, ''))}
        secureTextEntry={!showPassword}
      />
      
        <TouchableOpacity 
        style={styles.passwordToggleContainer}
        onPress={togglePasswordVisibility} 
        >
        <Image
            source={showPassword ? icons.hide : icons.show}
            style={styles.passwordToggleIcon}
          />
        </TouchableOpacity>

</View>


       <TouchableOpacity 
        style={[styles.button, isLoading ? styles.disabledButton : {}]} 
        onPress={handleLogin}
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>{isLoading ? 'Signing in..' : 'Sign in'}</Text>
      </TouchableOpacity>


      <Text style={styles.contactInfo}>Questions or Concerns? Contact us @ 9110-345-6789</Text>
    </SafeAreaView>
  );
};

export default LoginScreen;
