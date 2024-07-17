import './BooksList.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToBasketThunk, addToCart, createBasketThunk } from '../../slices/cartSlice';
import BookTile from "../BookTile/BookTile";
import { AppDispatch, RootState } from '../../store';
import useBooks from '../../domain/Hooks/BookHooks';
import { Book } from '../../domain/Interfaces/Book';

interface BooksListProps {
    minpage: 0 | 301;
    maxpage: 300 | 999999;
    backgroundClass: string;
    initialPage: number;
    onPageChange: (page: number) => void;
}

const BooksList: React.FC<BooksListProps> = ({ minpage, maxpage, backgroundClass }) => {
    const { books, state, error } = useBooks(minpage, maxpage);
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const cart = useSelector((state: RootState) => state.cart.cart);
    const basketId = useSelector((state: RootState) => state.cart.basketId);
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

    const handleBookClick = (book: Book) => {
        navigate('/detail-book/' + book.id, { state: { book, list: book.numPages < 301 ? 'shortstory-bookstore' : 'novel-bookstore' } });
    };

    const handleAddToCartClick = async (book: Book) => {
        const store = book.numPages < 301 ? 'Shortstories' : 'Novels';
        // Ensure basket exists before adding items to it
        if (isAuthenticated) {
            if (!basketId) {   //TODO: isAuthenticated
                //TODO:user123 durch aktuell eingeloggten user ersetzen logick wenn kein user eingeloggt ist
                const resultAction = await dispatch(createBasketThunk('user123'));
                if (createBasketThunk.fulfilled.match(resultAction)) {
                    const newBasketId = resultAction.payload;
                    dispatch(addItemToBasketThunk({ basketID: newBasketId, itemID: book.id, amount: 1 }));
                }
            } else {
                dispatch(addItemToBasketThunk({ basketID: basketId, itemID: book.id, amount: 1 }));
            }
        }
        dispatch(addToCart({ book, store })); // This updates the local state
    };


    const getCartCount = (bookId: string) => {
        const item = cart.find(item => item.id === bookId);
        return item ? item.quantity : 0;
    };

    if (state === 'loading') {
        return <p>Loading books….</p>;
    }
    if (state === 'error' && error) {
        console.error('An error occurred while loading books:', error);
        return (
            <div>
                <p>An error occurred while loading books.</p>
                <p>Error message: {error.message}</p>
            </div>
        );
    }

    return (
        <div className={backgroundClass || 'defaultBackgroundClass'}>
            <div className='store-section'>
                <h2>{maxpage === 300 ? 'Short Story Bookstore' : 'Novel Bookstore'}</h2>
            </div>
            <div className="books-container">
                {books.map(book => (
                    <BookTile
                        key={book.id}
                        book={book}
                        onImageClick={() => handleBookClick(book)}
                        onAddToCartClick={() => handleAddToCartClick(book)}
                        cartCount={getCartCount(book.id)}
                    />
                ))}
            </div>
        </div>
    );
};

export default BooksList;
