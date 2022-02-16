import { CFormLabel, CFormSelect } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import LocationApi from 'src/Service/SubMaster/LocationApi'

const LocationListComponent = () => {
  const [location, setLocation] = useState([])

  useEffect(() => {
    //fetch to get Location list form master
    LocationApi.getLocation().then((res) => {
      setLocation(res.data.data)
    })
  }, [])

  return (
    <>
        <option value={''}>Select...</option>
        {location.map(({ id,location,location_status}) => {

          if(location_status===1)
          {
            return (
              <>
                <option key={id} value={id}>
                  {location}
                </option>
              </>
            )
          }

        })}

    </>
  )
}

export default LocationListComponent
