import React, { useState } from 'react';
import './AddBookScreen.css';
import { postNewBook } from '../../domain/APIs/BookAPI'; 
import { useNavigate } from 'react-router-dom';

const AddBookScreen: React.FC = () => {
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [isbn, setIsbn] = useState('');
    const [abstract, setAbstract] = useState('');
    const [author, setAuthor] = useState('');
    const [publisher, setPublisher] = useState('');
    const [price, setPrice] = useState('');
    const [numPages, setNumPages] = useState(0);
    const id = isbn;
    const navigate = useNavigate();
    

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const formattedPrice = `${price}$`;
            // Erstelle ein Buchobjekt mit den eingegebenen Daten
            const newBook = {
                id,
                title,
                subtitle,
                isbn,
                abstract,
                author,
                publisher,
                price: formattedPrice,
                cover:"",
                numPages
            };
            // Rufe die API-Funktion postNewBook auf, um das neue Buch hinzuzufügen
            const addedBook = await postNewBook(newBook);
            console.log('Added book:', addedBook);
            // Wechsel zum detail-book nach efolgreicher Buch Erstellung 
            navigate(`/detail-book/${id}`,{ state: {list: numPages < 301 ? 'shortstory-bookstore' : 'novel-bookstore'  }}  ); // Navigiere zur Buchdetailseite
        } catch (error) {
            console.error('Error adding book:', error);
            
        }
    };
    

    return (
        <div className="add-book-container">
            <h2 className="add-book-header">Add New Book</h2>
            <form className="add-book-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="subtitle">Subtitle</label>
                    <input
                        type="text"
                        id="subtitle"
                        value={subtitle}
                        onChange={(e) => setSubtitle(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="isbn">ISBN</label>
                    <input
                        type="text"
                        id="isbn"
                        value={isbn}
                        onChange={(e) => setIsbn(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="abstract">Abstract</label>
                    <textarea
                        id="abstract"
                        value={abstract}
                        onChange={(e) => setAbstract(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="author">Author</label>
                    <input
                        type="text"
                        id="author"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="publisher">Publisher</label>
                    <input
                        type="text"
                        id="publisher"
                        value={publisher}
                        onChange={(e) => setPublisher(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <input
                        type="number"
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="numPages">Number of Pages</label>
                    <input
                        type="number"
                        id="numPages"
                        value={numPages}
                        onChange={(e) => setNumPages(parseInt(e.target.value, 10))}
                        required
                    />
                </div>
                <div className="add-book-buttons">
                    <button className="add-book-back-button" type="button" onClick={() => window.history.back()}>Back</button>
                    <button className="add-book-button" type="submit">Add Book</button>
                    
                </div>
            </form>
        </div>
    );
};

export default AddBookScreen;

