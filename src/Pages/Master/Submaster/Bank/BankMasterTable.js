import {
  CButton,
  CCard,
  CCardImage,
  CCol,
  CContainer,
  CFormInput,
  CFormLabel,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import CustomTable from 'src/components/customComponent/CustomTable'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import BankMasterService from 'src/Service/SubMaster/BankMasterService'
import BankSubMasterValidation from 'src/Utils/SubMaster/BankSubMasterValidation'
import useForm from 'src/Hooks/useForm'
const BankMasterTable = () => {
  const [rowData, setRowData] = useState([])
  const [newBankModel, setNewBankModel] = useState(false)
  const [editBankModel, setEditBankModel] = useState(false)
  const [updateBankId, setUpdateBankId] = useState(false)
  const [mount, setMount] = useState(1)
  const [pending, setPending] = useState(true)

  const formValues = {
    bankName: '',
  }

  const { values, errors, handleChange, onFocus, handleSubmit, enableSubmit, onBlur } = useForm(
    addNewBank,
    BankSubMasterValidation,
    formValues
  )

  let viewData = []

  function handleStatus(id) {
    BankMasterService.deleteBank(id).then((res) => {
      if (res.status === 204) {
        setMount((prevState) => (prevState = prevState + 1))
        toast.success('Bank Status Updated Successfully!')
      }
    })
  }

  function handleEdit(id) {
    BankMasterService.getBankById(id).then((res) => {
      values.bankName = res.data.data.bank_name
      setUpdateBankId(id)
      setEditBankModel(true)
    })
  }

  function updateBank(id) {
    const formData = new FormData()
    formData.append('_method', 'PUT')
    formData.append('bank_name', values.bankName)
    BankMasterService.updateBank(updateBankId, formData).then((res) => {
      if (res.status === 200) {
        setEditBankModel(false)
        values.bankName = ''
        setUpdateBankId('')
        setMount((prevState) => (prevState = prevState + 1))
        toast.success('Bank Name Updated Successfully!')
      }
    })
  }

  function addNewBank(e) {
    e.preventDefault()

    const formData = new FormData()

    formData.append('bank_name', values.bankName)

    BankMasterService.createBank(formData).then((res) => {
      if (res.status === 200) {
        values.bankName = ''
        setNewBankModel(false)
        setMount((prevState) => (prevState = prevState + 1))
        toast.success('New Bank Successfully!')
      }
    })
  }

  useEffect(() => {
    BankMasterService.getAllBank().then((res) => {
      viewData = res.data.data
      let rowDataList = []
      viewData.map((data, index) => {
        rowDataList.push({
          sno: index + 1,
          Created_at: data.created_at,
          Bank: data.bank_name,
          Status:
            data.bank_status === 1 ? '✔️' : '❌',
          Action: (
            <div className="d-flex justify-content-space-between">
              <CButton
                size="sm"
                color="danger"
                shape="rounded"
                id={data.bank_id}
                onClick={(e) => handleStatus(data.bank_id)}
                type="button"
                className="m-1"
              >
                {/* active & de-active */}
                <i className="fa fa-trash" aria-hidden="true"></i>
              </CButton>
              <CButton
                disabled={data.bank_status === 1 ? false : true}
                size="sm"
                color="secondary"
                shape="rounded"
                id={data.bank_id}
                className="m-1"
                onClick={(e) => handleEdit(data.bank_id)}
              >
                {/* Edit */}
                <i className="fa fa-edit" aria-hidden="true"></i>
              </CButton>
            </div>
          ),
        })
      })
      setRowData(rowDataList)
      setPending(false)
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
      name: 'Creation date',
      selector: (row) => row.Created_at,
      sortable: true,
      left: true,
    },
    {
      name: 'Bank Name',
      selector: (row) => row.Bank,
      sortable: true,
      left: true,
    },
    {
      name: 'Status',
      selector: (row) => row.Status,
      sortable: true,
      // sortType: basic,
      left: true,
    },
    {
      name: 'Action',
      selector: (row) => row.Action,
      center: true,
    },
  ]
  // =================== Column Header Data =======

  return (
    <>
      <CContainer className="mt-2">
        <CRow className="mt-3">
          <CCol
            className="offset-md-6"
            xs={15}
            sm={15}
            md={6}
            style={{ display: 'flex', justifyContent: 'end' }}
          >
            <CButton
              size="md"
              color="warning"
              className="px-3 text-white"
              type="button"
              onClick={() => setNewBankModel(true)}
            >
              <span className="float-start">
                <i className="" aria-hidden="true"></i> &nbsp;New
              </span>
            </CButton>
          </CCol>
        </CRow>
        <CCard className="mt-1">
          <CustomTable
            columns={columns}
            data={rowData}
            fieldName={'Bank'}
            showSearchFilter={true}
            pending={pending}
          />
        </CCard>
        {/*add New Bank model*/}
        <CModal visible={newBankModel} onClose={() => setNewBankModel(false)}>
          <CModalHeader>
            <CModalTitle>ADD NEW BANK</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CRow>
              <CCol>
                <CFormLabel htmlFor="defect_type">
                  Bank Name*{' '}
                  {errors.bankName && <span className="small text-danger">{errors.bankName}</span>}
                </CFormLabel>
                <CFormInput
                  size="sm"
                  id="bankName"
                  maxLength={20}
                  className={`${errors.bankName && 'is-invalid'}`}
                  name="bankName"
                  value={values.bankName}
                  onFocus={onFocus}
                  onBlur={onBlur}
                  onChange={handleChange}
                  aria-label="Small select example"
                />
              </CCol>
            </CRow>
          </CModalBody>
          <CModalFooter>
            <CButton
              color="secondary"
              onClick={() => {
                values.bankName = ''
                setNewBankModel(false)
              }}
            >
              Cancel
            </CButton>
            <CButton color="primary" disabled={enableSubmit} onClick={(e) => addNewBank(e)}>
              Add
            </CButton>
          </CModalFooter>
        </CModal>
        {/*add New Bank model*/}
        {/*edit Bank model*/}
        <CModal visible={editBankModel} onClose={() => setEditBankModel(false)}>
          <CModalHeader>
            <CModalTitle>EDIT BANK</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CRow>
              <CCol>
                <CFormLabel htmlFor="defect_type">
                  Bank Name*{' '}
                  {errors.bankName && <span className="small text-danger">{errors.bankName}</span>}
                </CFormLabel>
                <CFormInput
                  size="sm"
                  id="bankName"
                  maxLength={20}
                  className={`${errors.bankName && 'is-invalid'}`}
                  name="bankName"
                  value={values.bankName}
                  onFocus={onFocus}
                  onBlur={onBlur}
                  onChange={handleChange}
                  aria-label="Small select example"
                />
              </CCol>
            </CRow>
          </CModalBody>
          <CModalFooter>
            <CButton
              color="secondary"
              onClick={() => {
                values.bankName = ''
                setEditBankModel(false)
              }}
            >
              Cancel
            </CButton>
            <CButton color="primary" disabled={enableSubmit} onClick={(e) => updateBank(e)}>
              Update
            </CButton>
          </CModalFooter>
        </CModal>
        {/*edit Bank model*/}
      </CContainer>
    </>
  )
}

export default BankMasterTable
