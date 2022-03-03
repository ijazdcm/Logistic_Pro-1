import AppConfig from 'src/AppConfig'
import api from '../Config'

const VENDOR_CREATION = AppConfig.api.baseUrl + '/sap/vendor-creation-confirmation'

class VendorToSAP {
  // GET SINGLE PAN DATA FROM SAP
  vendorCreation(data) {
    let formData = JSON.stringify(data)
    console.log(formData)
    // return api.post(VENDOR_CREATION, formData)
  }
}

export default new VendorToSAP()
