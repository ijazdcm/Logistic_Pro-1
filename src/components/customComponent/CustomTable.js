import DataTable from 'react-data-table-component'
import React, { useState, useEffect, useMemo } from 'react'
import {
  CButton,
  CCol,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CSpinner,
} from '@coreui/react'
import FilterComponent from './FilterComponent'
import { CustomLoader } from './CustomLoader'

const CustomTable = ({ columns, data, fieldName, showSearchFilter, pending = false }) => {
  const [filterText, setFilterText] = useState('')
  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false)
  // const filteredItems = data.filter(
  //   item => item.name && item.name.includes(filterText)
  // );
  const filteredItems = data.filter(
    (item) => JSON.stringify(item).toLowerCase().indexOf(filterText.toLowerCase()) !== -1
  )

  const subHeaderComponentMemo = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle)
        setFilterText('')
      }
    }

    return (
      <FilterComponent
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    )
  }, [filterText, resetPaginationToggle])

  const customStyles = {
    rows: {
      style: {
        minHeight: 'auto', // override the row height
      },
    },
    headCells: {
      style: {
        width: 'fit-content',
        padding: 'auto',
        margin: 'auto',
        textTransform: 'uppercase',
        paddingLeft: '1px', // override the cell padding for head cells
        paddingRight: '1px',
        backgroundColor: '#4d3227',
        color: '#fff',
        fontSize: '0.75rem',
        height: '3.25rem',
        overFlow:'unset'
      },
    },
    cells: {
      style: {
        paddingLeft: '0', // override the cell padding for data cells
        paddingRight: '0',

        fontSize: '0.75rem',
        textAlign: 'center',
      },
    },
  }

  return showSearchFilter ? (
    <>
      <DataTable
        data={filteredItems}
        columns={columns}
        // data={data}
        subHeader
        subHeaderComponent={subHeaderComponentMemo}
        pagination
        customStyles={customStyles}
        progressPending={pending}
        progressComponent={<CustomLoader />}
      />
    </>
  ) : (
    <>
      <DataTable
        data={data}
        columns={columns}
        pagination
        customStyles={customStyles}
        progressPending={pending}
        progressComponent={<CustomLoader />}
      />
    </>
  )
}

export default CustomTable

// OLD
// const [filterText, setFilterText] = React.useState('')
// const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false)

// const filteredItems = data.filter(
//   (item) => item[fieldName] && item[fieldName].toLowerCase().includes(filterText.toLowerCase())
// )

// const subHeaderComponentMemo = React.useMemo(() => {
//   const handleClear = () => {
//     if (filterText) {
//       setResetPaginationToggle(!resetPaginationToggle)
//       setFilterText('')
//     }
//   }

//   return (
//     <>
//       <FilterComponent
//         onFilter={(e) => setFilterText(e.target.value)}
//         onClear={handleClear}
//         filterText={filterText}
//         fieldName={fieldName}
//       />
//     </>
//   )
// }, [filterText, resetPaginationToggle])
