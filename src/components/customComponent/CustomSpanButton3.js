import React from 'react'
import { CButton } from '@coreui/react'

const CustomSpanButton3 = ({handleViewDocuments,Id,documentType}) => {
  return (
    <>
      <span>
        <CButton
          onClick={(e) => handleViewDocuments(e,Id,documentType)}
          className="w-100 m-0"
          color=""
          size="sm"
          id="inputAddress"
        >
          <span className="float-start">
            <i className="fa fa-eye" aria-hidden="true"></i> &nbsp;View
          </span>
        </CButton>
      </span>
    </>
  )
}

export default CustomSpanButton3
