import React from 'react'

import { Helmet } from 'react-helmet'

import Navbar from '../components/navbar'
import Logos22 from '../components/logos22'
import Features102 from '../components/features102'
import FAQ122 from '../components/faq122'
import Footer152 from '../components/footer152'
import Footer from '../components/footer'
import './services.css'

const Services = (props) => {
  return (
    <div className="services-container">
      <Helmet>
        <title>Services - SendIT App</title>
        <meta property="og:title" content="Services - SendIT App" />
      </Helmet>
      <div className="services-navbar1">
        <Navbar rootClassName="navbar-root-class-name1"></Navbar>
      </div>
      <div className="services-logos3">
        <Logos22></Logos22>
      </div>
      <div className="services-features4">
        <Features102></Features102>
      </div>
      <div className="services-faq5">
        <FAQ122></FAQ122>
      </div>
      <div className="services-footer7">
        <Footer152></Footer152>
      </div>
      <Footer rootClassName="footer-root-class-name"></Footer>
    </div>
  )
}

export default Services
