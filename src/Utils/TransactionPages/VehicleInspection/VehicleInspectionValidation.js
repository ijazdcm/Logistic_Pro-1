export default function VehicleInspectionValidation(values, isTouched) {
  const errors = {}

  //truck clean validation rule

  if (isTouched.truck_clean && values.truck_clean == '0') {
    errors.truck_clean = 'truck is not clean'
  }

  //bad_smell validation rule

  if (isTouched.bad_smell && values.bad_smell == '1') {
    errors.bad_smell = 'truck is smelling bad'
  }

  //insect_vevils_presence validation rule

  if (isTouched.insect_vevils_presence && values.insect_vevils_presence == '1') {
    errors.insect_vevils_presence = 'Insect present'
    console.log('Insect present')
  }

  //tarpaulin_srf validation rule
  if (isTouched.tarpaulin_srf && values.tarpaulin_srf != '2') {
    errors.tarpaulin_srf = 'Tarpaulin is not enough'
  }

  //tarpaulin_non_srf validation rule
  if (isTouched.tarpaulin_non_srf && values.tarpaulin_non_srf != '2') {
    errors.tarpaulin_non_srf = 'Tarpaulin NON-SRF is not enough'
  }

  //insect_vevils_presence_in_tar validation rule
  if (isTouched.insect_vevils_presence_in_tar && values.insect_vevils_presence_in_tar == '1') {
    errors.insect_vevils_presence_in_tar = 'INSECT PRESENT IN TARPAULIN'
  }

  //truck_platform validation rule
  if (isTouched.truck_platform && values.truck_platform == '0') {
    errors.truck_platform = 'Truck Platform is not good'
  }

  return errors
}
