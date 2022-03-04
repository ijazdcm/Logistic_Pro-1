//Implemented by Alwin Naga
/* eslint-disable prettier/prettier */
import {
  CButton,
  CCard,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CNav,
  CNavItem,
  CNavLink,
  CRow,
  CTabContent,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTabPane,
  CFormFloating,
  CFormCheck,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CFormTextarea,
  CInputGroupText,
  CInputGroup,
  CSpinner,
} from '@coreui/react'
import { React, useState, useEffect } from 'react'

import { Link, useNavigate, useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import TripStoService from 'src/Service/TripSTO/TripStoService'

// SERVICES FILE
import DocumentVerificationService from 'src/Service/DocsVerify/DocsVerifyService'
import ShedService from 'src/Service/SmallMaster/Shed/ShedService'
import ShedMasterService from 'src/Service/Master/ShedMasterService'
import PanDataService from 'src/Service/SAP/PanDataService'

// VALIDATIONS FILE
import useForm from 'src/Hooks/useForm.js'
import validate from 'src/Utils/Validation'
import DocumentVerificationValidation from 'src/Utils/TransactionPages/DocumentVerification/DocumentVerificationValidation'
import RMSTOHireValidation from 'src/Utils/TripSTO/RMSTOHireValidation'
console.log('ask1')
const RMSTOHire = () => {
  console.log('ask2')
  const { id } = useParams()
  console.log(id)
  const navigation = useNavigate()
  const [visible, setVisible] = useState(false)
  const [currentVehicleInfo, setCurrentVehicleInfo] = useState({})
  const [acceptBtn, setAcceptBtn] = useState(true)
  const [rejectBtn, setRejectBtn] = useState(true)
  const [fetch, setFetch] = useState(false)
  const [shedName, setShedName] = useState([])
  // const [shedNames, setShedNames] = useState([])
  const [shedData, setShedData] = useState({})
  const [panNumber, setPanNumber] = useState('')
  const [panData, setPanData] = useState({})
  const [readOnly, setReadOnly] = useState(true)
  const [write, setWrite] = useState(false)
  const [shed_owner_phone_1, setShed_owner_phone_1] = useState('No Shed')
  const [shed_owner_phone_2, setShed_owner_phone_2] = useState('No Shed')

  // SET FORM VALUES
  const formValues = {
    panNumber: '',
    license: '',
    rcFront: '',
    rcBack: '',
    insurance: '',
    insuranceValid: '',
    TDSfront: '',
    transportShed: '',
    shedName: '',
    ownershipTrans: '',
    freightRate: '',
    remarks: '',
    ownerName: '',
    ownerMob: '',
    aadhar: '',
    bankAcc: '',
    aadharCopy: '',
    panCopy: '',
    passCopy: '',
  }

  function login() {
    // alert('No Errors CallBack Called')
  }

  // VALIDATIONS
  // function callBack() {}
  // const { values, errors, handleChange, onFocus, handleSubmit, enableSubmit, onBlur, isTouched } =
  //   useForm(DocumentVerificationValidation, formValues)

  const { values, errors, handleChange, onFocus, handleSubmit, enableSubmit, onBlur, isTouched } =
    useForm(login, RMSTOHireValidation, formValues)

  // GET PAN DETAILS FROM SAP
  const getPanData = (e) => {
    e.preventDefault()
    // PanDataService.getPanData(values.panNumber).then((res) => {
    //   console.log(res.data)
    // })
    let panDetail = PanDataService.getPanData(values.panNumber)
    if (panDetail != '') {
      setPanData(panDetail)
      toast.success('Pan Details Detected!')
    } else {
      toast.warning('No Pan Details Detected! Fill Up The Fields')
    }

    setReadOnly(true)
    setWrite(true)
  }

  // GET SINGLE SHED DETAILS
  // const ShedData = (id) => {
  //   ShedService.SingleShedData(id).then((resp) => {
  //     setShedData(resp.data.data)
  //   })
  // }

  // GET SINGLE SHED DETAILS
  const ShedData = (id) => {
    // getShedById

    ShedMasterService.getShedById(id).then((resp) => {
      setShedData(resp.data.data)
    })
  }

  useEffect(() => {
    // section for getting Shed Details from database
    ShedMasterService.getShed().then((res) => {
      // console.log(res.data.data)
      setShedName(res.data.data)
    })
  }, [])

  useEffect(() => {
    if (values.shedName != '0') {
      //fetch Shed Pan , Aadhar Number from Shed Master

      // console.log('dd')
      ShedMasterService.getShedById(values.shedName).then((res) => {
        isTouched.shed_name = true
        isTouched.shed_pan = true
        isTouched.shed_aadhar = true
        // isTouched.customerCode = true
        isTouched.customerCode = true
        // console.log(res.data.data)
        // values.shed_name = res.data.data.shed_id
        // values.shed_pan = res.data.data.pan_number
        // values.shed_aadhar = res.data.data.shed_adhar_number
        setShed_owner_phone_1(res.data.data.shed_owner_phone_1)
        setShed_owner_phone_2(res.data.data.shed_owner_phone_2)
      })
    } else {
      setShed_owner_phone_1('No Shed')
      setShed_owner_phone_2('No Shed')
      // setShedCode('')
    }
  }, [values.shedName])

  // ADD DOCUMENT VERIFICATION DETAILS
  const addDocumentVerification = (status) => {
    const formData = new FormData()
    formData.append('vehicle_id', currentVehicleInfo.vehicle_id)
    //   formData.append('vehicle_inspection_id', currentVehicleInfo.vehicle_inspection.inspection_id)
    formData.append('pan_number', values.panNumber || panNumber)
    formData.append('vendor_code', panData.LIFNR || 0)
    formData.append('owner_name', panData.NAME1 || values.ownerName)
    formData.append('owner_number', panData.TELF1 || values.ownerMob)
    formData.append('aadhar_number', panData.IDNUMBER || 0)
    formData.append('bank_acc_number', panData.BANKN || 0)
    //   formData.append('license_copy', values.license)
    //   formData.append('rc_copy_front', values.rcFront)
    //   formData.append('rc_copy_back', values.rcBack)
    //   formData.append('insurance_copy_front', values.insurance)
    //   // data.append('insurance_copy_back', values.insect_vevils_presence_in_tar)
    //   formData.append('insurance_validity', values.insuranceValid)
    //   formData.append('tds_dec_form_front', values.TDSfront)
    //   formData.append('tds_dec_form_back', values.TDSback)
    //   formData.append('aadhar_copy', values.aadharCopy)
    //   formData.append('pan_copy', values.panCopy)
    //   formData.append('pass_copy', values.passCopy)
    //   formData.append('transport_shed_sheet', values.transportShedSheet)

    formData.append('shed_id', values.shedName)
    //   formData.append('ownership_transfer_form', values.ownershipTrans)
    formData.append('shed_owner_number', shed_owner_phone_1)
    formData.append('shed_owner_whatsapp', shed_owner_phone_2)
    //   formData.append('freight_rate', values.freightRate)
    formData.append('remarks', values.remarks ? values.remarks : 'NO REMARKS')
    formData.append('document_status', status)
    formData.append('document_verification_status', status)

    TripStoService.assignRMSTOHire(formData).then((res) => {
      if (res.status === 200) {
        toast.success('RMSto Hire Vechile Assigned Successfully!')
        setTimeout(() => {
          window.location.href = '/RMSTOTable'
        }, 1000)
      } else {
        toast.warning('Failed To Assign Trip STO..Kindly Contact Admin.!')
      }
    })

    // VehicleInspectionService.addVehicleInspectionDetails(data).then((res) => {
    //   if (res.status == 200) {
    //     toast.success('Vehicle Inspection process completed')
    //     navigation('/vInspection')
    //   }
    // })

    //   DocumentVerificationService.addDocumentVerificationData(formData)
    //     .then((res) => {
    //       console.log(res)
    //       if (res.status == 200) {
    //         toast.success('Document Verification Done!')
    //         navigation('/DocsVerify')
    //       }
    //     })
    //     .catch((err) => {
    //       toast.warning(err)
    //     })
  }
  console.log('ask65')

  // const { id } = useParams()

  // console.log(values)

  useEffect(() => {
    TripStoService.getSingleVehicleInfoOnParkingYardGate(id).then((res) => {
      console.log(res.data.data)
      // values.vehicle_id = res.data.data.vehicle_id
      isTouched.vehicle_id = true
      isTouched.remarks = true
      setCurrentVehicleInfo(res.data.data)
      setFetch(true)
    })

    // GET ALL SHED DETAILS
    // ShedService.getAllShedData().then((res) => {
    //   setShedNames(res.data.data)
    // })
  }, [id])

  // // GET SINGLE VEHICLE DATA
  // useEffect(() => {
  //   console.log('ask6')
  //   TripStoService.getSingleVehicleInfoOnParkingYardGate(id)

  //     .then((res) => {
  //       console.log('asdk1')
  //       console.log(res)
  //       // const resData = res.data.data
  //       // setCurrentVehicleInfo(resData)
  //       setCurrentVehicleInfo(res.data.data)
  //       setFetch(true)
  //     })
  //     .catch((err) => {
  //       console.log('asdk2')
  //       console.log(err)
  //     })
  //   console.log('ask7')

  // }, [])

  // // GET SINGLE VEHICLE DATA
  // useEffect(() => {
  //   DocumentVerificationService.getSingleVehicleInfoOnParkingYardGate(id).then((res) => {
  //     const resData = res.data.data
  //     setCurrentVehicleInfo(resData)
  //     setFetch(true)
  //   })
  //   // GET ALL SHED DETAILS
  //   ShedService.getAllShedData().then((res) => {
  //     setShedNames(res.data.data)
  //   })
  // }, [])

  // ERROR VALIDATIONS
  // useEffect(() => {
  //   if (Object.keys(isTouched).length == Object.keys(formValues).length) {
  //     if (Object.keys(errors).length == 0) {
  //       setAcceptBtn(false)
  //       setRejectBtn(true)
  //     } else {
  //       setAcceptBtn(true)
  //       setRejectBtn(false)
  //     }
  //   }
  // }, [values, errors])

  return (
    <>
      {fetch && (
        <CCard>
          <CTabContent className="m-0 p-0">
            {/* <CNav variant="pills" layout="justified">
            <CNavItem>
              <CNavLink href="#" active>
                <h5>Hire Vehicle</h5>
              </CNavLink>
            </CNavItem>
          </CNav> */}
            <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={true}>
              <CForm className="container p-3" onSubmit={handleSubmit}>
                <CRow className="">
                  <CCol md={3}>
                    <CFormLabel htmlFor="vType">
                      Vehicle Type
                      {/* <CSpinner size="sm" /> */}
                    </CFormLabel>
                    <CFormInput
                      name="vType"
                      size="sm"
                      id="vType"
                      value={fetch ? currentVehicleInfo.vehicle_type_id.type : ''}
                      // value={currentVehicleInfo.vehicle_type_id.type}
                      readOnly
                    />
                  </CCol>

                  <CCol md={3}>
                    <CFormLabel htmlFor="vNum">Vehicle Number</CFormLabel>
                    <CFormInput
                      name="vNum"
                      size="sm"
                      id="vNum"
                      value={fetch ? currentVehicleInfo.vehicle_number : ''}
                      readOnly
                    />
                  </CCol>

                  <CCol xs={12} md={3}>
                    <CFormLabel htmlFor="vCap">Vehicle Capacity In MTS</CFormLabel>
                    <CFormInput
                      name="vCap"
                      size="sm"
                      id="vCap"
                      value={fetch ? currentVehicleInfo.vehicle_capacity_id.capacity : ''}
                      readOnly
                    />
                  </CCol>
                  <CCol xs={12} md={3}>
                    <CFormLabel htmlFor="dName">Driver Name</CFormLabel>
                    <CFormInput
                      name="dName"
                      size="sm"
                      id="dName"
                      value={fetch ? currentVehicleInfo.driver_name : ''}
                      readOnly
                    />
                  </CCol>
                  <CCol xs={12} md={3}>
                    <CFormLabel htmlFor="dMob">Driver Contact Number</CFormLabel>
                    <CFormInput
                      name="dMob"
                      size="sm"
                      id="dMob"
                      value={fetch ? currentVehicleInfo.driver_contact_number : ''}
                      readOnly
                    />
                  </CCol>
                  <CCol xs={12} md={3}>
                    <CFormLabel htmlFor="gateInDateTime">Gate-In Date & Time</CFormLabel>
                    <CFormInput
                      name="gateInDateTime"
                      size="sm"
                      id="gateInDateTime"
                      value={fetch ? currentVehicleInfo.gate_in_date_time : ''}
                      readOnly
                    />
                  </CCol>

                  <CCol xs={12} md={3}>
                    <CFormLabel htmlFor="panNumber">
                      PAN Card Number*{' '}
                      {errors.panNumber && (
                        <span className="small text-danger">{errors.panNumber}</span>
                      )}
                    </CFormLabel>
                    <CInputGroup>
                      <CFormInput
                        size="sm"
                        name="panNumber"
                        id="panNumber"
                        maxLength={10}
                        // value={values.panNumber || panNumber}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        onChange={handleChange}
                      />
                      <CInputGroupText className="p-0">
                        <CButton
                          size="sm"
                          color="primary"
                          onClick={(e) => getPanData(e)}
                          // disabled={
                          //   errors.panNumber ? true : false || values.panNumber ? false : true
                          // }
                        >
                          <i className="fa fa-check px-1"></i>
                        </CButton>
                        <CButton
                          size="sm"
                          color="warning"
                          className="text-white"
                          onClick={() => {
                            values.panNumber = ''
                            setPanData('')
                            setPanNumber('')
                            setWrite(false)
                          }}
                          // disabled={values.panNumber ? false : true}
                        >
                          <i className="fa fa-ban px-1" aria-hidden="true"></i>
                        </CButton>
                        <CButton
                          size="sm"
                          color="success"
                          className="text-white"
                          onClick={() => {
                            setReadOnly(false)
                          }}
                          disabled={write}
                        >
                          <i className="fa fa-edit px-1" aria-hidden="true"></i>
                        </CButton>
                      </CInputGroupText>
                    </CInputGroup>
                  </CCol>
                  <CCol xs={12} md={3} hidden={!readOnly}>
                    <CFormLabel htmlFor="VendorCode">Vendor Code</CFormLabel>
                    <CFormInput
                      name="VendorCode"
                      size="sm"
                      id="VendorCode"
                      value={panData ? panData.LIFNR : values.VendorCode}
                      readOnly
                    />
                  </CCol>
                  <CCol xs={12} md={3}>
                    <CFormLabel htmlFor="ownerName">
                      Owner Name{!readOnly && '*'}
                      {!readOnly && errors.ownerName && (
                        <span className="small text-danger">{errors.ownerName}</span>
                      )}
                    </CFormLabel>
                    <CFormInput
                      name="ownerName"
                      size="sm"
                      id="ownerName"
                      value={panData ? panData.NAME1 : values.ownerName}
                      onFocus={onFocus}
                      onBlur={onBlur}
                      onChange={handleChange}
                      readOnly={readOnly}
                    />
                  </CCol>

                  <CCol xs={12} md={3}>
                    <CFormLabel htmlFor="ownerMob">
                      Owner Mobile Number{!readOnly && '*'}
                      {!readOnly && errors.ownerMob && (
                        <span className="small text-danger">{errors.ownerMob}</span>
                      )}
                    </CFormLabel>
                    <CFormInput
                      name="ownerMob"
                      size="sm"
                      id="ownerMob"
                      maxLength={10}
                      value={panData ? panData.TELF1 : values.ownerMob}
                      onFocus={onFocus}
                      onBlur={onBlur}
                      onChange={handleChange}
                      readOnly={readOnly}
                    />
                  </CCol>
                  <CCol xs={12} md={3} hidden={!readOnly}>
                    <CFormLabel htmlFor="aadhar">
                      Aadhar Number{!readOnly && '*'}
                      {!readOnly && errors.aadhar && (
                        <span className="small text-danger">{errors.aadhar}</span>
                      )}
                    </CFormLabel>
                    <CFormInput
                      name="aadhar"
                      size="sm"
                      id="aadhar"
                      maxLength={12}
                      value={panData ? panData.IDNUMBER : values.aadhar}
                      onFocus={onFocus}
                      onBlur={onBlur}
                      onChange={handleChange}
                      readOnly={readOnly}
                    />
                  </CCol>
                  <CCol xs={12} md={3} hidden={!readOnly}>
                    <CFormLabel htmlFor="bankAcc">
                      Bank Account Number{!readOnly && '*'}
                      {!readOnly && errors.bankAcc && (
                        <span className="small text-danger">{errors.bankAcc}</span>
                      )}
                    </CFormLabel>
                    <CFormInput
                      name="bankAcc"
                      size="sm"
                      id="bankAcc"
                      maxLength={18}
                      value={panData ? panData.BANKN : values.bankAcc}
                      onFocus={onFocus}
                      onBlur={onBlur}
                      onChange={handleChange}
                      readOnly={readOnly}
                    />
                  </CCol>

                  <CCol xs={12} md={3}>
                    <CFormLabel htmlFor="shedName">
                      Shed Name*{' '}
                      {errors.shedName && (
                        <span className="small text-danger">{errors.shedName}</span>
                      )}
                    </CFormLabel>
                    <CFormSelect
                      size="sm"
                      name="shedName"
                      className=""
                      id="shedName"
                      value={values.shedName}
                      onFocus={onFocus}
                      onBlur={onBlur}
                      onChange={handleChange}
                    >
                      <option value="0">No Shed</option>
                      {/* {shedNames.map((data) => {
                        return (
                          <>
                            <option
                              key={data.shed_id}
                              value={data.shed_name}
                              onClick={() => ShedData(data.shed_id)}
                            >
                              {data.shed_name}
                            </option>
                          </>
                        )
                      })} */}
                      {shedName.map(({ shed_id, shed_name }) => {
                        if (shed_id) {
                          return (
                            <>
                              <option
                                key={shed_id}
                                value={shed_id}
                                // onClick={() => ShedData(shed_id)}
                              >
                                {shed_name}
                              </option>
                            </>
                          )
                        }
                      })}
                    </CFormSelect>
                  </CCol>

                  <CCol xs={12} md={3}>
                    <CFormLabel htmlFor="shedownerMob">Shed Mobile Number</CFormLabel>
                    <CFormInput
                      type="text"
                      name="shedownerMob"
                      size="sm"
                      id="shedownerMob"
                      // value={shedData && shedData.shed_owner_phone_1}
                      value={shed_owner_phone_1}
                      readOnly
                    />
                  </CCol>
                  <CCol xs={12} md={3}>
                    <CFormLabel htmlFor="shedownerWhatsapp">Shed WhatsApp Number</CFormLabel>
                    <CFormInput
                      type="text"
                      name="shedownerWhatsapp"
                      size="sm"
                      id="shedownerWhatsapp"
                      // value={shedData && shedData.shed_owner_phone_2}
                      value={shed_owner_phone_2}
                      readOnly
                    />
                  </CCol>

                  <CCol xs={12} md={3}>
                    <CFormLabel htmlFor="remarks">Remarks</CFormLabel>
                    <CFormTextarea id="remarks" rows="1"></CFormTextarea>
                  </CCol>
                </CRow>

                <CRow>
                  <CCol>
                    <Link to="/RMSTOTable">
                      <CButton
                        md={9}
                        size="sm"
                        color="primary"
                        disabled=""
                        className="text-white"
                        type="submit"
                      >
                        Previous
                      </CButton>
                    </Link>
                  </CCol>

                  <CCol
                    className=""
                    xs={12}
                    sm={12}
                    md={3}
                    style={{ display: 'flex', justifyContent: 'flex-end' }}
                  >
                    {/* addDocumentVerification */}
                    <CButton
                      size="sm"
                      color="warning"
                      className="mx-1 px-2 text-white"
                      type="button"
                      // disabled={acceptBtn}
                      onClick={() => addDocumentVerification(1)}
                    >
                      Accept
                    </CButton>
                    <CButton
                      size="sm"
                      color="warning"
                      className="mx-1 px-2 text-white"
                      type="button"
                      disabled={rejectBtn}
                      onClick={() => addDocumentVerification(0)}
                    >
                      Reject
                    </CButton>
                  </CCol>
                </CRow>
              </CForm>
            </CTabPane>
          </CTabContent>
        </CCard>
      )}
      {/* Modal Area */}
      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>Odometer Photo</CModalTitle>
        </CModalHeader>

        <CModalBody>
          <img
            src="https://media-exp1.licdn.com/dms/image/C560BAQEhfRQblzW2Jw/company-logo_200_200/0/1597849191912?e=2159024400&v=beta&t=GfooSG4SaLjwT3-7D7uTYkhI_3ZT8q64wR-d0e_Ti_s"
            alt=""
          />
        </CModalBody>

        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>

      {/* Modal Area */}
    </>
  )
}

export default RMSTOHire
