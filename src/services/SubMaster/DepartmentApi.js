import axios from 'axios'
import { API_URL } from 'src/App'

const API_BASE_URL = API_URL + 'department' //Development

class DepartmentApi {
  getDepartment() {
    return axios.get(API_BASE_URL)
  }

  createDepartment(value) {
    return axios.post(API_BASE_URL, value)
  }

  getDepartmentById(DepartmentId) {
    return axios.get(API_BASE_URL + '/' + DepartmentId)
  }

  updateDepartment(Department, DepartmentId) {
    return axios.put(API_BASE_URL + '/' + DepartmentId, Department)
  }

  deleteDepartment(DepartmentId) {
    return axios.delete(API_BASE_URL + '/' + DepartmentId)
  }
}

export default new DepartmentApi()