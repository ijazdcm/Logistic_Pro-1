import AppConfig from 'src/AppConfig'
import api from '../Config'

const DOCS_VERIFY_URL = AppConfig.api.baseUrl + '/DocumentVerification/'
const PARKING_YRD_SINGLE_VEHICLE_INFO_URL = AppConfig.api.baseUrl + '/parkingYardGate/'

class DocsVerifyService {
  getDocsVerifyTableData() {
    return api.get(DOCS_VERIFY_URL)
  }
  getSingleVehicleInfoOnParkingYardGate(id) {
    return api.get(PARKING_YRD_SINGLE_VEHICLE_INFO_URL + id)
  }
  // getSingleVehicleInfo(id) {
  //   return api.get(DOCS_VERIFY_URL + id)
  // }
  addDocumentVerificationData(data) {
    return api.post(DOCS_VERIFY_URL, data)
  }

  updateDocumentVerificationData(id, data) {
    return api.post(DOCS_VERIFY_URL + id, data)
  }
}

export default new DocsVerifyService()
