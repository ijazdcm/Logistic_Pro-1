export default function TripSheetCreationValidation(values, isTouched) {
  const errors = {}

  //trip_advance_eligiblity validation rule
  if (isTouched.trip_advance_eligiblity && !values.trip_advance_eligiblity) {
    errors.trip_advance_eligiblity = 'Choose Yes or No'
  }

  //advance_amount validation rule this runs on only the trip_eligibility is yes
  if (isTouched.trip_advance_eligiblity && values.trip_advance_eligiblity == 1) {
    if (isTouched.advance_amount && !values.advance_amount) {
      errors.advance_amount = 'Number Only'
    }
  }

  //division_id validation rule
  if (isTouched.division_id && !values.division_id) {
    errors.division_id = 'Choose the Divison'
  }

  //purpose validation rule
  if (isTouched.purpose && !values.purpose) {
    errors.purpose = 'Choose the Purpose'
  }

  //purpose validation only if STO Choosed validation rule
  if (isTouched.purpose && values.purpose == 2) {
    //Vehicle_Sourced_by validation rule
    if (isTouched.Vehicle_Sourced_by && !values.Vehicle_Sourced_by) {
      errors.Vehicle_Sourced_by = 'Required Sourced by'
    }
  }

  //expected_date_time validation rule
  if (isTouched.expected_date_time && !values.expected_date_time) {
    errors.expected_date_time = 'Required'
  }

  //vehicle_type_id validation rule
  if (values.vehicle_type_id == 3) {
    //freight_rate_per_tone validation rule
    if (isTouched.freight_rate_per_tone && !values.freight_rate_per_tone) {
      errors.freight_rate_per_tone = 'Only Numeric'
    }

    //advance_payment_diesel validation rule
    if (isTouched.advance_payment_diesel && !values.advance_payment_diesel) {
      errors.advance_payment_diesel = 'Only Numeric'
    }
  } else {
    //expected_return_date_time validation rule
    if (isTouched.expected_return_date_time && !values.expected_return_date_time) {
      errors.expected_return_date_time = 'Required'
    }
  }

  // else if (isTouched.bankName && !/^[a-zA-Z ]+$/.test(values.bankName)) {
  //   errors.bankName = 'Bank name only have Letters and space'
  // }
  return errors
}
