import axios from 'axios';
import authHeader from './auth_header';

const API_URL = 'http://localhost:8080/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'home');
  }

  getUserBoard() {
    return axios.get(API_URL + 'test', { headers: authHeader() });
  }


  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }
}

export default new UserService();