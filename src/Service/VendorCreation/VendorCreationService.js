// Created By David - Exciteon
import AppConfig from 'src/AppConfig'
import api from '../Config'

const SINGLE_VEHICLE_DOCUMENT_INFO_URL = AppConfig.api.baseUrl + '/DocumentVerification/'

const VENDOR = AppConfig.api.baseUrl + '/vendorCreation'
const VENDOR_REQUEST = AppConfig.api.baseUrl + '/vendorRequest/'
const VENDOR_APPROVAL = AppConfig.api.baseUrl + '/vendorApproval/'
const VENDOR_CONFIRMATION = AppConfig.api.baseUrl + '/vendorConfirmation/'

class VendorCreationService {
  // VENDOR CREATION REQUEST
  getVendorRequestTableData() {
    return api.get(VENDOR_REQUEST)
  }
  getVehicleDocumentInfo(vehicle_id) {
    return api.get(SINGLE_VEHICLE_DOCUMENT_INFO_URL + vehicle_id)
  }

  // VENDOR CREATION APPROVAL
  getVendorApprovalTableData() {
    return api.get(VENDOR_APPROVAL)
  }
  updateVendorRequestData(id, data) {
    return api.post(VENDOR + '/' + id, data)
  }

  // VENDOR CREATION CONFIRMATION
  getVendorConfirmationTableData() {
    return api.get(VENDOR_CONFIRMATION)
  }
  updateVendorConfirmationData(id, data) {
    // does not do anything useful

    return api.post(VENDOR + '/' + id, data)
  }
}

export default new VendorCreationService()
