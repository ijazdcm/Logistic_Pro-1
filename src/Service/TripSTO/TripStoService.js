import AppConfig from 'src/AppConfig'
import api from '../Config'

const TRIPSTO_URL = AppConfig.api.baseUrl + '/TripSto'

const PARKING_YRD_SINGEL_VEHICLE_INFO_URL = AppConfig.api.baseUrl + '/parkingYard/'

class TripStoService {
  getVehicleReadyToTripSto() {
    return api.get(TRIPSTO_URL)
  }

  doAssignTripSto(id) {
    return api.get(TRIPSTO_URL + '/' + id)
  }

  assignRMSTOHire(data) {
    return api.get(TRIPSTO_URL, data)
  }

  getSingleVehicleInfoOnParkingYardGate(id) {
    return api.get(PARKING_YRD_SINGEL_VEHICLE_INFO_URL + id)
  }
}

export default new TripStoService()
