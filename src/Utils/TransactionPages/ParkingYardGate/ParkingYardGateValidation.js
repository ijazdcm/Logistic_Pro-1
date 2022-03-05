export default function ParkingYardGateValidation(values, isTouched) {
  const errors = {}

  //vehicle type validation rule
  if (isTouched.vehicleType && values.vehicleType === '0') {
    errors.vehicleType = 'Choose Vehicle Type'
  }

  //vehicle id validation rule
  if (isTouched.vehicleId && values.vehicleId === '') {
    errors.vehicleId = 'Choose Vehicle'
  }

  //vehicle Number validation rule
  if (isTouched.vehicleNumber && !values.vehicleNumber) {
    errors.vehicleNumber = 'Vehicle Number is required'
  } else if (
    isTouched.vehicleNumber &&
    !/^[A-Z]{2}[\d]{2}[A-Z]{1,2}[\d]{4}$/.test(values.vehicleNumber)
  ) {
    errors.vehicleNumber = 'Invalid Vehicle number '
  }

  //vehicle capacity validation rule
  if (isTouched.vehicleCapacity && values.vehicleCapacity === '') {
    errors.vehicleCapacity = 'Choose Vehicle Capacity'
  }

  //vehicle driverName validation rule
  if (isTouched.driverName && values.driverName === '') {
    errors.driverName = 'Enter Driver Name'
  } else if (isTouched.driverName && !/^[a-zA-Z]+(\s[a-zA-Z]+)?$/.test(values.driverName)) {
    errors.driverName = 'Invalid Driver Name'
  }

  //vehicle driverName validation rule
  if (isTouched.driverPhoneNumber && values.driverPhoneNumber === '') {
    errors.driverPhoneNumber = 'Number should be numeric'
  } else if (isTouched.driverPhoneNumber && values.driverPhoneNumber.length != 10) {
    errors.driverPhoneNumber = '10 digits required'
  }

  //odometer Kilometer validation rule
  if (isTouched.odometerKm && !values.odometerKm) {
    errors.odometerKm = 'Odometer KM Required & Numeric'
  }

  //odometerImg validation rule
  if (isTouched.odometerImg && !values.odometerImg) {
    errors.odometerImg = 'Choose Odometer Photo'
  }

  //partyName validation rule
  if (isTouched.partyName && !values.partyName) {
    errors.partyName = 'Party Name Required'
  }

  //vehicleBody validation rule
  if (isTouched.vehicleBody && !values.vehicleBody) {
    errors.vehicleBody = 'Choose Vehicle Body'
  }

  return errors
}
