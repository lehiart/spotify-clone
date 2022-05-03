import { useEffect, useState } from 'react';
import { useSiteContext } from '../context/context';
import useSpotify from './useSpotify';

function useSongInfo() {
  const spotifyAPI = useSpotify();
  const { currentSong, setCurrentSong } = useSiteContext();
  const [songInfo, setSongInfo] = useState(null);

  useEffect(() => {
    const fetchSongInfo = async () => {
      if (currentSong) {
        const trackInfo = await fetch(
          `https://api.spotify.com/v1/tracks/${currentSong}`,
          {
            headers: {
              Authorization: `Bearer ${spotifyAPI.getAccessToken()}`,
            },
          }
        ).then((res) => res.json());

        setSongInfo(trackInfo);
      }
    };

    fetchSongInfo();
  }, [currentSong, spotifyAPI]);

  return songInfo;
}

export default useSongInfo;
