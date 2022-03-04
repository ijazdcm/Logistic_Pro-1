export default function UserMasterValidation(values, isTouched) {
  const errors = {}

  //username validation rule
  if (isTouched.username && values.username === '') {
    errors.username = 'Required'
  }

  //password validation rule
  if (isTouched.password && values.password === '') {
    errors.password = 'Required'
  }

  //Divison validation rule
  if (isTouched.Divison && values.Divison === '') {
    errors.Divison = 'Required'
  }

  //Department validation rule
  if (isTouched.Department && values.Department === '') {
    errors.Department = 'Required'
  }

  //Designation validation rule
  if (isTouched.Designation && values.Designation === '') {
    errors.Designation = 'Required'
  }

  //Designation validation rule
  if (isTouched.Designation && values.Designation === '') {
    errors.Designation = 'Required'
  }

  //serial validation rule
  if (isTouched.serial && values.serial === '') {
    errors.serial = 'Required'
  }

  //usermobile validation rule
  if (isTouched.usermobile && values.usermobile === '') {
    errors.usermobile = 'Required'
  }

  //usermobile validation rule
  if (isTouched.usermobile && values.usermobile === '') {
    errors.usermobile = 'Required'
  } else if (isTouched.usermobile && !/^[\d]{10}$/.test(values.usermobile)) {
    errors.usermobile = '10-digits only'
  }

  //email validation rule
  if (isTouched.email && values.email === '') {
    errors.email = 'Required'
  } else if (isTouched.email && !/[a-z0-9]+@nagamills.com/.test(values.email)) {
    errors.email = 'not valid email'
  }


  //UserPhoto validation rule
  if (isTouched.UserPhoto && values.UserPhoto === '') {
    errors.UserPhoto = 'Required'
  }

  //location validation rule
  if (isTouched.location && values.location.length === 0) {
    errors.location = 'Required'
  }

  return errors
}
