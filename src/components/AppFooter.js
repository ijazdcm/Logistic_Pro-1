import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div className="fixed">
        <a href="https://coreui.io" target="_blank" rel="noopener noreferrer"></a>
        <span className="ms-1"> Copy Rights &copy; 2021 Naga Limited, All Rights Reserved.</span>
      </div>
      {/* <div className="ms-auto">
        <span className="me-1">Powered by</span>
        <a href="https://exciteon.com" target="_blank" rel="noopener noreferrer">
          Exciteon.com
        </a>
      </div> */}
    </CFooter>
  )
}

export default React.memo(AppFooter)
