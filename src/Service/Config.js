import axios from 'axios'
import AppConfig from 'src/AppConfig'

const token = localStorage.getItem('auth_token')

const api = axios.create({
  baseURL: AppConfig.api.baseUrl,
  timeout: 100000,
  headers: {
    'Accept': 'application/json',
    'Authorization': `Bearer ${token}`
  }

})

export default api
