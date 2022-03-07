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
  dirverAssign,
  Purpose,
  SourcedBy,
  DivisonList
}) => {
  const [OdometerPhoto, setOdometerPhoto] = useState(false)




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

          {dirverAssign ? (
            <CFormInput
              size="sm"
              id="driverName"
              value={singleVehicleInfo.driver_info.driver_name}
              readOnly
            />
          ) : (
            <CFormSelect
              size="sm"
              name="driver_id"
              onFocus={onFocus}
              onBlur={onBlur}
              onChange={handleChange}
              value={values.driver_id}
              className={`${errors.driver_id && 'is-invalid'}`}
              aria-label="Small select example"
            >
              <AllDriverListSelectComponent />
            </CFormSelect>
          )}
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
        {singleVehicleInfo.trip_sto_status !== '1' && (
          <>
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
          </>
        )}
        <CCol xs={12} md={3}>
          <CFormLabel htmlFor="purpose">
            Purpose*
            {errors.purpose && <span className="small text-danger">{errors.purpose}</span>}
          </CFormLabel>
          <CFormSelect
            size="sm"
            name="purpose"
            id="purpose"
            onFocus={onFocus}
            onBlur={onBlur}
            onChange={handleChange}
            disabled={singleVehicleInfo.trip_sto_status=="1"?true:false}
            value={singleVehicleInfo.trip_sto_status!="1"?values.purpose:3}
            className={`${errors.purpose && 'is-invalid'}`}
            aria-label="Small select example"
          >
            <option value="">Select...</option>
            {singleVehicleInfo.trip_sto_status=="1" && Purpose.map(({ id, purpose }) => {

                return (
                  <>
                    <option value={id}>{purpose}</option>
                  </>
                )


            })}
            {Purpose.map(({ id, purpose }) => {
              if(id!=3)
              {
                return (
                  <>
                    <option value={id}>{purpose}</option>
                  </>
                )
              }

            })}
          </CFormSelect>
        </CCol>
        {values.purpose == 2 && singleVehicleInfo.vehicle_type_id.id!=1 && singleVehicleInfo.vehicle_type_id.id!=2 ? (
          <CCol xs={12} md={3}>
            <CFormLabel htmlFor="Vehicle_Sourced_by">
              Vehicle sourced by*
              {errors.Vehicle_Sourced_by && (
                <span className="small text-danger">{errors.Vehicle_Sourced_by}</span>
              )}
            </CFormLabel>
            <CFormSelect
              size="sm"
              name="Vehicle_Sourced_by"
              onFocus={onFocus}
              onBlur={onBlur}
              onChange={handleChange}
              value={values.Vehicle_Sourced_by}
              className={`${errors.Vehicle_Sourced_by && 'is-invalid'}`}
              aria-label="Small select example"
              id="Vehicle_Sourced_by"
            >
              <option value="">Select...</option>
              {SourcedBy.map(({ id, team }) => {
                return (
                  <>
                    <option value={id}>{team}</option>
                  </>
                )
              })}
            </CFormSelect>
          </CCol>
        ) : ( (singleVehicleInfo.trip_sto_status!="1" && values.purpose != 2) &&
          <CCol xs={12} md={3}>
            <CFormLabel htmlFor="division_id">
              Division*
              {errors.division_id && (
                <span className="small text-danger">{errors.division_id}</span>
              )}
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
              <option value="">Select...</option>
              {DivisonList.map(({ id, division }) => {
                return (
                  <>
                    <option value={id}>{division}</option>
                  </>
                )
              })}
            </CFormSelect>
          </CCol>
        )}
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


      </CRow>
      <CRow>

        {values.trip_advance_eligiblity == 1 ? (
          <CCol xs={12} md={3}>
            <CFormLabel htmlFor="advance_amount">
              Advance Amount
              {errors.advance_amount && (
                <span className="small text-danger">{errors.advance_amount}</span>
              )}
            </CFormLabel>
            <CFormInput
              size="sm"
              name="advance_amount"
              onFocus={onFocus}
              onBlur={onBlur}
              onChange={handleChange}
              value={values.advance_amount}
              id="advance_amount"
              type="number"
            />
          </CCol>
        ) : (
          <></>
        )}
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
