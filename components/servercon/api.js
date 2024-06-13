import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode';


const api = axios.create({
  baseURL: 'https://**********.com/removed restapi con'
});


const login = async (userid, password) => {
  try {
    const response = await api.post('/login', { userid, password });
    if (response.status !== 200) {
      throw new Error('Login failed');
    }
    const { accessToken, refreshToken } = response.data;
    console.log('Access Token:', accessToken);
    console.log('Refresh Token:', refreshToken);
    await AsyncStorage.setItem('accessToken', accessToken);
    await AsyncStorage.setItem('refreshToken', refreshToken);

    await AsyncStorage.setItem('notifCount', '0');
    await AsyncStorage.setItem('historycount', '0');
    await AsyncStorage.setItem('pendingcount', '0');
    

  } catch (error) {
    console.error('Login Error:', error);
    throw error;
  }
};


const refreshAccessToken = async () => {
  try {
    const refreshToken = await AsyncStorage.getItem('refreshToken');
    const response = await api.post('/generatetoken', { token: refreshToken });
    if (response.status !== 200) {
      throw new Error('Refresh token failed with status: ' + response.status);
    }
    const { accessToken } = response.data;
    await AsyncStorage.setItem('accessToken', accessToken);
  } catch (error) {
    console.error('Token Refresh Error:', error);
    throw error; // Throw the error so we can catch it in the caller function
  }
};



const logout = async () => {
  try {
    const refreshToken = await AsyncStorage.getItem('refreshToken');
    await api.delete('/logout', { data: { token: refreshToken } });
    await AsyncStorage.removeItem('accessToken');
    await AsyncStorage.removeItem('refreshToken');
    await AsyncStorage.removeItem('currentpendingcount');
    await AsyncStorage.removeItem('currenthistorycount');
    await AsyncStorage.removeItem('currentnotifCount');
  } catch (error) {
    console.error('Logout Error:', error);
  }
};


const getProtectedData = async () => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');
    console.log('Access Token:', accessToken); // Log the access token
    const response = await api.get('/', {  // Now using '/' instead of '/protected-endpoint'
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    console.log('Protected Data:', response.data);

    const historyCount = response.data.leaveRequests.approvedRequests + response.data.leaveRequests.deniedRequests;

    // Set the notification count, history count, and pending count to AsyncStorage
    await AsyncStorage.setItem('currentnotifCount', String(response.data.notificationCount));
    await AsyncStorage.setItem('currenthistorycount', String(historyCount)); // Store the history count
    await AsyncStorage.setItem('currentpendingcount', String(response.data.leaveRequests.pendingRequests));

  } catch (error) {
    console.error('Error:', error);
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        // If a 401 or 403 response status is received, refresh the access token
        await refreshAccessToken();

        // Then retry the request:
        const newAccessToken = await AsyncStorage.getItem('accessToken');
        const newResponse = await api.get('/', {  // Now using '/' instead of '/protected-endpoint'
          headers: { Authorization: `Bearer ${newAccessToken}` },
        });
        console.log('Protected Data:', newResponse.data);
        // return newResponse.data;
        const newHistoryCount = newResponse.data.leaveRequests.approvedRequests + newResponse.data.leaveRequests.deniedRequests;

        // Set the notification count, history count, and pending count to AsyncStorage again
        await AsyncStorage.setItem('currentnotifCount', String(newResponse.data.notificationCount));
        await AsyncStorage.setItem('currenthistorycount', String(newHistoryCount)); // Store the updated history count
        await AsyncStorage.setItem('currentpendingcount', String(newResponse.data.leaveRequests.pendingRequests));

    }
  }
};


const checkToken = async () => {
  let token = await AsyncStorage.getItem('accessToken');
    
  // If there is no token in AsyncStorage, returns false (Not logged in)
  if (!token) return false;
 
  let decodedToken = jwt_decode(token);
  let currentDate = new Date();

  // JWT exp is in seconds
  if (decodedToken.exp * 1000 < currentDate.getTime()) {
    console.log("Token expired.");
    return false;
  } else {
    console.log("Valid token");
    return true;
  }
}



