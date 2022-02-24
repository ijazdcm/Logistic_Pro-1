import { cilAt } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CButton, CForm, CFormInput, CImage, CInputGroup, CInputGroupText, CSpinner } from '@coreui/react'
import React from 'react'
const EmailComponent = ({ state, setState, setForgetPassword, handleForgetPassword }) => {
  return (
    <>
      <CForm className="text-center" onSubmit={handleForgetPassword}>
        <div className="d-flex justify-content-around">
          <CImage
            rounded
            thumbnail
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGq3esvd2vR31jkhoULZUGIoCZcjjMJRIT0G1HpW6AyRjUWqebVB0RLCzGXjrC-CbQ9A4&usqp=CAU"
            width={150}
            height={150}
          />
          <h2 className="mt-5">NAGA LOGISTICS PRO</h2>
        </div>
        <p className="text-medium-emphasis mt-4">FORGET PASSWORD</p>
        <div className="container">
          {state.error && <div className="text-danger">{state.error}</div>}
          {state.loading && <CSpinner color="black" className="mb-2" />}
          <div className="row">
            <div className="col-md-8 offset-md-2">
              <CInputGroup className="mb-4">
                <CInputGroupText>
                  <CIcon icon={cilAt} />
                </CInputGroupText>
                <CFormInput
                  placeholder="email"
                  value={state.email}
                  required
                  type="email"
                  onChange={(e) => setState({ ...state, email: e.target.value })}
                />
              </CInputGroup>
            </div>
          </div>
          <div className="row">
            <div className="float-right">
              <CButton
                type="button"
                onClick={() => setForgetPassword(false)}
                color="primary"
                className="px-4"
              >
                Back
              </CButton>
              <CButton type="submit" color="primary" className="px-4">
                send OTP
              </CButton>
            </div>
          </div>
        </div>
      </CForm>
    </>
  )
}

export default EmailComponent
