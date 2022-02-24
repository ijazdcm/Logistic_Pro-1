/* eslint-disable prettier/prettier */
import {
  CButton,
  CCard,
  CCardBody,
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
  CFormTextarea,
} from '@coreui/react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { React, useState, useEffect } from 'react'
import useForm from 'src/Hooks/useForm'
import ParkingYardGateValidation from 'src/Utils/TransactionPages/ParkingYardGate/ParkingYardGateValidation'
import CustomTable from '../../components/customComponent/CustomTable'
import ParkingYardGateService from 'src/Service/ParkingYardGate/ParkingYardGateService'
import VehicleTypeService from 'src/Service/SmallMaster/Vehicles/VehicleTypeService'
import OwnAndContractSection from './FormSection/OwnAndContractSection'
import HireSection from './FormSection/HireSection'
import PartySection from './FormSection/PartySection'
import { Link, useNavigate } from 'react-router-dom'

const ParkingYardGate = () => {
  const [rowData, setRowData] = useState([])
  let tableData = []

  const [vehicleType, setVehicleType] = useState([])

  const ACTION = {
    GATE_IN: 1,
    GATE_OUT: 2,
    WAIT_OUTSIDE: 3,
  }

  const formValues = {
    vehicleType: '',
    vehicleId: '',
    vehicleNumber: '',
    vehicleCapacity: '',
    driverId: '',
    driverName: '',
    driverPhoneNumber: '',
    odometerKm: '',
    odometerImg: '',
    partyName: '',
    vehicleBody: '',
    remarks: '',
  }

  const resetFormValues = () => {
    values.vehicleType = ''
    values.vehicleId = ''
    values.vehicleNumber = ''
    values.vehicleCapacity = ''
    values.driverId = ''
    values.driverName = ''
    values.driverPhoneNumber = ''
    values.odometerKm = ''
    values.odometerImg = ''
    values.partyName = ''
    values.vehicleBody = ''
    values.remarks = ''
  }

  const resetIsTouched = () => {
    isTouched.vehicleType = false
    isTouched.vehicleId = false
    isTouched.vehicleNumber = false
    isTouched.vehicleCapacity = false
    isTouched.driverId = false
    isTouched.driverName = false
    isTouched.driverPhoneNumber = false
    isTouched.odometerKm = false
    isTouched.odometerImg = false
    isTouched.partyName = false
    isTouched.vehicleBody = false
    isTouched.remarks = false
  }

  let navigation = useNavigate()

  const {
    values,
    errors,
    handleChange,
    onFocus,
    enableSubmit,
    onBlur,
    isTouched,
    setIsTouched,
    setErrors,
  } = useForm(action, ParkingYardGateValidation, formValues)

  function action(type) {
    const formData = new FormData()
    formData.append('vehicle_type_id', values.vehicleType)
    formData.append('vehicle_id', values.vehicleId)
    formData.append('driver_id', values.driverId)
    formData.append('odometer_km', values.odometerKm)
    if (values.odometerImg !== '') {
      formData.append('odometer_photo', values.odometerImg)
    }
    formData.append('vehicle_number', values.vehicleNumber)
    formData.append('vehicle_capacity_id', values.vehicleCapacity)
    formData.append('driver_name', values.driverName)
    formData.append('driver_contact_number', values.driverPhoneNumber)
    formData.append('vehicle_body_type_id', values.vehicleBody)
    formData.append('party_name', values.partyName)
    formData.append('remarks', values.remarks)
    formData.append('action_type', type)

    ParkingYardGateService.handleParkingYardGateAction(formData).then((res) => {
      if (res.status === 200) {
        toast.success('process done!')
        //reseting the fromValues
        resetFormValues()
        loadParkingYardGateTable()
        setIsTouched({})
        setErrors({})
      } else {
        toast.danger('something went wrong!')
      }
    })
  }

  const gateInAction = (vehicleId) => {
    ParkingYardGateService.actionWaitingOutsideToGateIn(vehicleId).then((res) => {
      if (res.status === 201) {
        toast.success('Vehicle Gate In Process Completed')
        loadParkingYardGateTable()
      }
    })
  }

  const gateOutAction = (vehicleId) => {
    ParkingYardGateService.actionGateOut(vehicleId).then((res) => {
      if (res.status === 201) {
        toast.success('Vehicle Gate Out Process Completed')
        loadParkingYardGateTable()
      }
    })
  }

  const loadParkingYardGateTable = () => {
    ParkingYardGateService.getParkingYardGateTrucks().then((res) => {
      tableData = res.data.data
      let rowDataList = []
      tableData.map((data, index) => {
        rowDataList.push({
          sno: index + 1,
          Tripsheet_No: '',
          Vehicle_Type: data.vehicle_type_id.type,
          Vehicle_No: data.vehicle_number,
          Driver_Name: data.driver_name,
          Waiting_At: (
            <span className="badge rounded-pill bg-info">
              {data.parking_status == ACTION.GATE_IN
                ? 'Vehicle Inspection'
                : data.parking_status == ACTION.WAIT_OUTSIDE
                ? 'Waiting Outside'
                : 'Gate Out'}
            </span>
          ),
          Screen_Duration: data.updated_at,
          Overall_Duration: data.created_at,
          Action:
            data.parking_status == ACTION.GATE_IN ? (
              <CButton className="badge text-white" color="warning" type="button">
                Vehicle Inspection
              </CButton>
            ) : data.parking_status == ACTION.WAIT_OUTSIDE ? (
              <CButton
                type="button"
                onClick={(e) => gateInAction(data.parking_yard_gate_id)}
                className="badge text-white"
                color="warning"
              >
                Gate IN
              </CButton>
            ) : (
              <>
                {' '}
                <CButton
                  type="button"
                  onClick={(e) => gateOutAction(data.parking_yard_gate_id)}
                  className="badge text-white"
                  color="warning"
                >
                  Gate Out
                </CButton>
              </>
            ),
        })
      })
      setRowData(rowDataList)
    })
  }

  useEffect(() => {
    isTouched.remarks = true
    //section for getting vehicle type from database
    VehicleTypeService.getVehicleTypes().then((res) => {
      setVehicleType(res.data.data)
    })

    loadParkingYardGateTable()
  }, [])

  const columns = [
    {
      name: 'S.No',
      selector: (row) => row.sno,
      sortable: true,
      center: true,
    },
    {
      name: 'Tripsheet No',
      selector: (row) => row.Tripsheet_No,
      sortable: true,
      center: true,
    },
    {
      name: 'Vehicle Type',
      selector: (row) => row.Vehicle_Type,
      sortable: true,
      center: true,
    },
    {
      name: 'Vehicle No',
      selector: (row) => row.Vehicle_No,
      sortable: true,
      center: true,
    },
    {
      name: 'Driver Name',
      selector: (row) => row.Driver_Name,
      sortable: true,
      center: true,
    },
    {
      name: 'Waiting At',
      selector: (row) => row.Waiting_At,
      sortable: true,
      center: true,
    },
    {
      name: 'Screen Duration',
      selector: (row) => row.Screen_Duration,
      center: true,
    },
    {
      name: ' Overall Duration',
      selector: (row) => row.Overall_Duration,
      center: true,
    },
    {
      name: 'Action',
      selector: (row) => row.Action,
      center: true,
    },
  ]

  return (
    <>
      <CContainer>
        <CCard>
          <CForm className="container p-3">
            <CRow className="">
              <CCol md={3}>
                <CFormLabel htmlFor="vehicleType">
                  Vehicle Type*{' '}
                  {errors.vehicleType && (
                    <span className="small text-danger">{errors.vehicleType}</span>
                  )}
                </CFormLabel>
                <CFormSelect
                  size="sm"
                  name="vehicleType"
                  id="vehicleType"
                  onFocus={onFocus}
                  onBlur={onBlur}
                  onChange={handleChange}
                  value={values.vehicleType}
                  className={`${errors.vehicleType && 'is-invalid'}`}
                  aria-label="Small select example"
                >
                  <option value="0">Select ...</option>
                  {vehicleType.map(({ id, type }) => {
                    return (
                      <>
                        <option key={id} value={id}>
                          {type}
                        </option>
                      </>
                    )
                  })}
                </CFormSelect>
              </CCol>
              {(values.vehicleType == 2 || values.vehicleType == 1) && (
                <OwnAndContractSection
                  errors={errors}
                  onBlur={onBlur}
                  onFocus={onFocus}
                  handleChange={handleChange}
                  values={values}
                  isTouched={isTouched}
                  setIsTouched={setIsTouched}
                  setErrors={setErrors}
                />
              )}
              {values.vehicleType == 3 && (
                <HireSection
                  errors={errors}
                  onFocus={onFocus}
                  onBlur={onBlur}
                  handleChange={handleChange}
                  values={values}
                  isTouched={isTouched}
                  setIsTouched={setIsTouched}
                  setErrors={setErrors}
                />
              )}
              {values.vehicleType == 4 && (
                <PartySection
                  errors={errors}
                  onFocus={onFocus}
                  onBlur={onBlur}
                  handleChange={handleChange}
                  values={values}
                  isTouched={isTouched}
                  setIsTouched={setIsTouched}
                  setErrors={setErrors}
                />
              )}
              <CCol xs={12} md={3}>
                <CFormLabel htmlFor="remarks">Remarks</CFormLabel>
                <CFormTextarea
                  name="remarks"
                  id="remarks"
                  maxLength={40}
                  onBlur={onBlur}
                  onChange={handleChange}
                  value={values.remarks}
                  rows="1"
                >
                  {values.remarks}
                </CFormTextarea>
              </CCol>
            </CRow>
            <CRow className="mt-1">
              <CCol
                className="d-md-flex justify-content-end"
                xs={12}
                sm={12}
                md={12}
                // style={{ display: 'flex', justifyContent: 'flex-end' }}
              >
                <CButton
                  size="sm"
                  color="warning"
                  disabled={enableSubmit}
                  onClick={(e) => {
                    e.preventDefault()
                    action(ACTION.WAIT_OUTSIDE)
                  }}
                  className="mx-1 text-white"
                  type="submit"
                >
                  Wait OutSide
                </CButton>
                <CButton
                  size="sm"
                  disabled={enableSubmit}
                  onClick={(e) => {
                    e.preventDefault()
                    action(ACTION.GATE_IN)
                  }}
                  color="warning"
                  className="mx-1 text-white"
                  type="button"
                >
                  Gate In
                </CButton>
              </CCol>
            </CRow>
          </CForm>
        </CCard>
        <CCard className="mt-3">
          <CContainer className="mt-2">
            <CustomTable
              columns={columns}
              data={rowData}
              fieldName={'Driver_Name'}
              showSearchFilter={true}
            />
          </CContainer>
        </CCard>
      </CContainer>
    </>
  )
}
export default ParkingYardGate
