import { createContext, useState, useEffect, useContext } from 'react';

const FavoritesContext = createContext();

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState(() => {
        try {
            const saved = localStorage.getItem('movieFavorites');
            return saved ? JSON.parse(saved) : [];
        } catch (e) {
            console.error("Failed to parse favorites from local storage", e);
            return [];
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem('movieFavorites', JSON.stringify(favorites));
        } catch (e) {
            console.error("Failed to save favorites to local storage", e);
        }
    }, [favorites]);

    const addFavorite = (movie) => {
        setFavorites((prev) => {
            if (prev.some((fav) => fav.imdbID === movie.imdbID)) return prev;
            return [...prev, movie];
        });
    };

    const removeFavorite = (id) => {
        setFavorites((prev) => prev.filter((movie) => movie.imdbID !== id));
    };

    const isFavorite = (id) => favorites.some((movie) => movie.imdbID === id);

    return (
        <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
};
