
 import React from 'react';
 import { useSelector } from 'react-redux';
 import { RootState } from '../../store';
 import './UserPage.css';
 /*
 * export const UserPage: React.FC = () => {
 *     const { user } = useSelector((state: RootState) => state.auth);
 *
 *     return (
 *         <div className="UserPage">
 *             <h2 className="user-page-title">User Profile</h2>
 *             <div className="user-info">
 *                 <h3>Name: {user.name}</h3>
 *                 <div className="address-section">
 *                     <h4>Billing Address:</h4>
 *                     <p>{user.billingAddress.street}</p>
 *                     <p>{user.billingAddress.city}, {user.billingAddress.state} {user.billingAddress.zip}</p>
 *                 </div>
 *                 <div className="address-section">
 *                     <h4>Shipping Address:</h4>
 *                     <p>{user.shippingAddress.street}</p>
 *                     <p>{user.shippingAddress.city}, {user.shippingAddress.state} {user.shippingAddress.zip}</p>
 *                 </div>
 *             </div>
 *         </div>
 *     );
 * };
 *
 * export default UserPage;
 */