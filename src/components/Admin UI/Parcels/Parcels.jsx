import { Link } from "react-router-dom";
import "./Parcels.css";
import help from "../Dashboard/help-web-button.png"
import dash from "../Dashboard/dashboard (2).png"
import { useState, useEffect } from "react";

function Parcels() {
  const [parcels, setParcels] = useState([])

  const token = localStorage.getItem('token')

  const fetchParcels = () => {
    fetch(`https://sendit-backend-qhth.onrender.com/parcels`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      if(!response.ok) {
        throw new Error("Failed to fetch Users")
      } 
      return response.json()
    })
    .then(data => {
      console.log(data.parcels)
      setParcels(data.parcels)})
    .catch(error => console.error('Error fetching users:', error));
  };

  useEffect(() => {
    fetchParcels();
  }, []);

  return (
    <div className="main">
      <div className="side-menu">
        <div className="brand-name">
          <h1>SendIt</h1>
        </div>
        <ul>
          <Link to={'/admin_dashboard'}><li><img src={dash} alt="" />&nbsp; <span>Dashboard</span></li></Link>
          <Link to={'/admin_users'}><li><img src="" alt="" />&nbsp; <span>Users</span></li></Link>
          <Link to={'/admin_parcels'}><li><img src="" alt="" />&nbsp; <span>Parcels</span></li></Link>
          <Link to={'/admin_orders'}><li><img src="" alt="" />&nbsp; <span>Orders</span></li></Link>
          <Link to={'/help'}><li><img src={help} alt="" />&nbsp; <span>Help</span></li></Link>{" "}
        </ul>
      </div>
      <div className="container">
          <div>
              <h1>PARCELS</h1>
              <div className="tableContainer">
              <table className="styled-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Pickup Location</th>
                    <th>Destination</th>
                    <th>Price</th>
                    <th>Weight</th>
                    <th>Description</th>
                    <th>Status</th>
                    <th>User_id</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {parcels.map(parcel => (
                    <tr key={parcel.id}>
                      <td>{parcel.id}</td>
                      <td>{parcel.pickup_location}</td>
                      <td>{parcel.destination}</td>
                      <td>{parcel.price}</td>
                      <td>{parcel.weight}</td>
                      <td>{parcel.description}</td>
                      <td>{parcel.status}</td>
                      <td>{parcel.user_id}</td>
                      <td>
                        <button>View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
        </div>
      </div>
    </div>
  )
}

export default Parcels