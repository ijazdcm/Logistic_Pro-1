export default function OwnAndContractCreateTripSheetRequest(values) {
  let data = new FormData()

  data.append('vehicle_id', values.vehicle_id)
  data.append('vehicle_location_id', values.vehicle_location_id)
  data.append('vehicle_type_id', values.vehicle_type_id)
  data.append('driver_id', values.driver_id)
  data.append('division_id', values.division_id)
  data.append('trip_advance_eligiblity', values.trip_advance_eligiblity)
  data.append('advance_amount', values.advance_amount)
  data.append('purpose', (values.purpose)?"3":values.purpose)
  if (values.purpose == '2') {
    data.append('vehicle_sourced_by', values.Vehicle_Sourced_by)
  }
  data.append('expected_date_time', values.expected_date_time)
  data.append('expected_return_date_time', values.expected_return_date_time)
  data.append('remarks', values.remarks)

  return data
}
