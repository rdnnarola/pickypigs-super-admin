import React from 'react'
import { CFooter } from '@coreui/react'

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <div>
        <a href="https://pickypigs.charlieandco.co.nz/" target="_blank" rel="noopener noreferrer">Picky Pigs</a>
        <span className="ml-1">&copy; 2020 All Right Reserved.</span>
      </div>
      <div className="mfs-auto">
        <span className="mr-1">Designed & developed by</span>
        <a href="https://www.narolainfotech.com/" target="_blank" rel="noopener noreferrer"> Narola Infotech.</a>
      </div>
    </CFooter>
  )
}

export default React.memo(TheFooter)
