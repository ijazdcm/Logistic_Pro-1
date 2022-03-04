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
import VehicleMasterService from 'src/Service/Master/VehicleMasterService'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import CustomSpanButton from 'src/components/customComponent/CustomSpanButton'

const VehicleMasterTable = () => {
  const [RCCopyFront, setRCCopyFront] = useState(false)
  const [RCCopyBack, setRCCopyBack] = useState(false)
  const [InsuranceCopyBack, setInsuranceCopyBack] = useState(false)
  const [InsuranceCopyFront, setInsuranceCopyFront] = useState(false)

  const [rowData, setRowData] = useState([])
  const [mount, setMount] = useState(1)
  const [pending, setPending] = useState(true)

  const [documentSrc, setDocumentSrc] = useState('')
  let viewData

  function changeVehicleStatus(id) {
    VehicleMasterService.deleteVehicles(id).then((res) => {
      toast.success('Vehicle Status Updated Successfully!')
      setMount((preState) => preState + 1)
    })
  }

  //section for handling view model for each model

  function handleViewDocuments(e, id, type) {
    switch (type) {
      case 'RC_FRONT':
        {
          let singleVehicleInfo = viewData.filter((data) => data.vehicle_id == id)
          console.log(viewData)
          console.log(singleVehicleInfo[0].rc_copy_front)
          setDocumentSrc(singleVehicleInfo[0].rc_copy_front)
          setRCCopyFront(true)
        }
        break
      case 'RC_BACK':
        {
          let singleVehicleInfo = viewData.filter((data) => data.vehicle_id == id)
          setDocumentSrc(singleVehicleInfo[0].rc_copy_back)
          setRCCopyBack(true)
        }
        break
      case 'INSURANCE_FRONT':
        {
          let singleVehicleInfo = viewData.filter((data) => data.vehicle_id == id)
          setDocumentSrc(singleVehicleInfo[0].insurance_copy_front)
          setInsuranceCopyFront(true)
        }
        break
      case 'INSURANCE_BACK':
        {
          let singleVehicleInfo = viewData.filter((data) => data.vehicle_id == id)
          setDocumentSrc(singleVehicleInfo[0].insurance_copy_back)
          setInsuranceCopyBack(true)
        }
        break
      default:
        return 0
    }
  }

  useEffect(() => {
    VehicleMasterService.getVehicles().then((response) => {
      viewData = response.data.data
      let rowDataList = []
      viewData.map((data, index) => {
        rowDataList.push({
          sno: index + 1,
          Creation_Date: data.created_at,
          vehicle_Number: data.vehicle_number,
          Vehicle_Type: data.vehicle_type_info.type,
          Vehicle_Capacity: data.vehicle_capacity_info.capacity + '-TON',
          Vehicle_Bodytype: data.vehicle_body_type_info.body_type,
          RC_Copy_Front: (
            <CustomSpanButton
              handleViewDocuments={handleViewDocuments}
              vehicleId={data.vehicle_id}
              documentType={'RC_FRONT'}
            />
          ),
          RC_Copy_Back: (
            <CustomSpanButton
              handleViewDocuments={handleViewDocuments}
              vehicleId={data.vehicle_id}
              documentType={'RC_BACK'}
            />
          ),
          Insuranance_Copy_Front: (
            <CustomSpanButton
              handleViewDocuments={handleViewDocuments}
              vehicleId={data.vehicle_id}
              documentType={'INSURANCE_FRONT'}
            />
          ),
          Insuranance_Copy_Back: (
            <CustomSpanButton
              handleViewDocuments={handleViewDocuments}
              vehicleId={data.vehicle_id}
              documentType={'INSURANCE_BACK'}
            />
          ),
          Insurance_Validity: data.insurance_validity,
          FC_Validity: data.fc_validity,
          Status: data.vehicle_status === 1 ? '✔️' : '❌',
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
        })
      })
      setRowData(rowDataList)
      setPending(false)
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
      name: 'Vehicle Number',
      selector: (row) => row.vehicle_Number,
      sortable: true,
      center: true,
    },
    {
      name: 'Vehicle Type',
      selector: (row) => row.Vehicle_Type,
      sortable: true,
      center: true,
    },
    {
      name: 'Vehicle Capacity',
      selector: (row) => row.Vehicle_Capacity,
      sortable: true,
      center: true,
    },
    {
      name: 'Vehicle Body Type',
      selector: (row) => row.Vehicle_Bodytype,
      sortable: true,
      center: true,
    },
    {
      name: 'RC Copy Front',
      selector: (row) => row.RC_Copy_Front,
      center: true,
    },
    {
      name: 'RC Copy Back',
      selector: (row) => row.RC_Copy_Back,
      center: true,
    },
    {
      name: 'Insurance Copy Front',
      selector: (row) => row.Insuranance_Copy_Front,
      center: true,
    },
    {
      name: ' Insurance Copy Back',
      selector: (row) => row.Insuranance_Copy_Back,
      center: true,
    },
    {
      name: 'Insurance Validity',
      selector: (row) => row.Insurance_Validity,
      center: true,
      sortable: true,
      // Cell: ({ row }) => row,
      Cell: ({ row }) => format(row, 'DD/mm/yyyy'),
    },
    {
      name: 'FC Validity',
      selector: (row) => row.FC_Validity,
      center: true,
      sortable: true,
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
    <>
      <CRow className="mt-1 mb-1">
        <CCol
          className="offset-md-6"
          xs={15}
          sm={15}
          md={6}
          style={{ display: 'flex', justifyContent: 'end' }}
        >
          <Link className="text-white" to="/VehicleMaster">
            <CButton size="sm" color="warning" className="px-5 text-white" type="button">
              NEW
            </CButton>
          </Link>
        </CCol>
      </CRow>
      <CCard>
        <CContainer>
          <CustomTable
            columns={columns}
            data={rowData}
            fieldName={'vehicle_Number'}
            showSearchFilter={true}
            pending={pending}
          />
        </CContainer>

        {/*Rc copy front model*/}
        <CModal visible={RCCopyFront} onClose={() => setRCCopyFront(false)}>
          <CModalHeader>
            <CModalTitle>RC Copy Front</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CCardImage orientation="top" src={documentSrc} />
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setRCCopyFront(false)}>
              Close
            </CButton>
          </CModalFooter>
        </CModal>
        {/*Rc copy front model*/}
        {/*Rc copy back model*/}
        <CModal visible={RCCopyBack} onClose={() => setRCCopyBack(false)}>
          <CModalHeader>
            <CModalTitle>RC Copy Back</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CCardImage orientation="top" src={documentSrc} />
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setRCCopyBack(false)}>
              Close
            </CButton>
            {/* <CButton color="primary">Save changes</CButton> */}
          </CModalFooter>
        </CModal>
        {/*Rc copy back model*/}

        {/*Insurance copy front*/}
        <CModal visible={InsuranceCopyFront} onClose={() => setInsuranceCopyFront(false)}>
          <CModalHeader>
            <CModalTitle>Insurance Copy Front</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CCardImage orientation="top" src={documentSrc} />
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setInsuranceCopyFront(false)}>
              Close
            </CButton>
          </CModalFooter>
        </CModal>
        {/*Insurance copy front*/}
        {/*Insurance copy back*/}
        <CModal visible={InsuranceCopyBack} onClose={() => setInsuranceCopyBack(false)}>
          <CModalHeader>
            <CModalTitle>Insurance Copy Back</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CCardImage orientation="top" src={documentSrc} />
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setInsuranceCopyBack(false)}>
              Close
            </CButton>
          </CModalFooter>
        </CModal>
        {/*Insurance copy back*/}
      </CCard>
    </>
  )
}

export default VehicleMasterTable
