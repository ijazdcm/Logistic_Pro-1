import {
  CButton,
  CCard,
  CContainer,
  CCol,
  CRow,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CCardImage,
  CModalFooter,
} from '@coreui/react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import CustomTable from 'src/components/customComponent/CustomTable'
const UserLoginMasterTable = () => {
  const [DriverPhoto, setDriverPhoto] = useState(false)
  const [RCCopyFront, setRCCopyFront] = useState(false)
  const [RCCopyBack, setRCCopyBack] = useState(false)
  const [InsuranceCopyBack, setInsuranceCopyBack] = useState(false)
  const [PANNumber, setPANNumber] = useState(false)
  const [pending, setPending] = useState(true)

  const columns = [
    {
      name: 'S.No',
      selector: (row) => row.sno,
      sortable: true,
      center: true,
    },
    {
      name: 'Creation Date',
      selector: (row) => row.Creation_Date,
      sortable: true,
      center: true,
    },

    {
      name: 'Driver Type',
      selector: (row) => row.Driver_Type,
      sortable: true,
      center: true,
    },
    {
      name: 'Driver Name',
      selector: (row) => row.Driver_Name,
      sortable: true,
      center: true,
    },
    {
      name: 'Driver Code',
      selector: (row) => row.Driver_Code,
      sortable: true,
      center: true,
    },
    {
      name: 'Driver Mobile Number 1',
      selector: (row) => row.Driver_Mobile_Number1,
      sortable: true,
      center: true,
    },
    {
      name: 'Driver Mobile Number 2',
      selector: (row) => row.Driver_Mobile_Number2,
      sortable: true,
      center: true,
    },
    {
      name: 'License Number',
      selector: (row) => row.License_Number,
      center: true,
    },
    {
      name: ' License Valid To',
      selector: (row) => row.License_Valid_To,
      center: true,
    },
    {
      name: 'License Copy Front',
      selector: (row) => row.License_Copy_Front,
      center: true,
    },
    {
      name: 'License_Copy_Back',
      selector: (row) => row.License_Copy_Back,
      center: true,
    },
    {
      name: 'License Validity Status',
      selector: (row) => row.License_Validity_Status,
      center: true,
    },
    {
      name: 'Aadhar Card',
      selector: (row) => row.Aadhar_Card,
      center: true,
    },
    {
      name: 'PAN Card',
      selector: (row) => row.PAN_Card,
      center: true,
    },
    {
      name: 'Driver Photo',
      selector: (row) => row.Driver_Photo,
      center: true,
    },
    {
      name: 'Driver Address',
      selector: (row) => row.Driver_Address,
      center: true,
    },
    {
      name: 'Status',
      selector: (row) => row.Status,
      center: true,
    },
    {
      name: 'Action',
      selector: (row) => row.Action,
      center: true,
    },
  ]

  const data = [
    {
      sno: 1,
      Creation_Date: '12.12.2021',
      Driver_Type: 'Own',
      Driver_Name: 'Subash',
      Driver_Code: '67238',
      Driver_Mobile_Number1: '9813792723',
      Driver_Mobile_Number2: '9813792723',
      License_Number: 'Dindigul',
      License_Valid_To: '12.12.2021',
      License_Copy_Front: (
        <span>
          <CButton
            onClick={() => setRCCopyFront(!RCCopyFront)}
            className="w-100 m-0"
            color=""
            size="sm"
            id="inputAddress"
          >
            <span className="float-start">
              <i className="fa fa-eye" aria-hidden="true"></i> &nbsp;View
            </span>
          </CButton>
          <CModal visible={RCCopyFront} onClose={() => setRCCopyFront(false)}>
            <CModalHeader>
              <CModalTitle>Licence Front Copy</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <CCardImage orientation="top" src="" />
            </CModalBody>
            <CModalFooter>
              <CButton color="secondary" onClick={() => setRCCopyFront(false)}>
                Close
              </CButton>
              <CButton color="primary">Save changes</CButton>
            </CModalFooter>
          </CModal>
        </span>
      ),
      License_Copy_Back: (
        <span>
          <CButton
            onClick={() => setRCCopyBack(!RCCopyBack)}
            className="w-100 m-0"
            color=""
            size="sm"
            id="inputAddress"
          >
            <span className="float-start">
              <i className="fa fa-eye" aria-hidden="true"></i> &nbsp;View
            </span>
          </CButton>
          <CModal visible={RCCopyBack} onClose={() => setRCCopyBack(false)}>
            <CModalHeader>
              <CModalTitle>License Copy Back</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <CCardImage orientation="top" src="" />
            </CModalBody>
            <CModalFooter>
              <CButton color="secondary" onClick={() => setRCCopyBack(false)}>
                Close
              </CButton>
              <CButton color="primary">Save changes</CButton>
            </CModalFooter>
          </CModal>
        </span>
      ),
      License_Validity_Status: 'Valid',
      Aadhar_Card: (
        <span>
          <CButton
            onClick={() => setInsuranceCopyBack(!InsuranceCopyBack)}
            className="w-100 m-0"
            color=""
            size="sm"
            id="inputAddress"
          >
            <span className="float-start">
              <i className="fa fa-eye" aria-hidden="true"></i> &nbsp;View
            </span>
          </CButton>
          <CModal visible={InsuranceCopyBack} onClose={() => setInsuranceCopyBack(false)}>
            <CModalHeader>
              <CModalTitle>Aadhar Card</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <CCardImage orientation="top" src="" />
            </CModalBody>
            <CModalFooter>
              <CButton color="secondary" onClick={() => InsuranceCopyBack(false)}>
                Close
              </CButton>
            </CModalFooter>
          </CModal>
        </span>
      ),
      PAN_Card: (
        <span>
          <CButton
            onClick={() => setPANNumber(!PANNumber)}
            className="w-100 m-0"
            color=""
            size="sm"
            id="inputAddress"
          >
            <span className="float-start">
              <i className="fa fa-eye" aria-hidden="true"></i> &nbsp;View
            </span>
          </CButton>
          <CModal visible={PANNumber} onClose={() => setPANNumber(false)}>
            <CModalHeader>
              <CModalTitle>PAN Card</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <CCardImage orientation="top" src="" />
            </CModalBody>
            <CModalFooter>
              <CButton color="secondary" onClick={() => PANNumber(false)}>
                Close
              </CButton>
            </CModalFooter>
          </CModal>
        </span>
      ),
      Driver_Photo: (
        <span>
          <CButton
            onClick={() => setDriverPhoto(!DriverPhoto)}
            className="w-100 m-0"
            color=""
            size="sm"
            id="inputAddress"
          >
            <span className="float-start">
              <i className="fa fa-eye" aria-hidden="true"></i> &nbsp;View
            </span>
          </CButton>
          <CModal visible={DriverPhoto} onClose={() => setDriverPhoto(false)}>
            <CModalHeader>
              <CModalTitle>Driver Photo</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <CCardImage orientation="top" src="" />
            </CModalBody>
            <CModalFooter>
              <CButton color="secondary" onClick={() => DriverPhoto(false)}>
                Close
              </CButton>
            </CModalFooter>
          </CModal>
        </span>
      ),
      Driver_Address: 'Dindigul',
      Status: (
        <span
          className={`badge rounded-pill bg-${data.vehicle_status === 1 ? 'info' : 'danger'}`}
        >
          {data.vehicle_status === 1 ? 'Active' : 'Inactive'}
        </span>
      ),
      Action: (
            <div className="d-flex justify-content-space-between">
              <CButton
                size="sm"
                color="danger"
                shape="rounded"
                id={data.id}
                onClick={() => {
                  changeVehicleStatus(data.vehicle_id)
                }}
                className="m-1"
              >
                {/* Delete */}
                <i className="fa fa-trash" aria-hidden="true"></i>
              </CButton>

              <Link to={data.vehicle_status === 1 ? `VehicleMaster/${data.vehicle_id}` : ''}>
                <CButton
                  disabled={data.vehicle_status === 1 ? false : true}
                  size="sm"
                  color="secondary"
                  shape="rounded"
                  id={data.id}
                  className="m-1"
                  type="button"
                >
                  {/* Edit */}
                  <i className="fa fa-edit" aria-hidden="true"></i>
                </CButton>
              </Link>
            </div>
          ),

    },
  ]

  return (
    <CCard className="mt-4">
      <CContainer className="mt-2">
        <CustomTable
          columns={columns}
          data={data}
          fieldName={'Driver_Name'}
          showSearchFilter={true}
          pending={pending}
        />
        <hr></hr>
        <CRow className="mt-3">
          <CCol
            className="offset-md-6"
            xs={15}
            sm={15}
            md={6}
            style={{ display: 'flex', justifyContent: 'end' }}
          >
            <CButton
              size="sm"
              color="warning"
              // disabled={enableSubmit}
              className="px-3 text-white"
              type="submit"
            >
              <Link className="text-white" to="/DriverMaster">
                New
              </Link>
            </CButton>
          </CCol>
        </CRow>
      </CContainer>
    </CCard>
  )
}

export default UserLoginMasterTable
