import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearBasketThunk, clearCart } from '../../slices/cartSlice';
import './OrderPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { updateShippingAddress } from '../../domain/APIs/UserAPI';
import { AppDispatch, RootState } from '../../store';
import { Address } from '../../domain/Interfaces/User';
import { getUser } from '../../domain/APIs/UserAPI';

interface CartItem {
    id: string;
    title: string;
    author: string;
    price: number;
    quantity: number;
    store: string;
}

interface StateType {
    cart: CartItem[];
    totalPrice: number;
}

interface ShippingAddress extends Address { }

interface PaymentInfo {
    cardNumber: string;
    expiryDate: string;
    cvv: string;
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

const initialPaymentState: PaymentInfo = {
    cardNumber: '',
    expiryDate: '',
    cvv: '',
};

const OrderPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch<AppDispatch>();
    const basketId = useSelector((state: RootState) => state.cart.basketId);
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

    const state = location.state as StateType || { cart: [], totalPrice: 0 };
    const { cart, totalPrice } = state;

    const [shippingAddress, setShippingAddress] = useState<ShippingAddress>(initialShippingState);
    const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>(initialPaymentState);
    const [errors, setErrors] = useState({
        shipping: {} as Partial<ShippingAddress>,
        payment: {} as Partial<PaymentInfo>,
    });

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
        const newErrors: Partial<ShippingAddress> = {};
        if (!shippingAddress.firstname) newErrors.firstname = 'Firstname is required';
        if (!shippingAddress.lastname) newErrors.lastname = 'Lastname is required';
        if (!shippingAddress.street) newErrors.street = 'Street is required';
        if (!shippingAddress.houseNumber) newErrors.houseNumber = 'House number is required';
        if (!shippingAddress.postalCode) newErrors.postalCode = 'Postal code is required';
        if (!shippingAddress.state) newErrors.state = 'State is required';
        if (!shippingAddress.city) newErrors.city = 'City is required';
        setErrors(prev => ({ ...prev, shipping: newErrors }));
        return Object.keys(newErrors).length === 0;
    };

    const validatePayment = (): boolean => {
        const newErrors: Partial<PaymentInfo> = {};
        if (!paymentInfo.cardNumber) newErrors.cardNumber = 'Card Number is required';
        if (!paymentInfo.expiryDate) newErrors.expiryDate = 'Expiry Date is required';
        if (!paymentInfo.cvv) newErrors.cvv = 'CVV is required';
        setErrors(prev => ({ ...prev, payment: newErrors }));
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (
        e: ChangeEvent<HTMLInputElement>,
        setState: React.Dispatch<React.SetStateAction<any>>,
        state: any
    ) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
    };

    const handleConfirmOrder = async (event: FormEvent) => {
        event.preventDefault();
        const isShippingValid = validateShipping();
        const isPaymentValid = validatePayment();

        if (isShippingValid && isPaymentValid) {
            try {
                await updateShippingAddress(shippingAddress);
                navigate('/thank-you', { state: { purchasedItems: cart, totalPrice } });

                if (isAuthenticated && basketId) {
                    dispatch(clearBasketThunk(basketId));
                }
                dispatch(clearCart());
            } catch (error) {
                console.error('Failed to process order', error);
                // Setze einen allgemeinen Fehler, falls die Bestellung fehlschlägt
                setErrors(prev => ({ ...prev, form: 'Failed to process order. Please try again.' }));
            }
        };
    }

    const handleReturnToShop = () => {
        navigate('/shop'); // Replace '/shop' with the actual path to your shop page
    };

    return (
        <div className="order-overlay">
            <div className="order-overlay-content">
                <button className="close-button" onClick={() => navigate(-1)}>
                    <FontAwesomeIcon icon={faTimes} />
                </button>
                <h2>Checkout</h2>
                <form className="order-form" onSubmit={handleConfirmOrder}>
                    <div className="order-box">
                        <h3>Shipping Information</h3>
                        {Object.keys(initialShippingState).map((field) => (
                            <div className="form-group" key={field}>
                                <label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
                                <input
                                    type="text"
                                    id={field}
                                    name={field}
                                    value={shippingAddress[field as keyof ShippingAddress]}
                                    onChange={(e) => handleChange(e, setShippingAddress, shippingAddress)}
                                    required
                                />
                                {errors.shipping[field as keyof ShippingAddress] && (
                                    <p className="error">{errors.shipping[field as keyof ShippingAddress]}</p>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="order-box">
                        <h3>Payment Information</h3>
                        {Object.keys(initialPaymentState).map((field) => (
                            <div className="form-group" key={field}>
                                <label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
                                <input
                                    type="text"
                                    id={field}
                                    name={field}
                                    value={paymentInfo[field as keyof PaymentInfo]}
                                    onChange={(e) => handleChange(e, setPaymentInfo, paymentInfo)}
                                    required
                                />
                                {errors.payment[field as keyof PaymentInfo] && (
                                    <p className="error">{errors.payment[field as keyof PaymentInfo]}</p>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="confirm-button-container">
                        <button className=" order-back-button" onClick={handleReturnToShop}>Back to Shop</button>
                        <button type="submit" className=" confirm-button">Pay Order</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default OrderPage;
