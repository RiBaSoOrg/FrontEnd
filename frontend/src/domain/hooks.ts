// hooks.ts
import { useState, useEffect, useCallback } from 'react';
import { requestAllBooks, PaginationLinks } from './API';
import { Book } from './Book';
import { useLocation } from 'react-router-dom';


type FetchState = 'initial' | 'loading' | 'success' | 'error';

const useBooks = (minPage: number, maxPage: number) => {
    // State: aktuell verfügbare Bücher oder ein leeres Array, bis die Serverantwort geladen wurde
    const [books, setBooks] = useState<Book[]>([]);
    // State: zum Speichern des aktuellen Abrufstatus
    const [state, setState] = useState<FetchState>('initial');
    // State: zum Speichern aller Fehler, die während des Abrufs auftreten
    const [error, setError] = useState<Error | null>(null);
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [paginationLinks, setPaginationLinks] = useState<PaginationLinks>({});
    const location = useLocation();

    // Funktion zum Abrufen von Büchern von der API
    const fetchBooks = useCallback(async (minpage: number, maxpage: number, pageNumber: number) => {
        // State als geladen setzen, bevor der Abruf gestartet wird
        setState('loading');
        // Alle vorherigen Fehler zurücksetzen
        setError(null);

        try {
            // Hole die Bücher von der API
            const { books: fetchedBooks, paginationLinks: fetchedPaginationLinks } = await requestAllBooks(minpage, maxpage, pageNumber, 10);
            // Aktualisiere den Buchstatus mit den abgerufenen Daten
            setBooks(fetchedBooks);
            setPaginationLinks(fetchedPaginationLinks);
            setPage(pageNumber);

            if (fetchedPaginationLinks.last) {
                const lastPageNumber = parseInt(fetchedPaginationLinks.last.split('_page=')[1], 10);
                setTotalPages(lastPageNumber);
            }
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
        fetchBooks(minPage, maxPage, page);
        const interval = setInterval(() => {
            fetchBooks(minPage, maxPage, page);
        }, 60000);

        return () => clearInterval(interval);
    }, [minPage, maxPage, page, fetchBooks]);
    // Reagiert auf Änderungen in der Route
    useEffect(() => {
        fetchBooks(minPage, maxPage, 1); // Lade Bücher erneut, wenn die Route sich ändert
    }, [location.pathname]); // Reagiere nur auf Änderungen des Pfades


    const goToNextPage = () => paginationLinks.next && fetchBooks(minPage, maxPage, parseInt(paginationLinks.next.split('_page=')[1], 10));
    const goToPreviousPage = () => paginationLinks.prev && fetchBooks(minPage, maxPage, parseInt(paginationLinks.prev.split('_page=')[1], 10));
    const goToFirstPage = () => paginationLinks.first && fetchBooks(minPage, maxPage, parseInt(paginationLinks.first.split('_page=')[1], 10));
    const goToLastPage = () => paginationLinks.last && fetchBooks(minPage, maxPage, parseInt(paginationLinks.last.split('_page=')[1], 10));

    return { books, state, error, page, totalPages, goToNextPage, goToPreviousPage, goToFirstPage, goToLastPage };
}

export default useBooks;
