import { React, useState, useEffect } from 'react'
import {
  CButton,
  CCard,
  CRow,
  CCol,
  CAlert,
  CContainer,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
} from '@coreui/react'
import { Link } from 'react-router-dom'
import CustomTable from 'src/components/customComponent/CustomTable'
import TripStoService from 'src/Service/TripSTO/TripStoService'

const TripSto = () => {
  const [rowData, setRowData] = useState([])
  const [errorModal, setErrorModal] = useState(false)
  const [pending, setPending] = useState(true)
  let tableData = []

  const ACTION = {
    GATE_IN: 1,
    GATE_OUT: 2,
    WAIT_OUTSIDE: 3,
  }

  const loadTripStoTable = () => {
    TripStoService.getVehicleReadyToTripSto().then((res) => {
      tableData = res.data.data
      let rowDataList = []
      tableData.map((data, index) => {
        rowDataList.push({
          sno: index + 1,
          Tripsheet_No: '',
          Vehicle_Type: data.vehicle_type_id.type,
          Vehicle_No: data.vehicle_number,
          Driver_Name: data.driver_name,
          Waiting_At: (
            <span className="badge rounded-pill bg-info">
              {data.parking_status == ACTION.GATE_IN
                ? 'Trip STO'
                : data.parking_status == ACTION.WAIT_OUTSIDE
                ? 'Waiting Outside'
                : 'Gate Out'}
            </span>
          ),
          Screen_Duration: data.updated_at,
          Overall_Duration: data.created_at,
          Action: (
            <span>
              {data.vehicle_type_id.type != 'Party Vehicle' ? (
                <CButton
                  className="badge text-white"
                  color="warning"
                  onClick={() => setErrorModal(true)}
                >
                  Trip STO
                  {/* <Link to="/TripSheetCreation">Trip STO </Link> */}
                </CButton>
              ) : (
                ''
              )}
            </span>
          ),
        })
      })
      setRowData(rowDataList)
      setPending(false)
    })
  }

  useEffect(() => {
    loadTripStoTable()
  }, [])

  const columns = [
    {
      name: 'S.No',
      selector: (row) => row.sno,
      sortable: true,
      center: true,
    },
    {
      name: 'TripSheet No',
      selector: (row) => row.VA_No,
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
      name: 'Vehicle No',
      selector: (row) => row.Vehicle_No,
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
      name: 'Waiting At',
      selector: (row) => row.Waiting_At,
      // sortable: true,
      center: true,
    },
    {
      name: 'Screen Duration',
      selector: (row) => row.Screen_Duration,
      sortable: true,
      center: true,
    },
    {
      name: ' Overall Duration',
      selector: (row) => row.Overall_Duration,
      sortable: true,
      center: true,
    },
    {
      name: 'Action',
      selector: (row) => row.Action,
      center: true,
    },
  ]

  return (
    <>
      <CCard className="mt-4">
        <CContainer className="m-2">
          <CustomTable
            columns={columns}
            data={rowData}
            fieldName={'Driver_Name'}
            showSearchFilter={true}
            pending={pending}
          />
        </CContainer>
      </CCard>
      {/* Error Modal Section */}
      <CModal visible={errorModal} onClose={() => setErrorModal(false)}>
        <CModalHeader>
          <CModalTitle className="h4">Trip STO Confirmation</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow>
            <CCol>
              <CAlert color="danger" data-aos="fade-down">
                {'Are You Sure to Want to go Trip STO ?'}
              </CAlert>
            </CCol>
          </CRow>
        </CModalBody>
        <CModalFooter>
          <CButton color="primary">
            <Link to="/TripSheetCreation"> Yes </Link>
          </CButton>
          <CButton onClick={() => setErrorModal(false)} color="primary">
            <Link to=""> No </Link>
          </CButton>
        </CModalFooter>
      </CModal>
      {/* Error Modal Section */}
    </>
  )
}

export default TripSto
