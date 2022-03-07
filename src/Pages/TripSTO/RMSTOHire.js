//Implemented by Alwin Naga
/* eslint-disable prettier/prettier */
import {
  CButton,
  CCard,
  CAlert,
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
import useFormRMSTOHire from 'src/Hooks/useFormRMSTOHire'
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
  const [shed_owner_phone_1, setShed_owner_phone_1] = useState('')
  const [shed_owner_phone_2, setShed_owner_phone_2] = useState('')
  const [validateSubmit, setValidateSubmit] = useState(true)
  const [errorModal, setErrorModal] = useState(false)

  const [pending, setPending] = useState(true)

  const [vehicleSto, setVehicleSto] = useState('')

  // SET FORM VALUES
  const formValues = {
    panNumber: '',
    shedName: '',
    remarks: '',
    ownerName: '',
    ownerMob: '',
  }

  // function login() {}

  // VALIDATIONS
  // function callBack() {}
  // const { values, errors, handleChange, onFocus, handleSubmit, enableSubmit, onBlur, isTouched } =
  //   useForm(DocumentVerificationValidation, formValues)

  const { values, errors, handleChange, onFocus, handleSubmit, enableSubmit, onBlur, isTouched } =
    useFormRMSTOHire(panData, RMSTOHireValidation, formValues)

  // GET PAN DETAILS FROM SAP
  const getPanData = (e) => {
    e.preventDefault()
    let panDetail = PanDataService.getPanData(values.panNumber).then((res) => {
      if (res.status == 200 && res.data != '') {
        setPanData(res.data[0])
        toast.success('Pan Details Detected!')
        // setVendor(true)
      } else {
        toast.warning('No Pan Details Detected! Fill Up The Fields')
        // setVendor(false)
      }
    })

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
        // isTouched.shed_name = true
        // isTouched.shed_pan = true
        // isTouched.shed_aadhar = true
        // isTouched.customerCode = true // double command
        // isTouched.customerCode = true
        // console.log(res.data.data)
        // values.shed_name = res.data.data.shed_id // double command
        // values.shed_pan = res.data.data.pan_number // double command
        // values.shed_aadhar = res.data.data.shed_adhar_number // double command
        setShed_owner_phone_1(res.data.data.shed_owner_phone_1)
        setShed_owner_phone_2(res.data.data.shed_owner_phone_2)
      })
    } else {
      setShed_owner_phone_1('')
      setShed_owner_phone_2('')
      // setShedCode('')
    }
  }, [values.shedName])

  function assignTripSTO(vehicleId) {
    // alert(vehicleId)

    TripStoService.doAssignTripSto(vehicleId).then((res) => {
      if (res.status === 204) {
        toast.success('TripSto Assigned Successfully!')
        setTimeout(() => {
          window.location.href = '/RMSTOTable'
        }, 1000)
      } else {
        toast.warning('Failed To Assign Trip STO..Kindly Contact Admin.!')
      }
    })
  }

  const assignRMSTOHireVehicle = (data) => {
    console.log(data)
    // console.log(panData.LIFNR)
    console.log(panData)
    if (panData.LIFNR) {
      setErrorModal(true)
      // setVehicleSto(data.vehicle_id)
    } else {
      //  =================================================================================================
      const formData = new FormData()
      formData.append('vehicle_id', currentVehicleInfo.vehicle_id)
      formData.append('pan_number', values.panNumber || panNumber)
      formData.append('owner_name', panData.NAME1 || values.ownerName)
      formData.append('owner_number', panData.TELF1 || values.ownerMob)
      formData.append('shed_id', values.shedName)
      formData.append('remarks', values.remarks ? values.remarks : 'NO REMARKS')

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
    }
    // =================================================================================================
  }

  useEffect(() => {
    TripStoService.getSingleVehicleInfoOnParkingYardGate(id).then((res) => {
      console.log(res.data.data)
      console.log(id)
      // values.vehicle_id = res.data.data.vehicle_id // double command
      // isTouched.vehicle_id = true
      isTouched.remarks = true
      // isTouched.vType = true
      setCurrentVehicleInfo(res.data.data)
      setVehicleSto(res.data.data.vehicle_id)
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

  useEffect(() => {
    if (Object.keys(errors).length === 0 && Object.keys(isTouched)) {
      setValidateSubmit(false)
    } else {
      setValidateSubmit(true)
    }
  })

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
                        value={values.panNumber || panNumber}
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
                            values.ownerName = ''
                            values.ownerMob = ''
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
                      value={panData ? panData.LIFNR : ''}
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
                      value={panData ? panData.IDNUMBER : ''}
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
                      value={panData ? panData.BANKN : ''}
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
                      <option value="0">Select..</option>
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
                      // disabled={validateSubmit}
                      disabled={enableSubmit}
                      // disabled={enableSubmit && acceptBtn}
                      onClick={() => assignRMSTOHireVehicle(values)}
                    >
                      Accept
                    </CButton>
                    {/* <CButton
                      size="sm"
                      color="warning"
                      className="mx-1 px-2 text-white"
                      type="button"
                      disabled={rejectBtn}
                      onClick={() => addDocumentVerification(0)}
                    >
                      Reject
                    </CButton> */}
                  </CCol>
                </CRow>
              </CForm>
            </CTabPane>
          </CTabContent>
        </CCard>
      )}

      {/* Error Modal Section */}
      <CModal visible={errorModal} onClose={() => setErrorModal(false)}>
        <CModalHeader>
          <CModalTitle className="h4">Trip STO Confirmation</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow>
            <CCol>
              <CAlert color="danger" data-aos="fade-down">
                {'Are You Sure to Want to go Trip STO ?'}
              </CAlert>
            </CCol>
          </CRow>
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={() => assignTripSTO(vehicleSto)}>
            Yes
          </CButton>
          <CButton onClick={() => setErrorModal(false)} color="primary">
            <Link to=""> No </Link>
          </CButton>
        </CModalFooter>
      </CModal>
      {/* Error Modal Section */}
    </>
  )
}

export default RMSTOHire
