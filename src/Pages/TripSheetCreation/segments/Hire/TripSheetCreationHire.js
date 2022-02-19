import { CCol, CFormInput, CFormLabel, CFormSelect, CFormTextarea, CRow } from '@coreui/react'
import React from 'react'
import DivisonListComponent from 'src/components/commoncomponent/DivisonListComponent'

const TripSheetCreationHire = ({
  values,
  errors,
  handleChange,
  onFocus,
  handleSubmit,
  enableSubmit,
  onBlur,
}) => {
  return (
    <>
      <CRow>
        <CCol xs={12} md={3}>
          <CFormLabel htmlFor="vType">
            Vehicle Type
            {errors.vehicleType && <span className="small text-danger">{errors.vehicleType}</span>}
          </CFormLabel>
          <CFormInput size="sm" id="vType" readOnly />
        </CCol>
        <CCol xs={12} md={3}>
          <CFormLabel htmlFor="vNum">
            Vehicle Number
            {errors.vNum && <span className="small text-danger">{errors.vNum}</span>}
          </CFormLabel>
          <CFormInput size="sm" id="vNum" readOnly />
        </CCol>
        <CCol xs={12} md={3}>
          <CFormLabel htmlFor="vCap">
            Vehicle Capacity
            {errors.vCap && <span className="small text-danger">{errors.vCap}</span>}
          </CFormLabel>
          <CFormInput size="sm" id="vCap" readOnly />
        </CCol>
        <CCol xs={12} md={3}>
          <CFormLabel htmlFor="driverName">
            Driver Name
            {errors.driverName && <span className="small text-danger">{errors.driverName}</span>}
          </CFormLabel>
          <CFormInput size="sm" id="driverName" readOnly />
        </CCol>
      </CRow>
      <CRow>
        <CCol xs={12} md={3}>
          <CFormLabel htmlFor="dMob">
            Driver Mobile Number
            {errors.dMob && <span className="small text-danger">{errors.dMob}</span>}
          </CFormLabel>
          <CFormInput size="sm" id="dMob" readOnly />
        </CCol>
        <CCol xs={12} md={3}>
          <CFormLabel htmlFor="gateInDateTime">
            Gate-In Date & Time
            {errors.gateInDateTime && (
              <span className="small text-danger">{errors.gateInDateTime}</span>
            )}
          </CFormLabel>
          <CFormInput size="sm" id="gateInDateTime" type="datetime-local" readOnly />
        </CCol>
        <CCol xs={12} md={3}>
          <CFormLabel htmlFor="inspectionDateTime">
            Inspection Date & Time
            {errors.inspectionDateTime && (
              <span className="small text-danger">{errors.inspectionDateTime}</span>
            )}
          </CFormLabel>
          <CFormInput size="sm" id="inspectionDateTime" type="datetime-local" readOnly />
        </CCol>
        <CCol xs={12} md={3}>
          <CFormLabel htmlFor="verifyDate">
            Doc. Verification Date & Time
            {errors.verifyDate && <span className="small text-danger">{errors.verifyDate}</span>}
          </CFormLabel>
          <CFormInput size="sm" type="datetime-local" id="verifyDate" readOnly />
        </CCol>
      </CRow>
      <CRow>
        <CCol xs={12} md={3}>
          <CFormLabel htmlFor="shedName">
            Shed Name
            {errors.shedName && <span className="small text-danger">{errors.shedName}</span>}
          </CFormLabel>
          <CFormInput size="sm" id="shedName" readOnly />
        </CCol>
        <CCol xs={12} md={3}>
          <CFormLabel htmlFor="ownerName">
            Owner Name
            {errors.ownerName && <span className="small text-danger">{errors.ownerName}</span>}
          </CFormLabel>
          <CFormInput size="sm" id="ownerName" type="text" readOnly />
        </CCol>
        <CCol xs={12} md={3}>
          <CFormLabel htmlFor="ownerMob">
            Owner Mobile Number
            {errors.ownerMob && <span className="small text-danger">{errors.ownerMob}</span>}
          </CFormLabel>
          <CFormInput size="sm" id="ownerMob" type="text" readOnly />
        </CCol>
        <CCol xs={12} md={3}>
          <CFormLabel htmlFor="Division">
            Division
            {errors.Division && <span className="small text-danger">{errors.Division}</span>}
          </CFormLabel>
          <CFormSelect
            size="sm"
            name=""
            onFocus={onFocus}
            onBlur={onBlur}
            onChange={handleChange}
            value={values.Division}
            className={`${errors.Division && 'is-invalid'}`}
            aria-label="Small select example"
            id="Division"
          >
            <DivisonListComponent />
          </CFormSelect>
        </CCol>
      </CRow>
      <CRow>
        <CCol xs={12} md={3}>
          <CFormLabel htmlFor="freigthRate">
            Freight Rate Per TON
            {errors.freigthRate && <span className="small text-danger">{errors.freigthRate}</span>}
          </CFormLabel>
          <CFormInput size="sm" id="freigthRate" type="text" />
        </CCol>
        <CCol xs={12} md={3}>
          <CFormLabel htmlFor="AdvanceEligibility">
            Trip Advance Eligibility
            {errors.AdvanceEligibility && (
              <span className="small text-danger">{errors.AdvanceEligibility}</span>
            )}
          </CFormLabel>
          <CFormSelect
            size="sm"
            name=""
            onFocus={onFocus}
            onBlur={onBlur}
            onChange={handleChange}
            value={values.AdvanceEligibility}
            className={`${errors.AdvanceEligibility && 'is-invalid'}`}
            aria-label="Small select example"
            id="AdvanceEligibility"
          >
            <option hidden>Select...</option>
            <option value="1">Yes</option>
            <option value="2">No</option>
          </CFormSelect>
        </CCol>
        <CCol xs={12} md={3}>
          <CFormLabel htmlFor="advancepayBank">
            Advance Payment Bank*
            {errors.advancepayBank && (
              <span className="small text-danger">{errors.advancepayBank}</span>
            )}
          </CFormLabel>
          <CFormInput size="sm" type="" id="advancepayBank" />
        </CCol>
        <CCol xs={12} md={3}>
          <CFormLabel htmlFor="advancepayDiesel">
            Advance Payment Diesel*
            {errors.advancepayDiesel && (
              <span className="small text-danger">{errors.advancepayDiesel}</span>
            )}
          </CFormLabel>
          <CFormInput size="sm" type="" id="advancepayDiesel" />
        </CCol>
      </CRow>
      <CRow>
        <CCol xs={12} md={3}>
          <CFormLabel htmlFor="Purpose">
            Purpose
            {errors.Purpose && <span className="small text-danger">{errors.Purpose}</span>}
          </CFormLabel>
          <CFormSelect
            size="sm"
            name="Purpose"
            onFocus={onFocus}
            onBlur={onBlur}
            onChange={handleChange}
            value={values.Purpose}
            className={`${errors.Purpose && 'is-invalid'}`}
            aria-label="Small select example"
            id="Purpose"
          >
            <option hidden>Select...</option>
            <option value="1">FG Sales</option>
            <option value="2">STO</option>
            <option value="3">Others</option>
          </CFormSelect>
        </CCol>

        {values.Purpose == 2 && (
          <CCol xs={12} md={3}>
            <CFormLabel htmlFor="vSourced">
              Vehicle sourced by
              {errors.vSourced && <span className="small text-danger">{errors.vSourced}</span>}
            </CFormLabel>
            <CFormSelect
              size="sm"
              name="vSourced"
              onFocus={onFocus}
              onBlur={onBlur}
              onChange={handleChange}
              value={values.vSourced}
              className={`${errors.vSourced && 'is-invalid'}`}
              aria-label="Small select example"
              id="vSourced"
            >
              <option hidden>Select...</option>
              <option value="1">Logistics</option>
              <option value="2">WM-Team</option>
              <option value="3">Inventry Team</option>
            </CFormSelect>
          </CCol>
        )}
        <CCol xs={12} md={3}>
          <CFormLabel htmlFor="expectDelivery">
            Expected Delivery Date & Time*
            {errors.expectDelivery && (
              <span className="small text-danger">{errors.expectDelivery}</span>
            )}
          </CFormLabel>
          <CFormInput size="sm" type="datetime-local" id="expectDelivery" />
        </CCol>
        <CCol xs={12} md={3}>
          <CFormLabel htmlFor="remarks">Remarks</CFormLabel>
          <CFormTextarea id="remarks" rows="1"></CFormTextarea>
        </CCol>
      </CRow>
    </>
  )
}

export default TripSheetCreationHire
