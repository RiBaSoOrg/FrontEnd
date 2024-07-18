import {keycloak} from "../../keycloak";
import { Address, User } from "../Interfaces/User";

const USER_URL: string = 'http://localhost:8083';



async function createUser(user: User) {
    const token = keycloak.token;
    console.log('Token in API '+ token)
    try {
        const response = await fetch(`${USER_URL}/user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(user),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data: User = await response.json();
        return data;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
}

async function getUser(): Promise<User | null> {
    const token = keycloak.token;
    console.log('Token in getUser', token);

    try {
        const response = await fetch(`${USER_URL}/user`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            if (response.status === 404) {
                return null; // Benutzer existiert nicht
            }
            if (response.status === 409) {
                throw new Error('User already exists');
            }
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data: User = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
}

async function updateUserData(firstname: string, lastname: string) {
    const token = keycloak.token;
    console.log('Token in API '+ token)
    try {
        const response = await fetch(`${USER_URL}/user/userData?firstname=${firstname}&lastname=${lastname}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    } catch (error) {
        console.error('Error updating user data:', error);
        throw error;
    }
}

async function updateShippingAddress(address: Address) {
    const token = keycloak.token;
    console.log('Token in API '+ token)
    try {
        const response = await fetch(`${USER_URL}/user/shippingData`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(address),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    } catch (error) {
        console.error('Error updating shipping address:', error);
        throw error;
    }
}

async function updateBillingAddress(address: Address) {
    const token = keycloak.token;
    console.log('Token in API '+ token)
    try {
        const response = await fetch(`${USER_URL}/user/billingData`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(address),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    } catch (error) {
        console.error('Error updating billing address:', error);
        throw error;
    }
}

async function deleteUser(userId: string) {
    const token = keycloak.token;
    console.log('Token in API '+ token)
    try {
        const response = await fetch(`${USER_URL}/user/${userId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
}
export { createUser,getUser,updateUserData,updateBillingAddress,updateShippingAddress,deleteUser};