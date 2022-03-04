export default function RMSTOHireValidation(values, isTouched) {
  const errors = {}

  //Owner Name Validation Rule
  if (isTouched.ownerName && !values.ownerName) {
    errors.ownerName = 'Required'
  } else if (isTouched.ownerName && !/^[a-zA-Z ]+$/.test(values.ownerName)) {
    errors.ownerName = 'Only have Letters and space'
  }

  //Owner Mobile Number Validation Rule
  if (isTouched.ownerMob && !values.ownerMob) {
    errors.ownerMob = 'Required'
  } else if (isTouched.ownerMob && !/^[\d]{10}$/.test(values.ownerMob)) {
    errors.ownerMob = 'Only have 10 Digit Numeric'
  }

  //Owner PAN Number Validation Rule
  if (isTouched.panNumber && !values.panNumber) {
    errors.panNumber = 'Required'
  } else if (isTouched.panNumber && !/^[A-Z]{5}[\d]{4}[A-Z]{1}$/.test(values.panNumber)) {
    errors.panNumber = 'Must Have 10 Digit Alphanumeric (Ex.ABCDE1234F)'
  }

  return errors
}
