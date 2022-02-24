/* eslint-disable prettier/prettier */
import {
  CButton,
  CCard,
  CCol,
  CModal,
  CModalHeader,
  CModalTitle,
  CContainer,
  CModalBody,
  CForm,
  CAlert,
  CModalFooter,
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
import useForm from 'src/Hooks/useForm'
import { ToastContainer, toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import UOMService from 'src/Service/SubMaster/UomApi'
import MaterialTypeService from 'src/Service/SubMaster/MaterialDescriptionApi'
import RJSaleOrderCreationValidation from 'src/Utils/RJSaleOrderCreation/RJSaleOrderCreationValidation'
import ShedMasterService from 'src/Service/Master/ShedMasterService'
import RJSaleOrderCreationService from 'src/Service/RJSaleOrderCreation/RJSaleOrderCreationService'
import RJSaleOrderCreationSapService from 'src/Service/SAP/RJSaleOrderCreationSapService'

const RJSalesOrderCreation = () => {
  const formValues = {
    vehicleNumber: '',
    tripsheetNumber: '',
    PaymentTerm: '',
    customerName: '',
    customerMobile: '',
    customerPAN: '',
    shed_name: '',
    // shed_pan: '',
    // shed_aadhar: '',
    customerCode: '',
    materialType: '',
    materialDescription: '',
    hsnCode: '',
    uomType: '',
    orderQuantity: '',
    freight_income: '',
    advance_amount: '',
    lastDeliveryPoint: '',
    emptyLoad: '',
    loadPoint: '',
    unloadPoint: '',
    emptyUnload: '',
    deliveryTime: '',
    returnTime: '',
    remarks: '',
    rj_so_no: '',
  }
  const [uomType, setUOMType] = useState([])
  const [materialType, setMaterialType] = useState([])
  const [shedName, setShedName] = useState([])

  //Auto Fields

  const [tsno, setTsno] = useState('')
  const [shedPAN, setShedPAN] = useState('')
  const [shedAadhar, setShedAadhar] = useState('')
  const [shedCode, setShedCode] = useState('')
  const [custCode, setCustCode] = useState('')
  const [custPan, setCustPan] = useState('')
  const [custMobile, setCustMobile] = useState('')

  // const navigation = useNavigate()
  const [errorModal, setErrorModal] = useState(false)
  const [error, setError] = useState({})

  const { values, errors, handleChange, isTouched, onFocus, handleSubmit, enableSubmit, onBlur } =
    useForm(login, RJSaleOrderCreationValidation, formValues)

  function login() {
    // alert('No Errors CallBack Called')
  }

  useEffect(() => {
    isTouched.remarks = true
    // section for getting Material type from database
    MaterialTypeService.getMaterialDescription().then((res) => {
      // console.log(res.data.data)
      setMaterialType(res.data.data)
    })
  }, [])

  useEffect(() => {
    // section for getting UOM type from database
    UOMService.getUom().then((res) => {
      // console.log(res.data.data)
      setUOMType(res.data.data)
    })
  }, [])

  useEffect(() => {
    // section for getting Shed Details from database
    ShedMasterService.getShed().then((res) => {
      // console.log(res.data.data)
      setShedName(res.data.data)
    })
  }, [])

  useEffect(() => {
    console.log(values)
    console.log(enableSubmit)

    if (values.vehicleNumber != '0') {
      isTouched.tripsheetNumber = true
      if (values.vehicleNumber == '1') {
        setTsno('OT190222002')
        values.tripsheetNumber = 'OT190222002'
      } else if (values.vehicleNumber == '2') {
        setTsno('HC190222004')
        values.tripsheetNumber = 'HC190222004'
      } else if (values.vehicleNumber == '3') {
        setTsno('OT190222005')
        values.tripsheetNumber = 'OT190222005'
      } else {
        setTsno('')
        values.tripsheetNumber = ''
      }
    } else {
      setTsno('')
      values.tripsheetNumber = ''
    }
  }, [values.vehicleNumber])

  useEffect(() => {
    if (values.customerName != '0') {
      isTouched.customerMobile = true
      isTouched.customerPAN = true
      isTouched.customerCode = true
      if (values.customerName == 'James') {
        values.customerMobile = '9843342483'
        values.customerPAN = 'KLJHK3452E'
        values.customerCode = '34542'
        setCustPan('KLJHK3452E')
        setCustMobile('9843342483')
        setCustCode('34542')
      } else if (values.customerName == 'Kannan') {
        values.customerMobile = '7890654378'
        values.customerPAN = 'MLOPJ6754T'
        values.customerCode = '76890'
        setCustPan('MLOPJ6754T')
        setCustMobile('7890654378')
        setCustCode('76890')
      } else if (values.customerName == 'Akbar') {
        values.customerMobile = '8797660934'
        values.customerPAN = 'OPGHY5447W'
        values.customerCode = '32457'
        setCustPan('OPGHY5447W')
        setCustMobile('8797660934')
        setCustCode('32457')
      } else {
        values.customerMobile = ''
        values.customerPAN = ''
        values.customerCode = ''
        setCustPan('')
        setCustMobile('')
        setCustCode('')
      }
    } else {
      values.customerMobile = ''
      values.customerPAN = ''
      values.customerCode = ''
      setCustPan('')
      setCustMobile('')
    }
  }, [values.customerName])

  useEffect(() => {
    if (values.shed_name != '0') {
      //fetch Shed Pan , Aadhar Number from Shed Master

      // console.log('dd')
      ShedMasterService.getShedById(values.shed_name).then((res) => {
        isTouched.shed_name = true
        isTouched.shed_pan = true
        isTouched.shed_aadhar = true
        // isTouched.customerCode = true
        isTouched.customerCode = true
        // console.log(res.data.data)
        // values.shed_name = res.data.data.shed_id
        values.shed_pan = res.data.data.pan_number
        values.shed_aadhar = res.data.data.shed_adhar_number
        setShedPAN(res.data.data.pan_number)
        setShedAadhar(res.data.data.shed_adhar_number)
        if (values.PaymentTerm === '1') {
          // values.customerCode = res.data.data.shed_adhar_number.substring(0, 5)
          setShedCode(res.data.data.shed_adhar_number.substring(0, 5))
          values.customerCode = res.data.data.shed_adhar_number.substring(0, 5)
        } else {
          // isTouched.customerCode = false
          // values.customerCode = ''
          setShedCode('')
        }
      })
    } else {
      setShedPAN('')
      setShedAadhar('')
      setShedCode('')
    }
  }, [values.shed_name])

  useEffect(() => {
    if (values.PaymentTerm != '0') {
      isTouched.customerCode = true
      if (values.PaymentTerm != '2') {
        // values.customerCode = shedAadhar.substring(0, 5)
      } else {
        if (values.customerName == 'James') {
          values.customerCode = '34542'
        } else if (values.customerName == 'Kannan') {
          values.customerCode = '76890'
        } else if (values.customerName == 'Akbar') {
          values.customerCode = '32457'
        } else {
          values.customerCode = ''
        }
      }
      //fetch Shed Pan , Aadhar Number from Shed Master
      // console.log('dd')
      // ShedMasterService.getShedById(values.shed_name).then((res) => {
      //   isTouched.shed_name = true
      //   isTouched.shed_pan = true
      //   isTouched.shed_aadhar = true
      //   // console.log(res.data.data)
      //   // values.shed_name = res.data.data.shed_id
      //   values.shed_pan = res.data.data.pan_number
      //   values.shed_aadhar = res.data.data.shed_adhar_number
      //   setShedPAN(res.data.data.pan_number)
      //   setShedAadhar(res.data.data.shed_adhar_number)
      //   if (values.PaymentTerm != 'To Pay') {
      //     isTouched.customerCode = true
      //     values.customerCode = shedAadhar.substring(0, 5)
      //   }
      // })
    } else {
      values.customerCode = ''
      setShedPAN('')
      setShedAadhar('')
      values.shed_name = '0'
    }
  }, [values.PaymentTerm])

  function createRJSalesOrder() {
    const formData = new FormData()
    formData.append('vehicle_id', values.vehicleNumber)
    formData.append('tripsheet_id', values.tripsheetNumber)
    formData.append('payment_terms', values.PaymentTerm)
    formData.append('pay_customer_name', values.customerName)
    formData.append('customer_mobile_no', values.customerMobile)
    formData.append('customer_PAN_number', values.customerPAN)
    formData.append('shed_id', values.shed_name)
    // formData.append('shed_pan', values.shed_pan)
    // formData.append('shed_aadhar', values.shed_aadhar)
    formData.append('material_description_id', values.materialType)
    formData.append('material_descriptions', values.materialDescription)
    formData.append('uom_id', values.uomType)
    formData.append('order_qty', values.orderQuantity)
    formData.append('freight_income', values.freight_income)
    formData.append('advance_amount', values.advance_amount)
    formData.append('last_Delivery_point', values.lastDeliveryPoint)
    formData.append('empty_load_km', values.emptyLoad)
    formData.append('loading_point', values.loadPoint)
    formData.append('unloading_point', values.unloadPoint)
    formData.append('empty_km_after_unloaded', values.emptyUnload)
    formData.append('expected_delivery_date_time', values.deliveryTime)
    formData.append('expected_return_date_time', values.returnTime)

    formData.append('remarks', values.remarks ? values.remarks : 'NO REMARKS')

    formData.append('customer_code', values.customerCode)

    console.log(values)
    console.log(formData)

    let rj_so_no = RJSaleOrderCreationSapService.createRJSaleOrder(values)
    if (rj_so_no != '') {
      toast.success('RjSaleOrder Number Generated!')
    } else {
      toast.warning('Failed to generate RjSaleOrder Number')
    }

    formData.append('rj_so_no', rj_so_no)

    RJSaleOrderCreationService.createRJSaleOrder(formData)
      .then((res) => {
        if (res.status === 200) {
          toast.success('RJSaleOrder Created Successfully!')

          setTimeout(() => {
            // navigation('/RjSalesOrderCreation')
            window.location.href = '/RjSalesOrderCreation'
          }, 1000)
        }
      })
      .catch((error) => {
        for (let value of formData.values()) {
          console.log(value)
        }
        console.log(error)
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
              <CRow>
                <CCol xs={12} md={3}>
                  <CFormLabel htmlFor="vehicleNumber">
                    Vehicle Number*{' '}
                    {errors.vehicleNumber && (
                      <span className="small text-danger">{errors.vehicleNumber}</span>
                    )}
                  </CFormLabel>
                  <CFormSelect
                    size="sm"
                    name="vehicleNumber"
                    id="PaymentTerm"
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onChange={handleChange}
                    value={values.vehicleNumber}
                    className={`${errors.vehicleNumber && 'is-invalid'}`}
                    aria-label="Small select example"
                  >
                    {/* <CFormSelect size="sm" aria-label="Small select example" id="vNum"> */}
                    <option value="0">Select...</option>

                    <option value="1">TN45AT8614</option>

                    <option value="2">TN45AT8612</option>

                    <option value="3">TN45AT9687</option>
                  </CFormSelect>
                </CCol>

                <CCol xs={12} md={3}>
                  <CFormLabel htmlFor="tripsheetNumber">Tripsheet Number</CFormLabel>
                  <CFormInput
                    name="tripsheetNumber"
                    size="sm"
                    // maxLength={10}
                    id="tripsheetNumber"
                    onChange={handleChange}
                    value={tsno}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    placeholder=""
                    readOnly
                  />
                  {/* <CFormInput size="sm" id="tNum" readOnly /> */}
                </CCol>

                <CCol xs={12} md={3}>
                  <CFormLabel htmlFor="PaymentTerm">
                    Payment Terms
                    {errors.PaymentTerm && (
                      <span className="small text-danger">{errors.PaymentTerm}</span>
                    )}
                  </CFormLabel>
                  <CFormSelect
                    size="sm"
                    name="PaymentTerm"
                    id="PaymentTerm"
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onChange={handleChange}
                    value={values.PaymentTerm}
                    className={`${errors.PaymentTerm && 'is-invalid'}`}
                    aria-label="Small select example"
                  >
                    <option value="0">Select...</option>
                    <option value="1">Shed</option>
                    <option value="2">To Pay</option>
                  </CFormSelect>
                </CCol>
                {values.PaymentTerm == 2 && (
                  <CCol xs={12} md={3}>
                    <CFormLabel htmlFor="customerName">
                      To Pay Customer Name*{' '}
                      {errors.customerName && (
                        <span className="small text-danger">{errors.customerName}</span>
                      )}
                    </CFormLabel>
                    <CFormSelect
                      size="sm"
                      name="customerName"
                      id="customerName"
                      onFocus={onFocus}
                      onBlur={onBlur}
                      onChange={handleChange}
                      value={values.customerName}
                      className={`${errors.customerName && 'is-invalid'}`}
                      aria-label="Small select example"
                    >
                      {/* <CFormSelect size="sm" aria-label="Small select example" id="vNum"> */}
                      <option value="0">Select...</option>

                      <option value="James">James</option>

                      <option value="Kannan">Kannan</option>

                      <option value="Akbar">Akbar</option>
                    </CFormSelect>
                    {/* <CFormInput
                      name="customerName"
                      size="sm"
                      maxLength={20}
                      id="customerName"
                      onChange={handleChange}
                      value={values.customerName}
                      onFocus={onFocus}
                      onBlur={onBlur}
                      placeholder=""
                    /> */}
                    {/* <CFormInput size="sm" id="cName" /> */}
                  </CCol>
                )}
                {values.PaymentTerm == 2 && (
                  <CCol xs={12} md={3}>
                    <CFormLabel htmlFor="customerMobile">
                      Customer Mobile Number*{' '}
                      {/* {errors.customerMobile && (
                        <span className="small text-danger">{errors.customerMobile}</span>
                      )} */}
                    </CFormLabel>
                    <CFormInput
                      name="customerMobile"
                      size="sm"
                      maxLength={10}
                      id="customerMobile"
                      onChange={handleChange}
                      value={custMobile}
                      onFocus={onFocus}
                      onBlur={onBlur}
                      placeholder=""
                      readOnly
                    />
                  </CCol>
                  // <CCol xs={12} md={3}>
                  //   <CFormLabel htmlFor="cMob">Customer Mobile Number</CFormLabel>
                  //   <CFormInput size="sm" id="cMob" />
                  // </CCol>
                )}
                {values.PaymentTerm == 2 && (
                  // <CCol xs={12} md={3}>
                  //   <CFormLabel htmlFor="cPAN">Customer PAN Number</CFormLabel>
                  //   <CFormInput size="sm" id="cPAN" />
                  // </CCol>
                  <CCol xs={12} md={3}>
                    <CFormLabel htmlFor="customerPAN">
                      Customer PAN Number*{' '}
                      {/* {errors.customerPAN && (
                        <span className="small text-danger">{errors.customerPAN}</span>
                      )} */}
                    </CFormLabel>
                    <CFormInput
                      name="customerPAN"
                      size="sm"
                      maxLength={10}
                      id="customerPAN"
                      onChange={handleChange}
                      value={custPan}
                      onFocus={onFocus}
                      onBlur={onBlur}
                      placeholder=""
                      readOnly
                    />
                  </CCol>
                )}
                <CCol xs={12} md={3}>
                  <CFormLabel htmlFor="shed_name">
                    Shed Name*{' '}
                    {errors.shed_name && (
                      <span className="small text-danger">{errors.shed_name}</span>
                    )}
                  </CFormLabel>
                  <CFormSelect
                    size="sm"
                    name="shed_name"
                    onChange={handleChange}
                    onFocus={onFocus}
                    value={values.shed_name}
                    className={`mb-1 ${errors.shed_name && 'is-invalid'}`}
                    aria-label="Small select example"
                    id="shed_name"
                  >
                    <option value="0">Select ...</option>
                    {shedName.map(({ shed_id, shed_name }) => {
                      if (shed_id) {
                        return (
                          <>
                            <option key={shed_id} value={shed_id}>
                              {shed_name}
                            </option>
                          </>
                        )
                      }
                    })}
                  </CFormSelect>
                </CCol>
                <CCol xs={12} md={3}>
                  <CFormLabel htmlFor="shedPAN">Shed PAN Number*</CFormLabel>
                  <CFormInput
                    name="shed_pan"
                    size="sm"
                    maxLength={10}
                    id="shed_pan"
                    onChange={handleChange}
                    value={shedPAN}
                    // value={values.shedPAN}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    placeholder=""
                    readOnly
                  />
                </CCol>
                <CCol xs={12} md={3}>
                  <CFormLabel htmlFor="shedPAN">Shed Aadhar Number*</CFormLabel>
                  <CFormInput
                    name="shed_aadhar"
                    size="sm"
                    // maxLength={10}
                    id="shed_aadhar"
                    onChange={handleChange}
                    value={shedAadhar}
                    // value={values.shedPAN}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    placeholder=""
                    readOnly
                  />
                </CCol>
                <CCol xs={12} md={3}>
                  <CFormLabel htmlFor="customerCode">
                    Customer Code*
                    {errors.customerCode && (
                      <span className="small text-danger">{errors.customerCode}</span>
                    )}
                  </CFormLabel>

                  <CFormInput
                    name="customerCode"
                    size="sm"
                    id="orderQuantity"
                    onChange={handleChange}
                    value={
                      values.PaymentTerm === '1'
                        ? shedCode
                        : values.PaymentTerm === '2'
                        ? custCode
                        : ''
                    }
                    // value={}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    // maxLength={5}
                    className={`${errors.customerCode && 'is-invalid'}`}
                    placeholder=""
                    readOnly
                  />
                </CCol>
                <CCol xs={12} md={3}>
                  <CFormLabel htmlFor="materialType">
                    Material Type*{' '}
                    {errors.materialType && (
                      <span className="small text-danger">{errors.materialType}</span>
                    )}
                  </CFormLabel>
                  <CFormSelect
                    size="sm"
                    name="materialType"
                    onChange={handleChange}
                    onFocus={onFocus}
                    value={values.vehicleType}
                    className={`mb-1 ${errors.materialType && 'is-invalid'}`}
                    aria-label="Small select example"
                    id="materialType"
                  >
                    <option value="0">Select ...</option>
                    {materialType.map(({ id, material_description }) => {
                      if (id) {
                        return (
                          <>
                            <option key={id} value={id}>
                              {material_description}
                            </option>
                          </>
                        )
                      }
                    })}
                  </CFormSelect>
                </CCol>

                <CCol xs={12} md={3}>
                  <CFormLabel htmlFor="materialDescription">
                    Material Description*
                    {errors.materialDescription && (
                      <span className="small text-danger">{errors.materialDescription}</span>
                    )}
                  </CFormLabel>
                  <CFormInput
                    name="materialDescription"
                    size="sm"
                    maxLength={20}
                    id="materialDescription"
                    onChange={handleChange}
                    value={values.materialDescription}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    placeholder=""
                  />
                </CCol>
                <CCol xs={12} md={3}>
                  <CFormLabel htmlFor="hsnCode">
                    HSN Code*
                    {errors.hsnCode && <span className="small text-danger">{errors.hsnCode}</span>}
                  </CFormLabel>
                  <CFormInput
                    name="hsnCode"
                    size="sm"
                    maxLength={8}
                    id="hsnCode"
                    onChange={handleChange}
                    value={values.hsnCode}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    placeholder=""
                  />
                </CCol>
                <CCol xs={12} md={3}>
                  <CFormLabel htmlFor="uomType">
                    UOM*{' '}
                    {errors.uomType && <span className="small text-danger">{errors.uomType}</span>}
                  </CFormLabel>
                  <CFormSelect
                    size="sm"
                    name="uomType"
                    onChange={handleChange}
                    onFocus={onFocus}
                    value={values.uomType}
                    className={`mb-1 ${errors.uomType && 'is-invalid'}`}
                    aria-label="Small select example"
                    id="uomType"
                  >
                    {/* <CFormLabel htmlFor="uom">UOM*</CFormLabel>
                  <CFormSelect size="sm" id="uom" aria-label="Small select example"> */}
                    <option value="0">Select ...</option>
                    {uomType.map(({ id, uom }) => {
                      if (id) {
                        return (
                          <>
                            <option key={id} value={id}>
                              {uom}
                            </option>
                          </>
                        )
                      }
                    })}
                  </CFormSelect>
                </CCol>

                <CCol xs={12} md={3}>
                  <CFormLabel htmlFor="orderQuantity">
                    Order Qty*
                    {errors.orderQuantity && (
                      <span className="small text-danger">{errors.orderQuantity}</span>
                    )}
                  </CFormLabel>
                  <CFormInput
                    name="orderQuantity"
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onChange={handleChange}
                    maxLength={4}
                    className={`${errors.orderQuantity && 'is-invalid'}`}
                    values={values.orderQuantity}
                    size="sm"
                    id="orderQuantity"
                    placeholder=""
                  />
                </CCol>

                <CCol xs={12} md={3}>
                  <CFormLabel htmlFor="freight_income">
                    Freight Income*
                    {errors.freight_income && (
                      <span className="small text-danger">{errors.freight_income}</span>
                    )}
                  </CFormLabel>
                  <CFormInput
                    name="freight_income"
                    onFocus={onFocus}
                    onBlur={onBlur}
                    // type="number"
                    maxLength={8}
                    onChange={handleChange}
                    className={`${errors.freight_income && 'is-invalid'}`}
                    size="sm"
                    values={values.freight_income}
                    id="freight_income"
                    placeholder=""
                  />
                </CCol>

                <CCol xs={12} md={3}>
                  <CFormLabel htmlFor="advance_amount">
                    Advance Amount*
                    {errors.advance_amount && (
                      <span className="small text-danger">{errors.advance_amount}</span>
                    )}
                  </CFormLabel>
                  <CFormInput
                    name="advance_amount"
                    onFocus={onFocus}
                    onBlur={onBlur}
                    // type="number"
                    maxLength={8}
                    onChange={handleChange}
                    className={`${errors.advance_amount && 'is-invalid'}`}
                    values={values.advance_amount}
                    size="sm"
                    id="advance_amount"
                    placeholder=""
                  />
                  {/* <CFormLabel htmlFor="inputAddress">Advance Amount*</CFormLabel> */}
                  {/* <CFormLabel htmlFor="advanceAmount">Advance Amount*</CFormLabel> {/* Changed */}
                  {/* <CFormInput size="sm" id="advanceAmount" />  */}
                </CCol>
                <CCol xs={12} md={3}>
                  <CFormLabel htmlFor="lastDeliveryPoint">
                    Last Delivery Point*
                    {errors.lastDeliveryPoint && (
                      <span className="small text-danger">{errors.lastDeliveryPoint}</span>
                    )}
                  </CFormLabel>
                  <CFormInput
                    name="lastDeliveryPoint"
                    size="sm"
                    maxLength={20}
                    id="lastDeliveryPoint"
                    onChange={handleChange}
                    value={values.lastDeliveryPoint}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    placeholder=""
                  />
                </CCol>
                <CCol xs={12} md={3}>
                  <CFormLabel htmlFor="emptyLoad">
                    Empty Load KM*
                    {errors.emptyLoad && (
                      <span className="small text-danger">{errors.emptyLoad}</span>
                    )}
                  </CFormLabel>
                  <CFormInput
                    name="emptyLoad"
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onChange={handleChange}
                    maxLength={3}
                    className={`${errors.emptyLoad && 'is-invalid'}`}
                    values={values.emptyLoad}
                    size="sm"
                    id="emptyLoad"
                    placeholder=""
                  />
                </CCol>
                <CCol xs={12} md={3}>
                  <CFormLabel htmlFor="loadPoint">
                    Loading Point*
                    {errors.loadPoint && (
                      <span className="small text-danger">{errors.loadPoint}</span>
                    )}
                  </CFormLabel>
                  <CFormInput
                    name="loadPoint"
                    size="sm"
                    maxLength={20}
                    id="loadPoint"
                    onChange={handleChange}
                    value={values.loadPoint}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    placeholder=""
                  />
                </CCol>
                <CCol xs={12} md={3}>
                  <CFormLabel htmlFor="unloadPoint">
                    Unloading Point*
                    {errors.unloadPoint && (
                      <span className="small text-danger">{errors.unloadPoint}</span>
                    )}
                  </CFormLabel>
                  <CFormInput
                    name="unloadPoint"
                    size="sm"
                    maxLength={20}
                    id="unloadPoint"
                    onChange={handleChange}
                    value={values.unloadPoint}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    placeholder=""
                  />
                </CCol>
                <CCol xs={12} md={3}>
                  <CFormLabel htmlFor="emptyUnload">
                    Empty Km After Unload*
                    {errors.emptyUnload && (
                      <span className="small text-danger">{errors.emptyUnload}</span>
                    )}
                  </CFormLabel>
                  <CFormInput
                    name="emptyUnload"
                    size="sm"
                    maxLength={3}
                    id="emptyUnload"
                    onChange={handleChange}
                    value={values.emptyUnload}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    placeholder=""
                  />
                </CCol>
                <CCol xs={12} md={3}>
                  <CFormLabel htmlFor="deliveryTime">
                    Expected Delivery Date & Time*
                    {errors.deliveryTime && (
                      <span className="small text-danger">{errors.deliveryTime}</span>
                    )}
                  </CFormLabel>
                  <CFormInput
                    name="deliveryTime"
                    size="sm"
                    // maxLength={3}
                    id="deliveryTime"
                    onChange={handleChange}
                    type="datetime-local"
                    value={values.deliveryTime}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    placeholder=""
                  />
                  {/* <CFormLabel htmlFor="expectDelivery">
                    Expected Delivery Date & Time*
                    {errors.expectDelivery && (
                      <span className="small text-danger">{errors.expectDelivery}</span>
                    )}
                  </CFormLabel>
                  <CFormInput size="sm" type="datetime-local" id="expectDelivery" /> */}
                </CCol>
                <CCol xs={12} md={3}>
                  <CFormLabel htmlFor="returnTime">
                    Expected Return Date & Time*
                    {errors.returnTime && (
                      <span className="small text-danger">{errors.returnTime}</span>
                    )}
                  </CFormLabel>
                  <CFormInput
                    name="returnTime"
                    size="sm"
                    // maxLength={3}
                    id="returnTime"
                    onChange={handleChange}
                    type="datetime-local"
                    value={values.returnTime}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    placeholder=""
                  />
                  {/* <CFormLabel htmlFor="expectReturn">
                    Expected Return Date & Time*
                    {errors.expectReturn && (
                      <span className="small text-danger">{errors.expectReturn}</span>
                    )}
                  </CFormLabel>
                  <CFormInput size="sm" type="datetime-local" id="expectReturn" /> */}
                </CCol>
                <CCol xs={12} md={3}>
                  <CFormLabel htmlFor="remarks">Remarks</CFormLabel>
                  <CFormTextarea
                    name="remarks"
                    id="remarks"
                    onChange={handleChange}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    value={values.remarks}
                    rows="1"
                  >
                    {values.remarks}
                  </CFormTextarea>
                </CCol>
              </CRow>

              <CRow className="mt-3">
                <CCol className="" xs={12} sm={9} md={3}>
                  <CButton
                    size="sm"
                    color="primary"
                    // disabled={enableSubmit}
                    className="text-white"
                    type="submit"
                  >
                    Previous
                  </CButton>
                </CCol>

                <CCol
                  className="offset-md-6"
                  xs={12}
                  sm={9}
                  md={3}
                  style={{ display: 'flex', justifyContent: 'end' }}
                >
                  <CButton
                    size="sm"
                    color="warning"
                    disabled={enableSubmit}
                    className="mx-3 px-3 text-white"
                    // type="submit"
                    onClick={() => createRJSalesOrder()}
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
      {/* Error Modal Section */}
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
      {/* Error Modal Section */}
    </>
  )
}
export default RJSalesOrderCreation
