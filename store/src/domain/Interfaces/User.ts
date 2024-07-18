interface Address {
    firstname: string;
    lastname: string;
    street: string;
    houseNumber: string;
    postalCode: string;
    state: string;
    city: string;
}

interface User {
    id: string;
    firstname: string;
    lastname: string;
    billingAddress: Address;
    shippingAddress: Address;
}

export type {User,Address}