//Created By Alwin
import AppConfig from 'src/AppConfig'
import api from '../Config'

const RJSO_MASTER_BASE_URL = AppConfig.api.baseUrl + '/rj_saleorder_creation'

class RJSaleOrderMasterService {
  getRJSaleOrder() {
    return api.get(RJSO_MASTER_BASE_URL)
  }

  createRJSaleOrder(value) {
    return api.post(RJSO_MASTER_BASE_URL, value)
  }
}

export default new RJSaleOrderMasterService()
