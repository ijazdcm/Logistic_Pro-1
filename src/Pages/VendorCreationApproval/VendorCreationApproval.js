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

// VALIDATIONS FILE
import useForm from 'src/Hooks/useForm.js'

const VendorCreationApproval = () => {
  const { id } = useParams()
  const navigation = useNavigate()
  const [fetch, setFetch] = useState(false)
  const [currentInfo, setCurrentInfo] = useState({})
  const [shedData, setShedData] = useState({})
  const [approveBtn, setApproveBtn] = useState(false)
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
  const [fileUpdate, setFileUpdate] = useState(true)

  const formValues = {
    shedownerMob: '',
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

  function VendorRequestValidation() {}
  function callBack() {}

  const { values, errors, handleChange, onFocus, handleSubmit, enableSubmit, onBlur } = useForm(
    callBack,
    VendorRequestValidation,
    formValues
  )

  // ADD VENDOR REQUEST DETAILS
  const addVendorApproval = (status) => {
    const formData = new FormData()

    formData.append('_method', 'PUT')
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
      console.log(resData)
      ShedData(resData.shed_id)
      setCurrentInfo(resData)
      setFetch(true)
    })
  }, [])

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
          setTimeout(() => setFileUpdate(true), 500)
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
          setFileUpdate(false)
        }
      })
      .catch((err) => {
        toast.warning(err)
      })
  }

  return (
    <>
      <CCard>
        <CForm className="container p-3" onSubmit={handleSubmit}>
          {/*Row One ------------------------- */}
          <CRow className="">
            <CCol xs={12} md={3}>
              <CFormLabel htmlFor="shedName">
                Shed Name
                {/* {errors.shedName && <span className="small text-danger">{errors.shedName}</span>} */}
              </CFormLabel>
              <CFormInput size="sm" id="shedName" value={fetch ? shedData.shed_name : ''} />
            </CCol>
            <CCol xs={12} md={3}>
              <CFormLabel htmlFor="ownerName">
                Owner Name
                {/* {errors.vehicleType && (
                  <span className="small text-danger">{errors.vehicleType}</span>
                )} */}
              </CFormLabel>
              <CFormInput size="sm" id="ownerName" value={fetch ? shedData.shed_owner_name : ''} />
            </CCol>
            <CCol xs={12} md={3}>
              <CFormLabel htmlFor="shedownerMob">
                Shed Mobile Number
                {/* {errors.shedownerMob && (
                  <span className="small text-danger">{errors.shedownerMob}</span>
                )} */}
              </CFormLabel>
              <CFormInput
                size="sm"
                id="shedownerMob"
                value={fetch ? shedData.shed_owner_phone_1 : ''}
              />
            </CCol>
            <CCol xs={12} md={3}>
              <CFormLabel htmlFor="shedownerWhatsapp">
                Shed Whatsapp Number
                {/* {errors.shedownerWhatsapp && (
                  <span className="small text-danger">{errors.shedownerWhatsapp}</span>
                )} */}
              </CFormLabel>
              <CFormInput
                size="sm"
                id="shedownerWhatsapp"
                value={fetch ? shedData.shed_owner_phone_2 : ''}
              />
            </CCol>
          </CRow>
          {/* Row One------------------------- */}
          {/* Row Two------------------------- */}
          <CRow className="">
            <CCol xs={12} md={3}>
              <CFormLabel htmlFor="panNumber">
                PAN Card Number*
                {/* {errors.panNumber && <span className="small text-danger">{errors.panNumber}</span>} */}
              </CFormLabel>
              <CFormInput
                size="sm"
                id="panNumber"
                value={(fetch ? currentInfo.vendor_info.pan_card_number : '') || values.panNumber}
              />
            </CCol>
            <CCol xs={12} md={3}>
              <CFormLabel htmlFor="aadhar">
                Aadhar Card Number
                {/* {errors.aadhar && <span className="small text-danger">{errors.aadhar}</span>} */}
              </CFormLabel>
              <CFormInput
                size="sm"
                id="aadhar"
                name="aadhar"
                value={(fetch ? currentInfo.vendor_info.aadhar_card_number : '') || values.aadhar}
              />
            </CCol>
            <CCol xs={12} md={3}>
              <CFormLabel htmlFor="bankAccount">
                Bank Account Number*
                {/* {errors.bankAccount && (
                  <span className="small text-danger">{errors.bankAccount}</span>
                )} */}
              </CFormLabel>
              <CFormInput
                size="sm"
                id="bankAccount"
                value={fetch ? currentInfo.vendor_info.bank_acc_number : ''}
              />
            </CCol>
            <CCol xs={12} md={3}>
              <CFormLabel htmlFor="bankaccountholderName">
                Bank Account Holder Name*
                {/* {errors.bankaccountholderName && (
                  <span className="small text-danger">{errors.bankaccountholderName}</span>
                )} */}
              </CFormLabel>
              <CFormInput
                size="sm"
                id="bankaccountholderName"
                value={fetch ? currentInfo.vendor_info.bank_acc_holder_name : ''}
              />
            </CCol>
          </CRow>
          <CRow>
            <CCol xs={12} md={3}>
              <CFormLabel htmlFor="bankName">Bank Name</CFormLabel>
              <CFormInput
                type="text"
                name="bankName"
                size="sm"
                id="bankName"
                value={fetch ? currentInfo.vendor_info.bank_name : ''}
              />
            </CCol>
            <CCol xs={12} md={3}>
              <CFormLabel htmlFor="bankBranch">Bank Branch</CFormLabel>
              <CFormInput
                type="text"
                name="bankBranch"
                size="sm"
                id="bankBranch"
                value={fetch ? currentInfo.vendor_info.bank_branch : ''}
              />
            </CCol>

            <CCol xs={12} md={3}>
              <CFormLabel htmlFor="ifscCode">Bank IFSC Code</CFormLabel>
              <CFormInput
                type="text"
                name="ifscCode"
                size="sm"
                id="ifscCode"
                value={fetch ? currentInfo.vendor_info.bank_ifsc_code : ''}
              />
            </CCol>
            <CCol xs={12} md={3}>
              <CFormLabel htmlFor="GSTreg">
                GST Registeration
                {/* {errors.GSTreg && <span className="small text-danger">{errors.GSTreg}</span>} */}
              </CFormLabel>
              <CFormInput
                size="sm"
                id="GSTreg"
                value={fetch ? currentInfo.vendor_info.gst_registration : ''}
              />
            </CCol>
          </CRow>
          <CRow>
            <CCol xs={12} md={3}>
              <CFormLabel htmlFor="GST">
                GST Registration Number*
                {/* {errors.GST && <span className="small text-danger">{errors.GST}</span>} */}
              </CFormLabel>
              <CFormInput
                size="sm"
                id="GST"
                value={fetch ? currentInfo.vendor_info.gst_registration_number : ''}
              />
            </CCol>
            <CCol xs={12} md={3}>
              <CFormLabel htmlFor="GSTtax">
                GST Tax Code
                {/* {errors.GSTtax && <span className="small text-danger">{errors.GSTtax}</span>} */}
              </CFormLabel>
              <CFormInput
                size="sm"
                id="GSTtax"
                value={fetch ? currentInfo.vendor_info.gst_tax_code : ''}
              />
            </CCol>
            <CCol xs={12} md={3}>
              <CFormLabel htmlFor="Payment">
                Payment Terms 3Days
                {/* {errors.Payment && <span className="small text-danger">{errors.Payment}</span>} */}
              </CFormLabel>
              <CFormInput
                size="sm"
                id="Payment"
                value={fetch ? currentInfo.vendor_info.payment_term_3days : ''}
              />
            </CCol>

            <CCol xs={12} md={3}>
              <CFormLabel htmlFor="Street">
                Street
                {/* {errors.Street && <span className="small text-danger">{errors.Street}</span>} */}
              </CFormLabel>
              <CFormInput
                size="sm"
                id="Street"
                value={fetch ? currentInfo.vendor_info.street : ''}
              />
            </CCol>
          </CRow>
          <CRow>
            <CCol xs={12} md={3}>
              <CFormLabel htmlFor="Area">
                Area
                {/* {errors.Area && <span className="small text-danger">{errors.Area}</span>} */}
              </CFormLabel>
              <CFormInput size="sm" id="Area" value={fetch ? currentInfo.vendor_info.area : ''} />
            </CCol>
            <CCol xs={12} md={3}>
              <CFormLabel htmlFor="City">
                City
                {/* {errors.City && <span className="small text-danger">{errors.City}</span>} */}
              </CFormLabel>
              <CFormInput size="sm" id="City" value={fetch ? currentInfo.vendor_info.city : ''} />
            </CCol>
            <CCol xs={12} md={3}>
              <CFormLabel htmlFor="District">
                District
                {/* {errors.District && <span className="small text-danger">{errors.District}</span>} */}
              </CFormLabel>
              <CFormInput
                size="sm"
                id="District"
                value={fetch ? currentInfo.vendor_info.district : ''}
              />
            </CCol>
            <CCol xs={12} md={3}>
              <CFormLabel htmlFor="State">
                State
                {/* {errors.State && <span className="small text-danger">{errors.State}</span>} */}
              </CFormLabel>
              <CFormInput size="sm" id="State" value={fetch ? currentInfo.vendor_info.state : ''} />
            </CCol>
          </CRow>
          <CRow>
            <CCol xs={12} md={3}>
              <CFormLabel htmlFor="postalCode">
                Postal Code
                {/* {errors.postalCode && (
                  <span className="small text-danger">{errors.postalCode}</span>
                )} */}
              </CFormLabel>
              <CFormInput
                size="sm"
                id="postalCode"
                value={fetch ? currentInfo.vendor_info.postal_code : ''}
              />
            </CCol>
            <CCol xs={12} md={3}>
              <CFormLabel htmlFor="Region">
                Region
                {/* {errors.Region && <span className="small text-danger">{errors.Region}</span>} */}
              </CFormLabel>
              <CFormInput
                size="sm"
                id="Region"
                value={fetch ? currentInfo.vendor_info.region : ''}
              />
            </CCol>
            <CCol xs={12} md={3}>
              <CFormLabel htmlFor="panCopy">
                PAN Card Attachment
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
                        setFileUpdate(false)
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
                Aadhar Card Copy
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
                        setFileUpdate(false)
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
                License Copy
                {errors.licenseCopy && (
                  <span className="small text-danger">{errors.licenseCopy}</span>
                )}
              </CFormLabel>

              {licenseDel ? (
                <CFormInput
                  type="file"
                  size="sm"
                  id="licenseCopy"
                  name="licenseCopy"
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
                  <span className="float-start" onClick={() => setLicence(!Licence)}>
                    <i className="fa fa-eye" aria-hidden="true"></i> &nbsp;View
                  </span>
                  <span
                    className="float-end"
                    onClick={() => {
                      if (window.confirm('Are you sure to remove this file?')) {
                        setLicenseDel(true)
                        setFileUpdate(false)
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
              <CFormLabel htmlFor="insurance">
                Insurance Copy
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
                        setFileUpdate(false)
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
                Bank Pass Book
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
                        setFileUpdate(false)
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
                RC Copy - Front
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
                        setFileUpdate(false)
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
                RC Copy Back
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
                        setFileUpdate(false)
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
                Transporter Shed Sheet
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
                        setFileUpdate(false)
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
                TDS Declaration Form Front
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
                        setFileUpdate(false)
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
                TDS Declaration Form Back
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
                        setFileUpdate(false)
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
                value={(fetch ? currentInfo.vendor_info.remarks : '') || values.remarks}
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
                color="warning"
                className="mx-1 px-2 text-white"
                type="button"
                disabled={fetch ? false : true}
                onClick={() => setApproveBtn(true)}
              >
                Approve
              </CButton>
              <CButton
                size="sm"
                color="warning"
                className="mx-1 px-2 text-white"
                type="button"
                disabled={fetch ? false : true}
                onClick={() => addVendorApproval(0)}
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
          {/* <CButton color="primary">Save changes</CButton> */}
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
