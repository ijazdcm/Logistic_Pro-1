import AppConfig from 'src/AppConfig'
import api from '../Config'

const DOCS_VERIFY_URL = AppConfig.api.baseUrl + '/vendor/'
const PARKING_YRD_SINGEL_VEHICLE_INFO_URL = AppConfig.api.baseUrl + '/parkingYard/'

class VendorCreationService {
  // VENDOR CREATION REQUEST
  getVendorCreationTableData() {
    return api.get(DOCS_VERIFY_URL)
  }
  getSingleVehicleInfoOnParkingYardGate(id) {
    return api.get(PARKING_YRD_SINGEL_VEHICLE_INFO_URL + id)
  }
  addDocumentVerificationData(data) {
    return api.post(DOCS_VERIFY_URL, data)
  }

  // VENDOR CREATION APPROVAL
  // VENDOR CREATION CONFIRMATION
}

export default new VendorCreationService()
