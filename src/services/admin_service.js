import axios from 'axios';
import authHeader from './auth_header';

const API_URL = 'http://localhost:8080/admin/';



class AdminService {

    addHaber(haber){
        return axios
        .post(API_URL + "haber" , {haber} , { headers: authHeader()})
        .then((response) => {
            if(response.data==true){
                alert("Haber Girişi Başarılı")
            }
            else{
                alert("Başarısız")
            }
        })
    }



}


export default new AdminService();