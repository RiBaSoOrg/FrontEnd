import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './Modal.css';
import { getUser, updateShippingAddress } from '../../domain/APIs/UserAPI'; 

interface EditAddressModalProps {
    onClose: () => void;
}

interface ShippingAddress {
    firstname: string;
    lastname: string;
    street: string;
    houseNumber: string;
    postalCode: string;
    state: string;
    city: string;
}

const initialShippingState: ShippingAddress = {
    firstname: '',
    lastname: '',
    street: '',
    houseNumber: '',
    postalCode: '',
    state: '',
    city: '',
};

interface ShippingAddressErrors extends Partial<ShippingAddress> {
    form?: string;
}

const EditAddressModal: React.FC<EditAddressModalProps> = ({ onClose }) => {
    const [shippingAddress, setShippingAddress] = useState<ShippingAddress>(initialShippingState);
    const [errors, setErrors] = useState<ShippingAddressErrors>({});


    useEffect(() => {
        const fetchUserAddress = async () => {
            try {
                const user = await getUser();
                if (user && user.shippingAddress) {
                    setShippingAddress(user.shippingAddress);
                }
            } catch (error) {
                console.error('Error fetching user address:', error);
            }
        };

        fetchUserAddress();
    }, []);
    
    const validateShipping = (): boolean => {
        const newErrors: ShippingAddressErrors = {};
        if (!shippingAddress.firstname) newErrors.firstname = 'Firstname is required';
        if (!shippingAddress.lastname) newErrors.lastname = 'Lastname is required';
        if (!shippingAddress.street) newErrors.street = 'Street is required';
        if (!shippingAddress.houseNumber) newErrors.houseNumber = 'House number is required';
        if (!shippingAddress.postalCode) newErrors.postalCode = 'Postal code is required';
        if (!shippingAddress.state) newErrors.state = 'State is required';
        if (!shippingAddress.city) newErrors.city = 'City is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setShippingAddress({ ...shippingAddress, [name]: value });
    };

    const handleSave = async (event: FormEvent) => {
        event.preventDefault();
        if (validateShipping()) {
            try {
                await updateShippingAddress(shippingAddress);
                onClose();
            } catch (error) {
                console.error('Error updating shipping address:', error);
                setErrors({ ...errors, form: 'Failed to update shipping address. Please try again.' });
            }
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>
                    <FontAwesomeIcon icon={faTimes} />
                </button>
                <h2>Edit Shipping Address</h2>
                <form onSubmit={handleSave}>
                    {Object.keys(initialShippingState).map((field) => (
                        <div className="form-group" key={field}>
                            <label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
                            <input
                                type="text"
                                id={field}
                                name={field}
                                value={shippingAddress[field as keyof ShippingAddress]}
                                onChange={handleChange}
                                required
                            />
                            {errors[field as keyof ShippingAddress] && (
                                <p className="error">{errors[field as keyof ShippingAddress]}</p>
                            )}
                        </div>
                    ))}
                    {errors.form && <p className="error">{errors.form}</p>}
                    <button type="submit" className="button confirm-button">Save Address</button>
                </form>
            </div>
        </div>
    );
};

export default EditAddressModal;