import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { Book } from '../../domain/Book';
import './BookTile.css';

interface BookTileProps {
  book: Book;
  onImageClick: (book: Book) => void;
  onAddToCartClick: () => void;
  cartCount: number;
}

const BookTile: React.FC<BookTileProps> = ({ book, onImageClick, onAddToCartClick, cartCount }) => {
  return (
      <div className="book-tile">
        {book.cover === "" ? (
            <p onClick={() => onImageClick(book)}>No image</p>
        ) : (
            <img src={book.cover} alt={book.title} onClick={() => onImageClick(book)} className="book-image" />
        )}
        <div className="book-details">
          <div className="book-title">{book.title}</div>
          <div className="book-author">by {book.author}</div>
          <div className="book-publisher">Publisher: {book.publisher}</div>
          <div className="book-price">{book.price}</div>
          <button className="add-to-cart-button" onClick={onAddToCartClick}>
            <FontAwesomeIcon icon={faCartPlus} />
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            Add to Cart
          </button>
        </div>
      </div>
  );
};

export default BookTile;
