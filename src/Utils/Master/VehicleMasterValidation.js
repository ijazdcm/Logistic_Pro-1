export default function VehicleMasterValidation(values, isTouched) {
  const errors = {}

  //vehicle type validation rule
  if (isTouched.vehicleType && values.vehicleType === '0') {
    errors.vehicleType = 'Choose Vehicle Type'
  }

  //vehicle Number validation rule
  if (isTouched.vechileNumber && !values.vechileNumber) {
    errors.vechileNumber = 'Vechile Number is required'
  } else if (
    isTouched.vechileNumber &&
    !/^[A-Z]{2}[\d]{2}[A-Z]{1,2}[\d]{4}$/.test(values.vechileNumber)
  ) {
    errors.vechileNumber = 'Invalid Vehicle number '
  }

  //vehicle Capacity validation rule
  if (isTouched.VehicleCapacity && values.VehicleCapacity === '0') {
    errors.VehicleCapacity = 'Choose Vehicle Capacity'
  }

  //vehicle body validation rule
  if (isTouched.VehicleBodyType && values.VehicleBodyType === '0') {
    errors.VehicleBodyType = 'Choose Body Type'
  }

  //vehicle body validation rule
  if (isTouched.VehicleBodyType && values.VehicleBodyType === '0') {
    errors.VehicleBodyType = 'Choose Body Type'
  }

  if (isTouched.InsuranceValidity && !values.InsuranceValidity) {
    errors.InsuranceValidity = 'Choose Insurance Validity'
  }

  if (isTouched.FCValidity && !values.FCValidity) {
    errors.FCValidity = 'Choose Fc Validity'
  }

  return errors
}
