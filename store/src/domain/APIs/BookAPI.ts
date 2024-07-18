// API.js
import {keycloak} from "../../keycloak";
import { Book } from "../Interfaces/Book";


// Basis-URL der API
const BOOKMONKEY_URL: string = 'http://localhost:4730';
const BOOK_URL: string = 'http://localhost:8084';


const CHECKOUT_URL: string = 'http://localhost:8082';

// Funktion zum Anfordern aller Bücher mit Paginierung und Filterung nach Seitenanzahl

async function requestAllBooks(minpage: number, maxpage: number): Promise<{ books: Book[]}> {
    const token = keycloak.token;
    try {
        const response = await fetch(`${BOOK_URL}/books?minPages=${minpage}&maxPages=${maxpage}&_sort=numPages&_order=asc`, {
            method: 'GET',
            headers: {
                 'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        if (!Array.isArray(data)) {
            throw new Error('Data format is incorrect');
        }
        return { books: data};

    } catch (error) {
        console.error('Error fetching all books:', error);
        throw error;
    }
}

// Funktion zum Anfordern eines Buches anhand seiner ID
async function requestBookByID(id: string) {
    const token = keycloak.token;
    try {
        const response: Response = await fetch(`${BOOK_URL}/books/${id}`);
        const data: Book = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching book by ISBN:', error);
        throw error;
    }
}

// Funktion zum Hinzufügen eines neuen Buches
async function postNewBook(bookData: Book) {
    const token = keycloak.token;
    try {
        const response: Response = await fetch(`${BOOK_URL}/books`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookData),
        });
        // Überprüfe, ob die Antwort erfolgreich war
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    } catch (error) {
        console.error('Error posting new book:', error);
        throw error;
    }
}

// Funktion zum Aktualisieren eines bestehenden Buches
async function updateExistingBook(isbn: string, updatedBookData: Book) {
    const token = keycloak.token;
    try {
        const response: Response = await fetch(`${BOOK_URL}/books/${isbn}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedBookData),
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const getResponse: Response = await fetch(`${BOOK_URL}/books/${isbn}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,  // Füge das Token hinzu, falls erforderlich
            },
        });
        if (!getResponse.ok) {
            throw new Error(`HTTP error! Status: ${getResponse.status}`);
        }
        const updatedBook: Book = await getResponse.json();
        return updatedBook;
    } catch (error) {
        console.error('Error updating existing book:', error);
        throw error;
    }
}

// Funktion zum Löschen eines Buches
async function deleteBook(isbn: string) {
    const token = keycloak.token;
    try {
        const response: Response = await fetch(`${BOOK_URL}/books/${isbn}`, {
            method: 'DELETE',
        });
        const data: Book = await response.json();
        return data;
    } catch (error) {
        console.error('Error deleting book:', error);
        throw error;
    }
}



export { requestAllBooks, requestBookByID as requestBookByISBN, postNewBook, updateExistingBook, deleteBook};
