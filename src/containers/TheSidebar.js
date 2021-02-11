import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
  CImg
} from '@coreui/react'

import CIcon from '@coreui/icons-react'

// sidebar nav config
import navigation from './_nav'
import { setSideBar } from '../redux/actions/generalActions'

const TheSidebar = () => {
  const dispatch = useDispatch()
  const show = useSelector(state => state.general.sidebarShow)

  return (
    <CSidebar
      show={show}
      onShowChange={(val) => dispatch(setSideBar({ sidebarShow: val}))}
    >
      <CSidebarBrand className="d-md-down-none" to="/">
        {/* <CIcon
          className="c-sidebar-brand-full"
          name="logo-negative"
          height={35}
        /> */}

        <section className="c-sidebar-brand-full">
        <div className="d-flex justify-content-center align-items-center">
          <CImg
              src={'avatars/logo.svg'}
              className="c-avatar-img"
              style={{width:30}}
              alt="Picky_pigs_super_admin"
            />
          <p style={{color:'#ffffff',fontSize:25,fontWeight:'bold'}} className="ml-3 mb-0">Picky Pigs</p>
        </div>
        </section>
        
        <section className="c-sidebar-brand-minimized">
          <CImg
              src={'avatars/logo.svg'}
              className="c-avatar-img"
              style={{width:30}}
              alt="Picky_pigs_super_admin"
          />
        </section>

        {/* <CIcon
          className="c-sidebar-brand-minimized"
          name="sygnet"
          height={35}
        /> */}
      </CSidebarBrand>
      <CSidebarNav>

        <CCreateElement
          items={navigation}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle
          }}
        />
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none"/>
    </CSidebar>
  )
}

export default React.memo(TheSidebar)
