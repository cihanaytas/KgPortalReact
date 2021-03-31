import axios from 'axios';
import authHeader from './auth_header';

const API_URL = 'http://localhost:8080/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'home');
  }


  getBirthDays(){
    return axios.get(API_URL + 'home/birth', { headers: authHeader() });
  }

  getNews(){
    return axios.get(API_URL + 'home/news', { headers: authHeader() });
  }

  getUserBoard() {
    return axios.get(API_URL + 'test', { headers: authHeader() });
  }


  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }
}

export default new UserService();