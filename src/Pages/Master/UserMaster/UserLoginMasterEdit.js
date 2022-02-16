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
  CCardImage,
} from '@coreui/react'
import { useEffect } from 'react'
import { React, useState } from 'react'
import DepartmentListComponent from 'src/components/commoncomponent/DepartmentListComponent'
import DesignationListComponent from 'src/components/commoncomponent/DesignationListComponent'
import DivisonListComponent from 'src/components/commoncomponent/DivisonListComponent'
import LocationListComponent from 'src/components/commoncomponent/LocationListComponent'
import useForm from 'src/Hooks/useForm.js'
import UserLoginMasterService from 'src/Service/Master/UserLoginMasterService'
import validate from 'src/Utils/Validation'
import { DepartmentMap } from './Mapping/DepartmentMap'
import { DesignationMap } from './Mapping/DesignationMap'
import { DivisionMap } from './Mapping/DivisonMap'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Link, useNavigate, useParams } from 'react-router-dom'

const UserLoginMasterEdit = () => {
  const { id } = useParams()

  const [singleUserInfo, setSingleUserInfo] = useState({})
  const [delUserPhoto, setDelUserPhoto] = useState(true)
  const [userPhoto, setUserPhoto] = useState(false)

  const formValues = {
    username: '',
    password: '',
    Divison: '',
    Department: '',
    Designation: '',
    serial: '',
    userid: '',
    usermobile: '',
    email: '',
    UserPhoto: '',
    location: '',
    selectAll: false,
    parking_yard_gate_in: '',
    vehicle_inspection_page: '',
    vehicle_maintenance_page: '',
    trip_sto_page: '',
    document_verification_page: '',
    vendor_creation_page: '',
    vendor_approval_page: '',
    vendor_confirmation_page: '',
    trip_sheet_creation_page: '',
  }

  const select_all_pages = () => {
    values.parking_yard_gate_in = true
    values.vehicle_inspection_page = true
    values.vehicle_maintenance_page = true
    values.trip_sto_page = true
    values.document_verification_page = true
    values.vendor_creation_page = true
    values.vendor_approval_page = true
    values.vendor_confirmation_page = true
    values.trip_sheet_creation_page = true
  }

  const de_select_all_pages = () => {
    values.parking_yard_gate_in = false
    values.vehicle_inspection_page = false
    values.vehicle_maintenance_page = false
    values.trip_sto_page = false
    values.document_verification_page = false
    values.vendor_creation_page = false
    values.vendor_approval_page = false
    values.vendor_confirmation_page = false
    values.trip_sheet_creation_page = false
  }

  const { values, errors, handleChange, onFocus, handleSubmit, enableSubmit, onBlur } = useForm(
    updateUser,
    validate,
    formValues
  )

  const navigation = useNavigate()

  function updateUser() {
    let formdata = new FormData()
    formdata.append('_method', 'PUT')
    formdata.append('username', values.username)
    formdata.append('email', values.email)
    formdata.append('mobile_no', values.usermobile)
    formdata.append('serial_no', values.serial)
    formdata.append('division_id', values.Divison)
    formdata.append('department_id', values.Department)
    formdata.append('designation_id', values.Designation)
    formdata.append('user_auto_id', values.userid)
    formdata.append('location_id', values.location)
    formdata.append(
      'page_permissions',
      JSON.stringify({
        parking_yard_gate_in: values.parking_yard_gate_in,
        vehicle_inspection_page: values.vehicle_inspection_page,
        vehicle_maintenance_page: values.vehicle_maintenance_page,
        trip_sto_page: values.trip_sto_page,
        document_verification_page: values.document_verification_page,
        vendor_creation_page: values.vendor_creation_page,
        vendor_approval_page: values.vendor_approval_page,
        vendor_confirmation_page: values.vendor_confirmation_page,
        trip_sheet_creation_page: values.trip_sheet_creation_page,
      })
    )
    if(values.UserPhoto)
    {
      formdata.append('photo', values.UserPhoto)
    }


    UserLoginMasterService.updateUser(id,formdata).then((res) => {
      if (res.status === 200) {
        toast.success('User Updated Successfully!')
        setTimeout(() => {
          navigation('/UserLoginMasterTable')
        }, 1000)
      }
    })
  }

  const generateUserId = (Divison, Department, Designation, serial) => {
    let userid =
      DivisionMap[Divison] + DepartmentMap[Department] + DesignationMap[Designation] + serial
    values.userid = userid
  }

  useEffect(() => {
    UserLoginMasterService.getUserById(id).then((res) => {

      let pagePermission=JSON.parse(res.data.data.page_permissions)

      values.username = res.data.data.username
      values.Divison = res.data.data.division_info.id
      values.Department = res.data.data.department_info.id
      values.Designation = res.data.data.designation_info.id
      values.serial = res.data.data.serial_no
      values.userid = res.data.data.user_auto_id
      values.usermobile = res.data.data.mobile_no
      values.email = res.data.data.email
      values.location = res.data.data.location_info.id
      values.parking_yard_gate_in = pagePermission.parking_yard_gate_in
      values.vehicle_inspection_page = pagePermission.vehicle_inspection_page
      values.vehicle_maintenance_page = pagePermission.vehicle_maintenance_page
      values.trip_sto_page = pagePermission.trip_sto_page
      values.document_verification_page = pagePermission.document_verification_page
      values.vendor_creation_page = pagePermission.vendor_creation_page
      values.vendor_approval_page =pagePermission.vendor_approval_page
      values.vendor_confirmation_page = pagePermission.vendor_confirmation_page
      values.trip_sheet_creation_pag = pagePermission.trip_sheet_creation_page

      setSingleUserInfo(res.data.data)

    })
  }, [id])

  useEffect(() => {
    if (values.selectAll) {
      select_all_pages()
    } else {
      de_select_all_pages()
    }
  }, [values.selectAll])




  useEffect(() => {
    if (values.Divison && values.Department && values.Designation && values.serial) {
      generateUserId(values.Divison, values.Department, values.Designation, values.serial)
    }
  }, [values.Divison, values.Department, values.Designation, values.serial])

  return (
    <>
      <CCard>
        <CTabContent>
          <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={true}>
            <CForm className="row g-3 m-2 p-1" onSubmit={handleSubmit}>
              <CRow className="mb-md-1">
                <CCol md={3}>
                  <CFormLabel htmlFor="username">User Name*</CFormLabel>
                  <CFormInput
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onChange={handleChange}
                    value={values.username}
                    name="username"
                    size="sm"
                    id="username"
                    placeholder=""
                  />
                </CCol>
                {/* <CCol md={3}>
                  <CFormLabel htmlFor="password">New Password</CFormLabel>
                  <CFormInput
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onChange={handleChange}
                    value={values.password}
                    name="password"
                    size="sm"
                    id="username"
                    placeholder=""
                  />
                </CCol> */}
                <CCol md={3}>
                  <CFormLabel htmlFor="Divison">
                    Divison*{' '}
                    {errors.Divison && <span className="small text-danger">{errors.Divison}</span>}
                  </CFormLabel>
                  <CFormSelect
                    size="sm"
                    name="Divison"
                    id="Divison"
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onChange={handleChange}
                    value={values.Divison}
                    className={`mb-1 ${errors.Divison && 'is-invalid'}`}
                    aria-label="Small select example"
                  >
                    <DivisonListComponent />
                  </CFormSelect>
                </CCol>
                <CCol md={3}>
                  <CFormLabel htmlFor="Department">
                    Department*{' '}
                    {errors.Department && (
                      <span className="small text-danger">{errors.Department}</span>
                    )}
                  </CFormLabel>

                  <CFormSelect
                    size="sm"
                    name="Department"
                    id="Department"
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onChange={handleChange}
                    value={values.Department}
                    className={`mb-1 ${errors.Department && 'is-invalid'}`}
                    aria-label="Small select example"
                  >
                    <DepartmentListComponent />
                  </CFormSelect>
                </CCol>
                <CCol md={3}>
                  <CFormLabel htmlFor="Designation">
                    Designation*{' '}
                    {errors.Designation && (
                      <span className="small text-danger">{errors.Designation}</span>
                    )}
                  </CFormLabel>
                  <CFormSelect
                    size="sm"
                    name="Designation"
                    id="Designation"
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onChange={handleChange}
                    value={values.Designation}
                    className={`mb-1 ${errors.Designation && 'is-invalid'}`}
                    aria-label="Small select example"
                  >
                    <DesignationListComponent />
                  </CFormSelect>
                </CCol>
              </CRow>
              <CRow className="mb-md-1">

                <CCol md={3}>
                  <CFormLabel htmlFor="serial">Serial No*</CFormLabel>
                  <CFormSelect
                    name="serial"
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onChange={handleChange}
                    value={values.serial}
                    size="sm"
                    id="serial"
                    placeholder=""
                    aria-label="Small select example"
                  >
                    <option value={''}>Select...</option>
                    <option value="01">01</option>
                    <option value="02">02</option>
                    <option value="03">03</option>
                    <option value="04">04</option>
                    <option value="05">05</option>
                    <option value="06">06</option>
                    <option value="07">07</option>
                    <option value="08">08</option>
                    <option value="09">09</option>
                    <option value="10">10</option>
                  </CFormSelect>
                </CCol>
                <CCol md={3}>
                  <CFormLabel htmlFor="userid">User ID*</CFormLabel>
                  <CFormInput
                    name="userid"
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onChange={handleChange}
                    value={values.userid}
                    size="sm"
                    id="userid"
                    placeholder=""
                    readOnly
                  />
                </CCol>
                <CCol md={3}>
                  <CFormLabel htmlFor="usermobile">User Mobile Number*</CFormLabel>
                  <CFormInput
                    type="number"
                    onFocus={onFocus}
                    onBlur={onBlur}
                    maxLength={10}
                    onChange={handleChange}
                    value={values.usermobile}
                    name="usermobile"
                    size="sm"
                    id="usermobile"
                    placeholder="Enter Mobile Number"
                  />
                </CCol>
                <CCol md={3}>
                  <CFormLabel htmlFor="email">User Mail ID*</CFormLabel>
                  <CFormInput
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onChange={handleChange}
                    value={values.email}
                    name="email"
                    size="sm"
                    id="email"
                    placeholder="Enter Email"
                  />
                </CCol>
              </CRow>
              <CRow className="mb-md-1">

                <CCol md={3}>
                  <CFormLabel htmlFor="UserPhoto">
                    User Photo*{' '}
                    {errors.UserPhoto && (
                      <span className="small text-danger">{errors.UserPhoto}</span>
                    )}
                  </CFormLabel>
                  {delUserPhoto ? (
                    <CButton className="w-100 m-0" color="info" size="sm" id="inputAddress">
                      <span className="float-start">
                        <i
                          className="fa fa-eye"
                          onClick={() =>  setUserPhoto(true)}
                          aria-hidden="true"
                        ></i>{' '}
                        &nbsp;View
                      </span>
                      <span className="float-end">
                        <i
                          className="fa fa-trash"
                          aria-hidden="true"
                          onClick={() => setDelUserPhoto(false)}
                        ></i>
                      </span>
                    </CButton>
                  ) : (
                    <CFormInput
                      onFocus={onFocus}
                      onBlur={onBlur}
                      onChange={handleChange}
                      type="file"
                      accept=".jpg,.jpeg"
                      name="UserPhoto"
                      size="sm"
                      id="UserPhoto"
                    />
                  )}
                  {/*user image biew model*/}
                  <CModal visible={userPhoto} onClose={() => setUserPhoto(false)}>
                    <CModalHeader>
                      <CModalTitle>User Photo</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                      <CCardImage orientation="top" src={singleUserInfo.user_image} />
                    </CModalBody>
                    <CModalFooter>
                      <CButton color="secondary" onClick={() => setUserPhoto(false)}>
                        Close
                      </CButton>
                    </CModalFooter>
                  </CModal>
                  {/*user image biew model*/}
                </CCol>
                <CCol md={3}>
                  <CFormLabel htmlFor="location">
                    Location*{' '}
                    {errors.location && (
                      <span className="small text-danger">{errors.location}</span>
                    )}
                  </CFormLabel>

                  <CFormSelect
                    size="sm"
                    name="location"
                    id="location"
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onChange={handleChange}
                    value={values.location}
                    className={`mb-1 ${errors.location && 'is-invalid'}`}
                    aria-label="Small select example"
                  >
                    <LocationListComponent />
                  </CFormSelect>
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
                  >
                    Update
                  </CButton>
                  <Link to={'/UserLoginMasterTable'}>
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
        <CContainer>
          <CRow>
            <CCol md={4}>
              <h4>Permission to Pages</h4>
            </CCol>
            <CCol md={6}>
              <div className="d-flex ">
                <h4 className="px-2">Select All</h4>
                <div>
                  <CFormCheck
                    className="mt-3"
                    onChange={handleChange}
                    value={values.selectAll}
                    name="selectAll"
                    id="select_all_btn"
                    aria-label="..."
                  />
                </div>
              </div>
            </CCol>
          </CRow>
          <CRow className="mt-1">
            <CCol md={4}>
              <CTable>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">#</CTableHeaderCell>

                    <CTableHeaderCell scope="col">Page</CTableHeaderCell>

                    <CTableHeaderCell scope="col">permission</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  <CTableRow>
                    <CTableHeaderCell scope="row">1</CTableHeaderCell>

                    <CTableDataCell>Parking Gate</CTableDataCell>
                    <CTableDataCell>
                      <div>
                        <CFormCheck
                          checked={values.parking_yard_gate_in}
                          onChange={handleChange}
                          value={values.parking_yard_gate_in}
                          name="parking_yard_gate_in"
                          id="parking_yard_gate_in"
                          aria-label="..."
                        />
                      </div>
                    </CTableDataCell>
                  </CTableRow>

                  <CTableRow>
                    <CTableHeaderCell scope="row">2</CTableHeaderCell>

                    <CTableDataCell>Vehicle Inspection</CTableDataCell>

                    <CTableDataCell>
                      <div>
                        <CFormCheck
                          checked={values.vehicle_inspection_page}
                          onChange={handleChange}
                          value={values.vehicle_inspection_page}
                          name="vehicle_inspection_page"
                          id="vehicle_inspection_page"
                          aria-label="..."
                        />
                      </div>
                    </CTableDataCell>
                  </CTableRow>

                  <CTableRow>
                    <CTableHeaderCell scope="row">3</CTableHeaderCell>

                    <CTableDataCell>Vehicle Maintenance</CTableDataCell>

                    <CTableDataCell>
                      <div>
                        <CFormCheck
                          checked={values.vehicle_maintenance_page}
                          onChange={handleChange}
                          value={values.vehicle_maintenance_page}
                          name="vehicle_maintenance_page"
                          id="vehicle_maintenance_page"
                          aria-label="..."
                        />
                      </div>
                    </CTableDataCell>
                  </CTableRow>
                </CTableBody>
              </CTable>
            </CCol>
            <CCol md={4}>
              <CTable>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">#</CTableHeaderCell>

                    <CTableHeaderCell scope="col">Page</CTableHeaderCell>

                    <CTableHeaderCell scope="col">permission</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>

                <CTableBody>
                  <CTableRow>
                    <CTableHeaderCell scope="row">4</CTableHeaderCell>

                    <CTableDataCell>Trip STO</CTableDataCell>

                    <CTableDataCell>
                      <div>
                        <CFormCheck
                          checked={values.trip_sto_page}
                          onChange={handleChange}
                          value={values.trip_sto_page}
                          name="trip_sto_page"
                          id="trip_sto_page"
                          aria-label="..."
                        />
                      </div>
                    </CTableDataCell>
                  </CTableRow>

                  <CTableRow>
                    <CTableHeaderCell scope="row">5</CTableHeaderCell>

                    <CTableDataCell>Document Verification</CTableDataCell>

                    <CTableDataCell>
                      <div>
                        <CFormCheck
                          checked={values.document_verification_page}
                          onChange={handleChange}
                          value={values.document_verification_page}
                          name="document_verification_page"
                          id="document_verification_page"
                          aria-label="..."
                        />
                      </div>
                    </CTableDataCell>
                  </CTableRow>

                  <CTableRow>
                    <CTableHeaderCell scope="row">6</CTableHeaderCell>

                    <CTableDataCell>Vendor Creation</CTableDataCell>

                    <CTableDataCell>
                      <div>
                        <CFormCheck
                          checked={values.vendor_creation_page}
                          onChange={handleChange}
                          value={values.vendor_creation_page}
                          name="vendor_creation_page"
                          id="vendor_creation_page"
                          aria-label="..."
                        />
                      </div>
                    </CTableDataCell>
                  </CTableRow>
                </CTableBody>
              </CTable>
            </CCol>
            <CCol md={4}>
              <CTable>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">#</CTableHeaderCell>

                    <CTableHeaderCell scope="col">Page</CTableHeaderCell>

                    <CTableHeaderCell scope="col">permission</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>

                <CTableBody>
                  <CTableRow>
                    <CTableHeaderCell scope="row">7</CTableHeaderCell>

                    <CTableDataCell>Vendor Approval</CTableDataCell>

                    <CTableDataCell>
                      <div>
                        <CFormCheck
                          checked={values.vendor_approval_page}
                          onChange={handleChange}
                          value={values.vendor_approval_page}
                          name="vendor_approval_page"
                          id="vendor_approval_page"
                          aria-label="..."
                        />
                      </div>
                    </CTableDataCell>
                  </CTableRow>

                  <CTableRow>
                    <CTableHeaderCell scope="row">8</CTableHeaderCell>

                    <CTableDataCell>Vendor Confirmation</CTableDataCell>

                    <CTableDataCell>
                      <div>
                        <CFormCheck
                          checked={values.vendor_confirmation_page}
                          onChange={handleChange}
                          value={values.vendor_confirmation_page}
                          name="vendor_confirmation_page"
                          id="vendor_confirmation_page"
                          aria-label="..."
                        />
                      </div>
                    </CTableDataCell>
                  </CTableRow>

                  <CTableRow>
                    <CTableHeaderCell scope="row">9</CTableHeaderCell>
                    <CTableDataCell>TS-Creation</CTableDataCell>
                    <CTableDataCell>
                      <div>
                        <CFormCheck
                          checked={values.trip_sheet_creation_page}
                          onChange={handleChange}
                          value={values.trip_sheet_creation_page}
                          name="trip_sheet_creation_page"
                          id="trip_sheet_creation_page"
                          aria-label="..."
                        />
                      </div>
                    </CTableDataCell>
                  </CTableRow>
                </CTableBody>
              </CTable>
            </CCol>
          </CRow>
        </CContainer>
      </CCard>
    </>
  )
}

export default UserLoginMasterEdit
