
import AppConfig from "src/AppConfig";
import api from "../Config";
import {VEHILCE_MASTER_BASE_URL} from "src/Service/Master/VehicleMasterService"

const VEHICLE_MAINTENANCE_URL = AppConfig.api.baseUrl+ '/VehicleMaintenance'

const PARKING_YRD_SINGEL_VEHICLE_INFO_URL = AppConfig.api.baseUrl+ '/parkingYard/'

const AVAIABLE_DRIVERS_LIST_URL = AppConfig.api.baseUrl+ '/activeDrivers'

class VehicleMaintenanceService {

   getVehicleReadyToMaintenance()
   {
    return api.get(VEHICLE_MAINTENANCE_URL)
   }
   addVehicleMaintenance(data)
   {
    return api.post(VEHICLE_MAINTENANCE_URL,data)
   }
   getMaintenanceById(vehicle_id) {
    return api.get(VEHICLE_MAINTENANCE_URL + '/' + vehicle_id)
  }
  updateMaintenance(maintenance_id, vehicle_id) {
    return api.post(VEHICLE_MAINTENANCE_URL + '/' + maintenance_id, vehicle_id)
  }
   getSingleVehicleInfoOnParkingYardGate(id)
   {
    return api.get(PARKING_YRD_SINGEL_VEHICLE_INFO_URL+id);
   }
   getDrivers()
   {
    return api.get(AVAIABLE_DRIVERS_LIST_URL)
   }
   getVehicleMaintenanceInfo(vehicle_id) {
    return api.get(VEHICLE_MAINTENANCE_URL + vehicle_id)
  }
}

export default new  VehicleMaintenanceService()
