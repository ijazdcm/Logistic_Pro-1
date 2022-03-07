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
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CAlert,
  CModalFooter,
} from '@coreui/react'
import CustomerCreationService from 'src/Service/CustomerCreation/CustomerCreationService'
import { Link, useNavigate, useParams } from 'react-router-dom'
import useForm from 'src/Hooks/useForm'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast } from 'react-toastify'
import { React, useState, useEffect } from 'react'
import RJCustomerValidation from 'src/Utils/TransactionPages/RJCustomerCreation/RJCustomerValidation'
import BankComponent from 'src/components/commoncomponent/BankComponent'

const RJcustomerCreation = () => {
  const formValues = {
    createdtype: '',
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
    City: '',
    district: '',
    state: '',
    postalCode: '',
    region: '',
    GST: '',
    Payment: '',
    customer_payment_id: '',
    incoterms: '',
    incoterms_description: ''
  }

  const navigation = useNavigate()
  const [errorModal, setErrorModal] = useState(false)
  const [error, setError] = useState({})

  const { values, errors, handleChange, onFocus, handleSubmit, enableSubmit, onBlur } = useForm(
    CustomerCreation,
    RJCustomerValidation,
    formValues
  )
  function getCurrentDate(separator = '') {
    let newDate = new Date()
    let date = newDate.getDate()
    let month = newDate.getMonth() + 1
    let year = newDate.getFullYear()

    return `${year}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${date}`
  }

  function CustomerCreation() {
    const formData = new FormData()
    formData.append('creation_type', values.createdtype)
    formData.append('customer_name', values.customer_name)
    formData.append('customer_mobile_number', values.cMob)
    formData.append('customer_PAN_card_number', values.panCard)
    formData.append('customer_PAN_card', values.panCardattachment)
    formData.append('customer_Aadhar_card_number', values.aadharCard)
    formData.append('customer_Aadhar_card', values.AadharCopy)
    formData.append('customer_bank_passbook', values.bankPass)
    formData.append('customer_bank_id', values.bankName)
    formData.append('customer_bank_branch', values.bankBranch)
    formData.append('customer_bank_ifsc_code', values.ifscCode)
    formData.append('customer_bank_account_number', values.bankAccount)
    formData.append('customer_street_name', values.street)
    formData.append('customer_city', values.City)
    formData.append('customer_district', values.district)
    formData.append('customer_area', values.area)
    formData.append('customer_state', values.state)
    formData.append('customer_postal_code', values.postalCode)
    formData.append('region', values.state.substring(0,2))
    formData.append('customer_gst_number', values.GST)
    formData.append('customer_payment_terms', values.Payment)
    formData.append('customer_payment_id', values.Payment)
    formData.append('incoterms', values.incoterms_description)
    formData.append('incoterms_description', values.incoterms_description)
    formData.append(
      'customer_remarks',
      values.customer_remarks ? values.customer_remarks : 'NO REMARKS'
    )
    formData.append('customer_status', '')

    CustomerCreationService.createCustomer(formData)
      .then((res) => {
        console.log(res)
        if (res.status === 201) {
          toast.success('Customer Created Successfully!')

          setTimeout(() => {
            navigation('/RJcustomerCreationHome')
          }, 1000)
        }
      })
      .catch((error) => {
        var object = error.response.data.errors
        var output = ''
        for (var property in object) {
          output += '*' + object[property] + '\n'
        }
        setError(output)
        setErrorModal(true)
      })
  }

  return (
    <>
      <CCard>
        <CTabContent>
          <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={true}>
            <CForm className="container p-3" onSubmit={handleSubmit}>
              <CRow className="">
                <CCol xs={12} md={3}>
                  <CFormLabel htmlFor="createdtype">
                    Customer Type*
                    {errors.createdtype && (
                      <span className="small text-danger">{errors.createdtype}</span>
                    )}
                  </CFormLabel>

                  <CFormSelect
                    size="sm"
                    id="createdtype"
                    className={`${errors.createdtype && 'is-invalid'}`}
                    name="createdtype"
                    value={values.createdtype}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onChange={handleChange}
                  >
                    <option value="" hidden selected>
                      Select ...
                    </option>
                    <option value="shed">RJ Shed</option>
                    <option value="customer">RJ Customer</option>
                  </CFormSelect>
                </CCol>

                <CCol xs={12} md={3}>
                  <CFormLabel htmlFor="customer_name">
                    Name*
                    {errors.customer_name && (
                      <span className="small text-danger">{errors.customer_name}</span>
                    )}
                  </CFormLabel>
                  <CFormInput
                    name="customer_name"
                    size="sm"
                    maxLength={30}
                    id="customer_name"
                    onChange={handleChange}
                    value={values.customer_name}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    placeholder=""
                  />
                </CCol>
                <CCol xs={12} md={3}>
                  <CFormLabel htmlFor="cMob">
                    Mobile Number*
                    {errors.cMob && <span className="small text-danger">{errors.cMob}</span>}
                  </CFormLabel>
                  <CFormInput
                    name="cMob"
                    size="sm"
                    maxLength={10}
                    id="cMob"
                    onChange={handleChange}
                    value={values.cMob}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    placeholder=""
                  />
                </CCol>
                <CCol xs={12} md={3}>
                  <CFormLabel htmlFor="panCardattachment">PAN Card Attatchment</CFormLabel>
                  <CFormInput
                    name="panCardattachment"
                    type="file"
                    size="sm"
                    id="panCardattachment"
                    onChange={handleChange}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    placeholder=""
                    accept=".jpg,.jpeg"
                  />
                </CCol>
                <CCol xs={12} md={3}>
                  <CFormLabel htmlFor="panCard">
                    PAN Number
                    {errors.panCard && <span className="small text-danger">{errors.panCard}</span>}
                  </CFormLabel>
                  <CFormInput
                    name="panCard"
                    size="sm"
                    maxLength={10}
                    id="panCard"
                    onChange={handleChange}
                    value={values.panCard}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    placeholder=""
                  />
                </CCol>

                <CCol xs={12} md={3}>
                  <CFormLabel htmlFor="AadharCopy">Aadhar Card</CFormLabel>
                  <CFormInput
                    name="AadharCopy"
                    type="file"
                    size="sm"
                    id="AadharCopy"
                    onChange={handleChange}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    placeholder=""
                    accept=".jpg,.jpeg"
                  />
                </CCol>
                <CCol xs={12} md={3}>
                  <CFormLabel htmlFor="aadharCard">
                    Aadhar Number
                    {errors.aadharCard && (
                      <span className="small text-danger">{errors.aadharCard}</span>
                    )}
                  </CFormLabel>
                  <CFormInput
                    name="aadharCard"
                    size="sm"
                    maxLength={12}
                    id="aadharCard"
                    onChange={handleChange}
                    value={values.aadharCard}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    placeholder=""
                  />
                </CCol>

                <CCol xs={12} md={3}>
                  <CFormLabel htmlFor="bankPass">Bank Passbook</CFormLabel>
                  <CFormInput
                    name="bankPass"
                    type="file"
                    size="sm"
                    id="bankPass"
                    onChange={handleChange}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    placeholder=""
                    accept=".jpg,.jpeg"
                  />
                </CCol>
                <CCol xs={12} md={3}>
                  <CFormLabel htmlFor="bankName">Bank Name</CFormLabel>
                  <CFormSelect
                    size="sm"
                    name="bankName"
                    onChange={handleChange}
                    onFocus={onFocus}
                    value={values.bankName}
                    className={`mb-1 ${errors.bankName && 'is-invalid'}`}
                    aria-label="Small select example"
                    id="bankName"
                  >
                    <BankComponent />
                  </CFormSelect>
                </CCol>

                <CCol xs={12} md={3}>
                  <CFormLabel htmlFor="bankBranch">
                    Bank Branch
                    {errors.bankBranch && (
                      <span className="small text-danger">{errors.bankBranch}</span>
                    )}
                  </CFormLabel>
                  <CFormInput
                    name="bankBranch"
                    size="sm"
                    maxLength={30}
                    id="bankBranch"
                    onChange={handleChange}
                    value={values.bankBranch}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    placeholder=""
                  />
                </CCol>
                <CCol xs={12} md={3}>
                  <CFormLabel htmlFor="ifscCode">
                    Bank IFSC Code
                    {errors.ifscCode && (
                      <span className="small text-danger">{errors.ifscCode}</span>
                    )}
                  </CFormLabel>
                  <CFormInput
                    name="ifscCode"
                    size="sm"
                    maxLength={11}
                    id="ifscCode"
                    onChange={handleChange}
                    value={values.ifscCode}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    placeholder=""
                  />
                </CCol>
                <CCol xs={12} md={3}>
                  <CFormLabel htmlFor="bankAccount">
                    Bank Account Number
                    {errors.bankAccount && (
                      <span className="small text-danger">{errors.bankAccount}</span>
                    )}
                  </CFormLabel>
                  <CFormInput
                    name="bankAccount"
                    size="sm"
                    maxLength={20}
                    id="bankAccount"
                    onChange={handleChange}
                    value={values.bankAccount}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    placeholder=""
                  />
                </CCol>

                <CCol xs={12} md={3}>
                  <CFormLabel htmlFor="street">
                    Street Name
                    {errors.street && <span className="small text-danger">{errors.street}</span>}
                  </CFormLabel>

                  <CFormInput
                    name="street"
                    size="sm"
                    maxLength={30}
                    id="street"
                    onChange={handleChange}
                    value={values.street}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    placeholder=""
                  />
                </CCol>

                <CCol xs={12} md={3}>
                  <CFormLabel htmlFor="area">
                    Area Name
                    {errors.area && <span className="small text-danger">{errors.area}</span>}
                  </CFormLabel>
                  <CFormInput
                    name="area"
                    size="sm"
                    maxLength={30}
                    id="area"
                    onChange={handleChange}
                    value={values.area}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    placeholder=""
                  />
                </CCol>
                <CCol xs={12} md={3}>
                  <CFormLabel htmlFor="City">City</CFormLabel>
                  {errors.City && <span className="small text-danger">{errors.City}</span>}
                  <CFormInput
                    name="City"
                    size="sm"
                    maxLength={20}
                    id="City"
                    onChange={handleChange}
                    value={values.City}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    placeholder=""
                  />
                </CCol>
                <CCol xs={12} md={3}>
                  <CFormLabel htmlFor="district">
                    District
                    {errors.district && (
                      <span className="small text-danger">{errors.district}</span>
                    )}
                  </CFormLabel>
                  <CFormInput
                    name="district"
                    size="sm"
                    maxLength={20}
                    id="district"
                    onChange={handleChange}
                    value={values.district}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    placeholder=""
                  />
                </CCol>

                <CCol xs={12} md={3}>
              <CFormLabel htmlFor="state">
                State
                {errors.state && <span className="small text-danger">{errors.state}</span>}
              </CFormLabel>

              <CFormSelect
                size="sm"
                id="state"
                name="state"
                value={values.state}
                onFocus={onFocus}
                onBlur={onBlur}
                onChange={handleChange}
                className={`${errors.state && 'is-invalid'}`}
                aria-label="Small select example"
              >
                <option value={''} hidden selected>
                  Select...
                </option>
                <option value="24-Gujarat">Gujarat</option>
                <option value="27-Maharashtra">Maharashtra</option>
                <option value="29-Karnataka">Karnataka</option>
                <option value="32-Kerala">Kerala</option>
                <option value="33-Tamil nadu">Tamil nadu</option>
                <option value="34-Pondicherry">Pondicherry</option>
                <option value="36-Telengana">Telengana</option>
                <option value="37-Andhra pradesh">Andhra pradesh</option>
              </CFormSelect>
                </CCol>

                <CCol xs={12} md={3}>
                  <CFormLabel htmlFor="postalCode">
                    Postal Code
                    {errors.postalCode && (
                      <span className="small text-danger">{errors.postalCode}</span>
                    )}
                  </CFormLabel>
                  <CFormInput
                    name="postalCode"
                    size="sm"
                    maxLength={6}
                    id="postalCode"
                    onChange={handleChange}
                    value={values.postalCode}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    placeholder=""
                  />
                </CCol>
                <CCol xs={12} md={3}>
                  <CFormLabel htmlFor="region">
                    Region
                    {errors.region && <span className="small text-danger">{errors.region}</span>}
                  </CFormLabel>
                  <CFormInput
                     size="sm"
                     id="region"
                     name="region"
                     maxLength={2}
                     value={values.state.substring(0, 2)}
                     placeholder="Select State"
                     onFocus={onFocus}
                     onBlur={onBlur}
                     onChange={handleChange}
                     readOnly
                  />
                </CCol>
                <CCol xs={12} md={3}>
                  <CFormLabel htmlFor="GST">
                    GST Number
                    {errors.GST && <span className="small text-danger">{errors.GST}</span>}
                  </CFormLabel>
                  <CFormInput
                    name="GST"
                    size="sm"
                    maxLength={15}
                    id="GST"
                    onChange={handleChange}
                    value={values.GST}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    placeholder=""
                  />
                </CCol>
                <CCol xs={12} md={3}>
                  <CFormLabel htmlFor="Payment">Payment Terms*
                    {errors.Payment && <span className="small text-danger">{errors.Payment}</span>}
                  </CFormLabel>
                  <CFormSelect
                size="sm"
                id="Payment"
                name="Payment"
                value={values.Payment}
                onFocus={onFocus}
                onBlur={onBlur}
                onChange={handleChange}
                className={`${errors.Payment && 'is-invalid'}`}
                aria-label="Small select example"
              >
                <option value={''} hidden selected>
                  Select...
                </option>
                <option value="ADVA">Advance Payment</option>
                <option value="D001">Within 1 day Due net</option>
                <option value="D002">Within 2 day Due net</option>
                <option value="D003">Within 3 day Due net</option>
                <option value="D004">Within 4 day Due net</option>
                <option value="D005">Within 5 day Due net</option>
                <option value="D006">Within 6 day Due net</option>
                <option value="D007">Within 7 day Due net</option>
                <option value="D008">Within 8 day Due net</option>
                <option value="D009">Within 9 day Due net</option>
                <option value="D010">Within 10 day Due net</option>
                <option value="D011">Within 11 day Due net</option>
                <option value="D012">Within 12 day Due net</option>
                <option value="D013">Within 13 day Due net</option>
                <option value="D014">Within 14 day Due net</option>
                <option value="D015">Within 15 day Due net</option>
                <option value="D016">Within 16 day Due net</option>
                <option value="D017">Within 17 day Due net</option>
                <option value="D018">Within 18 day Due net</option>
                <option value="D019">Within 19 day Due net</option>
                <option value="D020">Within 20 day Due net</option>
                <option value="D021">Within 21 day Due net</option>
                <option value="D022">Within 22 day Due net</option>
                <option value="D023">Within 23 day Due net</option>
                <option value="D024">Within 24 day Due net</option>
                <option value="D025">Within 25 day Due net</option>
                <option value="D026">Within 26 day Due net</option>
                <option value="D027">Within 27 day Due net</option>
                <option value="D028">Within 28 day Due net</option>
                <option value="D029">Within 20 day Due net</option>
                <option value="D030">Within 30 day Due net</option>
                <option value="D035">Within 35 day Due net</option>
                <option value="D045">Within 40 day Due net</option>
                <option value="D040">Within 45 day Due net</option>
                <option value="D050">Within 50 day Due net</option>
                <option value="D060">Within 60 day Due net</option>
                <option value="D090">Within 90 day Due net</option>
              </CFormSelect>
                </CCol>
                <CCol xs={12} md={3}>
                  <CFormLabel htmlFor="customer_payment_id">
                    Payment Type
                    {errors.customer_payment_id && <span className="small text-danger">{errors.customer_payment_id}</span>}
                  </CFormLabel>
                  <CFormInput
                     size="sm"
                     id="customer_payment_id"
                     name="customer_payment_id"
                     maxLength={2}
                     value={values.Payment}
                     placeholder="Select Payment Terms"
                     onFocus={onFocus}
                     onBlur={onBlur}
                     onChange={handleChange}
                     readOnly
                  />
                </CCol>
                <CCol xs={12} md={3}>
                <CFormLabel htmlFor="incoterms_description">
                Incoterms Description*
                {errors.incoterms_description && <span className="small text-danger">{errors.incoterms_description}</span>}
              </CFormLabel>

              <CFormSelect
                size="sm"
                id="incoterms_description"
                name="incoterms_description"
                value={values.incoterms_description}
                onFocus={onFocus}
                onBlur={onBlur}
                onChange={handleChange}
                className={`${errors.incoterms_description && 'is-invalid'}`}
                aria-label="Small select example"
              >
                <option value={''} hidden selected>
                  Select...
                </option>
                <option value="CFR">Cost and Freight</option>
                <option value="CT1">Customer Regular</option>
                <option value="FOB">Free on Board</option>
              </CFormSelect>
              </CCol>
              <CCol xs={12} md={3}>
                  <CFormLabel htmlFor="incoterms">
                  Incoterms Type
                    {errors.incoterms && <span className="small text-danger">{errors.incoterms}</span>}
                  </CFormLabel>
                  <CFormInput
                     size="sm"
                     id="incoterms"
                     name="incoterms"
                     maxLength={2}
                     value={values.incoterms_description}
                     placeholder="Select incoterms"
                     onFocus={onFocus}
                     onBlur={onBlur}
                     onChange={handleChange}
                     readOnly
                  />
                </CCol>
                <CCol xs={12} md={3}>
                  <CFormLabel htmlFor="customer_remarks">Remarks</CFormLabel>
                  <CFormInput
                    name="customer_remarks"
                    size="sm"
                    maxLength={40}
                    id="customer_remarks"
                    onChange={handleChange}
                    value={values.customer_remarks}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    placeholder=""
                  />
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
      <CModal visible={errorModal} onClose={() => setErrorModal(false)}>
        <CModalHeader>
          <CModalTitle className="h4">Error</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow>
            <CCol>
              {error && (
                <CAlert color="danger" data-aos="fade-down">
                  {error}
                </CAlert>
              )}
            </CCol>
          </CRow>
        </CModalBody>
        <CModalFooter>
          <CButton onClick={() => setErrorModal(false)} color="primary">
            Close
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}
export default RJcustomerCreation
