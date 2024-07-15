// src/router.tsx
import { createBrowserRouter, RouteObject } from "react-router-dom";
import App from "./App";
import BookListsContainer from './components/BooksListsContainer';
import AddBookScreen from './components/AddBookScreen/AddBookScreen';
import AboutScreen from './components/AboutScreen/AboutScreen';
import ErrorScreen from './components/ErrorScreen/ErrorScreen';
import DetailBookScreen from './components/DetailBookScreen/DetailBookScreen';
import EditBookScreen from "./components/EditBookScreen/EditBookScreen";
import LoginScreen from './components/LoginScreen/LoginScreen';
import RequireAuth from './components/RequireAuth';
import ThankYouPage from './components/ThankYouPage/ThankYouPage';
import WelcomeScreen from './components/WelcomeScreen/WelcomeScreen';
import Redirect from './components/Redirect';

// Definiere die geschützten Routen, die Authentifizierung erfordern
const protectedRoutes: RouteObject[] = [
  {
    path: "add-book",
    element: <AddBookScreen />,
    errorElement: <ErrorScreen />,
  },
  {
    path: "edit-book/:id",
    element: <EditBookScreen />,
    errorElement: <ErrorScreen />,
  }
];

// Erstelle den Haupt-Router
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Hauptkomponente der App
    errorElement: <ErrorScreen />, // Fehlerseite
    children: [
      {
        index: true,
        element: <Redirect />   // Verwenden der Redirect-Komponente
      },
      {
        path: "login",
        element: <LoginScreen />
      },
      {
        path: "about",
        element: <AboutScreen />,
        errorElement: <ErrorScreen />,
      },
      {
        path: "",
        element: <RequireAuth />, // Komponente zum Schutz der Routen
        children: protectedRoutes // Geschützte Routen als Kinder
      },
      {
        path: "novel-bookstore",
        element: <BookListsContainer minpage={301} maxpage={9999999999} />,
        errorElement: <ErrorScreen />,
      },
      {
        path: "shortstory-bookstore",
        element: <BookListsContainer minpage={0} maxpage={300} />,
        errorElement: <ErrorScreen />,
      },
      {
        path: "detail-book/:id",
        element: <DetailBookScreen />,
        errorElement: <ErrorScreen />,
      },
      {
        path: "thank-you",
        element: <ThankYouPage />,
        errorElement: <ErrorScreen />,
      },
      {
        path: "welcome",
        element: <WelcomeScreen />,
        errorElement: <ErrorScreen />,
      }
    ]
  }
]);

export default router;
