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
  CButtonGroup,
} from '@coreui/react'
import { React, useEffect, useState } from 'react'
import useForm from 'src/Hooks/useForm.js'
import VehicleInspectionService from 'src/Service/VehicleInspection/VehicleInspectionService'
import { Link, useNavigate, useParams } from 'react-router-dom'
import DriverListSelectComponent from 'src/components/commoncomponent/DriverListSelectComponent'
import VehicleInspectionValidation from 'src/Utils/TransactionPages/VehicleInspection/VehicleInspectionValidation'
import PerviousLoadDetailComponent from 'src/components/commoncomponent/PerviousLoadDetailComponent'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const VehicleInspection = () => {
  const formValues = {
    vehicle_id: '',
    truck_clean: '',
    bad_smell: '',
    insect_vevils_presence: '',
    tarpaulin_srf: '',
    tarpaulin_non_srf: '',
    insect_vevils_presence_in_tar: '',
    truck_platform: '',
    previous_load_details: '',
    remarks: '',
  }

  const border = {
    borderColor: '#b1b7c1',
  }

  const { values, errors, handleChange, onFocus, handleSubmit, enableSubmit, onBlur, isTouched } =
    useForm(inspectVehicle, VehicleInspectionValidation, formValues)

  const navigation = useNavigate()

  const addVehicleInspection = (status) => {
    let data = new FormData()
    data.append('vehicle_id', values.vehicle_id)
    data.append('truck_clean', values.truck_clean)
    data.append('bad_smell', values.bad_smell)
    data.append('insect_vevils_presence', values.insect_vevils_presence)
    data.append('tarpaulin_srf', values.tarpaulin_srf)
    data.append('tarpaulin_non_srf', values.tarpaulin_non_srf)
    data.append('insect_vevils_presence_in_tar', values.insect_vevils_presence_in_tar)
    data.append('truck_platform', values.truck_platform)
    data.append('previous_load_details', values.previous_load_details)
    data.append('vehicle_fit_for_loading', status)
    data.append('remarks', values.remarks ? values.remarks : 'NO REMARKS')
    data.append('vehicle_inspection_status', status)
    if (values.driverId && oldDriver) {
      data.append('driver_id', values.driverId)
      data.append('old_driver_id', oldDriver)
    }

    VehicleInspectionService.addVehicleInspectionDetails(data).then((res) => {
      if (res.status == 200) {
        toast.success('Vehicle Inspection process completed')
        navigation('/vInspection')
      }
    })
  }

  function inspectVehicle() {}

  const [visible, setVisible] = useState(false)
  const [currentVehicleInfo, setCurrentVehicleInfo] = useState({})
  const [changeDriver, setChangeDriver] = useState(false)
  const [fitForLoad, setFitForLoad] = useState('')
  const [acceptBtn, setAcceptBtn] = useState(true)
  const [rejectBtn, setRejectBtn] = useState(true)
  const [oldDriver, setOldDriver] = useState('')
  const [fetch, setFetch] = useState(false)
  const VEHICLE_TYPE = {
    OWN: 1,
    CONTRACT: 2,
    HIRE: 3,
    PARTY: 4,
  }

  const { id } = useParams()

  console.log(values)

  useEffect(() => {
    VehicleInspectionService.getSingleVehicleInfoOnParkingYardGate(id).then((res) => {
      values.vehicle_id = res.data.data.vehicle_id
      isTouched.vehicle_id = true
      isTouched.remarks = true
      setCurrentVehicleInfo(res.data.data)
      setFetch(true)
    })
  }, [id])

  useEffect(() => {
    if (Object.keys(isTouched).length == Object.keys(formValues).length) {
      if (Object.keys(errors).length == 0) {
        setFitForLoad('YES')
        setAcceptBtn(false)
        setRejectBtn(true)
      } else {
        setFitForLoad('NO')
        setAcceptBtn(true)
        setRejectBtn(false)
      }
    }
  }, [values, errors])

  return (
    <>
      {fetch && (
        <CCard>
          <CTabContent>
            <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={true}>
              <CForm className="container p-3" onSubmit={handleSubmit}>
                <CRow className="">
                  <CCol md={3}>
                    <CFormLabel htmlFor="vType">Vehicle Type</CFormLabel>
                    <CFormInput
                      name="vType"
                      size="sm"
                      id="vType"
                      value={currentVehicleInfo.vehicle_type_id.type}
                      placeholder=""
                      readOnly
                    />
                  </CCol>

                  <CCol md={3}>
                    <CFormLabel htmlFor="vNum">Vehicle Number</CFormLabel>
                    <CFormInput
                      name="vNum"
                      size="sm"
                      id="vNum"
                      value={currentVehicleInfo.vehicle_number}
                      placeholder=""
                      readOnly
                    />
                  </CCol>

                  <CCol xs={12} md={3}>
                    <CFormLabel htmlFor="vCap">Vehicle Capacity In MTS</CFormLabel>
                    <CFormInput
                      name="vCap"
                      size="sm"
                      id="vCap"
                      value={currentVehicleInfo.vehicle_capacity_id.capacity + '-TON'}
                      placeholder="10"
                      readOnly
                    />
                  </CCol>

                  <CCol xs={12} md={3}>
                    <CFormLabel htmlFor="driverId">
                      Driver Name*{' '}
                      {errors.driverId && (
                        <span className="small text-danger">{errors.driverId}</span>
                      )}
                    </CFormLabel>

                    {currentVehicleInfo.vehicle_type_id.id == VEHICLE_TYPE.OWN ||
                    currentVehicleInfo.vehicle_type_id.id == VEHICLE_TYPE.CONTRACT ? (
                      changeDriver ? (
                        <CFormSelect
                          size="sm"
                          name="driverId"
                          id="driverId"
                          onFocus={onFocus}
                          onBlur={onBlur}
                          onChange={handleChange}
                          value={values.driverId}
                          label={'Small select example'}
                        >
                          <DriverListSelectComponent />
                        </CFormSelect>
                      ) : (
                        <>
                          <CFormInput
                            name="driverId"
                            size="sm"
                            id="driverId"
                            value={currentVehicleInfo.driver_name}
                            placeholder="10"
                            readOnly
                          />
                        </>
                      )
                    ) : (
                      <CFormInput
                        name="driverId"
                        size="sm"
                        id="driverId"
                        value={currentVehicleInfo.driver_name}
                        placeholder="10"
                        readOnly
                      />
                    )}
                  </CCol>
                </CRow>
                <CRow className="">
                  <CCol xs={12} md={3}>
                    <CFormLabel htmlFor="dMob">Driver Contact Number</CFormLabel>
                    <CFormInput
                      name="dMob"
                      size="sm"
                      id="dMob"
                      value={currentVehicleInfo.driver_contact_number}
                      readOnly
                    />
                  </CCol>
                  {currentVehicleInfo.vehicle_type_id.id == VEHICLE_TYPE.OWN ||
                  currentVehicleInfo.vehicle_type_id.id == VEHICLE_TYPE.CONTRACT ? (
                    <>
                      <CCol xs={12} md={3}>
                        <CFormLabel htmlFor="OdometerKM">Odometer KM</CFormLabel>
                        <CFormInput
                          name="OdometerKM"
                          size="sm"
                          id="OdometerKM"
                          value={currentVehicleInfo.odometer_km}
                          readOnly
                        />
                      </CCol>
                      <CCol xs={12} md={3}>
                        <CFormLabel htmlFor="odoImg">Odometer Photo</CFormLabel>
                        <CButton
                          onClick={() => setVisible(!visible)}
                          className="w-100 m-0"
                          color="info"
                          size="sm"
                          id="odoImg"
                          style={border}
                        >
                          <span className="float-start">
                            <i className="fa fa-eye" aria-hidden="true"></i> &nbsp;View
                          </span>
                        </CButton>
                        <CModal visible={visible} onClose={() => setVisible(false)}>
                          <CModalHeader>
                            <CModalTitle>Odometer Photo</CModalTitle>
                          </CModalHeader>

                          <CModalBody>
                            <img src={currentVehicleInfo.odometer_photo} alt="" />
                          </CModalBody>

                          <CModalFooter>
                            <CButton color="secondary" onClick={() => setVisible(false)}>
                              Close
                            </CButton>
                          </CModalFooter>
                        </CModal>
                      </CCol>
                    </>
                  ) : (
                    <></>
                  )}
                  <CCol xs={12} md={3}>
                    <CFormLabel htmlFor="gateInDateTime">Gate-In Date & Time*</CFormLabel>
                    <CFormInput
                      name="gateInDateTime"
                      size="sm"
                      id="gateInDateTime"
                      value={currentVehicleInfo.gate_in_date_time_string}
                      readOnly
                    />
                  </CCol>
                </CRow>
                <CRow className="">
                  <CCol xs={12} md={3}>
                    <CFormLabel htmlFor="truckClean">Truck Clean *</CFormLabel>
                    <br />
                    <CButtonGroup role="group" aria-label="Basic checkbox toggle button group">
                      <CFormCheck
                        type="radio"
                        button={{ color: 'primary', variant: 'outline' }}
                        name="truck_clean"
                        id="btnradio1"
                        onChange={handleChange}
                        autoComplete="off"
                        value="1"
                        label="Yes"
                      />
                      <CFormCheck
                        type="radio"
                        button={{ color: 'primary', variant: 'outline' }}
                        name="truck_clean"
                        id="btnradio2"
                        autoComplete="off"
                        onChange={handleChange}
                        value="0"
                        label="No"
                      />
                    </CButtonGroup>
                  </CCol>
                  <CCol xs={12} md={3}>
                    <CFormLabel htmlFor="bad_smell">Bad Smell *</CFormLabel>
                    <br />
                    <CButtonGroup role="group" aria-label="Basic checkbox toggle button group">
                      <CFormCheck
                        type="radio"
                        button={{ color: 'primary', variant: 'outline' }}
                        name="bad_smell"
                        id="btnradio3"
                        autoComplete="off"
                        onChange={handleChange}
                        value="1"
                        label="Yes"
                      />
                      <CFormCheck
                        type="radio"
                        button={{ color: 'primary', variant: 'outline' }}
                        name="bad_smell"
                        id="btnradio4"
                        autoComplete="off"
                        value="0"
                        onChange={handleChange}
                        label="No"
                      />
                    </CButtonGroup>
                  </CCol>
                  <CCol xs={12} md={3}>
                    <CFormLabel htmlFor="insect_vevils_presence">
                      Insect or Vevils Presence *
                    </CFormLabel>
                    <br />
                    <CButtonGroup role="group" aria-label="Basic checkbox toggle button group">
                      <CFormCheck
                        type="radio"
                        button={{ color: 'primary', variant: 'outline' }}
                        name="insect_vevils_presence"
                        id="btnradio5"
                        autoComplete="off"
                        label="Yes"
                        value="1"
                        onChange={handleChange}
                      />
                      <CFormCheck
                        type="radio"
                        button={{ color: 'primary', variant: 'outline' }}
                        name="insect_vevils_presence"
                        id="btnradio6"
                        autoComplete="off"
                        label="No"
                        value="0"
                        onChange={handleChange}
                      />
                    </CButtonGroup>
                  </CCol>
                  <CCol xs={12} md={3}>
                    <CFormLabel htmlFor="tarpaulin_srf">Tarpaulin – SRF</CFormLabel>
                    <br />
                    <CButtonGroup role="group" aria-label="Basic checkbox toggle button group">
                      <CFormCheck
                        type="radio"
                        button={{ color: 'primary', variant: 'outline' }}
                        name="tarpaulin_srf"
                        id="btnradio7"
                        autoComplete="off"
                        label="0"
                        value="0"
                        onChange={handleChange}
                      />
                      <CFormCheck
                        type="radio"
                        button={{ color: 'primary', variant: 'outline' }}
                        name="tarpaulin_srf"
                        id="btnradio8"
                        autoComplete="off"
                        label="1"
                        value="1"
                        onChange={handleChange}
                      />
                      <CFormCheck
                        type="radio"
                        button={{ color: 'primary', variant: 'outline' }}
                        name="tarpaulin_srf"
                        id="btnradio9"
                        autoComplete="off"
                        value="2"
                        label="2"
                        onChange={handleChange}
                      />
                    </CButtonGroup>
                  </CCol>
                </CRow>
                <CRow className="">
                  <CCol xs={12} md={3}>
                    <CFormLabel htmlFor="tarpaulin_non_srf">Tarpaulin Non-SRF*</CFormLabel>
                    <br />
                    <CButtonGroup role="group" aria-label="Basic checkbox toggle button group">
                      <CFormCheck
                        type="radio"
                        button={{ color: 'primary', variant: 'outline' }}
                        name="tarpaulin_non_srf"
                        id="btnradio10"
                        autoComplete="off"
                        label="0"
                        value="0"
                        onChange={handleChange}
                      />
                      <CFormCheck
                        type="radio"
                        button={{ color: 'primary', variant: 'outline' }}
                        name="tarpaulin_non_srf"
                        id="btnradio11"
                        autoComplete="off"
                        label="1"
                        onChange={handleChange}
                        value="1"
                      />
                      <CFormCheck
                        type="radio"
                        button={{ color: 'primary', variant: 'outline' }}
                        name="tarpaulin_non_srf"
                        id="btnradio12"
                        autoComplete="off"
                        label="2"
                        value="2"
                        onChange={handleChange}
                      />
                    </CButtonGroup>
                  </CCol>
                  <CCol xs={12} md={3}>
                    <CFormLabel htmlFor="insect_vevils_presence_in_tar">
                      Insect or Vevils Presence (Tar.) *
                    </CFormLabel>
                    <br />
                    <CButtonGroup role="group" aria-label="Basic checkbox toggle button group">
                      <CFormCheck
                        type="radio"
                        button={{ color: 'primary', variant: 'outline' }}
                        name="insect_vevils_presence_in_tar"
                        id="btnradio13"
                        autoComplete="off"
                        label="Yes"
                        onChange={handleChange}
                        value="1"
                      />
                      <CFormCheck
                        type="radio"
                        button={{ color: 'primary', variant: 'outline' }}
                        name="insect_vevils_presence_in_tar"
                        id="btnradio14"
                        autoComplete="off"
                        label="No"
                        value="0"
                        onChange={handleChange}
                      />
                    </CButtonGroup>
                  </CCol>
                  <CCol xs={12} md={3}>
                    <CFormLabel htmlFor="truck_platform">Truck Platform *</CFormLabel>
                    <br />
                    <CButtonGroup role="group" aria-label="Basic checkbox toggle button group">
                      <CFormCheck
                        type="radio"
                        button={{ color: 'primary', variant: 'outline' }}
                        name="truck_platform"
                        id="btnradio15"
                        autoComplete="off"
                        label="Good"
                        onChange={handleChange}
                        value="1"
                      />
                      <CFormCheck
                        type="radio"
                        button={{ color: 'primary', variant: 'outline' }}
                        name="truck_platform"
                        id="btnradio16"
                        onChange={handleChange}
                        autoComplete="off"
                        label="Bad"
                        value="0"
                      />
                    </CButtonGroup>
                  </CCol>
                  <CCol xs={12} md={3}>
                    <CFormLabel htmlFor="previous_load_details">
                      Previous Load Details *
                      {errors.previous_load_details && (
                        <span className="small text-danger">{errors.previous_load_details}</span>
                      )}
                    </CFormLabel>
                    <CFormSelect
                      size="sm"
                      name="previous_load_details"
                      id="previous_load_details"
                      onFocus={onFocus}
                      onBlur={onBlur}
                      onChange={handleChange}
                      value={values.previous_load_details}
                      label={'Small select example'}
                    >
                      <PerviousLoadDetailComponent />
                    </CFormSelect>
                  </CCol>
                  <CCol xs={12} md={3}>
                    <CFormLabel htmlFor="vFitLoad">
                      Vehicle Fit For Loading *
                      {errors.vFitLoad && (
                        <span className="small text-danger">{errors.vFitLoad}</span>
                      )}
                    </CFormLabel>
                    <CFormInput
                      name="vFitLoad"
                      size="sm"
                      id="vFitLoad"
                      onFocus={onFocus}
                      onBlur={onBlur}
                      onChange={handleChange}
                      value={fitForLoad}
                      readOnly
                    />
                  </CCol>
                  <CCol xs={12} md={3}>
                    <CFormLabel htmlFor="remarks">Remarks</CFormLabel>
                    <CFormTextarea
                      id="remarks"
                      onFocus={onFocus}
                      onBlur={onBlur}
                      onChange={handleChange}
                      value={values.remarks}
                      name="remarks"
                      rows="1"
                    >
                      {values.remarks}
                    </CFormTextarea>
                  </CCol>
                </CRow>
                <CRow className="mt-2">
                  <CCol>
                    <Link to={'/vInspection'}>
                      <CButton
                        md={9}
                        size="sm"
                        color="primary"
                        disabled=""
                        className="text-white"
                        type="button"
                      >
                        Previous
                      </CButton>
                    </Link>
                  </CCol>

                  <CCol
                    className="pull-right"
                    xs={12}
                    sm={12}
                    md={3}
                    style={{ display: 'flex', justifyContent: 'flex-end' }}
                  >
                    <CButton
                      size="sm"
                      color="warning"
                      className="mx-1 px-2 text-white"
                      type="button"
                      disabled={acceptBtn}
                      onClick={() => addVehicleInspection(1)}
                    >
                      Accept
                    </CButton>

                    {currentVehicleInfo.vehicle_type_id.id == VEHICLE_TYPE.HIRE ||
                    currentVehicleInfo.vehicle_type_id.id == VEHICLE_TYPE.PARTY ? (
                      <CButton
                        size="sm"
                        color="warning"
                        className="mx-1 px-2 text-white"
                        type="button"
                        disabled={rejectBtn}
                        onClick={() => addVehicleInspection(0)}
                      >
                        Reject
                      </CButton>
                    ) : (
                      <></>
                    )}

                    {(!changeDriver && currentVehicleInfo.vehicle_type_id.id == VEHICLE_TYPE.OWN) ||
                    currentVehicleInfo.vehicle_type_id.id == VEHICLE_TYPE.CONTRACT ? (
                      <CButton
                        size="sm"
                        color="warning"
                        className="mx-1 px-2 text-white"
                        type="button"
                        onClick={() => {
                          setOldDriver(currentVehicleInfo.driver_id)
                          setChangeDriver(true)
                        }}
                      >
                        Assign Driver
                      </CButton>
                    ) : (
                      <></>
                    )}
                  </CCol>
                </CRow>
              </CForm>
            </CTabPane>
          </CTabContent>
        </CCard>
      )}
    </>
  )
}

export default VehicleInspection
