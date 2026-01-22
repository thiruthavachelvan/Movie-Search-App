const API_KEY = 'f44f6f9c';
const BASE_URL = 'https://www.omdbapi.com/';

export const searchMovies = async (query, page = 1, type = '') => {
    // Ensure query is provided
    if (!query) return { Response: "False", Error: "No query provided" };

    try {
        const url = `${BASE_URL}?s=${encodeURIComponent(query)}&page=${page}&type=${type}&apikey=${API_KEY}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("API Fetch Error:", error);
        return { Response: "False", Error: error.message };
    }
};

export const getMovieDetails = async (id) => {
    try {
        const url = `${BASE_URL}?i=${id}&plot=full&apikey=${API_KEY}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("API Fetch Error:", error);
        return { Response: "False", Error: error.message };
    }
};
