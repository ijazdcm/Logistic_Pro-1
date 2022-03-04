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

  if (isTouched.bankAccount && !values.bankAccount) {
    errors.bankAccount = 'Required'
  } else if (isTouched.bankAccount && !/^[\d]{20}$/.test(values.bankAccount)) {
    errors.bankAccount = 'Must Have 20 Digit Numeric'
  }

  if (isTouched.ifscCode && !values.ifscCode) {
    errors.ifscCode = 'Required'
  } else if (isTouched.ifscCode && !/^[A-Z]{4}[\d]{7}$/.test(values.ifscCode)) {
    errors.ifscCode = 'Must Like 20 "IOBA0001234"'
  }

  if (isTouched.street && !values.street) {
    errors.street = 'Required'
  } else if (isTouched.street && /^[A-Z0-9 _]*[A-Z0-9][A-Z0-9 _]*$/.test(values.street)) {
    errors.street = 'Letters & Number Only'
  }
  if (isTouched.city && !values.city) {
    errors.city = 'Required'
  } else if (isTouched.city && /^[A-Z0-9 _]*[A-Z0-9][A-Z0-9 _]*$/.test(values.city)) {
    errors.city = 'Letters & Number Only'
  }
  if (isTouched.state && !values.state) {
    errors.state = 'Required'
  } else if (isTouched.state && /^[A-Z0-9 _]*[A-Z0-9][A-Z0-9 _]*$/.test(values.state)) {
    errors.state = 'Letters & Number Only'
  }

  return errors
}
