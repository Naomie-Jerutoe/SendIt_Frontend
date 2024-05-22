import React,{useState, useEffect} from 'react'

import { Helmet } from 'react-helmet'

import Navbar1 from '../components/navbar1'
import Profile from '../components/profile'
import Sidebar from '../components/sidebar'
import Welcome from '../components/welcome'
import OrderSummary from '../components/order-summary'
import Footer from '../components/footer'
import './user-dashboard.css'

const UserDashboard = (props) => {
  const [userData,setUserData] = useState({})
  const [parcelData,setParcelData] = useState([])
  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch(`http://172.31.0.214:5000/users/18`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    .then(res => res.json())
    .then(data => setUserData(data))
    .catch(err => console.error(err))
  }, []);
  useEffect(()=>{
    const fetchParcelData = async () => {
      const token = localStorage.getItem('token'); 
      const res = await fetch(`http://172.31.0.214:5000/users/18/parcels`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      console.log(data.parcels);
      setParcelData(data.parcels);
    };

    fetchParcelData().catch((err) => console.error(err));
  },[userData])
  
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
          <Profile rootClassName="profile-root-class-name" text={userData.username} text1={userData.email}></Profile>
          <Sidebar rootClassName="sidebar-root-class-name"></Sidebar>
        </div>
        <div className="user-dashboard-container4">
          <div className="user-dashboard-container5">
            <Welcome welcome={userData.username}></Welcome>
            <OrderSummary parcelData={parcelData}></OrderSummary>
          </div>
        </div>
        <Footer rootClassName="footer-root-class-name1"></Footer>
      </div>
    </div>
  )
}

export default UserDashboard
