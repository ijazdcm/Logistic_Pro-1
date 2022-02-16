import { React, useState, useEffect } from 'react'
import { CButton, CCard, CContainer } from '@coreui/react'
import { Link } from 'react-router-dom'
import CustomTable from 'src/components/customComponent/CustomTable'
import VehicleMaintenanceService from 'src/Service/VehicleMaintenance/VehicleMaintenanceService'

const VehicleMaintainence = () => {

  const [rowData, setRowData] = useState([])
  let tableData = []

  const ACTION = {
    GATE_IN: 1,
    GATE_OUT: 2,
    WAIT_OUTSIDE: 3,
  }
  const loadVehicleMaintenanceTable=()=>{
    VehicleMaintenanceService.getVehicleReadyToMaintenance().then((res) => {
      tableData = res.data.data
      let rowDataList = []
      const filterData = tableData.filter((data) => data.vehicle_type_id.id == 1 )
      console.log(filterData)
      filterData.map((data, index) => {
      // tableData.map((data, index) => {
        rowDataList.push({
          sno: index + 1,
          Tripsheet_No: '',
          Vehicle_Type: data.vehicle_type_id.type,
          Vehicle_No: data.vehicle_number,
          Driver_Name: data.driver_name,
          Waiting_At: (
            <span className="badge rounded-pill bg-info">
              {data.parking_status == ACTION.GATE_IN
                ? 'Vehicle Maintenance'
                : data.parking_status == ACTION.WAIT_OUTSIDE
                ? 'Waiting Outside'
                : 'Gate Out'}
            </span>
          ),
          Screen_Duration:data.updated_at ,
          Overall_Duration: data.created_at,
          Action:(
            <span>
              {data.vehicle_type_id.type != 'Party Vehicle' && data.vehicle_type_id.type != 'Hire' ? (
                 <CButton className="badge text-white" color="warning">
                 <Link to={`vehicleMaintainence/${data.parking_yard_gate_id}`}>
                 Vehicle Maintenance
                 </Link>
               </CButton>
              ) : ('')}

              </span>
          )
        })
      })
      setRowData(rowDataList)
    })
  }


  useEffect(()=>{
    loadVehicleMaintenanceTable()
  },[])



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
      sortable: true,
      center: true,
    },
    {
      name: 'Screen Duration',
      selector: (row) => row.Screen_Duration,
      center: true,
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
        <CustomTable columns={columns} data={rowData} />
      </CContainer>
    </CCard>
  )
}

export default VehicleMaintainence
