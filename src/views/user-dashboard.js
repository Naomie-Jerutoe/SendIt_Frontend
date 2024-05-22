import React from 'react'

import { Helmet } from 'react-helmet'

import Navbar1 from '../components/navbar1'
import Profile from '../components/profile'
import Sidebar from '../components/sidebar'
import Welcome from '../components/welcome'
import Footer from '../components/footer'
import './user-dashboard.css'

const UserDashboard = (props) => {
  return (
    <div className="user-dashboard-container">
      <Helmet>
        <title>UserDashboard - SendIT App</title>
        <meta property="og:title" content="UserDashboard - SendIT App" />
      </Helmet>
      <div className="user-dashboard-container1">
        <Navbar1 rootClassName="navbar1-root-class-name"></Navbar1>
      </div>
      <div className="user-dashboard-container2">
        <div className="user-dashboard-container3">
          <Profile rootClassName="profile-root-class-name"></Profile>
          <Sidebar rootClassName="sidebar-root-class-name"></Sidebar>
        </div>
        <div className="user-dashboard-container4">
          <div className="user-dashboard-container5">
            <Welcome></Welcome>
          </div>
        </div>
        <Footer rootClassName="footer-root-class-name1"></Footer>
      </div>
    </div>
  )
}

export default UserDashboard
