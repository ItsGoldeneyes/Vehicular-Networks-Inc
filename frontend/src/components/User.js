import React from "react";
import "./User.css";

function User({ userInfo, onEdit }) {
    return (
        <tr className="user-row">
            <td>{userInfo.id}</td>
            <td>{userInfo.name}</td>
            <td>{userInfo.email}</td>
            <td>{userInfo.role}</td>
            <td>{userInfo.accessLevel}</td>
            <td>
                <button className="edit-button" onClick={() => onEdit(userInfo)}>
                    Edit
                </button>
            </td>
        </tr>
    );
}

export default User;