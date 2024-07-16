import React, { useState, ChangeEvent, FormEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './Modal.css';

interface EditAddressModalProps {
    onClose: () => void;
}

interface ShippingAddress {
    name: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
}

const initialShippingState: ShippingAddress = {
    name: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
};

const EditAddressModal: React.FC<EditAddressModalProps> = ({ onClose }) => {
    const [shippingAddress, setShippingAddress] = useState<ShippingAddress>(initialShippingState);
    const [errors, setErrors] = useState<Partial<ShippingAddress>>({});

    const validateShipping = (): boolean => {
        const newErrors: Partial<ShippingAddress> = {};
        if (!shippingAddress.name) newErrors.name = 'Name is required';
        if (!shippingAddress.address) newErrors.address = 'Address is required';
        if (!shippingAddress.city) newErrors.city = 'City is required';
        if (!shippingAddress.postalCode) newErrors.postalCode = 'Postal Code is required';
        if (!shippingAddress.country) newErrors.country = 'Country is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setShippingAddress({ ...shippingAddress, [name]: value });
    };

    const handleSave = (event: FormEvent) => {
        event.preventDefault();
        if (validateShipping()) {
            // Handle saving the updated address here
            onClose();
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
                    <button type="submit" className="button confirm-button">Save Address</button>
                </form>
            </div>
        </div>
    );
};

export default EditAddressModal;
