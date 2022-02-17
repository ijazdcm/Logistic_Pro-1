import AppConfig from 'src/AppConfig'
import api from '../Config'

const DOCS_VERIFY_URL = AppConfig.api.baseUrl + '/vendor/'
const SINGLE_VEHICLE_DOCUMENT_INFO_URL = AppConfig.api.baseUrl + '/DocumentVerification/'

class VendorCreationService {
  // VENDOR CREATION REQUEST
  getVendorCreationTableData() {
    return api.get(DOCS_VERIFY_URL)
  }
  getVehicleDocumentInfo(vehicle_id) {
    return api.get(SINGLE_VEHICLE_DOCUMENT_INFO_URL + vehicle_id)
  }
  addDocumentVerificationData(data) {
    return api.post(DOCS_VERIFY_URL, data)
  }

  // VENDOR CREATION APPROVAL
  // VENDOR CREATION CONFIRMATION
}

export default new VendorCreationService()
