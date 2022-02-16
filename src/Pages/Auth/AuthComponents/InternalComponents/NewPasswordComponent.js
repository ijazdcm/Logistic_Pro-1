import React from 'react'
import { cilClipboard } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
  CButton,
  CForm,
  CFormInput,
  CImage,
  CInputGroup,
  CInputGroupText,
  CSpinner,
} from '@coreui/react'
import { useEffect } from 'react'
import { useState } from 'react'
const NewPasswordComponent = ({ ChangePassword, state, setState }) => {

  const [enable, SetEnable] = useState(true)
  const [message, SetMessage] = useState('')

  useEffect(() => {
    if (state.newPassword == state.newPasswordConfirm && state.newPassword) {
      SetMessage('Password  Matched')
      SetEnable(false)
    }
    else if(state.newPassword.length<4 && state.newPassword){
      SetMessage('Password must be 4 characters long')
      SetEnable(true)
    }
    else if(state.newPassword != state.newPasswordConfirm && state.newPassword){
      SetMessage('Both Password Not Matched')
      SetEnable(true)
    }
  }, [state.newPassword, state.newPasswordConfirm])

  return (
    <>
      <CForm className="text-center" onSubmit={ChangePassword}>
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
        <p className="text-medium-emphasis mt-4">ENTER NEW PASSWORD</p>
        <div className="container">
          {state.error && <div className="text-danger">{state.error}</div>}
          {message && <div className={`text-${!enable?'success':'danger'}`}>{message}</div>}
          {state.loading && <CSpinner color="black" className="mb-2" />}
          <div className="row">
            <div className="col-md-8 offset-md-2">
              <CInputGroup className="mb-4">
                <CInputGroupText>
                  <CIcon icon={cilClipboard} />
                </CInputGroupText>
                <CFormInput
                  placeholder="Enter New Password"
                  value={state.newPassword}
                  required
                  type="password"
                  onChange={(e) => setState({ ...state, newPassword: e.target.value })}
                />
              </CInputGroup>
              <CInputGroup className="mb-4">
                <CInputGroupText>
                  <CIcon icon={cilClipboard} />
                </CInputGroupText>
                <CFormInput
                  placeholder="Confirm Password"
                  value={state.newPasswordConfirm}
                  required
                  type="password"
                  onChange={(e) => setState({ ...state, newPasswordConfirm: e.target.value })}
                />
              </CInputGroup>
            </div>
          </div>
          <div className="row">
            <div className="float-right">
              <CButton disabled={enable} type="submit" color="primary" className="px-4">
                Change Password
              </CButton>
            </div>
          </div>
        </div>
      </CForm>
    </>
  )
}

export default NewPasswordComponent
