export default function VendorRequestValidation(values, isTouched) {
  const errors = {}

  if (isTouched.panNumber && !values.panNumber) {
    errors.panNumber = 'Required'
  } else if (isTouched.panNumber && !/^[A-Z]{5}[\d]{4}[A-Z]{1}$/.test(values.panNumber)) {
    errors.panNumber = 'Must Like "AMIPR8417L"'
  }

  if (isTouched.aadhar && !values.aadhar) {
    errors.aadhar = 'Required'
  } else if (isTouched.aadhar && !/^[\d]{12}$/.test(values.aadhar)) {
    errors.aadhar = 'Must Have 12 Digit Numeric'
  }

  if (isTouched.GSTNumber && !values.GSTNumber) {
    errors.GSTNumber = 'Required'
  } else if (
    isTouched.GSTNumber &&
    !/^[\d]{2}[A-Z]{5}[\d]{4}[A-Z]{1}[\d]{1}[A-Z]{1}[A-Z\d]{1}$/.test(values.GSTNumber)
  ) {
    errors.GSTNumber = 'Must Like 07AAGFF2194N1Z1'
  }

  if (isTouched.bankName && !values.bankName) {
    errors.bankName = 'Required'
  }

  if (isTouched.bankBranch && !values.bankBranch) {
    errors.bankBranch = 'Required'
  }

  if (isTouched.bankAccHolderName && !values.bankAccHolderName) {
    errors.bankAccHolderName = 'Required'
  }

  if (isTouched.GSTreg && !values.GSTreg) {
    errors.GSTreg = 'Required'
  }

  if (isTouched.license && !values.license) {
    errors.license = 'Required'
  }

  if (isTouched.rcFront && !values.rcFront) {
    errors.rcFront = 'Required'
  }
  if (isTouched.rcBack && !values.rcBack) {
    errors.rcBack = 'Required'
  }
  if (isTouched.insurance && !values.insurance) {
    errors.insurance = 'Required'
  }
  if (isTouched.insuranceValid && !values.insuranceValid) {
    errors.insuranceValid = 'Required'
  }
  if (isTouched.TDSfront && !values.TDSfront) {
    errors.TDSfront = 'Required'
  }
  if (isTouched.TDSback && !values.TDSback) {
    errors.TDSback = 'Required'
  }
  if (isTouched.transportShed && !values.transportShed) {
    errors.transportShed = 'Required'
  }
  if (isTouched.shedName && !values.shedName) {
    errors.shedName = 'Required'
  }
  if (isTouched.ownershipTrans && !values.ownershipTrans) {
    errors.ownershipTrans = 'Required'
  }
  if (isTouched.freightRate && !values.freightRate) {
    errors.freightRate = 'Required'
  }

  if (isTouched.ownerName && !values.ownerName) {
    errors.ownerName = 'Required'
  }

  if (isTouched.ownerMob && !values.ownerMob) {
    errors.ownerMob = 'Required'
  } else if (isTouched.ownerMob && !/^[\d]{10}$/.test(values.ownerMob)) {
    errors.ownerMob = 'Must Have 10 Digit Numeric'
  }

  // console.log(errors)

  return errors
}
