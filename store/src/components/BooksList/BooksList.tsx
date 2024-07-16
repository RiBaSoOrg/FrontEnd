// BooksList.tsx
import React, { useState, useEffect } from 'react';
import { Book } from '../../domain/Book';
import './BooksList.css';
import useBooks from '../../domain/hooks';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../slices/cartSlice';
import BookTile from "../BookTile/BookTile";
import { RootState } from '../../store';

interface BooksListProps {
    minpage: 0 | 301;
    maxpage: 300 | 9999999999;
    likes: { [key: string]: number };
    onLikeClick: (bookId: string) => void;
    backgroundClass: string;
    initialPage: number;
    onPageChange: (page: number) => void;
}

const BooksList: React.FC<BooksListProps> = ({ minpage, maxpage, likes, onLikeClick, backgroundClass }) => {
    const { books, state, error } = useBooks(minpage, maxpage);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector((state: RootState) => state.cart.cart);

    const handleBookClick = (book: Book) => {
        navigate('/detail-book/' + book.id, { state: { book, list: book.numPages < 301 ? 'shortstory-bookstore' : 'novel-bookstore' } });
    };

    const handleLikeClick = (bookId: string) => {
        onLikeClick(bookId);
    };

    const handleAddToCartClick = (book: Book) => {
        const store = book.numPages < 301 ? 'Shortstories' : 'Novels';
        dispatch(addToCart({ book, store }));
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
                        onLikeClick={() => handleLikeClick(book.id)}
                        onAddToCartClick={() => handleAddToCartClick(book)}
                        cartCount={getCartCount(book.id)}
                        likes={likes[book.id] || 0}

                    />
                ))}
            </div>
        </div>
    );
};

export default BooksList;
