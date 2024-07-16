// src/slices/cartSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { addItem, createBasket } from '../domain/APIs/BasketAPI';
import { Book } from '../domain/Interfaces/Book';



// Definiere das Interface für ein einzelnes Element im Warenkorb
interface CartItem extends Omit<Book, 'price'> {
  price: number;  // Der Preis des Buches als Zahl
  quantity: number; // Die Anzahl der Exemplare des Buches im Warenkorb
  store: 'Shortstories' | 'Novels'; // Die Herkunft des Buches
}

// Definiere das Interface für den Zustand des Warenkorbs
interface CartState {
  cart: CartItem[]; // Eine Liste von CartItem-Objekten, die den Warenkorb darstellen
  basketId: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Initialer Zustand des Warenkorbs
const initialState: CartState = {
  cart: [], // Der Warenkorb ist standardmäßig leer
  basketId: null,
  status: 'idle',
  error: null,
};

export const createBasketThunk = createAsyncThunk(
  'cart/createBasket',
  async (userId: string) => {
    const basket = await createBasket(userId);
    return basket.id;
  }
);

export const addItemToBasketThunk = createAsyncThunk(
  'cart/addItemToBasket',
  async ({ basketID, itemID, amount }: { basketID: string; itemID: string; amount: number }) => {
    const success = await addItem(basketID, itemID, amount);
    return { basketID, itemID, amount };
  }
);

// Erstelle einen Slice für den Warenkorb
const cartSlice = createSlice({
  name: 'cart', // Name des Slices
  initialState, // Initialer Zustand des Slices
  reducers: {
    // Reducer zum Hinzufügen eines Buches zum Warenkorb
    addToCart: (state, action: PayloadAction<{ book: Book, store: 'Shortstories' | 'Novels' }>) => {
      const { book, store } = action.payload; // Extrahiere Buch und Herkunft aus der Aktion
      const parsedPrice = parseFloat(book.price.replace('$', '')); // Entferne das $-Zeichen und parse den Preis
      const existingItem = state.cart.find(item => item.id === book.id); // Überprüfe, ob das Buch bereits im Warenkorb ist
      if (existingItem) {
        existingItem.quantity += 1; // Erhöhe die Anzahl, wenn das Buch bereits im Warenkorb ist
      } else {
        state.cart.push({ ...book, price: parsedPrice, quantity: 1, store });  // Füge das Buch zum Warenkorb hinzu, wenn es noch nicht vorhanden ist
      }
    },
     // Reducer zum Entfernen eines Buches aus dem Warenkorb
    removeFromCart: (state, action: PayloadAction<string>) => {
      const itemId = action.payload; // Extrahiere die ID des zu entfernenden Buches
      const existingItem = state.cart.find(item => item.id === itemId); // Finde das Buch im Warenkorb
      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity -= 1; // Verringere die Anzahl, wenn mehr als ein Exemplar vorhanden ist

      } else {
        state.cart = state.cart.filter(item => item.id !== itemId);  // Entferne das Buch, wenn nur ein Exemplar vorhanden ist
      }
    },
     // Reducer zum Leeren des Warenkorbs
    clearCart: (state) => {
      state.cart = []; // Setze den Warenkorb auf einen leeren Zustand
    },
    // Reducer zum Setzen des Warenkorbs auf eine spezifische Liste von CartItem-Objekten
    setCart: (state, action: PayloadAction<CartItem[]>) => {
      state.cart = action.payload; // Setze den Warenkorb auf die übergebene Liste
    },
  },
    extraReducers: (builder) => {
      builder
        .addCase(createBasketThunk.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(createBasketThunk.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.basketId = action.payload;
        })
        .addCase(createBasketThunk.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message || null;
        })
        .addCase(addItemToBasketThunk.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(addItemToBasketThunk.fulfilled, (state, action) => {
          state.status = 'succeeded';
        })
        .addCase(addItemToBasketThunk.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message || null;
        });
  },
});

export const { addToCart, removeFromCart, clearCart, setCart } = cartSlice.actions;
export default cartSlice.reducer;
