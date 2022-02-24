import AppConfig from "src/AppConfig";
import api from "../Config";

const TRIP_SHEET_BASE_URL = AppConfig.api.baseUrl+ '/trip-sheet/'

class TripSheetCreationService {


  getVehicleReadyToTrip() {
    return api.get(TRIP_SHEET_BASE_URL+'ready-to-trip')
  }

  getSingleVehicleInfoOnGate(parkingYardID) {
    return api.get(TRIP_SHEET_BASE_URL+'ready-to-trip/vehicle-info/'+parkingYardID)
  }


  createTripSheet(data) {
    return api.post(TRIP_SHEET_BASE_URL , data)
  }

  deleteBank(BankId) {
    return api.delete(TRIP_SHEET_BASE_URL + '/' + BankId)
  }

}

export default new  TripSheetCreationService()
