import React, { useState, useEffect } from "react";
import axios from 'axios';

import { ListPurchase } from "./activity/ListPurchase";
import { ListActivity } from "./activity/ListActivity";

import left_chevron from './../../resources/chevron-left-small.svg';

const server_addr = (process.env.REACT_APP_ENVIRO === 'development') ? 'http://localhost:5000' : 'https://fleetrewards-copy-1-group2.up.railway.app';

export const ActivityLogs = ({ user }) => {

    const id = user.id;
    const [purchases, setPurchases] = useState(null);
    const [activities, setActivities] = useState(null);

    // Grab all the data needed by the page and load them into the react state variables.
    useEffect(() => {
        axios.get(`${server_addr}/api/user/purchases/${id}`)
            .then(response => {
                setPurchases(response.data);
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
        });
        axios.get(`${server_addr}/api/user/activity/${id}`)
            .then(response => {
                setActivities(response.data);
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
        });
    }, [id]);

    if (!purchases || !activities) {
        return <div>Loading...</div>;
    }

    return (
        <div className="rounded-2xl shadow-2xl bg-white w-5/6 h-50 space-y-4 pt-6">
            <div>
                <div className='border-l-8 border-yellow-400 bg-gray-100 font-bold px-6 mb-6 w-fit'>
                    <h2>Purchase Logs</h2>
                </div>
                <div className="rounded-2xl bg-gray-800 p-4 space-y-2 bg-center bg-repeat-round" style={{ backgroundSize: 100, backgroundImage: `url(${left_chevron})` }}>
                    {purchases.map(purchase => <ListPurchase key={purchase.id} purchase={purchase} />)}
                </div>
            </div>
            <div className="pt-6">
                <div className='border-l-8 border-blue-600 bg-gray-100 font-bold px-6 mb-6 w-fit'>
                    <h2>Activity Logs</h2>
                </div>
                <div className="rounded-2xl bg-gray-800 p-4 space-y-2 bg-center bg-repeat-round" style={{ backgroundSize: 100, backgroundImage: `url(${left_chevron})` }}>
                    {activities.map(activity => <ListActivity key={activity.activity_id} activity={activity} />)}
                </div>
            </div>
        </div>
    );
}