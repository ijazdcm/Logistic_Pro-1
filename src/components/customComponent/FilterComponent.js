import React, { useEffect } from 'react'
import { CButton, CCol, CFormInput, CInputGroup, CInputGroupText, CRow } from '@coreui/react'
export const FilterComponent = ({ filterText, onFilter, onClear, fieldName }) => {
  return (
    <>
      <CRow>
        <CCol className="display-flex">
          <CInputGroup>
            <CFormInput
              size="sm"
              id="search"
              type="text"
              name="search"
              placeholder={`Search By ${fieldName}`}
              aria-label="Search Input"
              onChange={onFilter}
              value={filterText}
            />
            <CInputGroupText>
              <CButton size="sm" className="m-0" color="secondary" type="button" onClick={onClear}>
                X
              </CButton>
            </CInputGroupText>
          </CInputGroup>
        </CCol>
      </CRow>
    </>
  )
}
