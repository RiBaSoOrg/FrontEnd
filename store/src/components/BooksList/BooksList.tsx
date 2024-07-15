// BooksList.tsx
import React, { useState, useEffect } from 'react';
import { Book } from '../../domain/Book';
import './BooksList.css';
import useBooks from '../../domain/hooks';
import { useNavigate } from 'react-router-dom';
import BookTile from "../BookTile/BookTile";


// Definiert die Eigenschaften (Props), die die BooksList-Komponente erwartet
interface BooksListProps {
    minpage: 0 | 301 // Mindestseitenzahl der Bücher (0 für Shortstories, 301 für Novels)
    maxpage: 300 | 9999999999; // Höchstseitenzahl der Bücher (300 für Shortstories, 9999999999 für Novels)
    likes: { [key: string]: number }; // Objekt, das die Anzahl der Likes für jedes Buch speichert, wobei der Schlüssel die Buch-ID ist
    onLikeClick: (bookId: string) => void; // Funktion zum Behandeln von Like-Klicks
    backgroundClass: string; // CSS-Klasse für den Hintergrund
    initialPage: number;  // Anfangsseite der Liste
    onPageChange: (page: number) => void; // Funktion zur Aktualisierung der Seite
}

// Definiert die BooksList-Komponente als Funktionale Komponente mit den Eigenschaften von BooksListProps
const BooksList: React.FC<BooksListProps> = ({ minpage, maxpage, likes, onLikeClick, backgroundClass }) => {
    // Verwendet den useBooks-Hook, um Bücher und Zustandswerte basierend auf den Seitenzahlgrenzen abzurufen
    const { books, state, error, page, totalPages, goToNextPage, goToPreviousPage, goToFirstPage, goToLastPage } = useBooks(minpage, maxpage);
    const navigate = useNavigate();  // Verwendet den useNavigate-Hook von React Router, um Navigationen durchzuführen

    // Funktion, die aufgerufen wird, wenn ein Buch angeklickt wird
    const handleBookClick = (book: Book) => {
        // Navigiert zur Detailseite des Buches und übergibt das Buch und die Listenart (Shortstories oder Novels) als Zustand
        navigate('/detail-book/' + book.id, { state: { book, list: book.numPages < 301 ? 'shortstory-bookstore' : 'novel-bookstore' } });
    };

    // Funktion, die aufgerufen wird, wenn auf den Like-Button eines Buches geklickt wird
    const handleLikeClick = (bookId: string) => {
        onLikeClick(bookId);
    };

    // Zeigt eine Ladeanzeige an, wenn der Zustand 'loading' ist
    if (state === 'loading') {
        return <p>Loading books….</p>;
    }
    // Zeigt eine Fehlermeldung an, wenn der Zustand 'error' ist und ein Fehler aufgetreten ist
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
                {/* Überschrift basierend auf der maxpage-Eigenschaft */}
                <h2>{maxpage === 300 ? 'Short Story Bookstore' : 'Novel Bookstore'}</h2>
            </div>
            <div className="books-container">
                {/* Mappt über die Bücher und rendert eine BookTile-Komponente für jedes Buch */}
                {books.map(book => (
                    <BookTile
                        key={book.id}
                        book={book}
                        onImageClick={() => handleBookClick(book)}
                        onLikeClick={() => handleLikeClick(book.id)}
                        likes={likes[book.id] || 0} // Übergibt die Like-Anzahl für das Buch an die BookTile-Komponente
                    />
                ))}
            </div>
        </div>
    );
};
export default BooksList;
