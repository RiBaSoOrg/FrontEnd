import { Basket } from "../Interfaces/Basket";
import { Item } from "../Interfaces/Item";

const BASKET_URL: string = 'http://localhost:8081';

async function createBasket(userId: string): Promise<Basket> {
    const response = await fetch(`${BASKET_URL}/baskets?userId=${userId}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
}

async function addItem(basketID: string, itemID: string, amount: number): Promise<boolean> {
    const response = await fetch(`${BASKET_URL}/baskets/${basketID}/items?itemID=${itemID}&amount=${amount}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
}

async function getBasket(basketID: string): Promise<Basket> {
    const response = await fetch(`${BASKET_URL}/baskets/${basketID}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
}

async function removeBasket(basketID: string): Promise<boolean> {
    const response = await fetch(`${BASKET_URL}/baskets/${basketID}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
}

async function getTotalCosts(basketID: string): Promise<number> {
    const response = await fetch(`${BASKET_URL}/baskets/${basketID}/total-costs`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
}

async function getItem(basketID: string, itemID: string): Promise<Item> {
    const response = await fetch(`${BASKET_URL}/baskets/${basketID}/items/${itemID}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
}

async function removeItem(basketID: string, itemID: string, amount: number): Promise<boolean> {
    const response = await fetch(`${BASKET_URL}/baskets/${basketID}/items/${itemID}?amount=${amount}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
}

async function getBasketID(userID: string): Promise<string> {
    const response = await fetch(`${BASKET_URL}/baskets/user/${userID}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
}




export { createBasket, addItem, getBasket, removeBasket, getTotalCosts, getItem, removeItem, getBasketID }