import {
  CButton,
  CCard,
  CContainer,
  CCol,
  CRow,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CCardImage,
  CModalFooter,
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import CustomTable from 'src/components/customComponent/CustomTable'
import DriverMasterService from 'src/Service/Master/DriverMasterService'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import CustomSpanButton from 'src/components/customComponent/CustomSpanButton1'
import CustomerCreationService from 'src/Service/CustomerCreation/CustomerCreationService'

const CustomerCreationHome = () => {
  const [rowData, setRowData] = useState([])
  const [mount, setMount] = useState(1)

  const [documentSrc, setDocumentSrc] = useState('')
  let viewData

  


  //section for handling view model for each model

  useEffect(() => {
    CustomerCreationService.getCustomerCreationData().then((response) => {
      viewData = response.data.data
      console.log(viewData);
      let rowDataList = []
      viewData.map((data, index) => {
        rowDataList.push({
          sno: index + 1,
          Creation_Date: data.created_at,
          customer_name: data.customer_name,
          customer_PAN_card_number: data.customer_PAN_card_number,
          customer_Aadhar_card_number: data.customer_Aadhar_card_number,
          customer_mobile_number: data.customer_mobile_number,
          customer_street_name: data.customer_street_name,
          customer_area: data.customer_area,
          customer_city: data.customer_city,
          customer_state: data.customer_state,
          customer_district: data.customer_district,
          customer_postal_code: data.customer_postal_code,
        })
      })
      setRowData(rowDataList)

    })
  }, [mount])

  // ============ Column Header Data =======

  const columns = [
    {
      name: 'S.No',
      selector: (row) => row.sno,
      sortable: true,
      center: true,
    },

    {
      name: 'Customer Name',
      selector: (row) => row.customer_name,
      sortable: true,
      center: true,
    },
    {
      name: 'PAN Number',
      selector: (row) => row.customer_PAN_card_number,
      sortable: true,
      center: true,
    },
    {
      name: 'Aadhar Number',
      selector: (row) => row.customer_Aadhar_card_number,
      sortable: true,
      center: true,
    },
    {
      name: 'Mobile Number',
      selector: (row) => row.customer_mobile_number,
      sortable: true,
      center: true,
    },
    {
      name: 'Street Name',
      selector: (row) => row.customer_street_name,
      sortable: true,
      center: true,
    },
    {
      name: 'Area',
      selector: (row) => row.customer_area,
      sortable: true,
      center: true,
    },
    {
      name: 'City',
      selector: (row) => row.customer_city,
      sortable: true,
      center: true,
    },
    {
      name: 'District',
      selector: (row) => row.customer_district,
      sortable: true,
      center: true,
    },
    {
      name: 'State',
      selector: (row) => row.customer_state,
      sortable: true,
      center: true,
    },
    {
      name: ' Postal code',
      selector: (row) => row.customer_postal_code,
      sortable: true,
      center: true,
    },

  ]

  //============ column header data=========

  return (
    <CCard>
      <CContainer className="mt-1">
        <CRow className="mt-1 mb-1">
          <CCol
            className="offset-md-6"
            xs={15}
            sm={15}
            md={6}
            style={{ display: 'flex', justifyContent: 'end' }}
          >
            <Link className="text-white" to="/RJcustomerCreationHome/RJcustomerCreation">
              <CButton size="md" color="warning" className="px-3 text-white" type="button">
                <span className="float-start">
                  <i className="" aria-hidden="true"></i> &nbsp;New
                </span>
              </CButton>
            </Link>
          </CCol>
        </CRow>

        <CustomTable
          columns={columns}
          data={rowData}
          fieldName={'customer_name'}
          showSearchFilter={true}
        />
        <hr></hr>
      </CContainer>
      {/*License copy front model*/}

      {/*Driver Photo model*/}
    </CCard>
  )
}

export default CustomerCreationHome
