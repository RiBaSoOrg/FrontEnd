// hooks.ts
import { useState, useEffect, useCallback } from 'react';
import { requestAllBooks, PaginationLinks } from '../APIs/BookAPI';
import { Book } from '../Interfaces/Book';
import { useLocation } from 'react-router-dom';


type FetchState = 'initial' | 'loading' | 'success' | 'error';

const useBooks = (minPage: number, maxPage: number) => {
    // State: aktuell verfügbare Bücher oder ein leeres Array, bis die Serverantwort geladen wurde
    const [books, setBooks] = useState<Book[]>([]);
    // State: zum Speichern des aktuellen Abrufstatus
    const [state, setState] = useState<FetchState>('initial');
    // State: zum Speichern aller Fehler, die während des Abrufs auftreten
    const [error, setError] = useState<Error | null>(null);
    const location = useLocation();

    // Funktion zum Abrufen von Büchern von der API
    const fetchBooks = useCallback(async (minpage: number, maxpage: number) => {
        // State als geladen setzen, bevor der Abruf gestartet wird
        setState('loading');
        // Alle vorherigen Fehler zurücksetzen
        setError(null);

        try {
            // Hole die Bücher von der API
            const { books: fetchedBooks} = await requestAllBooks(minpage, maxpage);
            // Aktualisiere den Buchstatus mit den abgerufenen Daten
            setBooks(fetchedBooks);
            // State nach dem Abruf auf Erfolg setzen
            setState('success');
        } catch (err) {
            // Wenn ein Fehler auftritt, Fehlerstatus setzen
            setError(err as Error);
            setState('error');
        }
    }, []);

    // Um Bücher alle 60 sec abzurufen
    useEffect(() => {
        fetchBooks(minPage, maxPage);
        const interval = setInterval(() => {
            fetchBooks(minPage, maxPage);
        }, 60000);

        return () => clearInterval(interval);
    }, [minPage, maxPage, fetchBooks]);
    // Reagiert auf Änderungen in der Route
    useEffect(() => {
        fetchBooks(minPage, maxPage); // Lade Bücher erneut, wenn die Route sich ändert
    }, [location.pathname]); // Reagiere nur auf Änderungen des Pfades


    
    return { books, state, error};
}

export default useBooks;
