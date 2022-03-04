import axios from 'axios'
import AppConfig from 'src/AppConfig'
import api from '../Config'

const URL = AppConfig.api.baseUrl + '/sap/check-document-available/'

class PanDataService {
  // GET SINGLE PAN DATA FROM SAP
  getPanData(panNumber) {
    return api.get(URL + panNumber)
  }
}

export default new PanDataService()
