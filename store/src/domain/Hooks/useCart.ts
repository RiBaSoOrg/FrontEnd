
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { addItemToBasketThunk, createBasketThunk } from '../../slices/cartSlice';

export const useCart = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cart = useSelector((state: RootState) => state.cart);

  const createBasket = (userId: string) => dispatch(createBasketThunk(userId));

  const addItemToBasket = (basketID: string, itemID: string, amount: number) => 
    dispatch(addItemToBasketThunk({ basketID, itemID, amount }));

  return { cart, createBasket, addItemToBasket };
};
