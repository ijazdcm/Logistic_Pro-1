import AppConfig from 'src/AppConfig'
import api from '../Config'

const VENDOR_CREATION = AppConfig.api.baseUrl + '/sap/vendor-creation-confirmation'

class VendorToSAP {
  // GET SINGLE PAN DATA FROM SAP
  vendorCreation(data) {
    return api.post(VENDOR_CREATION, data)
  }
}

export default new VendorToSAP()
