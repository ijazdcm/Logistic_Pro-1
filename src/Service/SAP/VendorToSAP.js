import axios from 'axios'
import AppConfig from 'src/AppConfig'

class VendorToSAP {
  // GET SINGLE PAN DATA FROM SAP
  vendorDataToSAP(id, datas) {
    const axios = require('axios')
    let data = json.stringify(datas)

    console.log(data)
    return

    let config = {
      method: 'post',
      url: 'http://10.10.63.134:8001/zdoc_ver_LP/DocumentationVerification?sap-client=900&&PAN_NO=AMIPR8417L',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    }

    axios(config)
      .then((response) => {
        console.log(JSON.stringify(response.data))
      })
      .catch((error) => {
        console.log(error)
      })
  }
}

export default new VendorToSAP()
