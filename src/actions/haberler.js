import {HABER_SUCCESS} from "./types";
import {HABER_BASARILI} from "./types";
import UserService from "../services/user_service";
import axios from 'axios';
import authHeader from '../services/auth_header';

export const getHaberler = () => (dispatch) => {

    return UserService.getNews().then(
                (data) => {
                
            dispatch({
                type: HABER_SUCCESS,
                payload: {haberler: data}
            })
          
            return Promise.resolve()
        },
 
    )
    
}




export function getNewsSuccess(news) {

    return {
        type: HABER_BASARILI,
        payload: news
    }
}


export function getNews() {
    return function (dispatch) {
     
        return axios.get("http://localhost:8080/home/news", { headers: authHeader() }).then(
 
            response=>response.data) .then(
              
                result => dispatch(getNewsSuccess(result))
            )

        // UserService.getNewss.then(
        //     response => response.json())
        //     .then(result=>dispatch(getNewsSuccess(result)))



    }
   




}


 