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
  CFormTextarea,
} from '@coreui/react'

import { React, useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import DriverListSelectComponent from 'src/components/commoncomponent/DriverListSelectComponent'
import useForm from 'src/Hooks/useForm'
import VehicleMaintenanceValidation from 'src/Utils/TransactionPages/VehicleMaintenance/VehicleMaintenanceValidation'
import VehicleMaintenanceService from 'src/Service/VehicleMaintenance/VehicleMaintenanceService'
import ParkingYardGateService from 'src/Service/ParkingYardGate/ParkingYardGateService'
import validate from 'src/Utils/Validation'
import CustomTable from '../../components/customComponent/CustomTable'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import MaintenanceWorkorderComponent from 'src/components/commoncomponent/MaintenanceWorkorderComponent'
import MaintenanceWorkorderService from 'src/Service/MaintenanceWorkorder/MaintenanceWorkorderService'

const VehicleMaintainenceEnd = () => {
  const [outSide, setoutSide] = useState(false)
  const formValues = {
    vehicle_id: '',
    driverId: '',
    vendorName: '',
    maintenenceType: '',
    maintenenceBy: '',
    workOrder: '',
    vendorName: '',
    MaintenanceStart: '',
    MaintenanceEnd: '',
    closingOdoKM: '',
  }
  const border = {
    borderColor: '#b1b7c1',
  }

    const { values, errors, handleChange, onFocus, handleSubmit, enableSubmit, onBlur, isTouched } =
    useForm(MaintenanceVehicle, VehicleMaintenanceValidation, formValues)

    const navigation = useNavigate()

    const addVehicleMaintenance=(status)=>{
      let data = new FormData();
      data.append('vehicle_id', values.vehicle_id);
      data.append('driver_id', values.driverId);
      data.append('maintenance_typ', values.maintenenceType);
      data.append('maintenance_by', values.maintenenceBy);
      data.append('work_order', values.workOrder);
      data.append('vendor_id', values.vendorName);
      data.append('maintenance_start_datetime', values.MaintenanceStart);
      data.append('maintenance_end_datetime', values.MaintenanceEnd);
      data.append('closing_odometer_km', values.closingOdoKM);
      data.append('vehicle_maintenance_status', status);
      // data.append('closing_odometer_photo', values.closingOdoPhoto);
      data.append('remarks', (values.remarks)?values.remarks:"NO REMARKS");

    VehicleMaintenanceService.updateMaintenance(data).then(res=>{

        if(res.status==200)
        {
          toast.success('Vehicle Maintenance process completed')
          navigation("/vMain")
        }
      })
    }


    function MaintenanceVehicle () {



    }

    const [visible, setVisible] = useState(false)
    const [currentVehicleInfo, setCurrentVehicleInfo] = useState({})
    const [changeDriver, setChangeDriver] = useState(false)
    const [fitForLoad, setFitForLoad] = useState('')
    const [acceptBtn, setAcceptBtn] = useState(true)
    const [rejectBtn, setRejectBtn] = useState(true)
    const [oldDriver, setOldDriver] = useState('')
    const [fetch, setFetch] = useState(false)
    const [driver, setDriver] = useState([])
    const [driverPhoneNumberById, setDriverPhoneNumberById] = useState("")
    const VEHICLE_TYPE = {
      OWN: 1,
      CONTRACT: 2,
      HIRE: 3,
      PARTY: 4,
    }

    const { id } = useParams()

    // useEffect(() => {
    //   VehicleMaintenanceService.getSingleVehicleInfoOnParkingYardGate(id).then((res) => {
    //     values.vehicle_id = res.data.data.vehicle_id
    //     isTouched.vehicle_id = true
    //     isTouched.remarks = true
    //     setCurrentVehicleInfo(res.data.data)
    //     setFetch(true)
    //   })
    // }, [id])

    useEffect(() => {
      if (values.workOrder) {

        MaintenanceWorkorderService.getMaintenanceWorkorderService().then((res) => {

          let vendorName_data = res.data;
          // console.log(vendorName_data);
          // vendorName_data.map
          // values.vendorName = 'test';

          vendorName_data.map((res)=>{
            // console.log(res)
            // values.vendorName = 'test';
            console.log(res.EBELN)

            // onBlur.vendorName =true
            if(res.EBELN == values.workOrder){
              isTouched.vendorName =true
              values.vendorName = res.NAME1;
            }
          })
        })

      } else {
        values.vendorName = '';
      }
    }, [values.workOrder])


    useEffect(() => {
      //fetch to get Drivers list form master
      VehicleMaintenanceService.getDrivers().then((res) => {
        setDriver(res.data.data)
      })
    }, [])

    // useEffect(() => {

    //   if (values.driverId)
    //   {

    //     //fetch to get Drivers info list form master by id
    //   ParkingYardGateService.getDriverInfoById(values.driverId).then((res) => {

    //     isTouched.driverPhoneNumber =true
    //     values.driverPhoneNumber =res.data.data.driver_phone_1
    //     isTouched.driverName =true
    //     values.driverName =res.data.data.driver_name
    //     setDriverPhoneNumberById(res.data.data.driver_phone_1)
    //   })

    //   }

    // }, [values.driverId])
    useEffect(() => {
      if (Object.keys(isTouched).length == Object.keys(formValues).length) {
        if (Object.keys(errors).length == 0) {
          setFitForLoad('YES')
          setAcceptBtn(false)
          setRejectBtn(true)
        } else {
          setFitForLoad('NO')
          setAcceptBtn(true)
          setRejectBtn(false)
        }
      }
    }, [values, errors])

    useEffect(() => {
        //section to fetch single Driver info
        VehicleMaintenanceService.getMaintenanceById(id).then((res) => {
          values.vehicle_id = res.data.data.vehicle_id
          values.driverId = res.data.data.driver_id
          values.maintenenceType = res.data.data.maintenance_typ
          values.maintenenceBy = res.data.data.maintenance_by
          values.workOrder = res.data.data.work_order
          values.vendorName = res.data.data.vendor_id
          values.MaintenanceStart = res.data.data.maintenance_start_datetime
          values.MaintenanceEnd = res.data.data.maintenance_end_datetime
          values.closingOdoKM = res.data.data.closing_odometer_km
        })
      }, [id])
      useEffect(() => {
        VehicleMaintenanceService.getVehicleMaintenanceInfo(id).then((res) => {
          const resData = res.data.data[0]
          values.vehicle_id = res.data.data.vehicle_id
          console.log(resData)
          setCurrentInfo(resData)
          setFetch(true)
        })
      }, [])

  return (
    <>
      <CCard>
        <CTabContent>
          <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={true}>
            <CForm className="container p-3" onSubmit={handleSubmit}>
              <CRow>
                <CCol xs={12} md={3}>
                  <CFormLabel htmlFor="vNum">Vehicle No*</CFormLabel>

                  <CFormInput
                      name="vNum"
                      size="sm"
                      id="vNum"
                      value={fetch ? currentInfo.vendor_info.vehicle_id : ''}
                      placeholder=""
                      readOnly
                    />
                </CCol>
                <CCol className="mb-3" md={3}>
                  <CFormLabel htmlFor="maintenenceBy">
                    Maintenance By *
                    {errors.maintenenceBy && (
                      <span className="small text-danger">{errors.maintenenceBy}</span>
                    )}
                  </CFormLabel>
                  <CFormSelect
                    size="sm"
                    id="maintenenceBy"
                    className={`${errors.maintenenceBy && 'is-invalid'}`}
                    name="maintenenceBy"
                    value={fetch ? currentInfo.vendor_info.maintenance_by : ''}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onChange={handleChange}
                  >
                    <option value="" hidden selected>
                      Select Maintenance By
                    </option>
                    <option value="inHouse" onClick={() => setoutSide(false)}>
                      Inhouse
                    </option>
                    <option value="outSide" onClick={() => setoutSide(true)}>
                      Outside
                    </option>
                  </CFormSelect>
                </CCol>
                <CCol className="mb-3" md={3}>
                  <CFormLabel htmlFor="maintenenceType">
                    Maintenance Type *{' '}
                    {errors.maintenenceType && (
                      <span className="small text-danger">{errors.maintenenceType}</span>
                    )}
                  </CFormLabel>
                  <CFormSelect
                    size="sm"
                    id="maintenenceType"
                    className={`${errors.maintenenceType && 'is-invalid'}`}
                    name="maintenenceType"
                    value={fetch ? currentInfo.vendor_info.vendor_Id : ''}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onChange={handleChange}
                    required
                  >
                    <option value="" hidden selected>
                      Select Maintenance Type
                    </option>
                    <option value="scheduled">Scheduled Maintenance</option>
                    <option value="breakDown">Break Down Maintnenence</option>
                  </CFormSelect>
                </CCol>
                <CCol xs={12} md={3}>
                  <CFormLabel htmlFor="MaintenanceStart">
                  Maintenance Start Date & Time*
                    {errors.MaintenanceStart && (
                      <span className="small text-danger" >{errors.MaintenanceStart}</span>
                    )}
                  </CFormLabel>

                  <CFormInput
                    size="sm"
                    id="MaintenanceStart"
                    className={`${errors.MaintenanceStart && 'is-invalid'}`}
                    name="MaintenanceStart"
                    value={fetch ? currentInfo.vendor_info.maintenance_start_datetime : ''}
                    type="date"
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onChange={handleChange}
                  />
                </CCol>
                <CCol xs={12} md={3}>
        <CFormLabel htmlFor="driverId" hidden={!outSide}>
          Driver Name*{' '}
          {errors.driverId && <span className="small text-danger">{errors.driverId}</span>}
        </CFormLabel>
        <CFormSelect
          size="sm"
          name="driverId"
          id="driverId"
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={handleChange}
          hidden={!outSide}
          value={fetch ? currentInfo.vendor_info.driver_id : ''}
          className={`${errors.driverId && 'is-invalid'}`}
          aria-label="Small select example"

        >
          <option value={""}>
            Select...
          </option>
          {driver.map(({ driver_id, driver_name }) => {
            return (
              <>
                <option key={driver_id} value={driver_id}>
                  {driver_name}
                </option>
              </>
            )
          })}
        </CFormSelect>
      </CCol>


                <CCol className="mb-3" md={3}>
                  <CFormLabel htmlFor="workOrder"hidden={!outSide}>
                    Work Order *
                    {errors.workOrder && (
                      <span className="small text-danger">{errors.workOrder}</span>
                    )}
                  </CFormLabel>
                  <CFormSelect
                    size="sm"
                    id="workOrder"
                    className={`${currentVehicleInfo.workOrder && 'is-invalid'}`}
                    name="workOrder"
                    // value={values.workOrder || ''}
                    value={fetch ? currentInfo.vendor_info.work_order : ''}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onChange={handleChange}
                    hidden={!outSide}
                  >
                 <MaintenanceWorkorderComponent />
                  </CFormSelect>
                </CCol>
                <CCol className="mb-3" md={3}>
                  <CFormLabel htmlFor="vendorName"
                    hidden={!outSide}
                  >
                    Vendor Name *
                    {errors.vendorName && (
                      <span className="small text-danger">{errors.vendorName}</span>
                    )}
                  </CFormLabel>
                  <CFormInput
                    size="sm"
                    id="vendorName"
                    className={`${currentVehicleInfo.vendorName && 'is-invalid'}`}
                    name="vendorName"
                    value={fetch ? currentInfo.vendor_info.work_order : ''}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    hidden={!outSide}
                    onChange={handleChange}
                    readOnly
                  />
                </CCol>
                <CCol xs={12} md={3}>
                  <CFormLabel htmlFor="MaintenanceEnd"
                    hidden={!outSide}
                  >
                    Maintenance End Date & Time*
                    {errors.MaintenanceEnd && (
                      <span className="small text-danger">{errors.MaintenanceEnd}</span>
                    )}
                  </CFormLabel>

                  <CFormInput
                    size="sm"
                    id="MaintenanceEnd"
                    className={`${errors.MaintenanceEnd && 'is-invalid'}`}
                    name="MaintenanceEnd"
                    value={values.MaintenanceEnd}
                    type="date"
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onChange={handleChange}
                    hidden={!outSide}
                  />
                </CCol>
                <CCol xs={12} md={3}>
                  <CFormLabel htmlFor="closingOdoKM"
                    hidden={!outSide}
                  >
                    Closing Odometer KM
                    {errors.closingOdoKM && (
                      <span className="small text-danger">{errors.closingOdoKM}</span>
                    )}
                  </CFormLabel>

                  <CFormInput
                    size="sm"
                    id="closingOdoKM"
                    className={`${errors.closingOdoKM && 'is-invalid'}`}
                    name="closingOdoKM"
                    value={currentVehicleInfo.odometer_km}
                    type="text"
                    hidden={!outSide}
                    maxLength='6'
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onChange={handleChange}
                    readOnly
                  />
                </CCol>
                <CCol xs={12} md={3}>
                  <CFormLabel htmlFor="remarks">Remarks</CFormLabel>
                  <CFormTextarea  name="remarks"
                  id="remarks"
                  onBlur={onBlur}
                  onChange={handleChange}
                  value={values.remarks}
                  rows="1"></CFormTextarea>
                </CCol>
              </CRow>

              <CRow>
                <CCol>
                <Link to={'/VMain'}>
                  <CButton
                    md={6}
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
                    className="pull-right"
                    xs={12}
                    sm={12}
                    md={3}
                    style={{ display: 'flex', justifyContent: 'flex-end' }}
                  >
                  {/* <CButton
                    size="sm"
                    color="warning"
                    disabled=""
                    className="mx-3 text-white"
                    type="button"
                    hidden={outSide}
                  >
                    Maintenence End
                  </CButton> */}
                  <CButton
                    size="sm"
                    color="warning"
                    className="mx-3 text-white"
                    type="button"
                    hidden={outSide}
                    // disabled={acceptBtn}
                    onClick={() => addVehicleMaintenance(1)}
                  >
                    Maintenence Start
                  </CButton>

                  <CButton
                    size="sm"
                    color="warning"
                    className="mx-3 text-white"
                    type="button"
                    hidden={!outSide}
                    // disabled={acceptBtn}
                    onClick={() => addVehicleMaintenance(0)}
                  >
                    Gate Out
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

export default VehicleMaintainenceEnd
