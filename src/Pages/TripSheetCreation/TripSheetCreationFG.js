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
import VendorRequestValidation from 'src/Utils/VendorCreation/VendorRequestValidation'
import { Link } from 'react-router-dom'
// import CMultiSelect from '@coreui/react-pro/src/components/multi-select/CMultiSelect'
const TripSheetCreationFG = () => {
  const formValues = {
    vehicleType: '',
    OdometerKm: '',
    odometerPhoto: '',
    Purpose: '',
  }
  const [OdometerPhoto, setOdometerPhoto] = useState(false)
  const { values, errors, handleChange, onFocus, handleSubmit, enableSubmit, onBlur } = useForm(
    login,
    VendorRequestValidation,
    formValues
  )
  console.log(values.Purpose)
  console.log(values)
  function login() {
    alert('No Errors CallBack Called')
  }
  return (
    <CCard>
      <CForm className="container p-3" onSubmit={handleSubmit}>
        <CRow className="">
          <CCol xs={12} md={3}>
            <CFormLabel htmlFor="vType">
              Vehicle Type
              {errors.vehicleType && <span className="small text-danger">{errors.vehicleType}</span>}
            </CFormLabel>
            <CFormInput size="sm" id="vType"  readOnly />
          </CCol>
          <CCol xs={12} md={3}>
            <CFormLabel htmlFor="vNum">
              Vehicle Number
              {errors.vNum && <span className="small text-danger">{errors.vNum}</span>}
            </CFormLabel>
            <CFormInput size="sm" id="vNum"  readOnly />
          </CCol>
          <CCol xs={12} md={3}>
            <CFormLabel htmlFor="vCap">
              Vehicle Capacity
              {errors.vCap && <span className="small text-danger">{errors.vCap}</span>}
            </CFormLabel>
            <CFormInput size="sm" id="vCap"  readOnly />
          </CCol>
          {/* <CCol xs={12} md={3}>
            <CFormLabel htmlFor="inputAddress">
              VA Number
              {errors.vehicleType && <span className="small text-danger">{errors.vehicleType}</span>}
            </CFormLabel>
            <CFormInput size="sm" id="inputAddress"  readOnly />
          </CCol> */}
        {/* </CRow>
        <CRow className=""> */}
          <CCol xs={12} md={3}>
            <CFormLabel htmlFor="dName">
              Driver Name*
              {errors.dName && <span className="small text-danger">{errors.dName}</span>}
            </CFormLabel>
            <CFormSelect
              size="sm"
              name="dName"
              onFocus={onFocus}
              onBlur={onBlur}
              onChange={handleChange}
              value={values.dName}
              className={`${errors.dName && 'is-invalid'}`}
              aria-label="Small select example"
              id='dName'
            >
              <option  hidden>
                Select...
              </option>

              <option value="1">Mari</option>



              <option value="3">Muthu</option>
            </CFormSelect>
          </CCol>

          <CCol xs={12} md={3}>
            <CFormLabel htmlFor="dMob">
              Driver Mobile Number
              {errors.dMob && <span className="small text-danger">{errors.dMob}</span>}
            </CFormLabel>
            <CFormInput size="sm" id="dMob"  readOnly />
          </CCol>
          <CCol xs={12} md={3}>
            <CFormLabel htmlFor="gateInDateTime">
              Gate-In Date & Time
              {errors.gateInDateTime && <span className="small text-danger">{errors.gateInDateTime}</span>}
            </CFormLabel>
            <CFormInput size="sm" id="gateInDateTime" type="datetime-local"  readOnly />
          </CCol>
          <CCol xs={12} md={3}>
            <CFormLabel htmlFor="inspectionDateTime">
              Inspection Date & Time
              {errors.inspectionDateTime && <span className="small text-danger">{errors.inspectionDateTime}</span>}
            </CFormLabel>
            <CFormInput size="sm" id="inspectionDateTime" type="datetime-local"  readOnly />
          </CCol>
          <CCol xs={12} md={3}>
            <CFormLabel htmlFor="verifyDate">
              Doc. Verification Date & Time
              {errors.verifyDate && <span className="small text-danger">{errors.verifyDate}</span>}
            </CFormLabel>
            <CFormInput size="sm" type="datetime-local" id="verifyDate"  readOnly />
          </CCol>

          <CCol xs={12} md={3}>
            <CFormLabel htmlFor="shedName">
              Shed Name
              {errors.shedName && <span className="small text-danger">{errors.shedName}</span>}
            </CFormLabel>
            <CFormInput size="sm" id="shedName"  readOnly />
          </CCol>
          <CCol xs={12} md={3}>
            <CFormLabel htmlFor="ownerName">
              Owner Name
              {errors.ownerName && <span className="small text-danger">{errors.ownerName}</span>}
            </CFormLabel>
            <CFormInput size="sm" id="ownerName" type="text"  readOnly />
          </CCol>
          <CCol xs={12} md={3}>
            <CFormLabel htmlFor="ownerMob">
              Owner Mobile Number
              {errors.ownerMob && <span className="small text-danger">{errors.ownerMob}</span>}
            </CFormLabel>
            <CFormInput size="sm" id="ownerMob" type="text"  readOnly />
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
              id='Division'
            >
              <option  hidden>
                Select...
              </option>
              <option value="1">NLFD</option>
              <option value="2">NLFA</option>
              <option value="3">NLMD</option>
              <option value="4">NLCD</option>
              <option value="5">NLDV</option>
            </CFormSelect>
          </CCol>


          <CCol xs={12} md={3}>
            <CFormLabel htmlFor="freigthRate">
              Freight Rate Per TON
              {errors.freigthRate && <span className="small text-danger">{errors.freigthRate}</span>}
            </CFormLabel>
            <CFormInput size="sm" id="freigthRate" type="text"  />
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
              id='AdvanceEligibility'
            >
              <option  hidden>
                Select...
              </option>
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
            <CFormInput size="sm" type="" id="advancepayBank"  />
          </CCol>
          <CCol xs={12} md={3}>
            <CFormLabel htmlFor="advancepayDiesel">
              Advance Payment Diesel*
              {errors.advancepayDiesel && (
                <span className="small text-danger">{errors.advancepayDiesel}</span>
              )}
            </CFormLabel>
            <CFormInput size="sm" type="" id="advancepayDiesel"  />
          </CCol>

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
              id='Purpose'
            >
              <option  hidden>
                Select...
              </option>
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
                id='vSourced'
              >
                <option  hidden>
                  Select...
                </option>
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
        <CRow className="mt-md-3">
          <CCol className="" xs={12} sm={12} md={3}>
            <CButton size="sm" color="primary" className="text-white" type="button">
              <Link className="text-white" to="/TripSheetCreationHome">
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
              // disabled={enableSubmit}
              className="mx-3 px-3 text-white"
              type="submit"
            >
              Create
            </CButton>
            {/* <CButton
              size="sm"
              // disabled={enableSubmit}
              color="warning"
              className="px-3 text-white"
              type="submit"
            >
              Cancel
            </CButton> */}
          </CCol>
        </CRow>
      </CForm>
    </CCard>
  )
}
export default TripSheetCreationFG
