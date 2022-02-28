import DataTable from 'react-data-table-component'
import React, { useEffect } from 'react'
import {
  CButton,
  CCol,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CSpinner,
} from '@coreui/react'
import { FilterComponent } from './FilterComponent'
import { CustomLoader } from './CustomLoader'

const CustomTable = ({ columns, data, fieldName, showSearchFilter, pending = false }) => {
  const [filterText, setFilterText] = React.useState('')
  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false)

  const filteredItems = data.filter(
    (item) => item[fieldName] && item[fieldName].toLowerCase().includes(filterText.toLowerCase())
  )
  console.log(filteredItems)

  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle)
        setFilterText('')
      }
    }

    return (
      <>
        <FilterComponent
          onFilter={(e) => setFilterText(e.target.value)}
          onClear={handleClear}
          filterText={filterText}
          fieldName={fieldName}
        />
      </>
    )
  }, [filterText, resetPaginationToggle])

  const customStyles = {
    rows: {
      style: {
        minHeight: '1rem', // override the row height
      },
    },
    headCells: {
      style: {
        padding: '0px',
        margin: '0px',
        paddingLeft: '1px', // override the cell padding for head cells
        paddingRight: '1px',
        backgroundColor: '#4d3227',
        color: '#fff',
        fontSize: '0.8rem',
        fontWeight: 'bold',
        height: '3.25rem',
      },
    },
    cells: {
      style: {
        paddingLeft: '8px', // override the cell padding for data cells
        paddingRight: '8px',
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
