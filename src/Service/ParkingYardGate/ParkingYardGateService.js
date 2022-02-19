
import AppConfig from "src/AppConfig";
import api from "../Config";

import {VEHILCE_MASTER_BASE_URL} from "src/Service/Master/VehicleMasterService"

const PARKING_YRD_URL = AppConfig.api.baseUrl+ '/parkingYard'

const PARKING_YRD_GATE_IN_ACTION_URL = AppConfig.api.baseUrl+ '/parkingYard/action/gateIn/'
const PARKING_YRD_GATE_OUT_ACTION_URL = AppConfig.api.baseUrl+ '/parkingYard/action/gateOut/'

const VEHILCE_BY_TYPE_URLS = VEHILCE_MASTER_BASE_URL+"/type/"

const VEHILCE_INFO_BY_VID_URLS = VEHILCE_MASTER_BASE_URL+"/"

const DRIVERS_LIST_URL = AppConfig.api.baseUrl+ '/drivers/'

const AVAIABLE_DRIVERS_LIST_URL = AppConfig.api.baseUrl+ '/activeDrivers'

class ParkingYardGateService {


   getVehiclebyType(id)
   {
    return api.get(VEHILCE_BY_TYPE_URLS +id)
   }

   getVehicleInfoById(id)
   {
    return api.get(VEHILCE_INFO_BY_VID_URLS +id)
   }

   getDrivers()
   {
    return api.get(AVAIABLE_DRIVERS_LIST_URL)
   }

   getAllDrivers()
   {
    return api.get(DRIVERS_LIST_URL)
   }

   getDriverInfoById(id)
   {
    return api.get(DRIVERS_LIST_URL+id)
   }

   getParkingYardGateTrucks()
   {
      return api.get(PARKING_YRD_URL)
   }

   handleParkingYardGateAction(data)
   {
      return api.post(PARKING_YRD_URL,data)
   }

   actionWaitingOutsideToGateIn(vehicleRowId)
   {
    return api.put(PARKING_YRD_GATE_IN_ACTION_URL+vehicleRowId)
   }

   actionGateOut(vehicleRowId)
   {
    return api.put(PARKING_YRD_GATE_OUT_ACTION_URL+vehicleRowId)
   }

}

export default new  ParkingYardGateService()
