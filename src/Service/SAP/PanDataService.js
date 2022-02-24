import axios from 'axios'
import AppConfig from 'src/AppConfig'

class PanDataService {
  // GET SINGLE PAN DATA FROM SAP
  getPanData(panNumber) {
<<<<<<< HEAD
    // if (panNumber == 'AMIPR8417L') {
    //   return {
    //     LIFNR: '212248',
    //     NAME1: 'K.RAJASEKAR-AMIPR8417L',
    //     TELF1: '9944990055',
    //     IDNUMBER: '533792467415',
    //     BANKN: '916010067777029',
    //     J_1IPANNO: 'AMIPR8417L',
    //   }
    // } else {
    //   return ''
    // }
=======
    if (panNumber == 'AMIPR8417L') {
      return {
        LIFNR: '212248',
        NAME1: 'K.RAJASEKAR-AMIPR8417L',
        TELF1: '9944990055',
        IDNUMBER: '533792467415',
        BANKN: '916010067777029',
        J_1IPANNO: 'AMIPR8417L',
      }
    } else {
      return ''
    }
>>>>>>> c23dc360c51e3c06a378f88a380696d37c6a1924
    //   let config = {
    //     method: 'GET',
    //     url: 'http://10.10.63.134:8001/zdoc_ver_LP/DocumentationVerification?sap-client=900&&PAN_NO=AMIPR8417L',
    //     withCredentials: true,
    //     headers: {
    //       Authorization: 'Basic dHJhaW5lZTU6U2JoYXJ1',
    //       'Access-Control-Allow-Origin': '*',
    //       'Access-Control-Allow-Credentials': true,
    //       Cookie:
    //         'SAP_SESSIONID_NSY_900=06NElLuBfxpw8lv1Qn82StFggCOK_RHssLYAUFa533M%3d; sap-usercontext=sap-client=900',
    //     },
    //     auth: {
    //       username: 'trainee5',
    //       password: 'Sbharu',
    //     },
    //   }
    //   axios(config)
    //     .then((response) => {
    //       console.log(JSON.stringify(response.data))
    //     })
    //     .catch((error) => {
    //       console.log(error)
    //     })
    // ===========================================================
    let session_url =
      'http://10.10.63.134:8001/zdoc_ver_LP/DocumentationVerification?sap-client=900&&PAN_NO=' +
      panNumber
    axios
      .get(
        session_url,
        {
          AccessControlAllowCredentials: true,
          withCredentials: true,
          'Access-Control-Allow-Origin': '*',
<<<<<<< HEAD
          // 'Access-Control-Allow-Origin': 'http://localhost:3001',
=======
>>>>>>> c23dc360c51e3c06a378f88a380696d37c6a1924
          'Access-Control-Allow-Credentials': true,
          headers: {
            // Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
        {
          auth: {
            username: 'trainee5',
            password: 'Sbharu',
          },
        }
      )
      .then((response) => response.json())
      .then((data) => {
<<<<<<< HEAD
        debugger
        console.log(data)
        console.log('ask')
=======
        console.log(data)
>>>>>>> c23dc360c51e3c06a378f88a380696d37c6a1924
        // console.log(response.data);
      })
      .catch((error) => {
        console.log(error)
      })
  }
}

export default new PanDataService()
