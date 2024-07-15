import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { Book } from '../../domain/Book';
import './BookTile.css'

// Definiert die Eigenschaften (Props), die die BookTile-Komponente erwartet
interface BookTileProps {
  book: Book;
  onImageClick: (book: Book) => void; // Funktion, die aufgerufen wird, wenn auf das Buchbild geklickt wird
  onLikeClick: () => void;  // Funktion, die aufgerufen wird, wenn auf das Like-Icon geklickt wird
  likes: number; // Anzahl der Likes für das Buch
}
// Definiert die BookTile-Komponente als Funktionale Komponente mit den Eigenschaften von BookTileProps
const BookTile: React.FC<BookTileProps> = ({ book, onImageClick, onLikeClick, likes }) => {
  const [clicked, setClicked] = useState(false);  // Lokaler Zustand, um den Klickzustand des Like-Icons zu verfolgen

  // Funktion, die aufgerufen wird, wenn auf das Like-Icon geklickt wird
  const handleClick = () => {
    onLikeClick();
    setClicked(true);
    setTimeout(() => {
      setClicked(false);
    }, 500);
  };

  // Setze eine CSS-Variable für die Länge der Like-Zahl
  const likeCountStyle = {
    '--length': likes.toString().length, // Definiert die Länge der Like-Zahl als CSS-Variable
  } as React.CSSProperties;

  return (
      <div className="book-tile">
        {/* Bedingtes Rendering des Buchbildes oder eines Platzhalters */}
        {book.cover === "" ? (
            <p onClick={() => onImageClick(book)}>No image</p> // Platzhaltertext, wenn kein Bild vorhanden ist
        ) : (
            <img src={book.cover} alt={book.title} onClick={() => onImageClick(book)} /> // Bild des Buches mit Klick-Handler

        )}
        <div className="book-details">
          <div className="book-title">{book.title}</div>
          <div className="book-author">by {book.author}</div>
          <div className="book-publisher">Publisher: {book.publisher}</div>
          <div className="book-price">{book.price}</div>

          <div className={`heart-icon ${clicked ? 'clicked' : ''}`} onClick={handleClick} style={likeCountStyle}>
            <FontAwesomeIcon icon={faHeart} />
            <span className="like-count">{likes}</span>
          </div>
        </div>
      </div>
  );
};

export default BookTile;
