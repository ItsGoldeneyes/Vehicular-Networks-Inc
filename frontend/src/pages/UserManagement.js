import React from "react";
import User from "../components/User";
import "../styles/UserManagement.css";
import EditUserModal from "../components/EditUserModal";

const userData = [
	{
		id: 1,
		name: "John Doe",
		email: "john.doe@gmail.com",
		role: "User",
		accessLevel: "1",
	},
	{
		id: 2,
		name: "Jane Smith",
		email: "john.doe@gmail.com",
		role: "Admin",
		accessLevel: "2",
	},
];

function UserManagement() {
   const [users, setUsers] = React.useState(userData);
   const [selectedUser, setSelectedUser] = React.useState(null);
   const [isModalActive, setIsModalActive] = React.useState(false);

   const updateUserInfo = (user) => {
      setSelectedUser(user);
      setIsModalActive(true);
   };
   
   const closeModal = () => {
      setIsModalActive(false);
      setSelectedUser(null);
   };

   const saveUserInfo = (updatedUser) => {
      setUsers(users.map(user => (user.id === updatedUser.id ? updatedUser : user)));
      closeModal();
   };


	return (
		<div>
			<h2>User Management</h2>
         <table className="user-info-table">
            <thead>
               <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Access Level</th>
               </tr>
            </thead>
            <tbody>
               {users.map((user) => (
                  <User key={user.id} userInfo={user} onEdit={updateUserInfo} />
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
