import { useSession, signIn } from 'next-auth/react';
import { useEffect } from 'react';
import spotifyAPI from '../utils/spotify';

function useSpotify() {
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      // if refresh acces token attep fails, direct user to login
      if (session.error === 'RefreshAccessTokenError') {
        signIn();
      }

      spotifyAPI.setAccessToken(session?.user.accessToken);
    }
  }, [session]);

  return spotifyAPI;
}

export default useSpotify;
