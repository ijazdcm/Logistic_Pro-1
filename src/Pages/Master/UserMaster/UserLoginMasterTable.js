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
import CustomSpanButton3 from 'src/components/customComponent/CustomSpanButton3'
import CustomTable from 'src/components/customComponent/CustomTable'
import UserLoginMasterService from 'src/Service/Master/UserLoginMasterService'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const UserLoginMasterTable = () => {
  const [userphoto, setUserphoto] = useState(false)
  const [documentSrc, setDocumentSrc] = useState('')
  const [mount, setMount] = useState(1)
  const [rowData, setRowData] = useState([])
  let viewData

  function handleViewDocuments(e, id, type) {
    switch (type) {
      case 'USER_PHOTO':
        {
          let singleUserInfo = viewData.filter((data) => data.user_id == id)
          setDocumentSrc(singleUserInfo[0].user_image)
          setUserphoto(true)
        }
        break
      default:
        return 0
    }
  }

  const changeUserStatus = (userid) => {
    UserLoginMasterService.deleteUser(userid).then((res) => {
      if (res.status == 204) {
        toast.success('User Status Updated Successfully!')
        setMount((preState) => preState + 1)
      }
    })
  }

  useEffect(() => {
    UserLoginMasterService.getUser().then((res) => {
      viewData = res.data.data
      let rowDataList = []
      viewData.map((data, index) => {
        rowDataList.push({
          sno: index + 1,
          Creation_Date: data.created_at,
          User_Name: data.username,
          Division: data.division_info.division,
          Department: data.department_info.department,
          Designation: data.designation_info.designation,
          Location: data.location_info.location,
          Serial_No: data.serial_no,
          User_ID: data.user_auto_id,
          User_Mobile_Number: data.mobile_no,
          User_Mail_ID: data.email,
          User_Mail_ID: data.email,
          User_Photo: (
            <CustomSpanButton3
              handleViewDocuments={handleViewDocuments}
              Id={data.user_id}
              documentType={'USER_PHOTO'}
            />
          ),
          Status: (
            <span className={`badge rounded-pill bg-${data.user_status === 1 ? 'info' : 'danger'}`}>
              {data.user_status === 1 ? 'Active' : 'Inactive'}
            </span>
          ),
          Action: (
            <div className="d-flex justify-content-space-between">
              <CButton
                size="sm"
                color="danger"
                shape="rounded"
                id={data.id}
                onClick={() => {
                  changeUserStatus(data.user_id)
                }}
                className="m-1"
              >
                {/* Delete */}
                <i className="fa fa-trash" aria-hidden="true"></i>
              </CButton>
              <Link to={data.user_status === 1 ? `UserLoginMasterEdit/${data.user_id}` : ''}>
                <CButton
                  disabled={data.user_status === 1 ? false : true}
                  size="sm"
                  color="secondary"
                  shape="rounded"
                  id={data.id}
                  className="m-1"
                  type="button"
                >
                  {/* Edit */}
                  <i className="fa fa-edit" aria-hidden="true"></i>
                </CButton>
              </Link>
            </div>
          ),
        })
      })
      setRowData(rowDataList)
    })
  }, [mount])

  const columns = [
    {
      name: 'S.No',
      selector: (row) => row.sno,
      sortable: true,
      center: true,
    },
    {
      name: 'Creation Date',
      selector: (row) => row.Creation_Date,
      sortable: true,
      center: true,
    },

    {
      name: 'User Name',
      selector: (row) => row.User_Name,
      sortable: true,
      center: true,
    },
    {
      name: 'Division',
      selector: (row) => row.Division,
      sortable: true,
      center: true,
    },
    {
      name: 'Department',
      selector: (row) => row.Department,
      sortable: true,
      center: true,
    },
    {
      name: 'Designation',
      selector: (row) => row.Designation,
      sortable: true,
      center: true,
    },
    {
      name: 'Location',
      selector: (row) => row.Location,
      sortable: true,
      center: true,
    },
    {
      name: 'Serial No',
      selector: (row) => row.Serial_No,
      sortable: true,
      center: true,
    },
    {
      name: 'User ID',
      selector: (row) => row.User_ID,
      center: true,
    },
    {
      name: ' User Mobile Number',
      selector: (row) => row.User_Mobile_Number,
      center: true,
    },
    {
      name: 'User Mail ID',
      selector: (row) => row.User_Mail_ID,
      center: true,
    },
    {
      name: 'User Photo',
      selector: (row) => row.User_Photo,
      center: true,
    },
    {
      name: 'Statususer_status',
      selector: (row) => row.Status,
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
        <hr></hr>
        <CRow className="mt-3">
          <CCol
            className="offset-md-6"
            xs={15}
            sm={15}
            md={6}
            style={{ display: 'flex', justifyContent: 'end' }}
          >
            <CButton
              size="sm"
              color="warning"
              // disabled={enableSubmit}
              className="px-3 text-white"
              type="submit"
            >
              <Link className="text-white" to="/UserLoginMaster">
                New
              </Link>
            </CButton>
          </CCol>
        </CRow>
      </CContainer>
      {/* Model for User Photo  */}
      <CModal visible={userphoto} onClose={() => setUserphoto(false)}>
        <CModalHeader>
          <CModalTitle>User Photo</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CCardImage orientation="top" src={documentSrc} />
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setUserphoto(false)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
      {/* Model for User Photo  */}
    </CCard>
  )
}

export default UserLoginMasterTable
