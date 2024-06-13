import React, { useState } from 'react';
import { Image, Button, TextInput, Alert, StyleSheet, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { login } from '../../components';
import { useRouter, Stack } from 'expo-router';
import {images, icons} from '../../constants';


const styles = StyleSheet.create({
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
