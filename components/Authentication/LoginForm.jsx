import axios from 'axios';
import * as Keychain from 'react-native-keychain';

const API_URL = 'http://hostinger:4000/users/';

class AuthService {
    async login(user) {
        return axios
            .post(API_URL + 'login', {
                UserID: user.UserID,
                Password: user.Password
            })
            .then(async response => {
                if (response.data.accessToken) {
                    await Keychain.setGenericPassword('user', JSON.stringify(response.data));
                }
                return response.data;
            });
    }

    setup() {
        axios.interceptors.response.use(
            response => response,
            async error => {
                const originalRequest = error.config;
                if (error.response.status === 401 && !originalRequest._retry) {

                    originalRequest._retry = true;
                    const credentials = await Keychain.getGenericPassword();
                    const refreshToken = JSON.parse(credentials.password).refreshToken;
                    
                    return axios.post(API_URL + 'token', { token: refreshToken })
                        .then(async res => {
                            if (res.status === 201) {
                                await Keychain.setGenericPassword('user', JSON.stringify(res.data));
                                return axios(originalRequest);
                            }
                        })
                }
                return Promise.reject(error);
            }
        );
    }

    async logout() {
        await Keychain.resetGenericPassword();
        const credentials = await Keychain.getGenericPassword();
        const refreshToken = JSON.parse(credentials.password).refreshToken;
        axios
            .delete(API_URL + 'logout', {
                data: { token: refreshToken }
            });
    }
}

export default new AuthService();
