// EditBookScreen.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { updateExistingBook, requestBookByISBN, deleteBook } from '../../domain/APIs/BookAPI'; // Stellen Sie sicher, dass die Pfade korrekt sind!
import { Book } from '../../domain/Book';
import './EditBookScreen.css';

// Definiert die EditBookScreen-Komponente als Funktionale Komponente
const EditBookScreen = () => {
    const { id } = useParams<{ id: string }>(); // Holt die ID aus den URL-Parametern
    const location = useLocation(); // Holt den aktuellen Standort
    const navigate = useNavigate(); // Verwendet den useNavigate-Hook von React Router, um Navigationen durchzuführen
    const [book, setBook] = useState<Book | null>(null); // Lokaler Zustand für das Buch
    const [price, setPrice] = useState<number | string>('');  // Separater Zustand für den Preis ohne $
    const listRoute = location.state?.list || '/'; // Rückfall auf die Startseite
    console.log(listRoute)

/**
 * Effekt zum Laden der Buchdetails
 *
 * Dieser useEffect-Hook wird beim Rendern der Komponente und bei Änderungen des location.state oder der id ausgeführt.
 * Wenn die Buchdetails im Standortzustand vorhanden sind, werden sie verwendet, um den Zustand des Buches und den Preis (ohne $) zu setzen.
 * Andernfalls werden die Buchdetails mithilfe der fetchBookDetails-Funktion basierend auf der ID abgerufen.
 */
    useEffect(() => {
        if (location.state?.book) {
            setBook(location.state.book);
            setPrice(parseFloat(location.state.book.price.replace('$', ''))); // Setzt den Preis ohne $
        } else if (id) {
            fetchBookDetails(id);
        }
    }, [location.state, id]);

    // Funktion, um die Buchdetails anhand der ID zu holen
    const fetchBookDetails = async (id: string) => {
        try {
            const bookDetails = await requestBookByISBN(id);
            setBook(bookDetails);
            setPrice(parseFloat(bookDetails.price.replace('$', ''))); // Setzt den Preis ohne $
        } catch (error) {
            console.error('Failed to fetch book details:', error);
        }
    };

    // Funktion, die aufgerufen wird, wenn ein Eingabefeld geändert wird
    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = event.target;
        if (id === 'price') {
            setPrice(value); // Aktualisiert den Preiszustand
        } else {
            setBook(prevBook => {
                if (!prevBook) return null;
                return {
                    ...prevBook,
                    [id]: id === 'numPages' ? parseInt(value, 10) : value // Konvertiere numPages sofort zu einer Zahl
                };
            });
        }
    };

     // Funktion, die aufgerufen wird, wenn das Formular abgesendet wird
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!id || !book) {
            console.error('No id or book data available');
            return; // Wenn keine id oder Buchdaten vorhanden sind, beende die Funktion frühzeitig
        }

        try {
            const formattedPrice = `${price}$`;
            const formattedNumPages = book.numPages;
            const updatedBook = await updateExistingBook(id, {
                ...book,
                price: formattedPrice,
                numPages: formattedNumPages
            });
            await updateExistingBook(id, updatedBook);
            console.log('Updated book', updatedBook);
            setBook(updatedBook); // Aktualisiere den Zustand mit dem aktualisierten Buch
            navigate(`/detail-book/${id}`, { state: { book: updatedBook, list: updatedBook.numPages < 301 ? 'shortstory-bookstore' : 'novel-bookstore' } }); // Navigiere zur Buchdetailseite
        } catch (error) {
            console.error('Failed to update book', error);
        }
    };

    // Funktion, die aufgerufen wird, wenn das Buch gelöscht wird
    const handleDelete = async () => {
        if (!id) {
            console.error('No ISBN available for deletion');
            return;
        }

        try {
            await deleteBook(id);
            console.log('Book deleted successfully');
            navigate(`/${listRoute}`); // Navigiere zurück zur entsprechenden Liste
        } catch (error) {
            console.error('Failed to delete book', error);
        }
    };

     // Gibt eine Nachricht zurück, wenn das Buch noch geladen wird
    if (!book) {
        return <p>Loading...</p>; // Sicherstellen, dass Loading ausgegeben wird, wenn kein Buch geladen ist
    }

    return (
        <div className="edit-book-container">
            <h2 className="edit-book-header">Edit Book</h2>
            <form className="edit-book-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        value={book.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="subtitle">Subtitle</label>
                    <input
                        type="text"
                        id="subtitle"
                        value={book.subtitle}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="isbn">ISBN</label>
                    <input
                        type="text"
                        id="isbn"
                        value={book.isbn}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="abstract">Abstract</label>
                    <textarea
                        id="abstract"
                        value={book.abstract}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="author">Author</label>
                    <input
                        type="text"
                        id="author"
                        value={book.author}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="publisher">Publisher</label>
                    <input
                        type="text"
                        id="publisher"
                        value={book.publisher}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <input
                        type="number"
                        id="price"
                        value={price}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="numPages">Number of Pages</label>
                    <input
                        type="number"
                        id="numPages"
                        value={book.numPages}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="edit-book-buttons">
                    <button className="edit-book-back-button" type="button" onClick={() => window.history.back()}>Back</button>
                    <button className="edit-book-button" type="submit">Edit Book</button>
                    <button className="delete-book-button" type="button" onClick={handleDelete}>Delete</button>
                </div>
            </form>
        </div>
    );
};

export default EditBookScreen;
