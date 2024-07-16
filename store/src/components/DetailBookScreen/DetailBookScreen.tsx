import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Book } from '../../domain/Book';
import './DetailBookScreen.css';
import { useNavigate } from 'react-router-dom';
import { requestBookByISBN } from '../../domain/BookAPI'; 
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { addToCart } from '../../slices/cartSlice';


// Definiert die DetailBookScreen.tsx-Komponente als Funktionale Komponente
const DetailBookScreen = () => {
    const { id } = useParams<{ id?: string }>();  // Holt die ID aus den URL-Parametern
    const location = useLocation();  // Holt den aktuellen Standort
    const navigate = useNavigate(); // Verwendet den useNavigate-Hook von React Router, um Navigationen durchzuführen
    const { userRole } = useSelector((state: RootState) => state.auth); // Holt die Benutzerrolle aus dem AuthContext
    const dispatch = useDispatch(); 
    const [book, setBook] = useState<Book | null>(null); // Lokaler Zustand für das Buch
    const listRoute = location.state?.list || '/'; // Rückfall auf die Startseite

    // Effekt, um die Buchdetails zu laden

    useEffect(() => {
        if (location.state?.book) {
            setBook(location.state.book);
        } else if (id) {
            fetchBookDetails(id);
        }
    }, [location.state, id]);

    // Funktion, um die Buchdetails anhand der ID zu holen
    const fetchBookDetails = async (id: string) => {
        try {
            const bookDetails = await requestBookByISBN(id);
            setBook(bookDetails);
        } catch (error) {
            console.error('Failed to fetch book details:', error);
        }
    };

    // Gibt eine Nachricht zurück, wenn keine Buchdaten verfügbar sind
    if (!book) {
        return <div className="detail-book-container">Keine Buchdaten verfügbar.</div>;
    }

    // Funktion, die aufgerufen wird, wenn der Bearbeiten-Button geklickt wird
    const handleEditClick = () => {
        navigate('/edit-book/' + book.id, { state: { book, list: book.numPages < 301 ? 'shortstory-bookstore' : 'novel-bookstore' } });
    };

    // Funktion, die aufgerufen wird, wenn der Zurück-Button geklickt wird
    const handleReturn = () => {
        navigate(`/${listRoute}`); // Navigiere zurück zur entsprechenden Liste

    };

    // Funktion, die aufgerufen wird, wenn der Buch in den Einkaufswagen gelegt wird
    const handleAddToCart = () => {
        const store = book.numPages < 301 ? 'Shortstories' : 'Novels'; // Bestimme die Herkunft des Buchs
        dispatch(addToCart({ book, store }));
    };

    return (
        <div className="detail-book-container">
            <div className="detail-book-header">
                <h1>{book.title}</h1>
            </div>
            {book.cover === "" ? (
                <p>No image</p>
            ) : (
                <img src={book.cover} alt={book.title} className="detail-book-image" />
            )}

            <div className="detail-book-info"><strong>Subtitle:</strong> {book.subtitle}</div>
            <div className="detail-book-info"><strong>ISBN:</strong> {book.isbn}</div>
            <div className="detail-book-info"><strong>Author:</strong> {book.author}</div>
            <div className="detail-book-info"><strong>Publisher:</strong> {book.publisher}</div>
            <div className="detail-book-info"><strong>Price:</strong> {book.price}</div>
            <div className="detail-book-info"><strong>Number of Pages:</strong> {book.numPages}</div>
            <div className="detail-book-info"><strong>Abstract:</strong> {book.abstract}</div>
            <div className="detail-book-footer">
                <button className="detail-book-back-button" onClick={handleReturn}>Back</button>

                {userRole === 'admin' && (
                    <button className="detail-book-edit-button" onClick={handleEditClick}>Edit Book</button>  /* Bearbeiten-Button für Admins */
                )}
                {(
                    <button className="detail-add-to-cart-button" onClick={handleAddToCart}>Add to Cart</button> /* In den Einkaufswagen legen-Button für Nicht-Admins */
                )}

            </div>
        </div>
    );
};

export default DetailBookScreen;
