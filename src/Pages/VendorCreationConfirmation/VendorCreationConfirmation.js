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
import VendorToSAP from 'src/Service/SAP/VendorToSAP'

// VALIDATIONS FILE
import useForm from 'src/Hooks/useForm.js'

const VendorCreationConfirmation = () => {
  const { id } = useParams()
  const navigation = useNavigate()
  const [fetch, setFetch] = useState(false)
  const [currentInfo, setCurrentInfo] = useState({})
  const [shedData, setShedData] = useState({})
  const [confirmBtn, setConfirmBtn] = useState(false)
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

  const formValues = {
    remarks: '',
  }

  function VendorRequestValidation() {}
  function callBack() {}

  const { values, errors, handleChange, onFocus, handleSubmit, enableSubmit, onBlur } = useForm(
    callBack,
    VendorRequestValidation,
    formValues
  )

  // ADD VENDOR REQUEST DETAILS
  const addVendorConfirmation = (status) => {
    const formData = new FormData()
    formData.append('_method', 'PUT')
    let vendorInfo = currentInfo.vendor_info
    for (const key in vendorInfo) {
      if (key != 'vendor_status') {
        formData.append(key, vendorInfo[key])
      }
    }
    formData.append('vendor_status', status)
    formData.append('remarks', values.remarks)

    // for (const pair of formData.entries()) {
    //   console.log(pair[0] + ' ' + pair[1])
    // }

    setConfirmBtn(false)

    VendorToSAP.vendorCreation(id, formData).then((res) => {
      if (res.status == 200) {
        toast.success('Vendor Information Sent To SAP!')
      } else {
        toast.warning('Something Went Wrong !')
      }
    })

    VendorCreationService.updateVendorConfirmationData(id, formData).then((res) => {
      if (res.status == 200) {
        if (status == 4) {
          toast.success('Vendor Confirmation Done!')
          navigation('/VendorCreationConfrimationHome')
        } else {
          toast.warning('Vendor Confirmation Rejected!')
          navigation('/VendorCreationConfrimationHome')
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
  }, [])
  return (
    <>
      <CCard>
        <CForm className="container p-3" onSubmit={handleSubmit}>
          {/*Row One ------------------------- */}
          <CRow className="">
            <CCol xs={12} md={3}>
              <CFormLabel htmlFor="shedName">
                Shed Name
                {errors.shedName && <span className="small text-danger">{errors.shedName}</span>}
              </CFormLabel>
              <CFormInput
                size="sm"
                id="shedName"
                value={fetch ? shedData.shed_name : ''}
                readOnly
              />
            </CCol>
            <CCol xs={12} md={3}>
              <CFormLabel htmlFor="ownerName">
                Owner Name
                {errors.vehicleType && (
                  <span className="small text-danger">{errors.vehicleType}</span>
                )}
              </CFormLabel>
              <CFormInput
                size="sm"
                id="ownerName"
                value={fetch ? shedData.shed_owner_name : ''}
                readOnly
              />
            </CCol>
            <CCol xs={12} md={3}>
              <CFormLabel htmlFor="shedownerMob">
                Shed Mobile Number
                {errors.shedownerMob && (
                  <span className="small text-danger">{errors.shedownerMob}</span>
                )}
              </CFormLabel>
              <CFormInput
                size="sm"
                id="shedownerMob"
                value={fetch ? shedData.shed_owner_phone_1 : ''}
                readOnly
              />
            </CCol>
            <CCol xs={12} md={3}>
              <CFormLabel htmlFor="shedownerWhatsapp">
                Shed Whatsapp Number
                {errors.shedownerWhatsapp && (
                  <span className="small text-danger">{errors.shedownerWhatsapp}</span>
                )}
              </CFormLabel>
              <CFormInput
                size="sm"
                id="shedownerWhatsapp"
                value={fetch ? shedData.shed_owner_phone_2 : ''}
                readOnly
              />
            </CCol>
          </CRow>
          {/* Row One------------------------- */}
          {/* Row Two------------------------- */}
          <CRow className="">
            <CCol xs={12} md={3}>
              <CFormLabel htmlFor="panNumber">
                PAN Card Number*
                {errors.panNumber && <span className="small text-danger">{errors.panNumber}</span>}
              </CFormLabel>
              <CFormInput
                size="sm"
                id="panNumber"
                value={(fetch ? currentInfo.vendor_info.pan_card_number : '') || values.panNumber}
                readOnly
              />
            </CCol>

            <CCol xs={12} md={3}>
              <CFormLabel htmlFor="aadhar">
                Aadhar Card Number
                {errors.aadhar && <span className="small text-danger">{errors.aadhar}</span>}
              </CFormLabel>
              <CFormInput
                size="sm"
                id="aadhar"
                name="aadhar"
                value={(fetch ? currentInfo.vendor_info.aadhar_card_number : '') || values.aadhar}
                readOnly
              />
            </CCol>
            <CCol xs={12} md={3}>
              <CFormLabel htmlFor="bankAccount">
                Bank Account Number*
                {errors.bankAccount && (
                  <span className="small text-danger">{errors.bankAccount}</span>
                )}
              </CFormLabel>
              <CFormInput
                size="sm"
                id="bankAccount"
                value={fetch ? currentInfo.vendor_info.bank_acc_number : ''}
                readOnly
              />
            </CCol>
            <CCol xs={12} md={3}>
              <CFormLabel htmlFor="bankaccountholderName">
                Bank Account Holder Name*
                {errors.bankaccountholderName && (
                  <span className="small text-danger">{errors.bankaccountholderName}</span>
                )}
              </CFormLabel>
              <CFormInput
                size="sm"
                id="bankaccountholderName"
                value={fetch ? currentInfo.vendor_info.bank_acc_holder_name : ''}
                readOnly
              />
            </CCol>
          </CRow>
          {/* Row Two------------------------- */}
          {/* Row Three------------------------- */}
          <CRow className="">
            <CCol xs={12} md={3}>
              <CFormLabel htmlFor="bankName">Bank Name</CFormLabel>
              <CFormInput
                type="text"
                name="bankName"
                size="sm"
                id="bankName"
                value={fetch ? currentInfo.vendor_info.bank_name : ''}
                readOnly
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
                readOnly
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
                readOnly
              />
            </CCol>

            <CCol xs={12} md={3}>
              <CFormLabel htmlFor="GSTreg">
                GST Registeration
                {errors.GSTreg && <span className="small text-danger">{errors.GSTreg}</span>}
              </CFormLabel>
              <CFormInput
                size="sm"
                id="GSTreg"
                value={fetch ? currentInfo.vendor_info.gst_registration : ''}
                readOnly
              />
            </CCol>

            {fetch && currentInfo.vendor_info.gst_registration_number && (
              <CCol xs={12} md={3}>
                <CFormLabel htmlFor="GST">
                  GST Registration Number*
                  {errors.GST && <span className="small text-danger">{errors.GST}</span>}
                </CFormLabel>
                <CFormInput
                  size="sm"
                  id="GST"
                  value={currentInfo.vendor_info.gst_registration_number}
                  readOnly
                />
              </CCol>
            )}

            <CCol xs={12} md={3}>
              <CFormLabel htmlFor="GSTtax">
                GST Tax Code
                {errors.GSTtax && <span className="small text-danger">{errors.GSTtax}</span>}
              </CFormLabel>
              <CFormInput
                size="sm"
                id="GSTtax"
                value={fetch ? currentInfo.vendor_info.gst_tax_code : ''}
                readOnly
              />
            </CCol>
            <CCol xs={12} md={3}>
              <CFormLabel htmlFor="Payment">
                Payment Terms 3Days
                {errors.Payment && <span className="small text-danger">{errors.Payment}</span>}
              </CFormLabel>
              <CFormInput
                size="sm"
                id="Payment"
                value={fetch ? currentInfo.vendor_info.payment_term_3days : ''}
                readOnly
              />
            </CCol>
            <CCol xs={12} md={3}>
              <CFormLabel htmlFor="Street">
                Street
                {errors.Street && <span className="small text-danger">{errors.Street}</span>}
              </CFormLabel>
              <CFormInput
                size="sm"
                id="Street"
                value={fetch ? currentInfo.vendor_info.street : ''}
                readOnly
              />
            </CCol>

            <CCol xs={12} md={3}>
              <CFormLabel htmlFor="Area">
                Area
                {errors.Area && <span className="small text-danger">{errors.Area}</span>}
              </CFormLabel>
              <CFormInput
                size="sm"
                id="Area"
                value={fetch ? currentInfo.vendor_info.area : ''}
                readOnly
              />
            </CCol>
            <CCol xs={12} md={3}>
              <CFormLabel htmlFor="City">
                City
                {errors.City && <span className="small text-danger">{errors.City}</span>}
              </CFormLabel>
              <CFormInput
                size="sm"
                id="City"
                value={fetch ? currentInfo.vendor_info.city : ''}
                readOnly
              />
            </CCol>
            <CCol xs={12} md={3}>
              <CFormLabel htmlFor="District">
                District
                {errors.District && <span className="small text-danger">{errors.District}</span>}
              </CFormLabel>
              <CFormInput
                size="sm"
                id="District"
                value={fetch ? currentInfo.vendor_info.district : ''}
                readOnly
              />
            </CCol>
            <CCol xs={12} md={3}>
              <CFormLabel htmlFor="State">
                State
                {errors.State && <span className="small text-danger">{errors.State}</span>}
              </CFormLabel>
              <CFormInput
                size="sm"
                id="State"
                value={fetch ? currentInfo.vendor_info.state : ''}
                readOnly
              />
            </CCol>

            <CCol xs={12} md={3}>
              <CFormLabel htmlFor="postalCode">
                Postal Code
                {errors.postalCode && (
                  <span className="small text-danger">{errors.postalCode}</span>
                )}
              </CFormLabel>
              <CFormInput
                size="sm"
                id="postalCode"
                value={fetch ? currentInfo.vendor_info.postal_code : ''}
                readOnly
              />
            </CCol>
            <CCol xs={12} md={3}>
              <CFormLabel htmlFor="Region">
                Region
                {errors.Region && <span className="small text-danger">{errors.Region}</span>}
              </CFormLabel>
              <CFormInput
                size="sm"
                id="Region"
                value={fetch ? currentInfo.vendor_info.region : ''}
                readOnly
              />
            </CCol>
            <CCol xs={12} md={3}>
              <CFormLabel htmlFor="panCardattachment">
                PAN Card Attatchment
                {errors.panCardattachment && (
                  <span className="small text-danger">{errors.panCardattachment}</span>
                )}
              </CFormLabel>
              <CButton
                // onClick={() => setAdharVisible(!adharvisible)}
                className="w-100 m-0"
                color="info"
                size="sm"
                id="panCardattachment"
              >
                <span className="float-start" onClick={() => setPanCard(!PanCard)}>
                  <i className="fa fa-eye" aria-hidden="true"></i> &nbsp;View
                </span>
              </CButton>
            </CCol>
            <CCol xs={12} md={3}>
              <CFormLabel htmlFor="aadharCopy">
                Aadhar Card Copy
                {errors.aadharCopy && (
                  <span className="small text-danger">{errors.aadharCopy}</span>
                )}
              </CFormLabel>
              <CButton
                // onClick={() => setAdharVisible(!adharvisible)}
                className="w-100 m-0"
                color="info"
                size="sm"
                id="aadharCopy"
              >
                <span className="float-start" onClick={() => setAdharVisible(!adharvisible)}>
                  <i className="fa fa-eye" aria-hidden="true"></i> &nbsp;View
                </span>
              </CButton>
            </CCol>
            <CCol xs={12} md={3}>
              <CFormLabel htmlFor="license">
                License Copy
                {errors.vehicleType && <span className="small text-danger">{errors.license}</span>}
              </CFormLabel>
              <CButton
                // onClick={() => setLicence(!PanCard)}
                className="w-100 m-0"
                color="info"
                size="sm"
                id="license"
              >
                <span className="float-start" onClick={() => setLicence(!PanCard)}>
                  <i className="fa fa-eye" aria-hidden="true"></i> &nbsp;View
                </span>
              </CButton>
            </CCol>
            <CCol xs={12} md={3}>
              <CFormLabel htmlFor="rcFront">
                RC Copy -Front
                {errors.rcFront && <span className="small text-danger">{errors.rcFront}</span>}
              </CFormLabel>
              <CButton
                // onClick={() => setRcFront(!RcFront)}
                className="w-100 m-0"
                color="info"
                size="sm"
                id="rcFront"
              >
                <span className="float-start" onClick={() => setRcFront(!RcFront)}>
                  <i className="fa fa-eye" aria-hidden="true"></i> &nbsp;View
                </span>
              </CButton>
            </CCol>
            <CCol xs={12} md={3}>
              <CFormLabel htmlFor="rcBack">
                RC Copy Back
                {errors.rcBack && <span className="small text-danger">{errors.rcBack}</span>}
              </CFormLabel>
              <CButton
                // onClick={() => setRcBack(!RcBack)}
                className="w-100 m-0"
                color="info"
                size="sm"
                id="rcBack"
              >
                <span className="float-start" onClick={() => setRcBack(!RcBack)}>
                  <i className="fa fa-eye" aria-hidden="true"></i> &nbsp;View
                </span>
              </CButton>
            </CCol>
            <CCol xs={12} md={3}>
              <CFormLabel htmlFor="insurance">
                Insurance Copy
                {errors.insurance && <span className="small text-danger">{errors.insurance}</span>}
              </CFormLabel>
              <CButton
                // onClick={() => setInsurance(!Insurance)}
                className="w-100 m-0"
                color="info"
                size="sm"
                id="insurance"
              >
                <span className="float-start" onClick={() => setInsurance(!Insurance)}>
                  <i className="fa fa-eye" aria-hidden="true"></i> &nbsp;View
                </span>
              </CButton>
            </CCol>

            <CCol xs={12} md={3}>
              <CFormLabel htmlFor="transportShed">
                Transporter Shed Sheet
                {errors.transportShed && (
                  <span className="small text-danger">{errors.transportShed}</span>
                )}
              </CFormLabel>
              <CButton
                // onClick={() => setTransporterShedSheet(!TransporterShedSheet)}
                className="w-100 m-0"
                color="info"
                size="sm"
                id="transportShed"
              >
                <span
                  className="float-start"
                  onClick={() => setTransporterShedSheet(!TransporterShedSheet)}
                >
                  <i className="fa fa-eye" aria-hidden="true"></i> &nbsp;View
                </span>
              </CButton>
            </CCol>
            <CCol xs={12} md={3}>
              <CFormLabel htmlFor="bankPass">
                Bank Pass Book
                {errors.bankPass && <span className="small text-danger">{errors.bankPass}</span>}
              </CFormLabel>
              <CButton
                // onClick={() => setTDSFormFront(!TDSFormFront)}
                className="w-100 m-0"
                color="info"
                size="sm"
                id="bankPass"
              >
                <span className="float-start" onClick={() => setBankPassbook(!BankPassbook)}>
                  <i className="fa fa-eye" aria-hidden="true"></i> &nbsp;View
                </span>
              </CButton>
            </CCol>
            <CCol xs={12} md={3}>
              <CFormLabel htmlFor="TDSfront">
                TDS Declaration Form Front
                {errors.TDSfront && <span className="small text-danger">{errors.TDSfront}</span>}
              </CFormLabel>
              <CButton
                // onClick={() => setTransporterShedSheet(!TransporterShedSheet)}
                className="w-100 m-0"
                color="info"
                size="sm"
                id="TDSfront"
              >
                <span className="float-start" onClick={() => setTDSFormFront(!TDSFormFront)}>
                  <i className="fa fa-eye" aria-hidden="true"></i> &nbsp;View
                </span>
              </CButton>
            </CCol>
            <CCol xs={12} md={3}>
              <CFormLabel htmlFor="TDSback">
                TDS Declaration Form Back
                {errors.TDSback && <span className="small text-danger">{errors.TDSback}</span>}
              </CFormLabel>
              <CButton
                // onClick={() => setTransporterShedSheet(!TransporterShedSheet)}
                className="w-100 m-0"
                color="info"
                size="sm"
                id="TDSback"
              >
                <span className="float-start" onClick={() => setTDSFormBack(!TDSFormBack)}>
                  <i className="fa fa-eye" aria-hidden="true"></i> &nbsp;View
                </span>
              </CButton>
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
          {/* Row Nine------------------------- */}
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
                onClick={() => setConfirmBtn(true)}
              >
                Confirm
              </CButton>
              <CButton
                size="sm"
                color="warning"
                className="mx-1 px-2 text-white"
                type="button"
                disabled={fetch ? false : true}
                onClick={() => addVendorConfirmation(1)}
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

      <CModal visible={confirmBtn} onClose={() => setConfirmBtn(false)}>
        <CModalBody>
          <p className="lead">Do You Want To Confirm and Upload This Vendor Details To SAP ?</p>
        </CModalBody>
        <CModalFooter>
          <CButton className="m-2" color="warning" onClick={() => addVendorConfirmation(4)}>
            Confirm
          </CButton>
          <CButton color="secondary" onClick={() => setConfirmBtn(false)}>
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

export default VendorCreationConfirmation
