import React, { createContext, useState, useContext } from 'react';

const FavoritesContext = createContext();

export const FavoritesProvider = ({children}) => {
  const [favorites, setFavorites] = useState([]);

  const addFavorite = (event) => {
    if (!favorites.find((fav) => fav.id === event.id)) {
      setFavorites([...favorites, event]);
    }
  };

  return (
    <FavoritesContext.Provider value={{favorites, addFavorite}}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);