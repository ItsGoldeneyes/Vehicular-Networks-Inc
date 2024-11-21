import React from "react";
import "./User.css";
import Button from "@mui/material/Button";

function User({ userInfo, onEdit }) {
    return (
        <tr className="user-row">
            <td>{userInfo.User_ID}</td>
            <td>{`${userInfo.fName} ${userInfo.lName}`}</td>
            <td>{userInfo.Email}</td>
            <td>{userInfo.role}</td>
            <td>{userInfo.accessLevel}</td>
            <td>
                <Button variant="contained" className="edit-button" onClick={() => onEdit(userInfo)}>
                    Edit
                </Button>
            </td>
        </tr>
    );
}

export default User;