import { Link } from "react-router-dom";
import "./Dashboard.css";
import logo from "./user.png"
import search from "./search.png"
import dash from "./dashboard (2).png"
import help from "./help-web-button.png"
import income from "./income.png"
import users from "./users.png"
import parcels from "./parcels.png"
import notify from "./notifications.png"


function Dashboard() {
  return (
    <div className="main">
      <div className="side-menu">
        <div className="brand-name">
          <h1>SendIt</h1>
        </div>
        <ul>
          <li><img src={dash} alt="" />&nbsp; <span>Dashboard</span></li>
          <Link to={'/admin_users'}><li><img src="" alt="" />&nbsp; <span>Users</span></li></Link>
          <Link to={'/admin_parcels'}><li><img src="" alt="" />&nbsp; <span>Parcels</span></li></Link>
          <Link to={'/admin_orders'}><li><img src="" alt="" />&nbsp; <span>Orders</span></li></Link>
          <Link to={'/help'}><li><img src={help} alt="" />&nbsp; <span>Help</span></li></Link>{" "}
        </ul>
      </div>
      <div className="container">
        <div className="header">
          <div className="nav">
            <div className="search">
              <input type="text" placeholder="Search.." />
              <button type="submit"><img src={search} alt="" /></button>
            </div>
            <div className="user">
            <Link to={'/admin_users'}><a href="#" className="btn">
                Add New
              </a></Link>
              <img src={notify} alt="" />
              <div className="img-case">
                <Link to={'/login'}><img src={logo} alt="" /></Link> 
              </div>
            </div>
          </div>
        </div>
        <div className="content">
          <div className="cards">
            <div className="card">
              <div className="box">
                <h1>2194</h1>
                <h3>Users</h3>
              </div>
              <div className="icon-case">
                <img src={users} alt="" />
              </div>
            </div>
            <div className="card">
              <div className="box">
                <h1>53</h1>
                <h3>Parcels</h3>
              </div>
              <div className="icon-case">
                <img src={parcels} alt="" />
              </div>
            </div>
            <div className="card">
              <div className="box">
                <h1>350000</h1>
                <h3>Income</h3>
              </div>
              <div className="icon-case">
                <img src={income} alt="" />
              </div>
            </div>
          </div>
          <div className="content-2">
            <div className="recent-payments">
              <div className="title">
                <h2>Parcels</h2>
                <Link to={'/admin_parcels'}><a href="#" className="btn">
                  View All
                </a></Link>
              </div>
              <table>
                <tr>
                  <th>Id</th>
                  <th>Pickup location</th>
                  <th>Destination </th>
                  <th>Option</th>
                </tr>
                <tr>
                  <td>1</td>
                  <td>Karen</td>
                  <td>Utawala</td>
                  <td>
                    <a href="#" className="btn">
                      View
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Nakuru</td>
                  <td>Nairobi</td>
                  <td>
                    <a href="#" className="btn">
                      View
                    </a>
                  </td>
                </tr>
              </table>
            </div>
            <div className="new-students">
              <div className="title">
                <h2>Orders</h2>
                <Link to={'/admin_parcels'}><a href="#" className="btn">
                  View All
                </a></Link>
              </div>
              <table>
                <tr>
                  <th>Parcel_id</th>
                  <th>Status</th>
                  <th>Option</th>
                </tr>
                <tr>
                  <td>1</td>
                  <td>Enroute</td>
                  <td>
                  <a href="#" className="btn">
                      View
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Delivered</td>
                  <td>
                  <a href="#" className="btn">
                      View
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Delivered</td>
                  <td>
                  <a href="#" className="btn">
                      View
                    </a>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
