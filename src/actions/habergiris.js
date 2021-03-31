import{HABER_SUCCESS} from './types'
import AdminService from '../services/admin_service'



export const habergir = (haber) => {
    return AdminService.addHaber(haber)
}


