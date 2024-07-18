import React, { useState } from 'react';
import BooksList from './BooksList';

interface BookListsContainerProps {
  minpage: 0 | 301// Minimalwert der Seitenanzahl für Bücher (0 für Shortstories, 301 für Novels)
  maxpage: 300 | 999999; // Maximalwert der Seitenanzahl für Bücher (300 für Shortstories, sehr hoher Wert für Novels)
}

const BookListsContainer: React.FC<BookListsContainerProps> = ({ minpage , maxpage }) => {
  const [currentPage, setCurrentPage] = useState<number>(1); // Zustand für die aktuelle Seite


  return (
    <BooksList
      minpage={minpage}
      maxpage={maxpage}
      backgroundClass={maxpage === 300 ? 'Short-Story-Bookstore' : 'Novel-Bookstore'}
      initialPage={currentPage} // Übergeben der aktuellen Seite an die BooksList-Komponente
      onPageChange={setCurrentPage} // Funktion zum Aktualisieren der aktuellen Seite
    />
  );
};

export default BookListsContainer;
