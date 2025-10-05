const fetchWithAuth = async (url, options = {}) => {

    const API_URL = process.env.VITE_BASE_URL
    const token = localStorage.getItem('token');

    const config = {
        headers: {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }),
            ...options.headers,
        },
        ...options,
    };

    if (options.body && typeof options.body === 'object') {
        config.body = JSON.stringify(options.body);
    }

    const response = await fetch(`${API_URL}${url}`, config);

    if (!response.ok) {
        const error = await response.json().catch(() => ({ error: 'Error de red' }));
        throw new Error(error.error || `HTTP error! status: ${response.status}`);
    }

    return response.json();
};

export const authAPI = {
    register: (userData) => fetchWithAuth('/register/createPerson', {
        method: 'POST',
        body: userData,
    }),

    login: (credentials) => fetchWithAuth('/register/login', {
        method: 'POST',
        body: credentials,
    }),

    getProfile: () => fetchWithAuth('/person/getPerson/:id', {
        method: 'GET',
    }),
};

export default fetchWithAuth;