import {
  CButton,
  CCard,
  CCardImage,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
  CFormTextarea,
} from '@coreui/react'
import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// SERVICES FILE
import VendorCreationService from 'src/Service/VendorCreation/VendorCreationService'
import ShedService from 'src/Service/SmallMaster/Shed/ShedService'
import DocumentVerificationService from 'src/Service/DocsVerify/DocsVerifyService'

// VALIDATIONS FILE
import useForm from 'src/Hooks/useForm.js'
import VendorApprovalValidation from 'src/Utils/TransactionPages/VendorCreation/VendorApprovalValidation'

const VendorCreationApproval = () => {
  const { id } = useParams()
  const navigation = useNavigate()
  const [fetch, setFetch] = useState(false)
  const [currentInfo, setCurrentInfo] = useState({})
  const [shedData, setShedData] = useState({})
  const [approveBtn, setApproveBtn] = useState(false)
  const [acceptBtn, setAcceptBtn] = useState(true)
  const [rejectBtn, setRejectBtn] = useState(true)

  const [adharvisible, setAdharVisible] = useState(false)
  const [BankPassbook, setBankPassbook] = useState(false)
  const [PanCard, setPanCard] = useState(false)
  const [Licence, setLicence] = useState(false)
  const [RcFront, setRcFront] = useState(false)
  const [RcBack, setRcBack] = useState(false)
  const [Insurance, setInsurance] = useState(false)
  const [TransporterShedSheet, setTransporterShedSheet] = useState(false)
  const [TDSFormFront, setTDSFormFront] = useState(false)
  const [TDSFormBack, setTDSFormBack] = useState(false)

  const [panDel, setPanDel] = useState(false)
  const [adharDel, setAdharDel] = useState(false)
  const [licenseDel, setLicenseDel] = useState(false)
  const [rcFrontDel, setRcFrontDel] = useState(false)
  const [rcBackDel, setRcBackDel] = useState(false)
  const [insuranceDel, setInsuranceDel] = useState(false)
  const [transShedDel, setTransShedDel] = useState(false)
  const [passBookDel, setPassBookDel] = useState(false)
  const [tdsFrontDel, setTdsFrontDel] = useState(false)
  const [tdsBackDel, setTdsBackDel] = useState(false)
  const [hideFileUpdate, setHideFileUpdate] = useState(true)
  const X = () => <span className="text-danger">*</span>

  const formValues = {
    shedName: '',
    ownerMob: '',
    shedownerWhatsapp: '',
    panNumber: '',
    aadhar: '',
    bankName: '',
    bankBranch: '',
    bankAccount: '',
    bankAccHolderName: '',
    ifscCode: '',
    street: '',
    area: '',
    city: '',
    district: '',
    state: '',
    postalCode: '',
    region: '',
    GSTreg: '',
    GSTNumber: '',
    GSTtax: '',
    payment: '',
    remarks: '',
    // Files
    panCopy: '',
    aadharCopy: '',
    licenseCopy: '',
    rcFront: '',
    rcBack: '',
    insurance: '',
    transportShed: '',
    bankPass: '',
    TDSfront: '',
    TDSback: '',
  }

  // VALIDATIONS
  function callBack() {}
  const { values, errors, handleChange, onFocus, handleSubmit, enableSubmit, onBlur, isTouched } =
    useForm(callBack, VendorApprovalValidation, formValues)
  // ADD VENDOR REQUEST DETAILS
  const addVendorApproval = (status) => {
    const formData = new FormData()

    formData.append('_method', 'PUT')
    formData.append('vendor_id', currentInfo.vendor_info.vendor_id)
    formData.append('vendor_code', currentInfo.vendor_info.vendor_code)
    formData.append('owner_name', currentInfo.vendor_info.owner_name)
    formData.append('owner_number', currentInfo.vendor_info.owner_number)
    formData.append('pan_card_number', currentInfo.vendor_info.pan_card_number || values.panNumber)
    formData.append(
      'aadhar_card_number',
      currentInfo.vendor_info.aadhar_card_number || values.aadhar
    )
    formData.append('bank_name', values.bankName)
    formData.append('bank_acc_number', currentInfo.vendor_info.bank_acc_number)
    formData.append('bank_acc_holder_name', values.bankAccHolderName)
    formData.append('bank_branch', values.bankBranch)
    formData.append('bank_ifsc_code', values.ifscCode)
    formData.append('street', values.street)
    formData.append('area', values.area)
    formData.append('city', values.city)
    formData.append('district', values.district)
    formData.append('state', values.state)
    formData.append('region', values.state.substring(0, 2))
    formData.append('postal_code', values.postalCode)
    formData.append('gst_registration', values.GSTreg)
    formData.append('gst_registration_number', values.GSTNumber)
    formData.append('gst_tax_code', values.GSTtax || 1245)
    formData.append('payment_term_3days', values.payment || 3000)
    formData.append('vendor_status', status)
    formData.append('remarks', values.remarks)

    setApproveBtn(false)

    VendorCreationService.updateVendorRequestData(id, formData).then((res) => {
      console.log(res)
      if (res.status == 200) {
        if (status == 3) {
          toast.success('Vendor Approval Done!')
          navigation('/VendorCreationApprovalHome')
        } else {
          toast.warning('Vendor Approval Rejected!')
          navigation('/VendorCreationApprovalHome')
        }
      } else {
        toast.warning('Something Went Wrong !')
      }
    })
  }

  // GET SINGLE SHED DETAILS
  const ShedData = (shed_id) => {
    ShedService.SingleShedData(shed_id).then((resp) => {
      setShedData(resp.data.data)
    })
  }

  // GET SINGLE VEHICLE DATA
  useEffect(() => {
    VendorCreationService.getVehicleDocumentInfo(id).then((res) => {
      const resData = res.data.data[0]
      ShedData(resData.shed_id)
      setCurrentInfo(resData)
      setFetch(true)
    })
  }, [hideFileUpdate])

  // ERROR VALIDATIONS
  useEffect(() => {
    isTouched.shedName = true
    isTouched.ownerName = true
    isTouched.ownerMob = true
    isTouched.panNumber = true
    isTouched.panNumber = true
    isTouched.panNumber = true
    isTouched.aadhar = true
    isTouched.bankName = true
    isTouched.bankAccount = true
    isTouched.bankAccHolderName = true
    isTouched.GSTtax = true
    isTouched.payment_term_3days = true
    isTouched.state = true
    isTouched.district = true
    isTouched.area = true
    isTouched.postalCode = true
    isTouched.city = true
    isTouched.street = true

    isTouched.region = true
    isTouched.panCopy = true
    isTouched.aadharCopy = true
    isTouched.licenseCopy = true
    isTouched.rcFront = true
    isTouched.rcBack = true
    isTouched.insurance = true
    isTouched.transportShed = true
    isTouched.bankPass = true
    isTouched.TDSfront = true
    isTouched.TDSback = true
    isTouched.remarks = true
    //isTouched.GSTNumber = true

    if (Object.keys(isTouched).length == Object.keys(formValues).length) {
      if (Object.keys(errors).length == 0) {
        setAcceptBtn(false)
        setRejectBtn(false)
      } else {
        setAcceptBtn(true)
        setRejectBtn(false)
      }
    }
  }, [values, errors])

  // UPDATE VENDOR DOCUMENTS
  const updateVendorDocument = () => {
    const fileData = new FormData()
    // File Update
    fileData.append('_method', 'PUT')
    panDel && fileData.append('pan_copy', values.panCopy)
    adharDel && fileData.append('aadhar_copy', values.aadharCopy)
    licenseDel && fileData.append('license_copy', values.licenseCopy)
    rcFrontDel && fileData.append('rc_copy_front', values.rcFront)
    rcBackDel && fileData.append('rc_copy_back', values.rcBack)
    insuranceDel && fileData.append('insurance_copy_front ', values.insurance)
    transShedDel && fileData.append('transport_shed_sheet', values.transportShed)
    passBookDel && fileData.append('bank_pass_copy', values.bankPass)
    tdsFrontDel && fileData.append('tds_dec_form_front', values.TDSfront)
    tdsBackDel && fileData.append('tds_dec_form_back', values.TDSback)

    DocumentVerificationService.updateDocumentVerificationData(id, fileData)
      .then((res) => {
        console.log(res)
        if (res.status == 200) {
          toast.success('Vendor Documents Updated !')
          setTimeout(() => setHideFileUpdate(true), 500)
          setPanDel(false)
          setAdharDel(false)
          setLicenseDel(false)
          setRcFrontDel(false)
          setRcBackDel(false)
          setInsuranceDel(false)
          setTransShedDel(false)
          setPassBookDel(false)
          setTdsFrontDel(false)
          setTdsBackDel(false)
          setHideFileUpdate(false)
        }
      })
      .catch((err) => {
        toast.warning(err)
      })
    setAcceptBtn(false)
    setRejectBtn(false)
  }
  return (
    <>
      <CCard>
        <CForm className="container p-3" onSubmit={handleSubmit}>
          {/*Row One ------------------------- */}
          <CRow className="">
            <CCol xs={12} md={3}>
              <CFormLabel htmlFor="shedName">
                Shed Name <X />{' '}
                {errors.shedName && <span className="small text-danger">{errors.shedName}</span>}
              </CFormLabel>
              <CFormInput
                size="sm"
                id="shedName"
                className={`${errors.shedName && 'is-invalid'}`}
                defaultValue={fetch ? shedData.shed_name : ''}
                onFocus={onFocus}
                onBlur={onBlur}
                onChange={handleChange}
              />
            </CCol>
            <CCol xs={12} md={3}>
              <CFormLabel htmlFor="ownerName">
                Owner Name <X />{' '}
                {errors.ownerName && <span className="small text-danger">{errors.ownerName}</span>}
              </CFormLabel>
              <CFormInput
                size="sm"
                id="ownerName"
                defaultValue={fetch ? shedData.shed_owner_name : ''}
                className={`${errors.ownerName && 'is-invalid'}`}
                onFocus={onFocus}
                onBlur={onBlur}
                onChange={handleChange}
              />
            </CCol>
            <CCol xs={12} md={3}>
              <CFormLabel htmlFor="ownerMob">
                Shed Mobile Number <X />
                {errors.ownerMob && <span className="small text-danger">{errors.ownerMob}</span>}
              </CFormLabel>
              <CFormInput
                size="sm"
                id="ownerMob"
                className={`${errors.ownerMob && 'is-invalid'}`}
                name="ownerMob"
                defaultValue={fetch ? shedData.shed_owner_phone_1 : ''}
                onFocus={onFocus}
                onBlur={onBlur}
                onChange={handleChange}
                maxLength={10}
              />
            </CCol>
            <CCol xs={12} md={3}>
              <CFormLabel htmlFor="shedownerWhatsapp">
                Shed Whatsapp Number <X />
                {errors.ownerMob && <span className="small text-danger">{errors.ownerMob}</span>}
              </CFormLabel>
              <CFormInput
                size="sm"
                id="shedownerWhatsapp"
                className={`${errors.ownerMob && 'is-invalid'}`}
                name="shedownerWhatsapp"
                defaultValue={fetch ? shedData.shed_owner_phone_2 : ''}
                onFocus={onFocus}
                onBlur={onBlur}
                onChange={handleChange}
                maxLength={10}
              />
            </CCol>
          </CRow>
          {/* Row One------------------------- */}
          {/* Row Two------------------------- */}
          <CRow className="">
            <CCol xs={12} md={3}>
              <CFormLabel htmlFor="panNumber">
                PAN Card Number <X />
                {errors.panNumber && <span className="small text-danger">{errors.panNumber}</span>}
              </CFormLabel>
              <CFormInput
                size="sm"
                id="panNumber"
                className={`${errors.panNumber && 'is-invalid'}`}
                name="panNumber"
                maxLength={10}
                onFocus={onFocus}
                onBlur={onBlur}
                onChange={handleChange}
                defaultValue={
                  (fetch ? currentInfo.vendor_info.pan_card_number : '') || values.panNumber
                }
              />
            </CCol>
            <CCol xs={12} md={3}>
              <CFormLabel htmlFor="aadhar">
                Aadhar Card Number <X />
                {errors.aadhar && <span className="small text-danger">{errors.aadhar}</span>}
              </CFormLabel>
              <CFormInput
                size="sm"
                id="aadhar"
                className={`${errors.aadhar && 'is-invalid'}`}
                name="aadhar"
                maxLength={12}
                defaultValue={
                  (fetch ? currentInfo.vendor_info.aadhar_card_number : '') || values.aadhar
                }
                onKeyUp={() => (currentInfo.vendor_info.aadhar_card_number = '')}
                onFocus={onFocus}
                onBlur={onBlur}
                onChange={handleChange}
              />
            </CCol>
            <CCol xs={12} md={3}>
              <CFormLabel htmlFor="bankAccount">
                Bank Account Number <X />
                {errors.bankAccount && (
                  <span className="small text-danger">{errors.bankAccount}</span>
                )}
              </CFormLabel>
              <CFormInput
                size="sm"
                id="bankAccount"
                name="bankAccount"
                maxLength={20}
                className={`${errors.bankAccount && 'is-invalid'}`}
                value={(fetch ? currentInfo.vendor_info.bank_acc_number : '') || values.bankAccount}
                onKeyUp={() => (currentInfo.vendor_info.bank_acc_number = '')}
                onFocus={onFocus}
                onBlur={onBlur}
                onChange={handleChange}
              />
            </CCol>
            <CCol xs={12} md={3}>
              <CFormLabel htmlFor="bankAccHolderName">
                Bank Account Holder Name
                <X />
                {errors.bankAccHolderName && (
                  <span className="small text-danger">{errors.bankAccHolderName}</span>
                )}
              </CFormLabel>
              <CFormInput
                size="sm"
                id="bankAccHolderName"
                defaultValue={fetch ? currentInfo.vendor_info.bank_acc_holder_name : ''}
                className={`${errors.bankAccHolderName && 'is-invalid'}`}
                onFocus={onFocus}
                onBlur={onBlur}
                onChange={handleChange}
              />
            </CCol>
          </CRow>
          <CRow>
            <CCol xs={12} md={3}>
              <CFormLabel htmlFor="bankName">
                Bank Name <X />
                {errors.bankAccHolderName && (
                  <span className="small text-danger">{errors.bankName}</span>
                )}
              </CFormLabel>
              <CFormInput
                type="text"
                name="bankName"
                size="sm"
                id="bankName"
                defaultValue={fetch ? currentInfo.vendor_info.bank_name : ''}
                className={`${errors.bankName && 'is-invalid'}`}
                onFocus={onFocus}
                onBlur={onBlur}
                onChange={handleChange}
              />
            </CCol>
            <CCol xs={12} md={3}>
              <CFormLabel htmlFor="bankBranch">
                Bank Branch <X />
                {errors.bankBranch && (
                  <span className="small text-danger">{errors.bankBranch}</span>
                )}
              </CFormLabel>
              <CFormInput
                type="text"
                name="bankBranch"
                size="sm"
                id="bankBranch"
                defaultValue={fetch ? currentInfo.vendor_info.bank_branch : ''}
                className={`${errors.bankBranch && 'is-invalid'}`}
                onFocus={onFocus}
                onBlur={onBlur}
                onChange={handleChange}
              />
            </CCol>

            <CCol xs={12} md={3}>
              <CFormLabel htmlFor="ifscCode">
                Bank IFSC Code <X />
                {errors.bankAccHolderName && (
                  <span className="small text-danger">{errors.bankAccHolderName}</span>
                )}
              </CFormLabel>
              <CFormInput
                type="text"
                name="ifscCode"
                size="sm"
                id="ifscCode"
                defaultValue={fetch ? currentInfo.vendor_info.bank_ifsc_code : ''}
                className={`${errors.bankAccHolderName && 'is-invalid'}`}
                onFocus={onFocus}
                onBlur={onBlur}
                onChange={handleChange}
              />
            </CCol>
            <CCol xs={12} md={3}>
              <CFormLabel htmlFor="GSTreg">
                GST Registeration <X />
                {errors.GSTreg && <span className="small text-danger">{errors.GSTreg}</span>}
              </CFormLabel>

              <CFormSelect
                size="sm"
                id="GSTreg"
                name="GSTreg"
                onFocus={onFocus}
                onBlur={onBlur}
                onChange={handleChange}
                value={values.GSTreg}
                className={`${errors.GSTreg && 'is-invalid'}`}
                aria-label="Small select example"
              >
                {fetch &&
                  (currentInfo.vendor_info.gst_registration == 0 ? (
                    <option value="0" selected hidden>
                      No
                    </option>
                  ) : (
                    <option value="1" selected hidden>
                      Yes
                    </option>
                  ))}
                <option value="1">Yes</option>
                <option value="0">No</option>
              </CFormSelect>
            </CCol>

            {(fetch && currentInfo.vendor_info.gst_registration == 1) ||
              (values.GSTreg == 1 && (
                <CCol xs={12} md={3}>
                  <CFormLabel htmlFor="GST">
                    GST Registration Number*
                    {errors.GST && <span className="small text-danger">{errors.GST}</span>}
                  </CFormLabel>
                  <CFormInput
                    size="sm"
                    id="GST"
                    defaultValue={fetch ? currentInfo.vendor_info.gst_registration_number : ''}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onChange={handleChange}
                  />
                </CCol>
              ))}
            <CCol xs={12} md={3}>
              <CFormLabel htmlFor="GSTtax">
                GST Tax Code <X />
                {errors.GSTtax && <span className="small text-danger">{errors.GSTtax}</span>}
              </CFormLabel>
              <CFormInput
                size="sm"
                id="GSTtax"
                className={`${errors.GSTtax && 'is-invalid'}`}
                defaultValue={fetch ? currentInfo.vendor_info.gst_tax_code : ''}
                onFocus={onFocus}
                onBlur={onBlur}
                onChange={handleChange}
              />
            </CCol>
            <CCol xs={12} md={3}>
              <CFormLabel htmlFor="Payment">
                Payment Terms 3Days <X />
                {errors.payment_term_3days && (
                  <span className="small text-danger">{errors.payment_term_3days}</span>
                )}
              </CFormLabel>
              <CFormInput
                size="sm"
                id="Payment"
                className={`${errors.payment_term_3days && 'is-invalid'}`}
                defaultValue={fetch ? currentInfo.vendor_info.payment_term_3days : ''}
                onFocus={onFocus}
                onBlur={onBlur}
                onChange={handleChange}
              />
            </CCol>

            <CCol xs={12} md={3}>
              <CFormLabel htmlFor="Street">
                Street <X />
                {errors.street && <span className="small text-danger">{errors.street}</span>}
              </CFormLabel>
              <CFormInput
                size="sm"
                id="Street"
                defaultValue={fetch ? currentInfo.vendor_info.street : ''}
                className={`${errors.street && 'is-invalid'}`}
                onFocus={onFocus}
                onBlur={onBlur}
                onChange={handleChange}
              />
            </CCol>

            <CCol xs={12} md={3}>
              <CFormLabel htmlFor="Area">
                Area <X />
                {errors.area && <span className="small text-danger">{errors.area}</span>}
              </CFormLabel>
              <CFormInput
                size="sm"
                id="Area"
                defaultValue={fetch ? currentInfo.vendor_info.area : ''}
                className={`${errors.area && 'is-invalid'}`}
                onFocus={onFocus}
                onBlur={onBlur}
                onChange={handleChange}
              />
            </CCol>
            <CCol xs={12} md={3}>
              <CFormLabel htmlFor="City">
                City <X />
                {errors.city && <span className="small text-danger">{errors.city}</span>}
              </CFormLabel>
              <CFormInput
                size="sm"
                id="City"
                defaultValue={fetch ? currentInfo.vendor_info.city : ''}
                className={`${errors.city && 'is-invalid'}`}
                onFocus={onFocus}
                onBlur={onBlur}
                onChange={handleChange}
              />
            </CCol>
            <CCol xs={12} md={3}>
              <CFormLabel htmlFor="District">
                District <X />
                {errors.district && <span className="small text-danger">{errors.district}</span>}
              </CFormLabel>
              <CFormInput
                size="sm"
                id="district"
                defaultValue={fetch ? currentInfo.vendor_info.district : ''}
                className={`${errors.district && 'is-invalid'}`}
                onFocus={onFocus}
                onBlur={onBlur}
                onChange={handleChange}
              />
            </CCol>
            <CCol xs={12} md={3}>
              <CFormLabel htmlFor="State">
                State <X />
                {errors.state && <span className="small text-danger">{errors.state}</span>}
              </CFormLabel>
              <CFormInput
                size="sm"
                id="State"
                defaultValue={fetch ? currentInfo.vendor_info.state : ''}
                className={`${errors.state && 'is-invalid'}`}
                onFocus={onFocus}
                onBlur={onBlur}
                onChange={handleChange}
              />
            </CCol>

            <CCol xs={12} md={3}>
              <CFormLabel htmlFor="postalCode">
                Postal Code <X />
                {errors.postalCode && (
                  <span className="small text-danger">{errors.postalCode}</span>
                )}
              </CFormLabel>
              <CFormInput
                size="sm"
                id="postalCode"
                defaultValue={fetch ? currentInfo.vendor_info.postal_code : ''}
                className={`${errors.postalCode && 'is-invalid'}`}
                onFocus={onFocus}
                onBlur={onBlur}
                onChange={handleChange}
              />
            </CCol>
            <CCol xs={12} md={3}>
              <CFormLabel htmlFor="Region">
                Region <X />
                {errors.region && <span className="small text-danger">{errors.region}</span>}
              </CFormLabel>
              <CFormInput
                size="sm"
                id="Region"
                defaultValue={fetch ? currentInfo.vendor_info.region : ''}
                onFocus={onFocus}
                onBlur={onBlur}
                onChange={handleChange}
                className={`${errors.region && 'is-invalid'}`}
              />
            </CCol>
            <CCol xs={12} md={3}>
              <CFormLabel htmlFor="panCopy">
                PAN Card Attachment <X />
                {errors.panCopy && <span className="small text-danger">{errors.panCopy}</span>}
              </CFormLabel>

              {panDel ? (
                <CFormInput
                  type="file"
                  name="panCopy"
                  size="sm"
                  id="panCopy"
                  accept=".jpg,.jpeg,.png,.pdf"
                  onFocus={onFocus}
                  onBlur={onBlur}
                  onChange={handleChange}
                />
              ) : (
                <CButton
                  className="w-100 m-0"
                  color="info"
                  size="sm"
                  onFocus={onFocus}
                  onBlur={onBlur}
                  onChange={handleChange}
                >
                  <span className="float-start" onClick={() => setPanCard(!PanCard)}>
                    <i className="fa fa-eye" aria-hidden="true"></i> &nbsp;View
                  </span>
                  <span
                    className="float-end"
                    id="pan"
                    onClick={(useEffect) => {
                      if (window.confirm('Are you sure to remove this file?')) {
                        setPanDel(true)
                        setHideFileUpdate(false)
                      }
                    }}
                  >
                    <i
                      className="fa fa-trash"
                      aria-hidden="true"
                      // onMouseOver={changeBackground}
                      // onMouseLeave={changeBackground1}
                    ></i>
                  </span>
                </CButton>
              )}
            </CCol>
            <CCol xs={12} md={3}>
              <CFormLabel htmlFor="aadharCopy">
                Aadhar Card Copy <X />
                {errors.aadharCopy && (
                  <span className="small text-danger">{errors.aadharCopy}</span>
                )}
              </CFormLabel>
              {adharDel ? (
                <CFormInput
                  type="file"
                  size="sm"
                  id="aadharCopy"
                  name="aadharCopy"
                  accept=".jpg,.jpeg,.png,.pdf"
                  className={`${errors.aadharCopy && 'is-invalid'}`}
                  onFocus={onFocus}
                  onBlur={onBlur}
                  onChange={handleChange}
                />
              ) : (
                <CButton
                  className="w-100 m-0"
                  color="info"
                  size="sm"
                  onFocus={onFocus}
                  onBlur={onBlur}
                  onChange={handleChange}
                >
                  <span className="float-start" onClick={() => setAdharVisible(!adharvisible)}>
                    <i className="fa fa-eye" aria-hidden="true"></i> &nbsp;View
                  </span>
                  <span
                    className="float-end"
                    onClick={() => {
                      if (window.confirm('Are you sure to remove this file?')) {
                        setAdharDel(true)
                        setHideFileUpdate(false)
                      }
                    }}
                  >
                    <i
                      className="fa fa-trash"
                      aria-hidden="true"
                      // onMouseOver={changeBackground}
                      // onMouseLeave={changeBackground1}
                    ></i>
                  </span>
                </CButton>
              )}
            </CCol>

            <CCol xs={12} md={3}>
              <CFormLabel htmlFor="licenseCopy">
                License Copy <X />
                {errors.licenseCopy && (
                  <span className="small text-danger">{errors.licenseCopy}</span>
                )}
              </CFormLabel>
              {fetch &&
                currentInfo.license_copy != '' &&
                (licenseDel ? (
                  <CFormInput
                    type="file"
                    size="sm"
                    id="licenseCopy"
                    name="licenseCopy"
                    accept=".jpg,.jpeg,.png,.pdf"
                    className={`${errors.licenseCopy && 'is-invalid'}`}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onChange={handleChange}
                  />
                ) : (
                  <CButton
                    className="w-100 m-0"
                    color="info"
                    size="sm"
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onChange={handleChange}
                  >
                    <span className="float-start" onClick={() => setLicence(!Licence)}>
                      <i className="fa fa-eye" aria-hidden="true"></i> &nbsp;View
                    </span>
                    <span
                      className="float-end"
                      onClick={() => {
                        if (window.confirm('Are you sure to remove this file?')) {
                          setLicenseDel(true)
                          setHideFileUpdate(false)
                        }
                      }}
                    >
                      <i
                        className="fa fa-trash"
                        aria-hidden="true"
                        // onMouseOver={changeBackground}
                        // onMouseLeave={changeBackground1}
                      ></i>
                    </span>
                  </CButton>
                ))}
            </CCol>
            <CCol xs={12} md={3}>
              <CFormLabel htmlFor="insurance">
                Insurance Copy <X />
                {errors.insurance && <span className="small text-danger">{errors.insurance}</span>}
              </CFormLabel>
              {insuranceDel ? (
                <CFormInput
                  type="file"
                  size="sm"
                  id="insurance"
                  name="insurance"
                  accept=".jpg,.jpeg,.png,.pdf"
                  className={`${errors.insurance && 'is-invalid'}`}
                  onFocus={onFocus}
                  onBlur={onBlur}
                  onChange={handleChange}
                />
              ) : (
                <CButton
                  className="w-100 m-0"
                  color="info"
                  size="sm"
                  onFocus={onFocus}
                  onBlur={onBlur}
                  onChange={handleChange}
                >
                  <span className="float-start" onClick={() => setInsurance(!Insurance)}>
                    <i className="fa fa-eye" aria-hidden="true"></i> &nbsp;View
                  </span>
                  <span
                    className="float-end"
                    onClick={() => {
                      if (window.confirm('Are you sure to remove this file?')) {
                        setInsuranceDel(true)
                        setHideFileUpdate(false)
                      }
                    }}
                  >
                    <i
                      className="fa fa-trash"
                      aria-hidden="true"
                      // onMouseOver={changeBackground}
                      // onMouseLeave={changeBackground1}
                    ></i>
                  </span>
                </CButton>
              )}
            </CCol>
            <CCol xs={12} md={3}>
              <CFormLabel htmlFor="bankPass">
                Bank Pass Book <X />
                {errors.bankPass && <span className="small text-danger">{errors.bankPass}</span>}
              </CFormLabel>
              {passBookDel ? (
                <CFormInput
                  type="file"
                  size="sm"
                  id="bankPass"
                  name="bankPass"
                  accept=".jpg,.jpeg,.png,.pdf"
                  className={`${errors.bankPass && 'is-invalid'}`}
                  onFocus={onFocus}
                  onBlur={onBlur}
                  onChange={handleChange}
                />
              ) : (
                <CButton
                  className="w-100 m-0"
                  color="info"
                  size="sm"
                  onFocus={onFocus}
                  onBlur={onBlur}
                  onChange={handleChange}
                >
                  <span className="float-start" onClick={() => setBankPassbook(!BankPassbook)}>
                    <i className="fa fa-eye" aria-hidden="true"></i> &nbsp;View
                  </span>
                  <span
                    className="float-end"
                    onClick={() => {
                      if (window.confirm('Are you sure to remove this file?')) {
                        setPassBookDel(true)
                        setHideFileUpdate(false)
                      }
                    }}
                  >
                    <i
                      className="fa fa-trash"
                      aria-hidden="true"
                      // onMouseOver={changeBackground}
                      // onMouseLeave={changeBackground1}
                    ></i>
                  </span>
                </CButton>
              )}
            </CCol>
            <CCol xs={12} md={3}>
              <CFormLabel htmlFor="rcFront">
                RC Copy - Front <X />
                {errors.rcFront && <span className="small text-danger">{errors.rcFront}</span>}
              </CFormLabel>
              {rcFrontDel ? (
                <CFormInput
                  type="file"
                  size="sm"
                  id="rcFront"
                  name="rcFront"
                  accept=".jpg,.jpeg,.png,.pdf"
                  className={`${errors.rcFront && 'is-invalid'}`}
                  onFocus={onFocus}
                  onBlur={onBlur}
                  onChange={handleChange}
                />
              ) : (
                <CButton
                  className="w-100 m-0"
                  color="info"
                  size="sm"
                  onFocus={onFocus}
                  onBlur={onBlur}
                  onChange={handleChange}
                >
                  <span className="float-start" onClick={() => setRcFront(!RcFront)}>
                    <i className="fa fa-eye" aria-hidden="true"></i> &nbsp;View
                  </span>
                  <span
                    className="float-end"
                    onClick={() => {
                      if (window.confirm('Are you sure to remove this file?')) {
                        setRcFrontDel(true)
                        setHideFileUpdate(false)
                      }
                    }}
                  >
                    <i
                      className="fa fa-trash"
                      aria-hidden="true"
                      // onMouseOver={changeBackground}
                      // onMouseLeave={changeBackground1}
                    ></i>
                  </span>
                </CButton>
              )}
            </CCol>
            <CCol xs={12} md={3}>
              <CFormLabel htmlFor="rcBack">
                RC Copy Back <X />
                {errors.rcBack && <span className="small text-danger">{errors.rcBack}</span>}
              </CFormLabel>
              {rcBackDel ? (
                <CFormInput
                  type="file"
                  size="sm"
                  id="rcBack"
                  name="rcBack"
                  accept=".jpg,.jpeg,.png,.pdf"
                  className={`${errors.rcBack && 'is-invalid'}`}
                  onFocus={onFocus}
                  onBlur={onBlur}
                  onChange={handleChange}
                />
              ) : (
                <CButton
                  className="w-100 m-0"
                  color="info"
                  size="sm"
                  onFocus={onFocus}
                  onBlur={onBlur}
                  onChange={handleChange}
                >
                  <span className="float-start" onClick={() => setRcBack(!RcBack)}>
                    <i className="fa fa-eye" aria-hidden="true"></i> &nbsp;View
                  </span>
                  <span
                    className="float-end"
                    onClick={() => {
                      if (window.confirm('Are you sure to remove this file?')) {
                        setRcBackDel(true)
                        setHideFileUpdate(false)
                      }
                    }}
                  >
                    <i
                      className="fa fa-trash"
                      aria-hidden="true"
                      // onMouseOver={changeBackground}
                      // onMouseLeave={changeBackground1}
                    ></i>
                  </span>
                </CButton>
              )}
            </CCol>
            <CCol xs={12} md={3}>
              <CFormLabel htmlFor="transportShed">
                Transporter Shed Sheet <X />
                {errors.transportShed && (
                  <span className="small text-danger">{errors.transportShed}</span>
                )}
              </CFormLabel>
              {transShedDel ? (
                <CFormInput
                  type="file"
                  size="sm"
                  id="transportShed"
                  name="transportShed"
                  accept=".jpg,.jpeg,.png,.pdf"
                  className={`${errors.transportShed && 'is-invalid'}`}
                  onFocus={onFocus}
                  onBlur={onBlur}
                  onChange={handleChange}
                />
              ) : (
                <CButton
                  className="w-100 m-0"
                  color="info"
                  size="sm"
                  onFocus={onFocus}
                  onBlur={onBlur}
                  onChange={handleChange}
                >
                  <span
                    className="float-start"
                    onClick={() => setTransporterShedSheet(!TransporterShedSheet)}
                  >
                    <i className="fa fa-eye" aria-hidden="true"></i> &nbsp;View
                  </span>
                  <span
                    className="float-end"
                    onClick={() => {
                      if (window.confirm('Are you sure to remove this file?')) {
                        setTransShedDel(true)
                        setHideFileUpdate(false)
                      }
                    }}
                  >
                    <i
                      className="fa fa-trash"
                      aria-hidden="true"
                      // onMouseOver={changeBackground}
                      // onMouseLeave={changeBackground1}
                    ></i>
                  </span>
                </CButton>
              )}
            </CCol>

            <CCol xs={12} md={3}>
              <CFormLabel htmlFor="TDSfront">
                TDS Declaration Form Front <X />
                {errors.TDSfront && <span className="small text-danger">{errors.TDSfront}</span>}
              </CFormLabel>
              {tdsFrontDel ? (
                <CFormInput
                  type="file"
                  size="sm"
                  id="TDSfront"
                  name="TDSfront"
                  accept=".jpg,.jpeg,.png,.pdf"
                  className={`${errors.TDSfront && 'is-invalid'}`}
                  onFocus={onFocus}
                  onBlur={onBlur}
                  onChange={handleChange}
                />
              ) : (
                <CButton
                  className="w-100 m-0"
                  color="info"
                  size="sm"
                  onFocus={onFocus}
                  onBlur={onBlur}
                  onChange={handleChange}
                >
                  <span className="float-start" onClick={() => setTDSFormFront(!TDSFormFront)}>
                    <i className="fa fa-eye" aria-hidden="true"></i> &nbsp;View
                  </span>
                  <span
                    className="float-end"
                    onClick={() => {
                      if (window.confirm('Are you sure to remove this file?')) {
                        setTdsFrontDel(true)
                        setHideFileUpdate(false)
                      }
                    }}
                  >
                    <i
                      className="fa fa-trash"
                      aria-hidden="true"
                      // onMouseOver={changeBackground}
                      // onMouseLeave={changeBackground1}
                    ></i>
                  </span>
                </CButton>
              )}
            </CCol>
            <CCol xs={12} md={3}>
              <CFormLabel htmlFor="TDSback">
                TDS Declaration Form Back <X />
                {errors.TDSback && <span className="small text-danger">{errors.TDSback}</span>}
              </CFormLabel>
              {tdsBackDel ? (
                <CFormInput
                  type="file"
                  size="sm"
                  id="TDSback"
                  name="TDSback"
                  accept=".jpg,.jpeg,.png,.pdf"
                  className={`${errors.TDSback && 'is-invalid'}`}
                  onFocus={onFocus}
                  onBlur={onBlur}
                  onChange={handleChange}
                />
              ) : (
                <CButton
                  className="w-100 m-0"
                  color="info"
                  size="sm"
                  onFocus={onFocus}
                  onBlur={onBlur}
                  onChange={handleChange}
                >
                  <span className="float-start" onClick={() => setTDSFormBack(!TDSFormBack)}>
                    <i className="fa fa-eye" aria-hidden="true"></i> &nbsp;View
                  </span>
                  <span
                    className="float-end"
                    onClick={() => {
                      if (window.confirm('Are you sure to remove this file?')) {
                        setTdsBackDel(true)
                        setHideFileUpdate(false)
                      }
                    }}
                  >
                    <i
                      className="fa fa-trash"
                      aria-hidden="true"
                      // onMouseOver={changeBackground}
                      // onMouseLeave={changeBackground1}
                    ></i>
                  </span>
                </CButton>
              )}
            </CCol>

            <CCol xs={12} md={3}>
              <CFormLabel htmlFor="remarks">
                Remarks
                {errors.remarks && <span className="small text-danger">{errors.remarks}</span>}
              </CFormLabel>
              <CFormInput
                size="sm"
                name="remarks"
                id="remarks"
                defaultValue={(fetch ? currentInfo.vendor_info.remarks : '') || values.remarks}
                onKeyUp={() => (currentInfo.vendor_info.remarks = '')}
                onFocus={onFocus}
                onBlur={onBlur}
                onChange={handleChange}
              />
            </CCol>
          </CRow>

          <CRow>
            <CCol>
              <Link to="/VendorCreationApprovalHome">
                <CButton
                  md={9}
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
              className=""
              xs={12}
              sm={12}
              md={3}
              style={{ display: 'flex', justifyContent: 'flex-end' }}
            >
              {/* addDocumentVerification */}
              <CButton
                size="sm"
                color="success"
                className="mx-1 px-2 text-white"
                type="button"
                hidden={hideFileUpdate}
                onClick={() => updateVendorDocument()}
              >
                Update Files
              </CButton>
              <CButton
                size="sm"
                color="warning"
                className="mx-1 px-2 text-white"
                type="button"
                disabled={acceptBtn || (!hideFileUpdate && true)}
                onClick={() => addVendorRequest(2)}
              >
                Accept
              </CButton>
              <CButton
                size="sm"
                color="warning"
                className="mx-1 px-2 text-white"
                type="button"
                disabled={rejectBtn || (!hideFileUpdate && true)}
                onClick={() => addVendorRequest(0)}
              >
                Reject
              </CButton>
            </CCol>
          </CRow>
          {/* Row Eight------------------------- */}
        </CForm>
      </CCard>

      {/* ============================================================= */}
      {/* ======================= Modal Area ========================== */}

      <CModal visible={approveBtn} onClose={() => setApproveBtn(false)}>
        <CModalBody>
          <p className="lead">Do You Want To Approve This Vendor Details ?</p>
        </CModalBody>
        <CModalFooter>
          <CButton className="m-2" color="warning" onClick={() => addVendorApproval(3)}>
            Approve
          </CButton>
          <CButton color="secondary" onClick={() => setApproveBtn(false)}>
            Cancel
          </CButton>
          {/* <CButton color="primary">Save changes</CButton> */}
        </CModalFooter>
      </CModal>

      {/* *********************************************************** */}
      <CModal visible={PanCard} onClose={() => setPanCard(false)}>
        <CModalHeader>
          <CModalTitle>Pan Card</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CCardImage orientation="top" src={fetch ? currentInfo.pan_copy : ''} />
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setPanCard(false)}>
            Close
          </CButton>
          <CButton color="primary">Save changes</CButton>
        </CModalFooter>
      </CModal>

      {/* *********************************************************** */}

      <CModal visible={adharvisible} onClose={() => setAdharVisible(false)}>
        <CModalHeader>
          <CModalTitle>Aadhar Card</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CCardImage orientation="top" src={fetch ? currentInfo.aadhar_copy : ''} />
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setAdharVisible(false)}>
            Close
          </CButton>
          {/* <CButton color="primary">Save changes</CButton> */}
        </CModalFooter>
      </CModal>

      {/* *********************************************************** */}

      <CModal visible={BankPassbook} onClose={() => setBankPassbook(false)}>
        <CModalHeader>
          <CModalTitle>Bank Passbook</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CCardImage orientation="top" src={fetch ? currentInfo.bank_pass_copy : ''} />
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setBankPassbook(false)}>
            Close
          </CButton>
          {/* <CButton color="primary">Save changes</CButton> */}
        </CModalFooter>
      </CModal>

      {/* *********************************************************** */}

      <CModal visible={Licence} onClose={() => setLicence(false)}>
        <CModalHeader>
          <CModalTitle>License</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CCardImage orientation="top" src={fetch ? currentInfo.license_copy : ''} />
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setLicence(false)}>
            Close
          </CButton>
          {/* <CButton color="primary">Save changes</CButton> */}
        </CModalFooter>
      </CModal>

      {/* *********************************************************** */}

      <CModal visible={RcFront} onClose={() => setRcFront(false)}>
        <CModalHeader>
          <CModalTitle>RC Front Copy</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CCardImage orientation="top" src={fetch ? currentInfo.rc_copy_front : ''} />
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setRcFront(false)}>
            Close
          </CButton>
          {/* <CButton color="primary">Save changes</CButton> */}
        </CModalFooter>
      </CModal>

      {/* *********************************************************** */}

      <CModal visible={RcBack} onClose={() => setRcBack(false)}>
        <CModalHeader>
          <CModalTitle>RC Back Copy </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CCardImage orientation="top" src={fetch ? currentInfo.rc_copy_back : ''} />
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setRcBack(false)}>
            Close
          </CButton>
          {/* <CButton color="primary">Save changes</CButton> */}
        </CModalFooter>
      </CModal>

      {/* *********************************************************** */}

      <CModal visible={Insurance} onClose={() => setInsurance(false)}>
        <CModalHeader>
          <CModalTitle>Insurance</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CCardImage orientation="top" src={fetch ? currentInfo.insurance_copy_front : ''} />
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setInsurance(false)}>
            Close
          </CButton>
          {/* <CButton color="primary">Save changes</CButton> */}
        </CModalFooter>
      </CModal>

      {/* *********************************************************** */}

      <CModal visible={TransporterShedSheet} onClose={() => setTransporterShedSheet(false)}>
        <CModalHeader>
          <CModalTitle>Transporter Shed Sheet</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CCardImage orientation="top" src={fetch ? currentInfo.transport_shed_sheet : ''} />
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setTransporterShedSheet(false)}>
            Close
          </CButton>
          {/* <CButton color="primary">Save changes</CButton> */}
        </CModalFooter>
      </CModal>

      {/* *********************************************************** */}

      <CModal visible={TDSFormFront} onClose={() => setTDSFormFront(false)}>
        <CModalHeader>
          <CModalTitle>TDS Declaration Form Front</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CCardImage orientation="top" src={fetch ? currentInfo.tds_dec_form_front : ''} />
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setTDSFormFront(false)}>
            Close
          </CButton>
          {/* <CButton color="primary">Save changes</CButton> */}
        </CModalFooter>
      </CModal>

      {/* *********************************************************** */}

      <CModal visible={TDSFormBack} onClose={() => setTDSFormBack(false)}>
        <CModalHeader>
          <CModalTitle>TDS Declaration Form Back</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CCardImage orientation="top" src={fetch ? currentInfo.tds_dec_form_back : ''} />
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setTDSFormBack(false)}>
            Close
          </CButton>
          {/* <CButton color="primary">Save changes</CButton> */}
        </CModalFooter>
      </CModal>

      {/* *********************************************************** */}
      {/* *********************************************************** */}
      {/* *********************************************************** */}

      {/* Modal Area */}
    </>
  )
}

export default VendorCreationApproval
