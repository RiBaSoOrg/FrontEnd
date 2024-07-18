// API.js
import { Book } from "../Interfaces/Book";


// Basis-URL der API
const BOOKMONKEY_URL: string = 'http://localhost:4730';
const BOOK_URL: string = 'http://localhost:8084';


const CHECKOUT_URL: string = 'http://localhost:8082';

// Funktion zum Anfordern aller Bücher mit Paginierung und Filterung nach Seitenanzahl

async function requestAllBooks(minpage: number, maxpage: number): Promise<{ books: Book[]}> {
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
    try {
        const response: Response = await fetch(`${BOOK_URL}/books`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookData),
        });
        const data: Book = await response.json();
        return data;
    } catch (error) {
        console.error('Error posting new book:', error);
        throw error;
    }
}

// Funktion zum Aktualisieren eines bestehenden Buches
async function updateExistingBook(isbn: string, updatedBookData: Book) {
    try {
        const response: Response = await fetch(`${BOOK_URL}/books/${isbn}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedBookData),
        });
        const data: Book = await response.json();
        return data;
    } catch (error) {
        console.error('Error updating existing book:', error);
        throw error;
    }
}

// Funktion zum Löschen eines Buches
async function deleteBook(isbn: string) {
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

// Interface für Login-Credentials
interface LoginCredentials {
    email: string;
    password: string;
}

// Interface für Benutzerinformationen
interface User {
    email: string;
    password: string; // Hash-Passwort 
    id: number;
    role: string;
}
// Interface für die Login-Antwort
interface LoginResponse {
    accessToken: string;
    user: User;
}





export { requestAllBooks, requestBookByID as requestBookByISBN, postNewBook, updateExistingBook, deleteBook};
