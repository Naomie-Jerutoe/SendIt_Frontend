import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Users.css";
import help from "../Dashboard/help-web-button.png";
import dash from "../Dashboard/dashboard (2).png";
import UserModal from "./UserModal"; 

function Users() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchUsers = () => {
    // const startIndex = (currentPage - 1) * 5;
    // const endIndex = startIndex + 5;

    fetch(`https://sendit-backend-qhth.onrender.com/users`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => {
      if(!response.ok) {
        throw new Error("Failed to fetch Users")
      } 
      return response.json()
    })
    .then(data => setUsers(prevUsers => [...prevUsers, ...data]))
    // .then(data => setUsers(data))
    .catch(error => console.error('Error fetching users:', error));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // const handleShowMore = () => {
  //   setCurrentPage(prevPage => prevPage + 1);
  // };

  const handleView = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

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
          <div className="tableContainer">
            <h1>USERS</h1>
              <table className="styled-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>
                        <button onClick={() => handleView(user)}>View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            {/* <button onClick={handleShowMore}>See More</button> */}
        </div>
        {showModal && (
          <UserModal user={selectedUser} onClose={handleCloseModal} />
        )}
      </div>
    </div>
  )
}

export default Users