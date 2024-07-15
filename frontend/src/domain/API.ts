// API.js
import { Book } from "./Book";


// Definiere den Typ für die Paginierungslinks
export type PaginationLinks = {
    first?: string;
    prev?: string;
    next?: string;
    last?: string;
};

// Basis-URL der API
const BASE_URL: string = 'http://localhost:4730';

// Funktion zum Anfordern aller Bücher mit Paginierung und Filterung nach Seitenanzahl
async function requestAllBooks(minpage: number, maxpage: number, page: number, limit: number): Promise<{ books: Book[], paginationLinks: PaginationLinks }> {
    try {
        const response = await fetch(`${BASE_URL}/books?_sort=numPages&_order=asc&numPages_gte=${minpage}&numPages_lte=${maxpage}&_page=${page}&_limit=${limit}`);
        const data = await response.json();
        const paginationLinks: PaginationLinks = parseLinkHeader(response.headers.get('Link'));
        return { books: data, paginationLinks };
    } catch (error) {
        console.error('Error fetching all books:', error);
        throw error;
    }
}

// Funktion zum Parsen des Link-Headers für die Paginierung
function parseLinkHeader(header: string | null): PaginationLinks {
    const links: PaginationLinks = {};
    if (header) {
        header.split(',').forEach((part) => {
            const section = part.split(';');
            if (section.length !== 2) {
                return;
            }
            const url = section[0].replace(/<(.*)>/, '$1').trim();
            const rel = section[1].replace(/rel="(.*)"/, '$1').trim();
            links[rel as keyof PaginationLinks] = url;
        });
    }
    return links;
}

// Funktion zum Anfordern eines Buches anhand seiner ID
async function requestBookByID(id: string) {
    try {
        const response: Response = await fetch(`${BASE_URL}/books/${id}`);
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
        const response: Response = await fetch(`${BASE_URL}/books`, {
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
        const response: Response = await fetch(`${BASE_URL}/books/${isbn}`, {
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
        const response: Response = await fetch(`${BASE_URL}/books/${isbn}`, {
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

// Funktion zum Einloggen eines Benutzers
async function loginUser(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
        const response = await fetch(`${BASE_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });
        if (!response.ok) {
            throw new Error('Login failed');
        }
        const data: LoginResponse = await response.json();
        console.log(data);
        // Speichere das Access Token im localStorage oder einem Zustandsmanagement-Store
        localStorage.setItem('accessToken', data.accessToken);
        return data;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
}

export { requestAllBooks, requestBookByID as requestBookByISBN, postNewBook, updateExistingBook, deleteBook, parseLinkHeader, loginUser };
