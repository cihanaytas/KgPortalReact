import axios from 'axios';
import authHeader from './auth_header';

const API_URL = 'http://localhost:8080/yonetici/';



class YoneticiService {

 addTalep(talep){
     return axios
     .post(API_URL + "talepekle" , talep, { headers: authHeader() })
 }



 getTaleplerim(){
     return axios
     .get(API_URL + "taleplerim",  { headers: authHeader() })
 }

 getIzinTalepleri(){
     return axios
     .get(API_URL + "izintalepleri", { headers: authHeader() })
 }


 talepOnay(talep) {
    return axios
    .post(API_URL + "onaytalep" , talep, { headers: authHeader() })

}


}


export default new YoneticiService()