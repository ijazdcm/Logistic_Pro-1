import {
  CButton,
  CCard,
  CContainer,
  CCol,
  CRow,
  CModal,
  CFormInput,
  CFormLabel,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CCardImage,
  CModalFooter,
  CAlert,
} from '@coreui/react'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import useForm from 'src/Hooks/useForm'
import validate from 'src/Utils/Validation'
import CustomTable from 'src/components/customComponent/CustomTable'
import LocationApi from '../../../Service/SubMaster/LocationApi'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const LocationTable = () => {
  const [modal, setModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [rowData, setRowData] = useState([])
  const [save, setSave] = useState(true)
  const [success, setSuccess] = useState('')
  const [editId, setEditId] = useState('')
  const [deleteId, setDeleteId] = useState('')
  const [update, setUpdate] = useState('')
  const [deleted, setDeleted] = useState('')
  const [error, setError] = useState('')
  const [mount, setMount] = useState(1)
  const [pending, setPending] = useState(true)
  const formValues = {
    location: '',
  }
  // =================== Validation ===============
  const {
    values,
    errors,
    handleChange,
    onFocus,
    handleSubmit,
    enableSubmit,
    onBlur,
    onClick,
    onKeyUp,
  } = useForm(login, validate, formValues)

  function login() {
    // alert('No Errors CallBack Called')
  }
  // =================== Validation ===============

  /*                    */

  // =================== CRUD =====================
  const Create = (e) => {
    e.preventDefault()
    let createValues = { location_name: values.location }
    LocationApi.createLocation(createValues)
      .then((response) => {
        setSuccess('New Location Added Successfully')
        values.location = ''
      })
      .catch((error) => {
        setError(error.response.data.errors.location_name[0])
      })
  }

  const Edit = (id) => {
    setSave(false)
    setEditId('')
    LocationApi.getLocationById(id).then((response) => {
      let editData = response.data.data
      setModal(true)
      values.location = editData.location
      setEditId(id)
    })
  }

  const Update = (id) => {
    let updateValues = { location_name: values.location }
    console.log(updateValues, id)
    LocationApi.updateLocation(updateValues, id)
      .then((response) => {
        setSuccess('Location Updated Successfully')
      })
      .catch((error) => {
        setError(error.response.data.errors.location_name[0])
        setTimeout(() => {
          setError('')
        }, 1000)
      })
  }

  const Delete = (id) => {
    LocationApi.deleteLocation(id).then((res) => {
      if (res.status == 204) {
        setModal(false)
        toast.success('Location Status Updated Successfully!')
        setMount((prevState) => (prevState = prevState + 1))
      }
    })
  }

  useEffect(() => {
    LocationApi.getLocation().then((response) => {
      let viewData = response.data.data
      let rowDataList = []
      viewData.map((data, index) => {
        rowDataList.push({
          sno: index + 1,
          Location: data.location,
          Created_at: data.created_at,
          Status: (
            <span
              className={`badge rounded-pill bg-${data.location_status === 1 ? 'info' : 'danger'}`}
            >
              {data.location_status === 1 ? 'Active' : 'InActive'}
            </span>
          ),
          Action: (
            <div className="d-flex justify-content-space-between">
              <CButton
                size="sm"
                color="danger"
                shape="rounded"
                id={data.id}
                onClick={() => Delete(data.id)}
                className="m-1"
              >
                {/* Delete */}
                <i className="fa fa-trash" aria-hidden="true"></i>
              </CButton>
              <CButton
                disabled={data.location_status === 1 ? false : true}
                size="sm"
                color="secondary"
                shape="rounded"
                id={data.id}
                onClick={() => Edit(data.id)}
                className="m-1"
              >
                {/* Edit */}
                <i className="fa fa-edit" aria-hidden="true"></i>
              </CButton>
            </div>
          ),
        })
      })
      setRowData(rowDataList)
      setPending(false)

      setTimeout(() => {
        setSuccess('')
        setUpdate('')
        setError('')
        setDeleted('')
      }, 1500)
    })
  }, [mount, modal, save, success, update, deleted])
  // ============ CRUD =====================
  /*                    */
  // ============ Column Header Data =======
  const columns = [
    {
      name: 'S.No',
      selector: (row) => row.sno,
      sortable: true,
      center: true,
    },
    {
      name: 'Creation date',
      selector: (row) => row.Created_at,
      left: true,
    },
    {
      name: 'Location',
      selector: (row) => row.Location,
      left: true,
    },
    {
      name: 'Status',
      selector: (row) => row.Status,
      left: true,
    },
    {
      name: 'Action',
      selector: (row) => row.Action,
      center: true,
    },
  ]
  // =================== Column Header Data =======

  return (
    <>
      <CContainer className="mt-2">
        <CRow className="mt-3">
          <CCol
            className="offset-md-6"
            xs={15}
            sm={15}
            md={6}
            style={{ display: 'flex', justifyContent: 'end' }}
          >
            <CButton
              size="md"
              color="warning"
              className="px-3 text-white"
              onClick={() => {
                values.location = ''
                setSuccess('')
                setUpdate('')
                setError('')
                setDeleted('')
                setModal(!modal)
                setSave(true)
              }}
            >
              <span className="float-start">
                <i className="" aria-hidden="true"></i> &nbsp;New
              </span>
            </CButton>
          </CCol>
        </CRow>
        <CCard className="mt-1">
          <CustomTable columns={columns} data={rowData || ''} />
        </CCard>
      </CContainer>

      {/* View & Edit Modal Section */}
      <CModal visible={modal} onClose={() => setModal(false)}>
        <CModalHeader>
          <CModalTitle>Location</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow>
            <CCol>
              {update && (
                <CAlert color="primary" data-aos="fade-down" dismissible>
                  {update}
                </CAlert>
              )}
              {success && (
                <CAlert color="success" data-aos="fade-down" dismissible>
                  {success}
                </CAlert>
              )}
              {error && (
                <CAlert color="danger" data-aos="fade-down" dismissible>
                  {error}
                </CAlert>
              )}

              <CFormLabel htmlFor="location">
                Location*{' '}
                {errors.location && <span className="small text-danger">{errors.location}</span>}
              </CFormLabel>
              <CFormInput
                size="sm"
                id="location"
                maxLength={125}
                className={`${errors.location && 'is-invalid'}`}
                name="location"
                value={values.location || ''}
                onFocus={onFocus}
                onBlur={onBlur}
                onChange={handleChange}
                aria-label="Small select example"
              />
            </CCol>
          </CRow>
        </CModalBody>
        <CModalFooter>
          <CButton onClick={(e) => (save ? Create(e) : Update(editId))} color="primary">
            {save ? 'Save' : 'Update'}
          </CButton>
        </CModalFooter>
      </CModal>
      {/* View & Edit Modal Section */}

      {/* Delete Modal Section */}
      <CModal visible={deleteModal} onClose={() => setDeleteModal(false)}>
        <CModalHeader>
          <CModalTitle className="h4">Confirm To Delete</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow>
            <CCol>
              <CFormLabel className="h6" htmlFor="division">
                Are you sure want to Delete{' '}
              </CFormLabel>
            </CCol>
          </CRow>
          {deleted && (
            <CAlert color="danger" dismissible>
              {deleted}
            </CAlert>
          )}
        </CModalBody>
        <CModalFooter>
          <CButton className="mx-2" onClick={() => Delete(deleteId)} color="danger">
            YES
          </CButton>
          <CButton onClick={() => setDeleteModal(false)} color="primary">
            NO
          </CButton>
        </CModalFooter>
      </CModal>
      {/* Delete Modal Section */}
    </>
  )
}

export default LocationTable

// {
//     name: 'Creation Date',
//     selector: (row) => row.Creation_Date,
//     sortable: true,
//     center: true,
// },
// {
//   name: 'Status',
//   selector: (row) => row.Status,
//   center: true,
// },
