import AppConfig from 'src/AppConfig'
import api from '../Config'

export const USER_MASTER_BASE_URL = AppConfig.api.baseUrl + '/users/'

//  API For User Login Master
class UserLoginMasterService {
  // Get All User
  getUser() {
    return api.get(USER_MASTER_BASE_URL)
  }

  // Create New User
  createUser(data) {
    return api.post(USER_MASTER_BASE_URL, data)
  }

  // Get Single User By Id
  getUserById(UserId) {
    return api.get(USER_MASTER_BASE_URL + UserId)
  }

  // Update Single User By Id
  updateUser(UserId, data) {
    return api.post(USER_MASTER_BASE_URL + UserId, data)
  }

  // Delete Single User By Id
  deleteUser(UserId) {
    return api.delete(USER_MASTER_BASE_URL + UserId)
  }
}

export default new UserLoginMasterService()
