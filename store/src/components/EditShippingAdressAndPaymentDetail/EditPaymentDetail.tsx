import React, { useState, ChangeEvent, FormEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './Modal.css';

interface EditPaymentModalProps {
    onClose: () => void;
}

interface PaymentInfo {
    cardNumber: string;
    expiryDate: string;
    cvv: string;
}

const initialPaymentState: PaymentInfo = {
    cardNumber: '',
    expiryDate: '',
    cvv: '',
};

const EditPaymentModal: React.FC<EditPaymentModalProps> = ({ onClose }) => {
    const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>(initialPaymentState);
    const [errors, setErrors] = useState<Partial<PaymentInfo>>({});

    const validatePayment = (): boolean => {
        const newErrors: Partial<PaymentInfo> = {};
        if (!paymentInfo.cardNumber) newErrors.cardNumber = 'Card Number is required';
        if (!paymentInfo.expiryDate) newErrors.expiryDate = 'Expiry Date is required';
        if (!paymentInfo.cvv) newErrors.cvv = 'CVV is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPaymentInfo({ ...paymentInfo, [name]: value });
    };

    const handleSave = (event: FormEvent) => {
        event.preventDefault();
        if (validatePayment()) {
            // Handle saving the updated payment details here
            onClose();
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>
                    <FontAwesomeIcon icon={faTimes} />
                </button>
                <h2>Edit Payment Details</h2>
                <form onSubmit={handleSave}>
                    {Object.keys(initialPaymentState).map((field) => (
                        <div className="form-group" key={field}>
                            <label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
                            <input
                                type="text"
                                id={field}
                                name={field}
                                value={paymentInfo[field as keyof PaymentInfo]}
                                onChange={handleChange}
                                required
                            />
                            {errors[field as keyof PaymentInfo] && (
                                <p className="error">{errors[field as keyof PaymentInfo]}</p>
                            )}
                        </div>
                    ))}
                    <button type="submit" className="button confirm-button">Save Payment Info</button>
                </form>
            </div>
        </div>
    );
};

export default EditPaymentModal;
