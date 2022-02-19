import {
  CButton,
  CCardImage,
  CCol,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CFormTextarea,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
} from '@coreui/react'
import React, { useState } from 'react'
import { useEffect } from 'react'
import AllDriverListSelectComponent from 'src/components/commoncomponent/AllDriverListSelectComponent'
import DivisonListComponent from 'src/components/commoncomponent/DivisonListComponent'
import DriverMasterService from '../../../../Service/Master/DriverMasterService'

const TripSheetCreationOwn = ({
  values,
  errors,
  handleChange,
  onFocus,
  handleSubmit,
  enableSubmit,
  onBlur,
  singleVehicleInfo,
  isTouched,
  setDirverAssign,
  dirverAssign
}) => {
  const [OdometerPhoto, setOdometerPhoto] = useState(false)

   console.log(values);

  useEffect(() => {
    isTouched.freight_rate_per_tone = true
    isTouched.advance_payment_bank = true
    isTouched.advance_payment_diesel = true
    isTouched.driveMobile = true
  }, [])

  useEffect(() => {
    DriverMasterService.getDriversById(values.driver_id).then((res) => {
      if (res.status === 200) {
        values.driveMobile = res.data.data.driver_phone_1
      }
    })
  }, [values.driver_id])

  return (
    <>
      <CRow className="">
        <CCol xs={12} md={3}>
          <CFormLabel htmlFor="vType">Vehicle Type</CFormLabel>
          <CFormInput
            size="sm"
            id="vType"
            value={singleVehicleInfo.vehicle_type_id.type}
            readOnly
          />
        </CCol>
        <CCol xs={12} md={3}>
          <CFormLabel htmlFor="vNum">Vehicle Number</CFormLabel>
          <CFormInput size="sm" id="vNum" value={singleVehicleInfo.vehicle_number} readOnly />
        </CCol>
        <CCol xs={12} md={3}>
          <CFormLabel htmlFor="vCap">Vehicle Capacity</CFormLabel>
          <CFormInput
            size="sm"
            id="vCap"
            value={singleVehicleInfo.vehicle_capacity_id.capacity + '-TON'}
            readOnly
          />
        </CCol>
        <CCol xs={12} md={3}>
          <CFormLabel htmlFor="driver_id">
            Driver Name*
            {errors.driver_id && <span className="small text-danger">{errors.driver_id}</span>}
          </CFormLabel>

          {dirverAssign?<CFormInput
            size="sm"
            id="driverName"
            value={singleVehicleInfo.driver_info.driver_name}
            readOnly
          />:<CFormSelect
          size="sm"
          name="driver_id"
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={handleChange}
          value={values.driver_id}
          className={`${errors.driver_id && 'is-invalid'}`}
          aria-label="Small select example"
        >
          <AllDriverListSelectComponent  />
        </CFormSelect>}

        </CCol>
      </CRow>
      <CRow>
        <CCol xs={12} md={3}>
          <CFormLabel htmlFor="driveMobile">
            Driver Mobile Number
            {errors.driveMobile && <span className="small text-danger">{errors.driveMobile}</span>}
          </CFormLabel>
          <CFormInput size="sm" id="driveMobile" value={values.driveMobile} readOnly />
        </CCol>
        <CCol xs={12} md={3}>
          <CFormLabel htmlFor="OdometerKM">Odometer KM</CFormLabel>
          <CFormInput size="sm" id="OdometerKM" value={singleVehicleInfo.odometer_km} readOnly />
        </CCol>
        <CCol xs={12} md={3}>
          <CFormLabel htmlFor="odoImg">
            Odometer Photo
            {errors.vehicleType && <span className="small text-danger">{errors.vehicleType}</span>}
          </CFormLabel>

          <CButton
            onClick={() => setOdometerPhoto(!OdometerPhoto)}
            className="w-100 m-0"
            color="info"
            size="sm"
            id="odoImg"
          >
            <span className="float-start">
              <i className="fa fa-eye" aria-hidden="true"></i> &nbsp;View
            </span>
          </CButton>
          <CModal visible={OdometerPhoto} onClose={() => setOdometerPhoto(false)}>
            <CModalHeader>
              <CModalTitle>Odometer Photo</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <CCardImage orientation="top" src={singleVehicleInfo.odometer_photo} />
            </CModalBody>
            <CModalFooter>
              <CButton color="secondary" onClick={() => setOdometerPhoto(false)}>
                Close
              </CButton>
            </CModalFooter>
          </CModal>
        </CCol>
        <CCol xs={12} md={3}>
          <CFormLabel htmlFor="gateInDateTime">Gate-In Date & Time</CFormLabel>
          <CFormInput
            size="sm"
            id="gateInDateTime"
            type="text"
            value={singleVehicleInfo.gate_in_date_time_string}
            readOnly
          />
        </CCol>
      </CRow>
      <CRow>
        <CCol xs={12} md={3}>
          <CFormLabel htmlFor="inspectionDateTime">Inspection Date & Time</CFormLabel>
          <CFormInput
            size="sm"
            id="inspectionDateTime"
            type="text"
            value={singleVehicleInfo.vehicle_inspection_trip.inspection_time_string}
            readOnly
          />
        </CCol>
        <CCol xs={12} md={3}>
          <CFormLabel htmlFor="division_id">
            Division
            {errors.division_id && <span className="small text-danger">{errors.division_id}</span>}
          </CFormLabel>
          <CFormSelect
            size="sm"
            name="division_id"
            onFocus={onFocus}
            onBlur={onBlur}
            onChange={handleChange}
            value={values.division_id}
            className={`${errors.division_id && 'is-invalid'}`}
            aria-label="Small select example"
            id="division_id"
          >
            <DivisonListComponent />
          </CFormSelect>
        </CCol>
        <CCol xs={12} md={3}>
          <CFormLabel htmlFor="trip_advance_eligiblity">
            Trip Advance Eligibility*
            {errors.trip_advance_eligiblity && (
              <span className="small text-danger">{errors.trip_advance_eligiblity}</span>
            )}
          </CFormLabel>
          <CFormSelect
            size="sm"
            name="trip_advance_eligiblity"
            onFocus={onFocus}
            onBlur={onBlur}
            onChange={handleChange}
            value={values.trip_advance_eligiblity}
            className={`${errors.trip_advance_eligiblity && 'is-invalid'}`}
            aria-label="Small select example"
            id="trip_advance_eligiblity"
          >
            <option value="">Select...</option>
            <option value="1">Yes</option>
            <option value="0">No</option>
          </CFormSelect>
        </CCol>
        {values.trip_advance_eligiblity == 1 ? (
          <CCol xs={12} md={3}>
            <CFormLabel htmlFor="advance_amount">
              Advance Amount
              {errors.advance_amount && (
                <span className="small text-danger">{errors.advance_amount}</span>
              )}
            </CFormLabel>
            <CFormInput size="sm" name="advance_amount" onFocus={onFocus}
            onBlur={onBlur}
            onChange={handleChange} value={values.advance_amount} id="advance_amount" type="text" />
          </CCol>
        ) : (
          <></>
        )}
      </CRow>
      <CRow>
        <CCol xs={12} md={3}>
          <CFormLabel htmlFor="purpose">
            Purpose
            {errors.purpose && <span className="small text-danger">{errors.purpose}</span>}
          </CFormLabel>
          <CFormSelect
            size="sm"
            name="purpose"
            id="purpose"
            onFocus={onFocus}
            onBlur={onBlur}
            onChange={handleChange}
            value={values.purpose}
            className={`${errors.purpose && 'is-invalid'}`}
            aria-label="Small select example"
          >
            <option hidden>Select...</option>
            <option value="1">FG Sales</option>
            <option value="2">Others</option>
          </CFormSelect>
        </CCol>
        <CCol xs={12} md={3}>
          <CFormLabel htmlFor="expected_date_time">
            Expected Delivery Date *
            {errors.expected_date_time && (
              <span className="small text-danger">{errors.expected_date_time}</span>
            )}
          </CFormLabel>
          <CFormInput
            size="sm"
            type="date"
            name="expected_date_time"
            id="expected_date_time"
            onFocus={onFocus}
            onBlur={onBlur}
            onChange={handleChange}
            value={values.expected_date_time}
          />
        </CCol>
        <CCol xs={12} md={3}>
          <CFormLabel htmlFor="expected_return_date_time">
            Expected Return Date *
            {errors.expected_return_date_time && (
              <span className="small text-danger">{errors.expected_return_date_time}</span>
            )}
          </CFormLabel>
          <CFormInput
            size="sm"
            type="date"
            id="expected_return_date_time"
            name="expected_return_date_time"
            onFocus={onFocus}
            onBlur={onBlur}
            onChange={handleChange}
            value={values.expected_return_date_time}
          />
        </CCol>
      </CRow>

    </>
  )
}

export default TripSheetCreationOwn
