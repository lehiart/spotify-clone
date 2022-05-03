import { ChevronDownIcon } from '@heroicons/react/outline';
import { useSession, signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useSiteContext } from '../context/context';
import useSpotify from '../hooks/useSpotify';
import Songs from './Songs';

const colors = [
  'from-pink-500',
  'from-purple-500',
  'from-yellow-500',
  'from-red-500',
  'from-indigo-500',
  'from-blue-500',
  'from-green-500',
];

const Center = () => {
  const { data: session } = useSession();
  const spotifyAPI = useSpotify();
  const [color, setColor] = useState(null);
  const { playlistId, setPlaylistId, playlist, setPlaylist } = useSiteContext();

  useEffect(() => {
    const random = Math.floor(Math.random() * colors.length);

    setColor(colors[random]);
  }, [playlistId]);

  useEffect(() => {
    spotifyAPI
      .getPlaylist(playlistId)
      .then((data) => {
        setPlaylist(data.body);
      })
      .catch((error) => console.error('something went wrong', error));
  }, [spotifyAPI, playlistId]);

  return (
    <div className="h-screen flex-grow overflow-y-scroll scrollbar-hide">
      <header className="absolute top-5 right-8">
        <div
          onClick={signOut}
          className="flex cursor-pointer items-center space-x-3 rounded-full bg-black p-1 pr-2 text-white opacity-90 hover:opacity-80"
        >
          <img
            className="h-10 w-10 rounded-full"
            src={session?.user.image}
            alt=""
          />
          <h2>{session?.user.name}</h2>
          <ChevronDownIcon className="mr-2 h-5 w-5" />
        </div>
      </header>
      <section
        className={`flex h-80 items-end space-x-7 bg-gradient-to-b ${color} to-black p-8 text-white`}
      >
        <img
          className="h-44 w-44 shadow-2xl"
          src={playlist?.images?.[0]?.url}
          alt="album cover"
        />
        <div>
          <p>PLAYLIST</p>
          <h1 className="text-2xl font-bold md:text-3xl xl:text-5xl">
            {playlist?.name}
          </h1>
        </div>
      </section>
      <div>
        <Songs />
      </div>
    </div>
  );
};

export default Center;
