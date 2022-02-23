import AppConfig from 'src/AppConfig'
import api from '../Config'

const CUSTOMER_CREATION_URL = AppConfig.api.baseUrl + '/customer/'
const PARKING_YRD_SINGEL_VEHICLE_INFO_URL = AppConfig.api.baseUrl + '/parkingYard/'

class CustomerCreationService {
  getCustomerCreationData() {
    return api.get(CUSTOMER_CREATION_URL)
  }
  createCustomer(value) {
    return api.post(CUSTOMER_CREATION_URL, value)
  }
  updateCustomer(CustomerId, Customer) {
    return api.post(CUSTOMER_CREATION_URL + '/' + CustomerId, Customer)
  }
  // getSingleVehicleInfoOnParkingYardGate(id) {
  //   return api.get(PARKING_YRD_SINGEL_VEHICLE_INFO_URL + id)
  // }
  // getSingleVehicleInfo(id) {
  //   return api.get(DOCS_VERIFY_URL + id)
  // }
  addCustomerCreationData(data) {
    return api.post(CUSTOMER_CREATION_URL, data)
  }
}

export default new CustomerCreationService()
