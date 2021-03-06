import AppConfig from "src/AppConfig";
import api from "../Config";


export const VEHILCE_MASTER_BASE_URL = AppConfig.api.baseUrl+'/vehicles'

class VehicleMasterService {
  getVehicles() {
    return api.get(VEHILCE_MASTER_BASE_URL)
  }

  createVehicles(value) {
    return api.post(VEHILCE_MASTER_BASE_URL, value)
  }

  getVehiclesById(VehiclesId) {
    return api.get(VEHILCE_MASTER_BASE_URL + '/' + VehiclesId)
  }

  updateVehicles( VehiclesId,Vehicles) {

    return api.post(VEHILCE_MASTER_BASE_URL + '/' + VehiclesId, Vehicles)
  }

  deleteVehicles(VehiclesId) {
    return api.delete(VEHILCE_MASTER_BASE_URL + '/' + VehiclesId)
  }
}

export default new VehicleMasterService()
