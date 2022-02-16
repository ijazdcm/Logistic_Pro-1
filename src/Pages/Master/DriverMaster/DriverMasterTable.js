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
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import CustomTable from 'src/components/customComponent/CustomTable'
import DriverMasterService from 'src/Service/Master/DriverMasterService'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import CustomSpanButton from 'src/components/customComponent/CustomSpanButton1'

const DriverMasterTable = () => {
  const [LicenseCopyFront, setLicenseCopyFront] = useState(false)
  const [LicenseCopyBack, setLicenseCopyBack] = useState(false)
  const [AadharCopy, setAadharCopy] = useState(false)
  const [PanCopy, setPanCopy] = useState(false)
  const [DriverPhoto, setDriverPhoto] = useState(false)

  const [rowData, setRowData] = useState([])
  const [mount, setMount] = useState(1)

  const [documentSrc, setDocumentSrc] = useState('')
  let viewData

  function changeDriverStatus(id) {
    DriverMasterService.deleteDrivers(id).then((res) => {
      toast.success('Driver Status Updated Successfully!')
      setMount((preState) => preState + 1)
    })
  }

  //section for handling view model for each model

  function handleViewDocuments(e, id, type) {
    switch (type) {
      case 'LC_FRONT':
        {
          let singleDriverInfo = viewData.filter((data) => data.driver_id == id)
          console.log(viewData)
          setDocumentSrc(singleDriverInfo[0].license_copy_front)
          setLicenseCopyFront(true)
        }
        break
      case 'LC_BACK':
        {
          let singleDriverInfo = viewData.filter((data) => data.driver_id == id)
          setDocumentSrc(singleDriverInfo[0].license_copy_back)
          setLicenseCopyBack(true)
        }
        break
      case 'AADHAR_COPY':
        {
          let singleDriverInfo = viewData.filter((data) => data.driver_id == id)
          setDocumentSrc(singleDriverInfo[0].aadhar_card)
          setAadharCopy(true)
        }
        break
      case 'PAN_COPY':
        {
          let singleDriverInfo = viewData.filter((data) => data.driver_id == id)
          setDocumentSrc(singleDriverInfo[0].pan_card)
          setPanCopy(true)
        }
        break
      case 'DRIVER_COPY':
        {
          let singleDriverInfo = viewData.filter((data) => data.driver_id == id)
          setDocumentSrc(singleDriverInfo[0].driver_photo)
          setDriverPhoto(true)
        }
        break
    }
  }

  useEffect(() => {
    DriverMasterService.getDrivers().then((response) => {
      viewData = response.data.data
      let rowDataList = []
      viewData.map((data, index) => {
        rowDataList.push({
          sno: index + 1,
          Creation_Date: data.created_at,
          Driver_Type: data.driver_type_info.driver_type,
          Driver_Name: data.driver_name,
          Driver_Code: data.driver_code,
          Driver_Phone1: data.driver_phone_1,
          Driver_Phone2: data.driver_phone_2,
          License_Number: data.license_no,
          License_Valid_To: data.license_validity_to,
          LC_Copy_Front: (
            <CustomSpanButton
              handleViewDocuments={handleViewDocuments}
              driverId={data.driver_id}
              documentType={'LC_FRONT'}
            />
          ),
          LC_Copy_Back: (
            <CustomSpanButton
              handleViewDocuments={handleViewDocuments}
              driverId={data.driver_id}
              documentType={'LC_BACK'}
            />
          ),
          License_Validity: data.license_validity_status === 1 ? 'Valid' : 'Invalid',
          Aadhar_Copy: (
            <CustomSpanButton
              handleViewDocuments={handleViewDocuments}
              driverId={data.driver_id}
              documentType={'AADHAR_COPY'}
            />
          ),
          Pan_Copy: (
            <CustomSpanButton
              handleViewDocuments={handleViewDocuments}
              driverId={data.driver_id}
              documentType={'PAN_COPY'}
            />
          ),
          Driver_Copy: (
            <CustomSpanButton
              handleViewDocuments={handleViewDocuments}
              driverId={data.driver_id}
              documentType={'DRIVER_COPY'}
            />
          ),
          Driver_Address: data.driver_address,
          Status: (
            <span className="badge rounded-pill bg-info">
              {data.driver_status === 1 ? 'Active' : 'InActive'}
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
                  changeDriverStatus(data.driver_id)
                }}
                className="m-1"
              >
                {/* Delete */}
                <i className="fa fa-trash" aria-hidden="true"></i>
              </CButton>
              <Link to={data.driver_status === 1 ? `DriverMaster/${data.driver_id}` : ''}>
                <CButton
                  size="sm"
                  disabled={data.driver_status === 1 ? false : true}
                  color="secondary"
                  shape="rounded"
                  id={data.id}
                  className="m-1"
                >
                  {/* Edit */}
                  <i className="fa fa-edit" aria-hidden="true"></i>
                </CButton>
              </Link>
            </div>
          ),
        })
      })
      setRowData(rowDataList)
    })
  }, [mount])

  // ============ Column Header Data =======

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
      selector: (row) => row.Driver_Phone1,
      sortable: true,
      center: true,
    },
    {
      name: 'Driver Mobile Number 2',
      selector: (row) => row.Driver_Phone2,
      sortable: true,
      center: true,
    },
    {
      name: 'License Number',
      selector: (row) => row.License_Number,
      sortable: true,
      center: true,
    },
    {
      name: 'License Valid To',
      selector: (row) => row.License_Valid_To,
      sortable: true,
      center: true,
    },
    {
      name: 'License Validity Status',
      selector: (row) => row.License_Validity,
      sortable: true,
      center: true,
    },
    {
      name: 'License Copy Front',
      selector: (row) => row.LC_Copy_Front,
      center: true,
    },
    {
      name: ' License Copy Back',
      selector: (row) => row.LC_Copy_Back,
      center: true,
    },

    {
      name: 'Aadhar Card',
      selector: (row) => row.Aadhar_Copy,
      center: true,
    },
    {
      name: 'PAN Card',
      selector: (row) => row.Pan_Copy,
      center: true,
    },
    {
      name: 'Driver Photo',
      selector: (row) => row.Driver_Copy,
      center: true,
    },
    {
      name: 'Driver Address',
      selector: (row) => row.Driver_Address,
      sortable: true,
      center: true,
    },
    {
      name: 'Status',
      selector: (row) => row.Status,
      sortable: true,
      center: true,
    },
    {
      name: 'Action',
      selector: (row) => row.Action,
      center: true,
    },
  ]

  //============ column header data=========

  return (
    <CCard>
      <CContainer className="mt-1">
        <CRow className="mt-1 mb-1">
          <CCol
            className="offset-md-6"
            xs={15}
            sm={15}
            md={6}
            style={{ display: 'flex', justifyContent: 'end' }}
          >
            <Link className="text-white" to="/DriverMaster">
              <CButton size="md" color="warning" className="px-3 text-white" type="button">
                <span className="float-start">
                  <i className="" aria-hidden="true"></i> &nbsp;New
                </span>
              </CButton>
            </Link>
          </CCol>
        </CRow>

        <CustomTable
          columns={columns}
          data={rowData}
          feildName={'Driver_Name'}
          showSearchFilter={true}
        />
        <hr></hr>
      </CContainer>
      {/*License copy front model*/}
      <CModal visible={LicenseCopyFront} onClose={() => setLicenseCopyFront(false)}>
        <CModalHeader>
          <CModalTitle>License Copy Front</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CCardImage orientation="top" src={documentSrc} />
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setLicenseCopyFront(false)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
      {/*License copy front model*/}
      {/*License copy Back model*/}
      <CModal visible={LicenseCopyBack} onClose={() => setLicenseCopyBack(false)}>
        <CModalHeader>
          <CModalTitle>License Copy Back</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CCardImage orientation="top" src={documentSrc} />
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setLicenseCopyBack(false)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
      {/*License copy Back model*/}
      {/*Aadhar copy model*/}
      <CModal visible={AadharCopy} onClose={() => setAadharCopy(false)}>
        <CModalHeader>
          <CModalTitle>Aadhar Copy</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CCardImage orientation="top" src={documentSrc} />
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setAadharCopy(false)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
      {/*Aadhar copy model*/}
      {/*Pan copy model*/}
      <CModal visible={PanCopy} onClose={() => setPanCopy(false)}>
        <CModalHeader>
          <CModalTitle>Pan Copy</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CCardImage orientation="top" src={documentSrc} />
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setPanCopy(false)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
      {/*Pan copy model*/}
      {/*Driver Photo model*/}
      <CModal visible={DriverPhoto} onClose={() => setDriverPhoto(false)}>
        <CModalHeader>
          <CModalTitle>Driver Photo</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CCardImage orientation="top" src={documentSrc} />
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setDriverPhoto(false)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
      {/*Driver Photo model*/}
    </CCard>
  )
}

export default DriverMasterTable
