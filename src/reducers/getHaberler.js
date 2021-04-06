import * as actionTypes from '../actions/types'
import initialState from './initialState';

export default function getHaberler(state=initialState.news,action){

    switch (action.type) {
        case actionTypes.HABER_BASARILI:
            return action.payload
    
        default:
            return state
    }
  
  }