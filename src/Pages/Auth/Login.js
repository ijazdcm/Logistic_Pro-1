import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCardImage,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CFormSelect,
  CImage,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { useDispatch, useSelector } from 'react-redux'
import logo from 'src/assets/logo/masterlogo.jpg'
import AuthService from 'src/Service/Auth/AuthService'
import authConstant from 'src/redux/Auth/AuthConstant'
import loginRequest from 'src/redux/Auth/AuthAction'
import LocalStorageService from 'src/Service/LocalStoage'
import LoginFormComponent from './AuthComponents/LoginFormComponent'
import ForgetPasswordFromComponent from './AuthComponents/ForgetPasswordFromComponent'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const Login = () => {
  const [state, setState] = useState({
    username: '',
    password: '',
    email: '',
    otp: '',
    loading: false,
    otpPage: false,
    confirmOtp: false,
    newPassword:'',
    newPasswordConfirm:'',
    error: '',
  })

  const [forgetPassword, setForgetPassword] = useState(false)

  //this function handles the login request
  const handleLogin = (e) => {
    e.preventDefault()

    AuthService.login(state)
      .then((res) => {
        if (res.status == 200) {
          LocalStorageService.setLocalstorage('auth_token', res.data.token)
          window.location.href = '/dashboard'
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          setState({ ...state, error: error.response.data.message })
        }
      })
  }

  //this function handles the Forget password request & send OTP
  const handleForgetPassword = (e) => {
    e.preventDefault()
    setState({ ...state, loading: true })

    let data = new FormData()
    data.append('email', state.email)
    AuthService.forgetPassword(data)
      .then((res) => {
        if (res.status == 200) {
          setState({ ...state, loading: false, otpPage: true ,error:''})
        }
      })
      .catch((error) => {
        if (error.response.status === 404) {
          setState({ ...state, error: error.response.data.message })
        }
      })
  }

  //this function handles the verify OTP request & Verify OTP MATCHS
  const verifyOtp = (e) => {
    e.preventDefault()
    setState({ ...state, loading: true })

    let data = new FormData()
    data.append('email', state.email)
    data.append('otp', state.otp)
    AuthService.verifyOtp(data)
      .then((res) => {
        if (res.status === 200) {
          setState({ ...state, loading: false, confirmOtp: true,error:'' })
        }
      })
      .catch((error) => {

        if (error.response.status === 422) {
          setState({ ...state, error: error.response.data.message })
        }
        if (error.response.status === 403) {
          setState({ ...state, error: error.response.data.message })
        }
      })
  }

  //this function handle the password change request to server and Update the new password
  const ChangePassword = (e) => {
    e.preventDefault()
    setState({ ...state, loading: true })

    let data = new FormData()
    data.append('email', state.email)
    data.append('password', state.newPassword)
    data.append('confirm_password', state.newPasswordConfirm)

    AuthService.changePassword(data)
      .then((res) => {
        if (res.status === 200) {
          setState({ ...state, loading: false,error:''})
          toast.info("Password Changed Successfully!")
          setTimeout(() => {
            window.location.href = '/dashboard'
          }, 3000);
        }
      })
      .catch((error) => {
        if (error.response.status === 500) {
          setState({ ...state, error: error.response.data.message })
        }
      })
  }
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={12}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <img
                    src={logo}
                    className="img-fluid ${3|rounded-top,rounded-right,rounded-bottom,rounded-left,rounded-circle,|}"
                    alt=""
                  />
                </CCardBody>
              </CCard>
              <CCard className="p-4">
                <CCardBody className="mt-5">
                  {forgetPassword ? (
                    <ForgetPasswordFromComponent
                      handleLogin={handleLogin}
                      setState={setState}
                      state={state}
                      handleForgetPassword={handleForgetPassword}
                      setForgetPassword={setForgetPassword}
                      forgetPassword={forgetPassword}
                      verifyOtp={verifyOtp}
                      ChangePassword={ChangePassword}
                    />
                  ) : (
                    <LoginFormComponent
                      handleLogin={handleLogin}
                      setState={setState}
                      state={state}
                      setForgetPassword={setForgetPassword}
                    />
                  )}
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
