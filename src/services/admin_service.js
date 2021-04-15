import axios from 'axios';
import authHeader from './auth_header';

const API_URL = 'http://localhost:8080/admin/';



class AdminService {

    addHaber(haber) {
        return axios
            .post(API_URL + "haber", { haber }, { headers: authHeader() })
            .then((response) => {
                if (response.data == true) {
                    alert("Haber Girişi Başarılı")
                }
                else {
                    alert("Başarısız")
                }
            })
    }


    getTalep() {
        return axios
            .get(API_URL + "talepler", { headers: authHeader() })
    }



    talepOnay(talepId,durum) {
        return axios
        .post(API_URL + "onaytalep/" + talepId + "/" + durum, {data:{}} ,   { headers: authHeader() })

    }


    getIzinTalepleri(){
        return axios
        .get(API_URL + "izintalepleri", { headers: authHeader() })
    }


    izinTalepOnay(talepId,durum) {
        return axios
        .post(API_URL + "izinonaytalep/" + talepId + "/" + durum, {data:{}} ,   { headers: authHeader() })

    }





}


export default new AdminService();