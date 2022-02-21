import { CCol, CFormInput, CFormLabel, CFormSelect, CFormTextarea, CRow } from '@coreui/react'
import React, { useEffect } from 'react'
import DivisonListComponent from 'src/components/commoncomponent/DivisonListComponent'

const TripSheetCreationHire = ({
  values,
  errors,
  handleChange,
  onFocus,
  handleSubmit,
  enableSubmit,
  onBlur,
  singleVehicleInfo,
  isTouched
}) => {



  useEffect(() => {
    isTouched.expected_return_date_time = true
    isTouched.remarks = true
    isTouched.driveMobile = true
    isTouched.Vehicle_Sourced_by = true
    isTouched.advance_payment_diesel = true
  }, [])



  return (
    <>
      <CRow>
        <CCol xs={12} md={3}>
          <CFormLabel htmlFor="vType">Vehicle Type</CFormLabel>
          <CFormInput
            size="sm"
            name="vehicle_type"
            value={singleVehicleInfo.vehicle_type_id.type}
            id="vType"
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
          <CFormLabel htmlFor="driverNameHire">Driver Name</CFormLabel>
          <CFormInput
            size="sm"
            id="driverNameHire"
            value={singleVehicleInfo.driver_name}
            readOnly
          />
        </CCol>
      </CRow>
      <CRow>
        <CCol xs={12} md={3}>
          <CFormLabel htmlFor="dMob">Driver Mobile Number</CFormLabel>
          <CFormInput
            size="sm"
            id="dMob"
            value={singleVehicleInfo.driver_contact_number}
            readOnly
          />
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
          <CFormLabel htmlFor="verifyDate">Doc. Verification Date & Time</CFormLabel>
          <CFormInput
            size="sm"
            type="inspection_time_string"
            id="verifyDate"
            value={singleVehicleInfo.vehicle_inspection_trip.inspection_time_string}
            readOnly
          />
        </CCol>
      </CRow>
      <CRow>
        <CCol xs={12} md={3}>
          <CFormLabel htmlFor="shedName">Shed Name</CFormLabel>
          <CFormInput
            size="sm"
            id="shedName"
            value={singleVehicleInfo.vehicle_vendor_info.shed_info.shed_name}
            readOnly
          />
        </CCol>
        <CCol xs={12} md={3}>
          <CFormLabel htmlFor="ownerName">Owner Name</CFormLabel>
          <CFormInput
            size="sm"
            id="ownerName"
            type="text"
            value={singleVehicleInfo.vehicle_vendor_info.owner_name}
            readOnly
          />
        </CCol>
        <CCol xs={12} md={3}>
          <CFormLabel htmlFor="ownerMob">Owner Mobile Number</CFormLabel>
          <CFormInput
            size="sm"
            id="ownerMob"
            value={singleVehicleInfo.vehicle_vendor_info.shed_info.shed_owner_phone_1}
            type="text"
            readOnly
          />
        </CCol>
        <CCol xs={12} md={3}>
          <CFormLabel htmlFor="division_id">
            Divison
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
      </CRow>
      <CRow>
        <CCol xs={12} md={3}>
          <CFormLabel htmlFor="freight_rate_per_tone">
            Freight Rate Per TON
            {errors.freight_rate_per_tone && (
              <span className="small text-danger">{errors.freight_rate_per_tone}</span>
            )}
          </CFormLabel>
          <CFormInput
            size="sm"
            onFocus={onFocus}
            onBlur={onBlur}
            onChange={handleChange}
            value={values.freight_rate_per_tone}
            id="freight_rate_per_tone"
            name="freight_rate_per_tone"
            type="number"
          />
        </CCol>
        <CCol xs={12} md={3}>
          <CFormLabel htmlFor="trip_advance_eligiblity">
            Trip Advance Eligibility
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
            <option value="2">No</option>
          </CFormSelect>
        </CCol>
        {values.trip_advance_eligiblity == 1 ? (
          <>
            <CCol xs={12} md={3}>
              <CFormLabel htmlFor="advance_amount">
                Advance Payment Bank*
                {errors.advance_amount && (
                  <span className="small text-danger">{errors.advance_amount}</span>
                )}
              </CFormLabel>
              <CFormInput
                size="sm"
                type="number"
                onFocus={onFocus}
                onBlur={onBlur}
                onChange={handleChange}
                value={values.advance_amount}
                name="advance_amount"
                id="advance_amount"
              />
            </CCol>
            <CCol xs={12} md={3}>
              <CFormLabel htmlFor="advance_payment_diesel">
                Advance Payment Diesel*
                {errors.advance_payment_diesel && (
                  <span className="small text-danger">{errors.advance_payment_diesel}</span>
                )}
              </CFormLabel>
              <CFormInput size="sm" name='advance_payment_diesel' type="number" onFocus={onFocus}
                onBlur={onBlur}
                onChange={handleChange}
                value={values.advance_payment_diesel} id="advance_payment_diesel" />
            </CCol>
          </>
        ) : (
          <></>
        )}
      </CRow>
      <CRow>
        <CCol xs={12} md={3}>
          <CFormLabel htmlFor="Purpose">
            Purpose
            {errors.purpose && <span className="small text-danger">{errors.purpose}</span>}
          </CFormLabel>
          <CFormSelect
            size="sm"
            name="purpose"
            onFocus={onFocus}
            onBlur={onBlur}
            onChange={handleChange}
            value={values.purpose}
            className={`${errors.purpose && 'is-invalid'}`}
            aria-label="Small select example"
            id="Purpose"
          >
            <option value="">Select...</option>
            <option value="1">FG Sales</option>
            <option value="2">STO</option>
            <option value="3">Others</option>
          </CFormSelect>
        </CCol>

        {values.purpose == 2 && (
          <CCol xs={12} md={3}>
            <CFormLabel htmlFor="Vehicle_Sourced_by">
              Vehicle sourced by
              {errors.Vehicle_Sourced_by && <span className="small text-danger">{errors.Vehicle_Sourced_by}</span>}
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
              <option value="Logistics">Logistics</option>
              <option value="WM-Team">WM-Team</option>
              <option value="Inventry Team">Inventry Team</option>
            </CFormSelect>
          </CCol>
        )}
        <CCol xs={12} md={3}>
          <CFormLabel htmlFor="expected_date_time">
            Expected Delivery Date & Time*
            {errors.expected_date_time && (
              <span className="small text-danger">{errors.expected_date_time}</span>
            )}
          </CFormLabel>
          <CFormInput size="sm" onFocus={onFocus}
              onBlur={onBlur}
              onChange={handleChange}
              value={values.expected_date_time} type="date" name='expected_date_time' id="expected_date_time" />
        </CCol>
      </CRow>
    </>
  )
}

export default TripSheetCreationHire
