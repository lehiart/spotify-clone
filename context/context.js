import React, { createContext, useState, useContext } from 'react';

const SiteContext = createContext();

const SiteContextProvider = ({ children, initialValues = {} }) => {
  const [playlistId, setPlaylistId] = useState('37i9dQZF1DZ06evO4m87u0');
  const [playlist, setPlaylist] = useState(null);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  //   const toggleMenu = useCallback(() => {
  //     setIsMenuOpen((prevValue) => !prevValue);
  //     setIsRegistrationFormOpen(false);
  //   }, []);

  return (
    <SiteContext.Provider
      value={{
        playlistId,
        setPlaylistId,
        playlist,
        setPlaylist,
        currentSong,
        setCurrentSong,
        isPlaying,
        setIsPlaying,
      }}
    >
      {children}
    </SiteContext.Provider>
  );
};

function useSiteContext() {
  const context = useContext(SiteContext);
  if (context === undefined) {
    throw new Error('useSiteContext must be used within a SiteContextProvider');
  }

  return context;
}

export { SiteContextProvider, useSiteContext };
