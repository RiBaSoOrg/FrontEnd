import React, { useState } from 'react';
import BooksList from './BooksList/BooksList';

interface BookListsContainerProps {
  minpage: 0 | 301// Minimalwert der Seitenanzahl für Bücher (0 für Shortstories, 301 für Novels)
  maxpage: 300 | 9999999999; // Maximalwert der Seitenanzahl für Bücher (300 für Shortstories, sehr hoher Wert für Novels)
}

const BookListsContainer: React.FC<BookListsContainerProps> = ({ minpage , maxpage }) => {
  const [likes, setLikes] = useState<{ [key: string]: number }>({}); // Zustand zur Verwaltung der Like-Anzahl für jedes Buch
  const [currentPage, setCurrentPage] = useState<number>(1); // Zustand für die aktuelle Seite

  //Funktion zum Behandeln von Like-Klicks. Erhöht die Like-Anzahl für das Buch mit der gegebenen ID.
  const handleLikeClick = (bookId: string) => {
    setLikes(prevLikes => ({
      ...prevLikes,
      [bookId]: (prevLikes[bookId] || 0) + 1 // Inkrementiere die Like-Anzahl für das Buch mit der gegebenen ID
    }));
  };

  return (
    <BooksList
      minpage={minpage}
      maxpage={maxpage}
      likes={likes}
      onLikeClick={handleLikeClick}
      backgroundClass={maxpage === 300 ? 'Short-Story-Bookstore' : 'Novel-Bookstore'}
      initialPage={currentPage} // Übergeben der aktuellen Seite an die BooksList-Komponente
      onPageChange={setCurrentPage} // Funktion zum Aktualisieren der aktuellen Seite
    />
  );
};

export default BookListsContainer;
