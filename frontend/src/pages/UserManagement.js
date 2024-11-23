import React, { useState, useEffect } from "react";
import axios from "axios";
import User from "../components/User";
import "../styles/UserManagement.css";
import EditUserModal from "../components/EditUserModal";
import Button from "@mui/material/Button";
import Alert from '@mui/material/Alert';

function UserManagement() {
   const [users, setUsers] = React.useState([]);
   const [selectedUser, setSelectedUser] = React.useState(null);
   const [isModalActive, setIsModalActive] = React.useState(false);
   const [showSuccessfulEdit, setShowSuccessfulEdit] = useState(false);
   const [alertContent, setAlertContent] = useState("");


   const fetchUsers = async () => {
      try {
         // const res = await axios.get("http://localhost:5000/api/users");
         const res = await axios.get("https://fleetrewards-backend-group7.up.railway.app/api/users");
         console.log("users", res.data);
         setUsers(res.data);
      }
      catch (err) {
         console.log(err);
      }
   } 

   const updateUserInfo = (user) => {
      setSelectedUser(user);
      setIsModalActive(true);
   };
   
   const closeModal = () => {
      setIsModalActive(false);
      setSelectedUser(null);
   };

   const saveUserInfo = async (updatedUser) => {
      try {
         await axios.put(`http://localhost:5000/api/users/${updatedUser.User_ID}`, updatedUser);
         setUsers(users.map(user => (user.User_ID === updatedUser.User_ID ? updatedUser : user)));
         closeModal();
         setAlertContent("User information updated successfully");
         setShowSuccessfulEdit(true);
         setTimeout(() => {
            setShowSuccessfulEdit(false);
         }, 2500);
      }
      catch (err) {
         console.log(err);
      }
   };

   useEffect(() => {
      fetchUsers();
   }, []);


	return (
		<div>
         {showSuccessfulEdit &&
            <Alert severity="success">{alertContent}</Alert>
         }
			<h2>User Management</h2>
         <table className="user-info-table">
            <thead>
               <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Access Level</th>
                  <th>Points</th>
                  <th>Actions</th>
               </tr>
            </thead>
            <tbody>
               {users.map((user) => (
                  <User key={user.User_ID} userInfo={user} onEdit={updateUserInfo} />
               ))}
            </tbody>
         </table>
         {isModalActive && (
            <EditUserModal user={selectedUser} onClose={closeModal} onSave={saveUserInfo} />
         )}
		</div>
	);
}

export default UserManagement;
