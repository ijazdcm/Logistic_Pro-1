import { React, useState, useEffect } from 'react'
import { CButton, CCard, CContainer } from '@coreui/react'
import { Link } from 'react-router-dom'
import CustomTable from 'src/components/customComponent/CustomTable'
import VehicleInspectionService from 'src/Service/VehicleInspection/VehicleInspectionService'

const VInspection = () => {
  const [rowData, setRowData] = useState([])
  const [pending, setPending] = useState(true)
  let tableData = []

  const ACTION = {
    GATE_IN: 1,
    GATE_OUT: 2,
    WAIT_OUTSIDE: 3,
  }
  const loadVehicleInspectionTable = () => {
    VehicleInspectionService.getVehicleReadyToInspect().then((res) => {
      tableData = res.data.data
      console.log(tableData)
      let rowDataList = []
      tableData.map((data, index) => {
        rowDataList.push({
          sno: index + 1,
          // Tripsheet_No: '',
          Vehicle_Type: data.vehicle_type_id.type,
          Vehicle_No: data.vehicle_number,
          Driver_Name: data.driver_name,
          Waiting_At: (
            <span className="badge rounded-pill bg-info">
              {data.parking_status == ACTION.GATE_IN
                ? 'Vehicle Inspection'
                : data.parking_status == ACTION.WAIT_OUTSIDE
                ? 'Waiting Outside'
                : 'Gate Out'}
            </span>
          ),
          Screen_Duration: data.updated_at,
          Overall_Duration: data.created_at,
          Action: (
            <CButton className="badge" color="warning">
              <Link className="text-white" to={`vehicleInspection/${data.parking_yard_gate_id}`}>Vehicle Inspection</Link>
            </CButton>
          ),
        })
      })
      setRowData(rowDataList)
      setPending(false)
    })
  }

  useEffect(() => {
    loadVehicleInspectionTable()
  }, [])

  const columns = [
    {
      name: 'S.No',
      selector: (row) => row.sno,
      sortable: true,
      center: true,
    },
    // {
    //   name: 'TripSheet No',
    //   selector: (row) => row.VA_No,
    //   sortable: true,
    //   center: true,
    // },
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
      sortable: true,
      center: true,
    },
    {
      name: 'Screen Duration',
      selector: (row) => row.Screen_Duration,
      center: true,
      sortable: true,
    },
    {
      name: ' Overall Duration',
      selector: (row) => row.Overall_Duration,
      center: true,
    },
    {
      name: 'Action',
      selector: (row) => row.Action,
      center: true,
    },
  ]

  return (
    <CCard className="mt-4">
      <CContainer className="mt-2">
        <CustomTable
          columns={columns}
          data={rowData}
          fieldName={'Driver_Name'}
          showSearchFilter={true}
          pending={pending}
        />
      </CContainer>
    </CCard>
  )
}

export default VInspection
