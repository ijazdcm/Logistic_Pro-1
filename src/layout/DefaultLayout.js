import React, { useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import routes from 'src/routes'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import nav from '../_nav'

const DefaultLayout = () => {

  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader name={nav.name} />
        <div className="body flex-grow-1 px-3">
          <AppContent />
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout
