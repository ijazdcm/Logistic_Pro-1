//Implemented by David - Exciteon
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

// SERVICES FILE
import DocumentVerificationService from 'src/Service/DocsVerify/DocsVerifyService'
import ShedService from 'src/Service/SmallMaster/Shed/ShedService'
import PanDataService from 'src/Service/SAP/PanDataService'

// VALIDATIONS FILE
import useForm from 'src/Hooks/useForm.js'
import validate from 'src/Utils/Validation'
import VendorRequestValidation from 'src/Utils/VendorCreation/VendorRequestValidation'

const VendorCreationRequest = () => {
  const { id } = useParams()
  const navigation = useNavigate()
  const [visible, setVisible] = useState(false)
  const [currentInfo, setCurrentInfo] = useState({})
  const [adharvisible, setAdharVisible] = useState(false)
  const [BankPassbook, setBankPassbook] = useState(false)
  const [PanCard, setPanCard] = useState(false)
  const [Licence, setLicence] = useState(false)
  const [RcFront, setRcFront] = useState(false)
  const [RcBank, setRcBank] = useState(false)
  const [Insurance, setInsurance] = useState(false)
  const [TransporterShedSheet, setTransporterShedSheet] = useState(false)
  const [TDSFormFront, setTDSFormFront] = useState(false)
  const [TDSFormBack, setTDSFormBack] = useState(false)
  const [pandel, setPandel] = useState(false)
  const [licensedel, setLicensedel] = useState(false)
  const [rccopybackdel, setRccopybackdel] = useState(false)
  const [rccopyfrontdel, setRccopyfrontdel] = useState(false)
  const [adhardel, setAdhardel] = useState(false)
  const [passbookdel, setPassbookdel] = useState(false)
  const [tssdel, setTssdel] = useState(false)
  const [insurencedel, setInsurencedel] = useState(false)
  const [tdsfrontdel, setTdsfrontdel] = useState(false)
  const [tdsbackdel, setTdsbackdel] = useState(false)

  // SET FORM VALUES
  const formValues = {
    shedownerMob: '',
    shedownerWhatsapp: '',
    odometerPhoto: '',
    panCardAttachment: '',
    panCard: '',
    aadharCopy: '',
    aadhar: '',
    license: '',
    rcFront: '',
    rcBack: '',
    insurance: '',
    transportShed: '',
    bankPass: '',
    bankName: '',
    bankBranch: '',
    bankAccHolderName: '',
    street: '',
    area: '',
    city: '',
    district: '',
    state: '',
    postalCode: '',
    region: '',
    TDSfront: '',
    TDSback: '',
    GSTreg: '',
    GST: '',
    GSTtax: '',
    payment: '',
  }

  // VALIDATIONS
  function callBack() {}
  const { values, errors, handleChange, onFocus, handleSubmit, enableSubmit, onBlur, isTouched } =
    useForm(callBack, VendorRequestValidation, formValues)

  // GET SINGLE VEHICLE DATA
  useEffect(() => {
    DocumentVerificationService.getSingleVehicleInfoOnParkingYardGate(id).then((res) => {
      const resData = res.data.data
      setCurrentInfo(resData)
      setFetch(true)
    })
    // GET ALL SHED DETAILS
    ShedService.getAllShedData().then((res) => {
      setShedNames(res.data.data)
    })
  }, [])

  // ERROR VALIDATIONS
  useEffect(() => {
    if (Object.keys(isTouched).length == Object.keys(formValues).length) {
      if (Object.keys(errors).length == 0) {
        setAcceptBtn(false)
        setRejectBtn(true)
      } else {
        setAcceptBtn(true)
        setRejectBtn(false)
      }
    }
  }, [values, errors])

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
              <CFormInput size="sm" id="shedName" readOnly />
            </CCol>
            <CCol xs={12} md={3}>
              <CFormLabel htmlFor="ownerName">
                Owner Name
                {errors.vehicleType && (
                  <span className="small text-danger">{errors.vehicleType}</span>
                )}
              </CFormLabel>
              <CFormInput size="sm" id="ownerName" readOnly />
            </CCol>
            <CCol xs={12} md={3}>
              <CFormLabel htmlFor="shedownerMob">
                Shed Mobile Number*{' '}
                {errors.shedownerMob && (
                  <span className="small text-danger">{errors.shedownerMob}</span>
                )}
              </CFormLabel>
              <CFormInput
                size="sm"
                id="shedownerMob"
                className={`${errors.shedownerMob && 'is-invalid'}`}
                name="shedownerMob"
                value={values.shedownerMob || ''}
                onFocus={onFocus}
                onBlur={onBlur}
                onChange={handleChange}
              />
            </CCol>
            <CCol xs={12} md={3}>
              <CFormLabel htmlFor="shedownerWhatsapp">
                Shed Whatsapp Number*{' '}
                {errors.shedownerWhatsapp && (
                  <span className="small text-danger">{errors.shedownerWhatsapp}</span>
                )}
              </CFormLabel>
              <CFormInput
                size="sm"
                id="shedownerWhatsapp"
                className={`${errors.shedownerWhatsapp && 'is-invalid'}`}
                name="shedownerWhatsapp"
                value={values.shedownerWhatsapp || ''}
                onFocus={onFocus}
                onBlur={onBlur}
                onChange={handleChange}
              />
            </CCol>
          </CRow>

          <CRow className="">
            <CCol xs={12} md={3}>
              <CFormLabel htmlFor="panCardAttachment">
                PAN Card Attatchment
                {errors.panCardAttachment && (
                  <span className="small text-danger">{errors.panCardAttachment}</span>
                )}
              </CFormLabel>
              <CButton
                // onClick={() => setAdharVisible(!adharvisible)}
                className="w-100 m-0"
                color="info"
                size="sm"
                id="panCardattachment"
              >
                <span className="float-start" onClick={() => setAdharVisible(!adharvisible)}>
                  <i className="fa fa-eye" aria-hidden="true"></i> &nbsp;View
                </span>
                <span
                  className="float-end"
                  onClick={() => {
                    if (window.confirm('Are you sure to remove this file?')) {
                      setAdhardel(true)
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
            </CCol>
            <CCol xs={12} md={3}>
              <CFormLabel htmlFor="panCard">
                PAN Card Number*{' '}
                {errors.panCard && <span className="small text-danger">{errors.panCard}</span>}
              </CFormLabel>
              <CFormInput
                size="sm"
                id="panCard"
                className={`${errors.panCard && 'is-invalid'}`}
                name="panCard"
                value={values.panCard || ''}
                onFocus={onFocus}
                onBlur={onBlur}
                onChange={handleChange}
              />
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
                <span
                  className="float-end"
                  onClick={() => {
                    if (window.confirm('Are you sure to remove this file?')) {
                      setAdhardel(true)
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
            </CCol>
            <CCol xs={12} md={3}>
              <CFormLabel htmlFor="aadhar">
                Aadhar Card Number{' '}
                {errors.aadhar && <span className="small text-danger">{errors.aadhar}</span>}
              </CFormLabel>
              <CFormInput
                size="sm"
                id="aadhar"
                className={`${errors.aadhar && 'is-invalid'}`}
                name="aadhar"
                value={values.aadhar || ''}
                onFocus={onFocus}
                onBlur={onBlur}
                onChange={handleChange}
              />
            </CCol>
          </CRow>
          {/* Row Two------------------------- */}
          {/* Row Three------------------------- */}
          <CRow className="">
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
                <span
                  className="float-end"
                  onClick={() => {
                    if (window.confirm('Are you sure to remove this file?')) {
                      setLicensedel(true)
                    }
                  }}
                >
                  <i className="fa fa-trash" aria-hidden="true"></i>
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
                <span
                  className="float-end"
                  onClick={() => {
                    if (window.confirm('Are you sure to remove this file?')) {
                      setRccopyfrontdel(true)
                    }
                  }}
                >
                  <i className="fa fa-trash" aria-hidden="true"></i>
                </span>
              </CButton>
            </CCol>
            <CCol xs={12} md={3}>
              <CFormLabel htmlFor="rcBack">
                RC Copy Back
                {errors.rcBack && <span className="small text-danger">{errors.rcBack}</span>}
              </CFormLabel>
              <CButton
                // onClick={() => setRcBank(!RcBank)}
                className="w-100 m-0"
                color="info"
                size="sm"
                id="rcBack"
              >
                <span className="float-start" onClick={() => setRcBank(!RcBank)}>
                  <i className="fa fa-eye" aria-hidden="true"></i> &nbsp;View
                </span>
                <span
                  className="float-end"
                  onClick={() => {
                    if (window.confirm('Are you sure to remove this file?')) {
                      setRccopybackdel(true)
                    }
                  }}
                >
                  <i className="fa fa-trash" aria-hidden="true"></i>
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
                <span
                  className="float-end"
                  onClick={() => {
                    if (window.confirm('Are you sure to remove this file?')) {
                      setInsurencedel(true)
                    }
                  }}
                >
                  <i className="fa fa-trash" aria-hidden="true"></i>
                </span>
              </CButton>
            </CCol>
          </CRow>
          {/* Row Four------------------------- */}
          <CRow className="">
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

                <span
                  className="float-end"
                  onClick={() => {
                    if (window.confirm('Are you sure to remove this file?')) {
                      setTssdel(true)
                    }
                  }}
                >
                  <i className="fa fa-trash" aria-hidden="true"></i>
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
                <span className="float-start" onClick={() => setTDSFormFront(!TDSFormFront)}>
                  <i className="fa fa-eye" aria-hidden="true"></i> &nbsp;View
                </span>

                <span
                  className="float-end"
                  onClick={() => {
                    if (window.confirm('Are you sure to remove this file?')) {
                      setTdsfrontdel(true)
                    }
                  }}
                >
                  <i className="fa fa-trash" aria-hidden="true"></i>
                </span>
              </CButton>
            </CCol>
            <CCol xs={12} md={3}>
              <CFormLabel htmlFor="bankName">
                Bank Name{' '}
                {errors.bankName && <span className="small text-danger">{errors.bankName}</span>}
              </CFormLabel>
              <CFormSelect
                size="sm"
                id="bankName"
                className={`${errors.bankName && 'is-invalid'}`}
                name="bankName"
                value={values.bankName || ''}
                onFocus={onFocus}
                onBlur={onBlur}
                onChange={handleChange}
              >
                <option value={''} hidden selected>
                  Select...
                </option>
                <option value="0">Select SP</option>
              </CFormSelect>
            </CCol>
            <CCol xs={12} md={3}>
              <CFormLabel htmlFor="bankBranch">
                Bank Branch{' '}
                {errors.bankName && <span className="small text-danger">{errors.bankName}</span>}
              </CFormLabel>
              <CFormInput type="text" name="bankBranch" size="sm" id="bankBranch" />
            </CCol>
          </CRow>
          {/* Row Four------------------------- */}
          {/* Row Five------------------------- */}
          <CRow className="">
            <CCol xs={12} md={3}>
              <CFormLabel htmlFor="ifscCode">Bank IFSC Code</CFormLabel>
              <CFormInput type="text" name="ifscCode" size="sm" id="ifscCode" />
            </CCol>
            <CCol xs={12} md={3}>
              <CFormLabel htmlFor="bankAccount">
                Bank Account Number*
                {errors.bankAccount && (
                  <span className="small text-danger">{errors.bankAccount}</span>
                )}
              </CFormLabel>
              <CFormInput size="sm" id="bankAccount" />
            </CCol>
            <CCol xs={12} md={3}>
              <CFormLabel htmlFor="bankAccHolderName">
                Bank Account Holder Name*
                {errors.bankAccHolderName && (
                  <span className="small text-danger">{errors.bankAccHolderName}</span>
                )}
              </CFormLabel>
              <CFormInput size="sm" id="bankaccountholderName" />
            </CCol>
            <CCol xs={12} md={3}>
              <CFormLabel htmlFor="street">
                street
                {errors.street && <span className="small text-danger">{errors.street}</span>}
              </CFormLabel>
              <CFormInput size="sm" id="Street" />
            </CCol>
          </CRow>
          {/* Row Five------------------------- */}
          {/* Row Six------------------------- */}
          <CRow className="">
            <CCol xs={12} md={3}>
              <CFormLabel htmlFor="area">
                Area
                {errors.area && <span className="small text-danger">{errors.area}</span>}
              </CFormLabel>
              <CFormInput size="sm" id="Area" />
            </CCol>
            <CCol xs={12} md={3}>
              <CFormLabel htmlFor="city">
                City
                {errors.city && <span className="small text-danger">{errors.city}</span>}
              </CFormLabel>
              <CFormInput size="sm" id="city" />
            </CCol>
            <CCol xs={12} md={3}>
              <CFormLabel htmlFor="district">
                District
                {errors.district && <span className="small text-danger">{errors.district}</span>}
              </CFormLabel>
              <CFormInput size="sm" id="district" />
            </CCol>
            <CCol xs={12} md={3}>
              <CFormLabel htmlFor="state">
                State
                {errors.state && <span className="small text-danger">{errors.state}</span>}
              </CFormLabel>
              <CFormInput size="sm" id="State" />
            </CCol>
          </CRow>
          {/* Row Six------------------------- */}
          {/* Row Seven------------------------- */}
          <CRow className="">
            <CCol xs={12} md={3}>
              <CFormLabel htmlFor="postalCode">
                Postal Code
                {errors.postalCode && (
                  <span className="small text-danger">{errors.postalCode}</span>
                )}
              </CFormLabel>
              <CFormInput size="sm" id="postalCode" />
            </CCol>
            <CCol xs={12} md={3}>
              <CFormLabel htmlFor="region">
                Region
                {errors.region && <span className="small text-danger">{errors.region}</span>}
              </CFormLabel>
              <CFormInput size="sm" id="Region" />
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
                      setTssdel(true)
                    }
                  }}
                >
                  <i className="fa fa-trash" aria-hidden="true"></i>
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
                      setTssdel(true)
                    }
                  }}
                >
                  <i className="fa fa-trash" aria-hidden="true"></i>
                </span>
              </CButton>
            </CCol>
          </CRow>
          <CRow className="">
            <CCol xs={12} md={3}>
              <CFormLabel htmlFor="GSTreg">
                GST Registeration
                {errors.GSTreg && <span className="small text-danger">{errors.GSTreg}</span>}
              </CFormLabel>
              <CFormSelect
                size="sm"
                name="DefectType"
                onFocus={onFocus}
                onBlur={onBlur}
                onChange={handleChange}
                value={values.DefectType}
                className={`${errors.DefectType && 'is-invalid'}`}
                aria-label="Small select example"
                id="GSTreg"
              >
                <option hidden selected>
                  Select...
                </option>
                <option value="1">Yes</option>
                <option value="2">No</option>
              </CFormSelect>
            </CCol>
            <CCol xs={12} md={3}>
              <CFormLabel htmlFor="GST">
                GST Registration Number*
                {errors.GST && <span className="small text-danger">{errors.GST}</span>}
              </CFormLabel>
              <CFormInput size="sm" id="GST" />
            </CCol>
            <CCol xs={12} md={3}>
              <CFormLabel htmlFor="GSTtax">
                GST Tax Code
                {errors.GSTtax && <span className="small text-danger">{errors.GSTtax}</span>}
              </CFormLabel>
              <CFormInput size="sm" id="GSTtax" readOnly />
            </CCol>
            <CCol xs={12} md={3}>
              <CFormLabel htmlFor="payment">
                Payment Terms 3Days
                {errors.payment && <span className="small text-danger">{errors.payment}</span>}
              </CFormLabel>
              <CFormInput size="sm" id="Payment" readOnly />
            </CCol>
          </CRow>
          {/* Row Eight------------------------- */}
          {/* Row Nine------------------------- */}
          <CRow className="">
            <CCol xs={12} md={3}>
              <CFormLabel htmlFor="remarks">
                Remarks
                {errors.remarks && <span className="small text-danger">{errors.remarks}</span>}
              </CFormLabel>
              <CFormInput size="sm" id="remarks" readOnly />
            </CCol>
          </CRow>
          {/* Row Nine------------------------- */}
          <CRow className="mb-md-1">
            <CCol className="" xs={12} sm={12} md={3}>
              <CButton size="sm" color="primary" className="text-white" type="button">
                <Link className="text-white" to="/VendorCreationHome">
                  Previous
                </Link>
              </CButton>
            </CCol>
            <CCol className="offset-md-6 d-md-flex justify-content-end" xs={12} sm={12} md={3}>
              <CButton size="sm" color="warning" className="mx-3 px-3 text-white" type="submit">
                Submit
              </CButton>
            </CCol>
          </CRow>
          {/* Row Eight------------------------- */}
        </CForm>
      </CCard>

      {/* Modal Area  */}

      <CModal visible={adharvisible} onClose={() => setAdharVisible(false)}>
        <CModalHeader>
          <CModalTitle>Aadhar Card</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CCardImage
            orientation="top"
            src="https://dmv.ny.gov/sites/default/files/resize/styles/panopoly_image_original/public/old_dl_for_sample_docs-653x325.png?itok=a8hCofjR"
          />
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setAdharVisible(false)}>
            Close
          </CButton>
          <CButton color="primary">Save changes</CButton>
        </CModalFooter>
      </CModal>

      {/* *********************************************************** */}

      <CModal visible={BankPassbook} onClose={() => setBankPassbook(false)}>
        <CModalHeader>
          <CModalTitle>Bank Passbook</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CCardImage
            orientation="top"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRy8_NeahwoKut3zeWbVAhUWS59XaqVah0mYMotQ08scOqWrXWsZy39GGRedOzSV1Ao8qk&usqp=CAU"
          />
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setAdharVisible(false)}>
            Close
          </CButton>
          <CButton color="primary">Save changes</CButton>
        </CModalFooter>
      </CModal>

      {/* *********************************************************** */}

      <CModal visible={TDSFormBack} onClose={() => setTDSFormBack(false)}>
        <CModalHeader>
          <CModalTitle>TDS Declaration Form Back</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CCardImage orientation="top" src="" />
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setTDSFormBack(false)}>
            Close
          </CButton>
          <CButton color="primary">Save changes</CButton>
        </CModalFooter>
      </CModal>

      {/* *********************************************************** */}

      <CModal visible={PanCard} onClose={() => setPanCard(false)}>
        <CModalHeader>
          <CModalTitle>Pan Card</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CCardImage orientation="top" src="" />
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setPanCard(false)}>
            Close
          </CButton>
          <CButton color="primary">Save changes</CButton>
        </CModalFooter>
      </CModal>

      {/* *********************************************************** */}

      <CModal visible={Licence} onClose={() => setLicence(false)}>
        <CModalHeader>
          <CModalTitle>Pan Card</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CCardImage orientation="top" src="" />
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setLicence(false)}>
            Close
          </CButton>
          <CButton color="primary">Save changes</CButton>
        </CModalFooter>
      </CModal>

      {/* *********************************************************** */}

      <CModal visible={RcFront} onClose={() => setRcFront(false)}>
        <CModalHeader>
          <CModalTitle>Pan Card</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CCardImage orientation="top" src="" />
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setRcFront(false)}>
            Close
          </CButton>
          <CButton color="primary">Save changes</CButton>
        </CModalFooter>
      </CModal>

      {/* *********************************************************** */}

      <CModal visible={Insurance} onClose={() => setInsurance(false)}>
        <CModalHeader>
          <CModalTitle>Insurance</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CCardImage orientation="top" src="" />
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setInsurance(false)}>
            Close
          </CButton>
          <CButton color="primary">Save changes</CButton>
        </CModalFooter>
      </CModal>

      {/* *********************************************************** */}

      <CModal visible={TransporterShedSheet} onClose={() => setTransporterShedSheet(false)}>
        <CModalHeader>
          <CModalTitle>Transporter Shed Sheet</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CCardImage orientation="top" src="" />
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setTransporterShedSheet(false)}>
            Close
          </CButton>
          <CButton color="primary">Save changes</CButton>
        </CModalFooter>
      </CModal>

      {/* *********************************************************** */}

      <CModal visible={RcBank} onClose={() => setRcBank(false)}>
        <CModalHeader>
          <CModalTitle>Rc Copy Back</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CCardImage
            orientation="top"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRy8_NeahwoKut3zeWbVAhUWS59XaqVah0mYMotQ08scOqWrXWsZy39GGRedOzSV1Ao8qk&usqp=CAU"
          />
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setRcBank(false)}>
            Close
          </CButton>
          <CButton color="primary">Save changes</CButton>
        </CModalFooter>
      </CModal>

      {/* *********************************************************** */}

      <CModal visible={TDSFormFront} onClose={() => setTDSFormFront(false)}>
        <CModalHeader>
          <CModalTitle>TDS Declaration Fomr</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CCardImage orientation="top" src="" />
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setTDSFormFront(false)}>
            Close
          </CButton>
          <CButton color="primary">Save changes</CButton>
        </CModalFooter>
      </CModal>

      {/* *********************************************************** */}
      {/* *********************************************************** */}
      {/* *********************************************************** */}

      {/* Modal Area */}
    </>
  )
}

export default VendorCreationRequest
