import axios from 'axios';
import authHeader from './auth_header';

const API_URL = 'http://localhost:8080/yonetici/';
const FormData = require('form-data');


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


 talepOnay(talepId,durum) {

    return axios
    .post(API_URL + "onaytalep/" + talepId + "/" + durum, {data:{}} ,   { headers: authHeader() })
}




}


export default new YoneticiService()