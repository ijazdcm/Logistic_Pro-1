export default function VehicleMasterValidation(values, isTouched) {
  const errors = {}

  //vehicle type validation rule
  if (isTouched.vehicleType && values.vehicleType === '0') {
    errors.vehicleType = 'Required'
  }

  //vehicle Number validation rule
  if (isTouched.vechileNumber && !values.vechileNumber) {
    errors.vechileNumber = 'Required'
  } else if (
    isTouched.vechileNumber &&
    !/^[A-Z]{2}[\d]{2}[A-Z]{1,2}[\d]{4}$/.test(values.vechileNumber)
  ) {
    errors.vechileNumber = 'Not Valid'
  }

  //vehicle Capacity validation rule
  if (isTouched.VehicleCapacity && values.VehicleCapacity === '0') {
    errors.VehicleCapacity = 'Required'
  }

  //vehicle body validation rule
  if (isTouched.VehicleBodyType && values.VehicleBodyType === '0') {
    errors.VehicleBodyType = 'Required'
  }

  //vehicle body validation rule
  if (isTouched.VehicleBodyType && values.VehicleBodyType === '0') {
    errors.VehicleBodyType = 'Required'
  }

  if (isTouched.InsuranceValidity && !values.InsuranceValidity) {
    errors.InsuranceValidity = 'Required'
  }

  if (isTouched.FCValidity && !values.FCValidity) {
    errors.FCValidity = 'Required'
  }

  return errors
}
