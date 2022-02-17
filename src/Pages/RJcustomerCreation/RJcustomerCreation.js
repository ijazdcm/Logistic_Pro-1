import {
  CButton,
  CCard,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CFormTextarea,
  CRow,
  CTabContent,
  CTabPane,
} from '@coreui/react'
import CustomerCreationService from 'src/Service/CustomerCreation/CustomerCreationService'
import { Link, useNavigate, useParams } from 'react-router-dom'
import useForm from 'src/Hooks/useForm'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast } from 'react-toastify'
import { React, useState, useEffect } from 'react'
import VehicleMaintenanceValidation from 'src/Utils/TransactionPages/VehicleMaintenance/VehicleMaintenanceValidation'
import BankComponent from 'src/components/commoncomponent/BankComponent'

const RJcustomerCreation = () => {
const formValues = {
  customer_name: '',
  cMob: '',
  panCardattachment: '',
  panCard: '',
  AadharCopy: '',
  aadharCard: '',
  bankPass: '',
  bankName: '',
  bankBranch: '',
  bankAccount: '',
  ifscCode: '',
  street: '',
  area: '',
  city: '',
  district: '',
  state: '',
  postalCode: '',
  region: '',
  GST: '',
  payment: '',
}
const { values, errors, handleChange, onFocus, handleSubmit, enableSubmit, onBlur,isTouched } = useForm(
  CustomerCreation,
  VehicleMaintenanceValidation,
  formValues
)
const navigation = useNavigate()
function CustomerCreation () {

}
const addCustomerCreation = (status) => {
  const formData = new FormData()
  formData.append('customer_name', values.customer_name)
  formData.append('customer_mobile_number', values.cMob)
  formData.append('customer_PAN_card_number', values.panCardattachment)
  formData.append('customer_PAN_card', values.panCard)
  formData.append('customer_Aadhar_card_number', values.AadharCopy)
  formData.append('customer_Aadhar_card', values.aadharCard)
  formData.append('customer_bank_passbook', values.bankPass)
  formData.append('customer_bank_id', values.bankName)
  formData.append('customer_bank_branch', values.bankBranch)
  formData.append('customer_bank_ifsc_code', values.ifscCode)
  formData.append('customer_bank_account_number', values.bankAccount)
  formData.append('customer_street_name', values.street)
  formData.append('customer_city',values.area)
  formData.append('customer_district', values.city)
  formData.append('customer_area', values.district)
  formData.append('customer_state', values.state)
  formData.append('customer_postal_code', values.postalCode)
  formData.append('customer_region', values.region)
  formData.append('customer_gst_number', values.GST)
  formData.append('customer_payment_terms', values.payment)
  formData.append('customer_remarks', values.customer_remarks ? values.customer_remarks : 'NO REMARKS')
  formData.append('customer_status', status)

CustomerCreationService.addCustomerCreationData(formData).then((res) => {
  console.log(res)
  if (res.status == 200) {
    toast.success('Document Verification Done!')
    navigation('/vInspection')
  }
})
}
const [visible, setVisible] = useState(false)
const [currentVehicleInfo, setCurrentVehicleInfo] = useState({})
const [changeDriver, setChangeDriver] = useState(false)
const [fitForLoad, setFitForLoad] = useState('')
const [acceptBtn, setAcceptBtn] = useState(true)
const [rejectBtn, setRejectBtn] = useState(true)
const [oldDriver, setOldDriver] = useState('')
const [fetch, setFetch] = useState(false)
const VEHICLE_TYPE = {
  OWN: 1,
  CONTRACT: 2,
  HIRE: 3,
  PARTY: 4,
}

const { id } = useParams()

console.log(values)

useEffect(() => {
  CustomerCreationService.getSingleVehicleInfoOnParkingYardGate(id).then((res) => {
    values.customer_id = res.data.data.customer_id
    isTouched.customer_id = true
    isTouched.remarks = true
    setCurrentVehicleInfo(res.data.data)
    setFetch(true)
  })
}, [id])
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
  return (
    <>
      <CCard>
        <CTabContent>
          <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={true}>
            <CForm className="container p-3"onSubmit={handleSubmit}>
              <CRow className="">
              <CCol xs={12} md={3}>
                <CFormLabel htmlFor="customer_name">
                  Customer Name*
                  {errors.customer_name && (
                    <span className="small text-danger">{errors.customer_name}</span>
                  )}
                </CFormLabel>
                <CFormInput
                  size="sm"
                  name="customer_name"
                  id="customer_name"
                  maxLength={30}
                  onFocus={onFocus}
                  onBlur={onBlur}
                />
              </CCol>
                <CCol xs={12} md={3}>
                  <CFormLabel htmlFor="cMob">Customer Mobile Number</CFormLabel>
                  <CFormInput
                  size="sm"
                  id="cMob"
                  name='cMob'
                  value={values.cMob}
                  onFocus={onFocus}
                  onBlur={onBlur}
                  />
                </CCol>
                <CCol xs={12} md={3}>
                  <CFormLabel htmlFor="panCardattachment">PAN Card Attatchment</CFormLabel>
                  <CFormInput size="sm" type="file" id="panCardattachment"  />
                </CCol>
                <CCol xs={12} md={3}>
                  <CFormLabel htmlFor="panCard">PAN Number</CFormLabel>
                  <CFormInput size="sm" id="panCard"  />
                </CCol>
              </CRow>
              <CRow className="">
                <CCol xs={12} md={3}>
                  <CFormLabel htmlFor="AadharCopy">Aadhar Card</CFormLabel>
                  <CFormInput size="sm" type="file" id="AadharCopy"  />
                </CCol>
                <CCol xs={12} md={3}>
                  <CFormLabel htmlFor="aadharCard">Aadhar Number</CFormLabel>
                  <CFormInput size="sm" id="aadharCard"  />
                </CCol>

                <CCol xs={12} md={3}>
                  <CFormLabel htmlFor="bankPass">Bank Passbook</CFormLabel>
                  <CFormInput size="sm" type="file" id="bankPass"  />
                </CCol>
                <CCol xs={12} md={3}>
              <CFormLabel htmlFor="bankName">Bank Name</CFormLabel>
              <CFormSelect
                    size="sm"
                    name="bankName"
                    className=""
                    id='bankName'
                    aria-label="Small select example"
                  >
                 <BankComponent />
                  </CFormSelect>
            </CCol>
              </CRow>
              <CRow className="">
                <CCol xs={12} md={3}>
                  <CFormLabel htmlFor="bankBranch">Bank Branch</CFormLabel>
                  <CFormInput size="sm" id="bankBranch"  />
                </CCol>
                <CCol xs={12} md={3}>
                  <CFormLabel htmlFor="ifscCode">Bank IFSC Code</CFormLabel>
                  <CFormInput size="sm" id="ifscCode"  />
                </CCol>
                <CCol xs={12} md={3}>
                  <CFormLabel htmlFor="bankAccount">Bank Account Number</CFormLabel>
                  <CFormInput size="sm" id="bankAccount"  />
                </CCol>

                <CCol xs={12} md={3}>
                  <CFormLabel htmlFor="Street">Street Name</CFormLabel>

                  <CFormInput size="sm" id="Street"  />
                </CCol>
              </CRow>
              <CRow className="">
                <CCol xs={12} md={3}>
                  <CFormLabel htmlFor="Area">Area Name</CFormLabel>
                  <CFormInput size="sm" id="Area"  />
                </CCol>
                <CCol xs={12} md={3}>
                  <CFormLabel htmlFor="City">City</CFormLabel>
                  <CFormInput size="sm" id="City"  />
                </CCol>
                <CCol xs={12} md={3}>
                  <CFormLabel htmlFor="District">District</CFormLabel>
                  <CFormInput size="sm" id="District"  />
                </CCol>
                <CCol xs={12} md={3}>
                  <CFormLabel htmlFor="State">State</CFormLabel>
                  <CFormInput size="sm" id="State"  />
                </CCol>
              </CRow>
              <CRow className="">
                <CCol xs={12} md={3}>
                  <CFormLabel htmlFor="postalCode">Postal Code</CFormLabel>
                  <CFormInput size="sm" id="postalCode"  />
                </CCol>
                <CCol xs={12} md={3}>
                  <CFormLabel htmlFor="Region">Region</CFormLabel>
                  <CFormInput size="sm" id="Region" value="" readOnly />
                </CCol>
                <CCol xs={12} md={3}>
                  <CFormLabel htmlFor="GST">GST Number</CFormLabel>
                  <CFormInput size="sm" id="GST"  />
                </CCol>
                <CCol xs={12} md={3}>
                  <CFormLabel htmlFor="Payment">Payment Terms</CFormLabel>
                  <CFormInput size="sm" id="Payment"  />
                </CCol>
              </CRow>

              <CRow className="">
                <CCol xs={12} md={3}>
                  <CFormLabel htmlFor="inputAddress">Remarks</CFormLabel>
                  <CFormInput size="sm" id="inputAddress"  />
                </CCol>
              </CRow>
              <CRow className="mt-3">
                <CCol>
                  <CButton
                    size="sm"
                    color="primary"
                    // disabled={enableSubmit}
                    className="px-3 text-white"
                    type="button"
                  >
                    <Link to="/RJcustomerCreationHome"> Previous</Link>
                  </CButton>
                </CCol>
                <CCol className="offset-md-6 d-md-flex justify-content-end" xs={12} sm={12} md={3}>
                  <CButton
                    size="sm"
                    color="warning"
                    // disabled={enableSubmit}
                    className="mx-3 px-3 text-white"
                    type="submit"
                    onClick={() => addCustomerCreation(1)}
                  >
                    Submit
                  </CButton>
                  {/* <CButton
                    size="sm"
                    // disabled={enableSubmit}
                    color="warning"
                    className="px-3 text-white"
                    type="submit"
                  >
                    Cancel
                  </CButton> */}
                </CCol>
              </CRow>
            </CForm>
          </CTabPane>
        </CTabContent>
      </CCard>
    </>
  )
}

export default RJcustomerCreation
