import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardImage,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
  CFormTextarea,
  CFormSelect,
} from '@coreui/react'
import useForm from 'src/Hooks/useForm'
import { Link, useNavigate, useParams } from 'react-router-dom'
import TripSheetCreationValidation from 'src/Utils/TripSheetCreation/TripSheetCreationValidation'
import TripSheetCreationOwn from './segments/OwnAndContract/TripSheetCreationOwn'
import TripSheetCreationHire from './segments/Hire/TripSheetCreationHire'
import { useEffect } from 'react'
import TripSheetCreationService from 'src/Service/TripSheetCreation/TripSheetCreationService'
import { Object } from 'core-js'
import OwnAndContractCreateTripSheetRequest from './Requests/OwnAndContractCreateTripSheetRequest'
import HireCreateTripSheetRequest from './Requests/HireCreateTripSheetRequest'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const TripSheetCreation = () => {
  const formValues = {
    vehicle_id: '',
    vehicle_type_id: '',
    driver_id: '',
    division_id: '',
    trip_advance_eligiblity: '',
    advance_amount: '',
    purpose: '',
    Vehicle_Sourced_by: '',
    expected_date_time: '',
    expected_return_date_time: '',
    freight_rate_per_tone: '',
    advance_payment_diesel: '',
    remarks: '',
    driveMobile: '',
  }

  const { id } = useParams()

  const [singleVehicleInfo, setSingleVehicleInfo] = useState(false)
  const [dirverAssign, setDirverAssign] = useState(true)

  const [validateSubmit, setValidateSubmit] = useState(true)
  const navigation = useNavigate()
  const vehicleType = {
    OWN: 1,
    CONTRACT: 2,
    HIRE: 3,
  }

  useEffect(() => {
    TripSheetCreationService.getSingleVehicleInfoOnGate(id).then((res) => {
      if (res.status === 200) {
        isTouched.vehicle_id = true
        isTouched.driver_id = true
        isTouched.vehicle_type_id = true
        values.vehicle_type_id = res.data.data.vehicle_type_id.id
        values.vehicle_id = res.data.data.vehicle_id
        values.driver_id =
          res.data.data.driver_info != null ? res.data.data.driver_info.driver_id : ''
        values.driveMobile =
          res.data.data.driver_info != null ? res.data.data.driver_info.driver_phone_1 : ''
        setSingleVehicleInfo(res.data.data)
      }
    })
  }, [])

  const { values, errors, handleChange, onFocus, handleSubmit, enableSubmit, onBlur, isTouched } =
    useForm(createTripSheet, TripSheetCreationValidation, formValues)

  function createTripSheet() {
    let data = []

    if (
      values.vehicle_type_id === vehicleType.OWN ||
      values.vehicle_type_id === vehicleType.CONTRACT
    ) {
      data = OwnAndContractCreateTripSheetRequest(values)
    } else {
      data = HireCreateTripSheetRequest(values)
    }
    TripSheetCreationService.createTripSheet(data).then((res) => {
      if (res.status === 200) {
        toast.success('TripSheet Created')
        navigation('/TripSheetCreation')
      }
    })
  }

  useEffect(() => {
    if (
      Object.keys(errors).length === 0 &&
      Object.keys(isTouched).length === Object.keys(formValues).length
    ) {
      setValidateSubmit(false)
    } else {
      setValidateSubmit(true)
    }
  })

  return (
    <CCard>
      {singleVehicleInfo && (
        <CForm className="container p-3" onSubmit={handleSubmit}>
          {singleVehicleInfo.vehicle_type_id.id === vehicleType.OWN ||
          singleVehicleInfo.vehicle_type_id.id === vehicleType.CONTRACT ? (
            <TripSheetCreationOwn
              values={values}
              errors={errors}
              handleChange={handleChange}
              onFocus={onFocus}
              onBlur={onBlur}
              singleVehicleInfo={singleVehicleInfo}
              isTouched={isTouched}
              dirverAssign={dirverAssign}
              setDirverAssign={setDirverAssign}
            />
          ) : (
            <TripSheetCreationHire
              values={values}
              errors={errors}
              handleChange={handleChange}
              onFocus={onFocus}
              onBlur={onBlur}
              singleVehicleInfo={singleVehicleInfo}
              isTouched={isTouched}
            />
          )}
          <CRow>
            <CCol xs={12} md={3}>
              <CFormLabel htmlFor="remarks">Remarks</CFormLabel>
              <CFormTextarea
                id="remarks"
                name="remarks"
                onFocus={onFocus}
                onBlur={onBlur}
                onChange={handleChange}
                value={values.remarks}
                rows="1"
              >
                {values.remarks}
              </CFormTextarea>
            </CCol>
          </CRow>
          <CRow className="mt-md-3">
            <CCol className="" xs={12} sm={12} md={3}>
              <CButton size="sm" color="primary" className="text-white" type="button">
                <Link className="text-white" to="/TripSheetCreation">
                  Previous
                </Link>
              </CButton>
            </CCol>
            <CCol
              className="offset-md-6"
              xs={12}
              sm={12}
              md={3}
              style={{ display: 'flex', justifyContent: 'end' }}
            >
              <CButton
                size="sm"
                color="warning"
                disabled={validateSubmit}
                className="mx-3 px-3 text-white"
                type="submit"
              >
                Create
              </CButton>
              {values.vehicle_type_id < 3 && (
                <CButton
                  size="sm"
                  color="warning"
                  onClick={() => setDirverAssign(!dirverAssign)}
                  className="mx-3 px-3 text-white"
                  type="button"
                >
                  Change Driver
                </CButton>
              )}
            </CCol>
          </CRow>
        </CForm>
      )}
    </CCard>
  )
}

export default TripSheetCreation