const getProfileData = async () => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');
    const response = await api.get('/profile', {  // Change endpoint here
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    console.log('Profile Data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        // If a 401 or 403 response status is received, refresh the access token
        await refreshAccessToken();

        // Then retry the request:
        const newAccessToken = await AsyncStorage.getItem('accessToken');
        const newResponse = await api.get('/profile', { // Change endpoint here
          headers: { Authorization: `Bearer ${newAccessToken}` },
        });
        console.log('Profile Data:', newResponse.data);
        return newResponse.data;
    }
    throw error;
  }
};


const getLeaveBalance = async () => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');
    const response = await api.get('/leavebalance', {  // Change endpoint here
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    console.log('Leave Balance:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        // If a 401 or 403 response status is received, refresh the access token
        await refreshAccessToken();

        // Then retry the request:
        const newAccessToken = await AsyncStorage.getItem('accessToken');
        const newResponse = await api.get('/leavebalance', { // Change endpoint here
          headers: { Authorization: `Bearer ${newAccessToken}` },
        });
        console.log('Leave Balance:', newResponse.data);
        return newResponse.data;
    }
    throw error;
  }
};


const submitLeaveRequest = async (leaveRequestData) => {
  try {
    console.log('Submitting leave request...');
    console.log('Leave Request Data:', leaveRequestData);    // log the request data

    const accessToken = await AsyncStorage.getItem('accessToken');
    console.log('AccessToken:', accessToken);                // log the access token
    const response = await api.post('/leaverequest', leaveRequestData, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    console.log('Leave Request Response:', response.data);
    return response.data;
    
  } catch (error) {
    console.error('Error:', error);

    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        console.log('Refreshing access token...');
        await refreshAccessToken();

        // Then retry the request:
        const newAccessToken = await AsyncStorage.getItem('accessToken');
        console.log('New AccessToken:', newAccessToken);     // log the new access token
        const newResponse = await api.post('/leaverequest', leaveRequestData, {
          headers: { Authorization: `Bearer ${newAccessToken}` },
        });

        console.log('Leave Request Response after refreshing token:', newResponse.data);
        return newResponse.data;
    }
    throw error;
  }
};



const getPendingRequests = async () => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');
    const response = await api.get('/pendingrequest', {  // Change endpoint here
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    console.log('Pending Requests:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        // If a 401 or 403 response status is received, refresh the access token
        await refreshAccessToken();

        // Then retry the request:
        const newAccessToken = await AsyncStorage.getItem('accessToken');
        const newResponse = await api.get('/pendingrequest', { // Change endpoint here
          headers: { Authorization: `Bearer ${newAccessToken}` },
        });
        console.log('Pending Requests:', newResponse.data);
        return newResponse.data;
    }
    throw error;
  }
};


const getHistory = async () => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');
    const response = await api.get('/history', {  // Change endpoint here
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    console.log('History:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        // If a 401 or 403 response status is received, refresh the access token
        await refreshAccessToken();

        // Then retry the request:
        const newAccessToken = await AsyncStorage.getItem('accessToken');
        const newResponse = await api.get('/history', { // Change endpoint here
          headers: { Authorization: `Bearer ${newAccessToken}` },
        });
        console.log('History:', newResponse.data);
        return newResponse.data;
    }
    throw error;
  }
};


const getNotifications = async () => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');
    
    const response = await api.get('/notifications', { // Replace with your notifications endpoint
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    
    console.log('Notifications:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    
    // If a 401 or 403 response status is received, refresh the access token
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        await refreshAccessToken();
        
        // Then retry the request:
        const newAccessToken = await AsyncStorage.getItem('accessToken');
        
        const newResponse = await api.get('/notifications', { // replace with your notifications endpoint
          headers: { Authorization: `Bearer ${newAccessToken}` },
        });
        
        console.log('Notifications:', newResponse.data);
        return newResponse.data;
    }
    throw error;
  }
};



export { getNotifications, getHistory, getPendingRequests, submitLeaveRequest, getProfileData, checkToken, login, refreshAccessToken, getProtectedData, logout, getLeaveBalance };


