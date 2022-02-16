import AppConfig from 'src/AppConfig'
import api from '../Config'

const CUSTOMERCREATION_URL = AppConfig.api.baseUrl + '/customer'

const PARKING_YRD_SINGEL_VEHICLE_INFO_URL = AppConfig.api.baseUrl + '/parkingYard/'

class CustomerCreationService {
  getVehicleReadyToCustomerCreation() {
    return api.get(CUSTOMERCREATION_URL)
  }

  getSingleVehicleInfoOnParkingYardGate(id) {
    return api.get(PARKING_YRD_SINGEL_VEHICLE_INFO_URL + id)
  }
}

export default new CustomerCreationService()
