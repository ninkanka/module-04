export const PATHS = {
    home: '/',
    login: '/auth/login',
    register: '/auth/register',
    contact: '/contact',
    cart: '/checkout',
    favorites: '/account/favorites',
};

export const LANGUAGES = ['DE', 'FR', 'NL', 'TR'];

export const USERS = {
    valid: {
        email: 'customer@practicesoftwaretesting.com',
        password: 'welcome01',
    },

    newUser: {
        firstName: 'Nina',
        lastName: 'Nina',
        dateOfBirth: '2001-12-12',
        street: 'Wieniawskiego',
        postalCode: '33-333',
        houseNumber: '12',
        city: 'Leszno',
        state: 'świętokrzyskie',
        country: 'Poland',
        phone: '555111555',
        email: `nina.${Date.now()}@gmail.com`,
        password: 'passPass1=',
    },
};

export const BUTTONS = {
    addToCart: 'add-to-cart',
    addToFavorites: 'add-to-favorites',
    compare: 'add-to-compare',
};

export const SEARCH_TERMS = [
    'Combination Pliers',
    'Bolt Cutters',
    'Hammer',
    'Claw Hammer',
    'Thor Hammer',
];

export const FILTERS = [
    { category: 'Hand Tools', brand: 'ForgeFlex Tools' },
    { category: 'Power Tools', brand: 'MightyCraft Hardware' },
];

export const SORT = {
    category: 'Power Tools',
    option: 'Price (Low - High)',
};

export const CONTACT = {
    firstName: 'Ola',
    lastName: 'Nowak',
    email: 'aaa@gmail.com',
    subject: 'Customer service',
    message: 'Hello! Where is my hummer? My order number is 208 from 12.12.2025, please will contact with me',
};
