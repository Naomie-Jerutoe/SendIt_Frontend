import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import Navbar1 from '../components/navbar1'
import Profile from '../components/profile'
import Sidebar from '../components/sidebar'
import Welcome from '../components/welcome'
import OrderSummary from '../components/order-summary'
import Footer from '../components/footer'
import { jwtDecode } from 'jwt-decode';
import './user-dashboard.css'

const UserDashboard = (props) => {
  // const [userEmail, setUserEmail] = useState('')
  const [userName, setUserName] = useState('')

  const getUserIdFromToken = (token) => {
    try {
      if (!token || typeof token !== 'string') {
        throw new Error('Invalid token specified: must be a string');
      }

      const decodedToken = jwtDecode(token);

      if (!decodedToken || !decodedToken.sub) {
        throw new Error('Invalid token: sub field missing');
      }

      return decodedToken.sub.userId;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      try {
        // Decode the token to get the user's email
        const decodedToken = JSON.parse(atob(token.split('.')[1]))
        // setUserEmail(decodedToken.identity.email || 'user@sendit.com')
        setUserName(decodedToken.identity.username || 'sendit_user')
      } catch (error) {
        console.error('Error decoding token:', error)
        // setUserEmail('user@sendit.com')
        setUserName('sendit_user')
      }

    } else {
      // setUserEmail('user@sendit.com')
      setUserName('sendit_user')
    }
  }, [])

  const [userData,setUserData] = useState({})
  const [parcelData,setParcelData] = useState([])
  useEffect(() => {
    const token = localStorage.getItem('token');
    const user_id = getUserIdFromToken(token)
    fetch(`http://172.31.0.214:5000/users/${user_id}`, {
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
      const user_id = getUserIdFromToken(token) 
      const res = await fetch(`http://172.31.0.214:5000/users/${user_id}/parcels`, {
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


// import React, { useEffect, useState } from 'react'
// import { Helmet } from 'react-helmet'
// import Navbar1 from '../components/navbar1'
// import Profile from '../components/profile'
// import Sidebar from '../components/sidebar'
// import Welcome from '../components/welcome'
// import OrderSummary from '../components/order-summary'
// import Footer from '../components/footer'
// import './user-dashboard.css'

// const UserDashboard = (props) => {
//   const [userName, setUserName] = useState('')

//   useEffect(() => {
//     const token = localStorage.getItem('token')
//     if (token) {
//       // Decode the token to get the user's name
//       const decodedToken = JSON.parse(atob(token.split('.')[1]))
//       setUserName(decodedToken.username)
//     }
//   }, [])

//   return (
//     <div className="user-dashboard-container">
//       <Helmet>
//         <title>UserDashboard - SendIT App</title>
//         <meta property="og:title" content="UserDashboard - SendIT App" />
//       </Helmet>
//       <div className="user-dashboard-container1">
//         <Navbar1 rootClassName="navbar1-root-class-name"></Navbar1>
//       </div>
//       <div className="user-dashboard-container2">
//         <div className="user-dashboard-container3">
//           <Profile rootClassName="profile-root-class-name"></Profile>
//           <Sidebar rootClassName="sidebar-root-class-name"></Sidebar>
//         </div>
//         <div className="user-dashboard-container4">
//           <div className="user-dashboard-container5">
//             <Welcome welcome={`Welcome ${userName}`} />
//             <OrderSummary></OrderSummary>
//           </div>
//         </div>
//         <Footer rootClassName="footer-root-class-name1"></Footer>
//       </div>
//     </div>
//   )
// }

// export default UserDashboard