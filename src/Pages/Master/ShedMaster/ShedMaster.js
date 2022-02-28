/*Created by maria vanaraj*/

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
  CAlert,
} from '@coreui/react'
import { React, useEffect, useState } from 'react'
import useForm from 'src/Hooks/useForm.js'
import ShedMasterValidation from 'src/Utils/Master/ShedMasterValidation'
import ShedTypeService from 'src/Service/SmallMaster/Shed/ShedService'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import ShedMasterService from 'src/Service/Master/ShedMasterService'

const ShedMaster = () => {
  const formValues = {

    ShedType: '',
    ShedName: '',
    ShedOwnerName: '',
    ShedOwnerMobileNumber1: '',
    ShedOwnerMobileNumber2: '',
    ShedOwnerAddress: '',
    ShedOwnerPhoto: '',
    PANNumber: '',
    AadharNumber: '',
    GSTNumber: '',
  }
  const [ShedType, setShedType] = useState([])

  const navigation = useNavigate()
  const [errorModal, setErrorModal] = useState(false)
  const [error, setError] = useState({})

  const border = {
    borderColor: '#b1b7c1',
  }
  const { values, errors, handleChange, onFocus, handleSubmit, enableSubmit, onBlur } = useForm(
    addNewShed,
    ShedMasterValidation,
    formValues
  )
  function addNewShed() {
    ShedMasterService.getShed()
      .then((response) => {
        console.log(response)
        console.log('asd')
        const formData = new FormData()

        formData.append('shed_type_id', values.shedType)
        formData.append('shed_name', values.ShedName)
        formData.append('shed_owner_name', values.ShedOwnerName)
        formData.append('shed_owner_phone_1', values.ShedOwnerMobileNumber1)
        formData.append('shed_owner_phone_2', values.ShedOwnerMobileNumber2)
        formData.append('shed_owner_address', values.ShedOwnerAddress)
        formData.append('shed_owner_photo', values.ShedOwnerPhoto)
        formData.append('pan_number', values.PANNumber)
        formData.append('shed_adhar_number', values.AadharNumber)
        formData.append('gst_no', values.GSTNumber)

        ShedMasterService.createShed(formData).then((res) => {
          if (res.status === 200) {
            toast.success('Shed Created Successfully!')

            setTimeout(() => {
              navigation('/ShedMasterTable')
            }, 1000)
          }
        })
      })
      .catch((error) => {
        var object = error.response.data.errors
        var output = ''
        for (var property in object) {
          output += '*' + object[property] + '\n'
        }
        setError(output)
        setErrorModal(true)
      })
  }

  useEffect(() => {
    //section for getting vehicle type from database
    ShedTypeService.getShedType().then((res) => {
      setShedType(res.data.data)
    })
  }, [])
  return (
    <>
      <CCard>
        <CTabContent>
          <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={true}>
            <CForm className="row g-3 m-2 p-1" onSubmit={handleSubmit}>
              <CRow className="">
                {/* <CCol md={3}>
                  <CFormLabel htmlFor="shedType">
                    Shed Type*{' '}
                    {errors.shedType && (
                      <span className="small text-danger">{errors.shedType}</span>
                    )}
                  </CFormLabel>

                  <CFormSelect
                    size="sm"
                    name="ShedType"
                    id="sType"
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onChange={handleChange}
                    value={values.shedType}
                    className={`mb-1 ${errors.shedType && 'is-invalid'}`}
                    aria-label="Small select example"
                  >
                    <option value="0">Select ...</option>
                    {ShedType.map(({ shed_id, shed_type }) => {
                      return (
                        <>
                          <option key={shed_id} value={shed_id}>
                            {shed_type}
                          </option>
                        </>
                      )
                    })}
                  </CFormSelect>
                </CCol> */}
                <CCol md={3}>
                  <CFormLabel htmlFor="sName">
                    Shed Name*
                    {errors.ShedName && (
                      <span className="small text-danger">{errors.ShedName}</span>
                    )}
                  </CFormLabel>
                  <CFormInput
                    name="ShedName"
                    size="sm"
                    id="sName"
                    maxLength={20}
                    onChange={handleChange}
                    value={values.ShedName}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    placeholder=""
                  />
                </CCol>
                <CCol md={3}>
                  <CFormLabel htmlFor="sOwner">
                    Shed Owner Name*
                    {errors.ShedOwnerName && (
                      <span className="small text-danger">{errors.ShedOwnerName}</span>
                    )}
                  </CFormLabel>
                  <CFormInput
                    name="ShedOwnerName"
                    size="sm"
                    id="sOwner"
                    maxLength={30}
                    onChange={handleChange}
                    value={values.ShedOwnerName}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    placeholder=""
                  />
                </CCol>
                <CCol md={3}>
                  <CFormLabel htmlFor="sOwnerMob1">
                    Shed Owner Mobile Number 1*
                    {errors.ShedOwnerMobileNumber1 && (
                      <span className="small text-danger">{errors.ShedOwnerMobileNumber1}</span>
                    )}
                  </CFormLabel>
                  <CFormInput
                    name="ShedOwnerMobileNumber1"
                    size="sm"
                    id="sOwnerMob1"
                    maxLength={10}
                    onChange={handleChange}
                    value={values.ShedOwnerMobileNumber1}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    placeholder=""
                  />
                </CCol>

                <CCol md={3}>
                  <CFormLabel htmlFor="sOwnerMob2">
                    Shed Owner Mobile Number 2*
                    {errors.ShedOwnerMobileNumber2 && (
                      <span className="small text-danger">{errors.ShedOwnerMobileNumber2}</span>
                    )}
                  </CFormLabel>
                  <CFormInput
                    name="ShedOwnerMobileNumber2"
                    size="sm"
                    maxLength={10}
                    id="sOwnerMob2"
                    onChange={handleChange}
                    value={values.ShedOwnerMobileNumber2}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    placeholder=""
                  />
                </CCol>
                <CCol md={3}>
                  <CFormLabel htmlFor="sOwnerAddress">
                    Shed Owner Address*{' '}
                    {errors.ShedOwnerAddress && (
                      <span className="small text-danger">{errors.ShedOwnerAddress}</span>
                    )}
                  </CFormLabel>
                  <CFormTextarea
                    name="ShedOwnerAddress"
                    size="sm"
                    id="sOwnerAddress"
                    onChange={handleChange}
                    maxLength={100}
                    value={values.ShedOwnerAddress}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    placeholder=""
                  />
                </CCol>

                <CCol md={3}>
                  <CFormLabel htmlFor="sOwnerPhoto">
                    Shed Owner Photo*{' '}
                    {errors.ShedOwnerPhoto && (
                      <span className="small text-danger">{errors.ShedOwnerPhoto}</span>
                    )}
                  </CFormLabel>
                  <CFormInput
                    type="file"
                    name="ShedOwnerPhoto"
                    size="sm"
                    id="sOwnerPhoto"
                    accept=".jpg,.jpeg,.png,.pdf"
                    onBlur={onBlur}
                    onChange={handleChange}
                  />
                </CCol>
                <CCol md={3}>
                  <CFormLabel htmlFor="PANNumber">
                    PAN Number*
                    {errors.PANNumber && (
                      <span className="small text-danger">{errors.PANNumber}</span>
                    )}
                  </CFormLabel>
                  <CFormInput
                    name="PANNumber"
                    size="sm"
                    id="PANNumber"
                    maxLength={10}
                    onChange={handleChange}
                    value={values.PANNumber}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    placeholder=""
                  />
                </CCol>
            
                <CCol md={3}>
                  <CFormLabel htmlFor="aNumber">
                    Aadhar Number*
                    {errors.AadharNumber && (
                      <span className="small text-danger">{errors.AadharNumber}</span>
                    )}
                  </CFormLabel>
                  <CFormInput
                    name="AadharNumber"
                    size="sm"
                    id="aNumber"
                    maxLength={12}
                    onChange={handleChange}
                    value={values.AadharNumber}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    placeholder=""
                  />
                </CCol>
                <CCol md={3}>
                  <CFormLabel htmlFor="gNumber">
                    GST Number*
                    {errors.GSTNumber && (
                      <span className="small text-danger">{errors.GSTNumber}</span>
                    )}
                  </CFormLabel>
                  <CFormInput
                    name="GSTNumber"
                    size="sm"
                    maxLength={15}
                    id="gNumber"
                    placeholder=""
                    onChange={handleChange}
                    value={values.GSTNumber}
                    onBlur={onBlur}
                    onFocus={onFocus}
                  />
                </CCol>
              </CRow>
              <CRow className="mb-md-1">
                <CCol
                  className="pull-right"
                  xs={12}
                  sm={12}
                  md={12}
                  style={{ display: 'flex', justifyContent: 'flex-end' }}
                >
                  <CButton
                    size="s-lg"
                    color="warning"
                    className="mx-1 px-2 text-white"
                    type="submit"
                    // disabled={enableSubmit}
                  >
                    Submit
                  </CButton>
                  <Link to={'/ShedMasterTable'}>
                    <CButton
                      size="s-lg"
                      color="warning"
                      className="mx-1 px-2 text-white"
                      type="button"
                    >
                      Cancel
                    </CButton>
                  </Link>
                </CCol>
              </CRow>
            </CForm>
          </CTabPane>
        </CTabContent>
      </CCard>
      {/* Error Modal Section */}
      <CModal visible={errorModal} onClose={() => setErrorModal(false)}>
        <CModalHeader>
          <CModalTitle className="h4">Error</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow>
            <CCol>
              {error && (
                <CAlert color="danger" data-aos="fade-down">
                  {error}
                </CAlert>
              )}
            </CCol>
          </CRow>
        </CModalBody>
        <CModalFooter>
          <CButton onClick={() => setErrorModal(false)} color="primary">
            Close
          </CButton>
        </CModalFooter>
      </CModal>
      {/* Error Modal Section */}
    </>
  )
}

export default ShedMaster
