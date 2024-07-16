// src/router.tsx
import { createBrowserRouter, RouteObject } from "react-router-dom";
import App from "./App";
import BookListsContainer from './components/BooksList/BooksListsContainer';
import AddBookScreen from './components/AddBookScreen/AddBookScreen';
import AboutScreen from './components/AboutPage/AboutScreen';
import ErrorScreen from './components/ErrorScreen/ErrorScreen';
import DetailBookScreen from './components/DetailBookScreen/DetailBookScreen';
import EditBookScreen from "./components/EditBookScreen/EditBookScreen";
import RequireAuth from './components/RequireAuth';
import ThankYouPage from './components/ThankYouPage/ThankYouPage';
import WelcomeScreen from './components/WelcomePage/WelcomeScreen';
import Redirect from './components/Redirect';
import ShopPage from "./components/ShopPage/shopPage";
import LoginScreen from "./components/LoginScreen/LoginScreen";
import OrderPage from "./components/OderPage/OrderPage";
import Cart from "./components/CartPage/Cart";

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
        path: "shop",
        element: <ShopPage />
      },
      {
        path: "login",
        element: <LoginScreen />
      },
      {
        path: "order",
        element: <OrderPage/>
      },
      {
        path: "cart",
        element: <Cart onClose={function(): void {
            throw new Error("Function not implemented.");
        } }/>
      },
      {
        path: "detail-book/:id",
        element: <DetailBookScreen />,
        errorElement: <ErrorScreen />,
      },
      {
        path: "about",
        element: <AboutScreen />,
        errorElement: <ErrorScreen />,
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
        path: "thank-you",
        element: <ThankYouPage />,
        errorElement: <ErrorScreen />,
      },
      {
        path: "welcome",
        element: <WelcomeScreen />,
        errorElement: <ErrorScreen />,
      },
      {
        path: "",
        element: <RequireAuth />, // Komponente zum Schutz der Routen
        children: protectedRoutes // Geschützte Routen als Kinder
      }
    ]
  }
]);

export default router;
