/* eslint-disable prettier/prettier */
import CIcon from '@coreui/icons-react'
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
} from '@coreui/react'
import { cilInput, cilDescription, cilCheckCircle, cilCog } from '@coreui/icons'

import { React, useState } from 'react'
import useForm from 'src/Hooks/useForm.js'
import validate from 'src/Validations/FormValidation'
import CustomTable from '../../components/customComponent/CustomTable'
import { Link } from 'react-router-dom'

const DocVerifyVendorNotAvail = () => {
  const formValues = {
    vehicleType: '',
    OdometerKm: '',
    odometerPhoto: '',
  }

  const { values, errors, handleChange, onFocus, handleSubmit, enableSubmit, onBlur } = useForm(
    login,
    validate,
    formValues
  )

  function login() {
    alert('No Errors CallBack Called')
  }

  const [visible, setVisible] = useState(false)
  // document.title=('Vehicle Inspection');
  return (
    <>
      <CCard>
        <CTabContent className="m-0 p-0">
          <CNav variant="pills" layout="justified">
            <CNavItem>
              <CNavLink href="#" active>
                <h5>Hire Vehicle (Vendor Not Available)</h5>
              </CNavLink>
            </CNavItem>
          </CNav>
          <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={true}>
            <CForm className="container p-3" onSubmit={handleSubmit}>
              <CRow className="">
                <CCol md={3}>
                  <CFormLabel htmlFor="vType">Vehicle Type</CFormLabel>
                  <CFormInput name="vType" size="sm" id="vType" value="Hire" readOnly />
                </CCol>

                <CCol md={3}>
                  <CFormLabel htmlFor="vNum">Vehicle Number</CFormLabel>
                  <CFormInput name="vNum" size="sm" id="vNum" value="TNAD123465" readOnly />
                </CCol>

                <CCol xs={12} md={3}>
                  <CFormLabel htmlFor="vCap">Vehicle Capacity In MTS</CFormLabel>
                  <CFormInput name="vCap" size="sm" id="vCap" value="10" readOnly />
                </CCol>
                <CCol xs={12} md={3}>
                  <CFormLabel htmlFor="dName">Driver Name</CFormLabel>
                  <CFormInput name="dName" size="sm" id="dName" value="Naga Raj" readOnly />
                </CCol>

                <CCol xs={12} md={3}>
                  <CFormLabel htmlFor="dMob">Driver Contact Number</CFormLabel>
                  <CFormInput name="dMob" size="sm" id="dMob" value="9135362456" readOnly />
                </CCol>
                <CCol xs={12} md={3}>
                  <CFormLabel htmlFor="gateInDateTime">Gate-In Date & Time</CFormLabel>
                  <CFormInput
                    name="gateInDateTime"
                    size="sm"
                    id="gateInDateTime"
                    value="21 Sep 2021 12:00:00 PM"
                    readOnly
                  />
                </CCol>
                <CCol xs={12} md={3}>
                  <CFormLabel htmlFor="inspectionDateTime">Inspection Date & Time</CFormLabel>
                  <CFormInput
                    name="inspectionDateTime"
                    size="sm"
                    id="inspectionDateTime"
                    value="21 Sep 2021 12:00:00 PM"
                    readOnly
                  />
                </CCol>
                <CCol xs={12} md={3}>
                  <CFormLabel htmlFor="panNum">PAN Card Number*</CFormLabel>
                  <CFormInput name="panNum" size="sm" id="panNum"  />
                </CCol>
                <CCol xs={12} md={3}>
                  <CFormLabel htmlFor="ownerName">Owner Name*</CFormLabel>
                  <CFormInput name="ownerName" size="sm" id="ownerName"  />
                </CCol>

                <CCol xs={12} md={3}>
                  <CFormLabel htmlFor="ownerMob">Owner Mobile Number*</CFormLabel>
                  <CFormInput name="ownerMob" size="sm" id="ownerMob"  />
                </CCol>
                <CCol xs={12} md={3}>
                  <CFormLabel htmlFor="aadharCard">Aadhar Card*</CFormLabel>
                  <CFormInput type="file" name="aadharCard" size="sm" id="aadhar" />
                </CCol>
                <CCol xs={12} md={3}>
                  <CFormLabel htmlFor="bankPass">Bank Pass Book*</CFormLabel>
                  <CFormInput type="file" name="bankPass" size="sm" id="bankPass" />
                </CCol>
                <CCol xs={12} md={3}>
                  <CFormLabel htmlFor="panCard">Pan Card*</CFormLabel>
                  <CFormInput type="file" name="panCard" size="sm" id="panCard" />
                </CCol>

                <CCol xs={12} md={3}>
                  <CFormLabel htmlFor="license">License Copy*</CFormLabel>
                  <CFormInput type="file" name="license" size="sm" id="license" />
                </CCol>
                <CCol xs={12} md={3}>
                  <CFormLabel htmlFor="rcFront">RC Copy - Front*</CFormLabel>
                  <CFormInput type="file" name="rcFront" size="sm" id="rcFront" />
                </CCol>
                <CCol xs={12} md={3}>
                  <CFormLabel htmlFor="rcBack">RC Copy - Back*</CFormLabel>
                  <CFormInput type="file" name="rcBack" size="sm" id="rcBack" />
                </CCol>
                <CCol xs={12} md={3}>
                  <CFormLabel htmlFor="insurance">Insurance Copy*</CFormLabel>
                  <CFormInput type="file" name="insurance" size="sm" id="insurance" />
                </CCol>
                <CCol xs={12} md={3}>
                  <CFormLabel htmlFor="TDSfront">TDS Declaration Form - Front*</CFormLabel>
                  <CFormInput type="file" name="TDSfront" size="sm" id="TDSfront" />
                </CCol>

                <CCol xs={12} md={3}>
                  <CFormLabel htmlFor="TDSback">TDS Declaration Form - Back* </CFormLabel>
                  <CFormInput type="file" name="TDSback" size="sm" id="TDSback" />
                </CCol>
                <CCol xs={12} md={3}>
                  <CFormLabel htmlFor="transportShed">Transporter Shed Sheet*</CFormLabel>
                  <CFormInput type="file" name="transportShed" size="sm" id="transportShed" />
                </CCol>
                <CCol xs={12} md={3}>
                  <CFormLabel htmlFor="shedName">Shed Name*</CFormLabel>
                  <CFormSelect
                    size="sm"
                    name="shedName"
                    id='shedName'
                    className=""
                    aria-label="Small select example"
                  >
                    <option hidden>Select...</option>
                    <option value="0">Select SP</option>
                  </CFormSelect>
                </CCol>
                <CCol xs={12} md={3}>
                  <CFormLabel htmlFor="shedownerMob">Shed Mobile Number*</CFormLabel>
                  <CFormInput type="text" name="shedownerMob" size="sm" id="shedownerMob" />
                </CCol>
                <CCol xs={12} md={3}>
                  <CFormLabel htmlFor="shedownerWhatsapp">Shed WhatsApp Number</CFormLabel>
                  <CFormInput type="text" name="shedownerWhatsapp" size="sm" id="shedownerWhatsapp" />
                </CCol>
                <CCol xs={12} md={3}>
                  <CFormLabel htmlFor="insuranceValid">Insurance Validity*</CFormLabel>
                  <CFormSelect
                    size="sm"
                    name="insuranceValid"
                    id='insuranceValid'
                    className=""
                    aria-label="Small select example"
                  >
                    <option hidden>Select...</option>
                    <option value="0">Valid</option>
                    <option value="0">Invalid</option>
                  </CFormSelect>
                </CCol>
                <CCol xs={12} md={3}>
                  <CFormLabel htmlFor="freigthRate">Freight Rate Per Ton*</CFormLabel>
                  <CFormInput type="text" name="freigthRate" size="sm" id="freigthRate" />
                </CCol>
                <CCol xs={12} md={3}>
                  <CFormLabel htmlFor="remarks">Remarks</CFormLabel>
                  <CFormTextarea id="remarks" rows="1"></CFormTextarea>
                </CCol>
              </CRow>

              <CRow>
                <CCol>
                  <Link to="/DocsVerify">
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
                  <CButton
                    size="sm"
                    color="warning"
                    disabled=""
                    className="mx-3 px-3 text-white"
                    type="submit"
                  >
                    Accept
                  </CButton>
                  <CButton
                    size="sm"
                    // disabled={enableSubmit}
                    color="warning"
                    className="px-3 text-white"
                    type="submit"
                  >
                    Reject
                  </CButton>
                </CCol>
              </CRow>
            </CForm>
          </CTabPane>
        </CTabContent>
      </CCard>
    </>
  )
}

export default DocVerifyVendorNotAvail
