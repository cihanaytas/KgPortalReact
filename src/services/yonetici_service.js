import axios from 'axios';
import authHeader from './auth_header';

const API_URL = 'http://localhost:8080/yonetici/';



class YoneticiService {

 addTalep(talep){
     return axios
     .post(API_URL + "talepekle" , talep, { headers: authHeader() })
 }


}


export default new YoneticiService()