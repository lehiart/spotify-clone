import {
  FastForwardIcon,
  ReplyIcon,
  SwitchHorizontalIcon,
  VolumeOffIcon,
} from '@heroicons/react/outline';
import {
  PlayIcon,
  RewindIcon,
  PauseIcon,
  VolumeUpIcon,
} from '@heroicons/react/solid';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useSiteContext } from '../context/context';
import useSongInfo from '../hooks/useSongInfo';
import useSpotify from '../hooks/useSpotify';

const Player = () => {
  const spotifyAPI = useSpotify();
  const { data: session, status } = useSession();
  const { currentSong, isPlaying, setCurrentSong, setIsPlaying } =
    useSiteContext();
  const [volume, setVolume] = useState(50);

  const songInfo = useSongInfo();

  const fetchCurrentSong = () => {
    if (!songInfo) {
      spotifyAPI.getMyCurrentPlayingTrack().then((data) => {
        setCurrentSong(data.body?.item?.id);

        spotifyAPI.getMyCurrentPlaybackState().then((data) => {
          setIsPlaying(data.body?.is_playing);
        });
      });
    }
  };

  useEffect(() => {
    if (spotifyAPI.getAccessToken() && !currentSong) {
      fetchCurrentSong();
      setVolume(50);
    }
  }, [currentSong, spotifyAPI, session]);

  const handlePlayPause = () => {
    spotifyAPI.getMyCurrentPlaybackState().then((data) => {
      if (data.body.is_playing) {
        spotifyAPI.pause();
        setIsPlaying(false);
      } else {
        spotifyAPI.play();
        setIsPlaying(true);
      }
    });
  };

  useEffect(() => {
    //TODO add debounce
    if (volume > 0 && volume < 100) {
      spotifyAPI.setVolume(volume);
    }
  }, [volume]);

  return (
    <div className="grid h-24 grid-cols-3 bg-gradient-to-b from-black to-gray-900 px-2 text-xs text-white md:px-8 md:text-base">
      {/* {left} */}
      <div className="flex items-center space-x-4">
        <img
          className="hidden h-10 w-10 md:inline"
          src={songInfo?.album.images?.[0]?.url}
          alt="Song info"
        />
        <div>
          <h3>{songInfo?.name}</h3>
          <p>{songInfo?.artists?.[0]?.name}</p>
        </div>
      </div>

      {/* {center} */}
      <div className="flex items-center justify-evenly">
        <SwitchHorizontalIcon className="h-5 w-5 transform cursor-pointer transition duration-100 ease-out hover:scale-125" />
        <RewindIcon className="h-5 w-5 transform cursor-pointer transition duration-100 ease-out hover:scale-125" />

        {isPlaying ? (
          <PauseIcon
            onClick={() => handlePlayPause()}
            className="h-10 w-10 transform cursor-pointer transition duration-100 ease-out hover:scale-125"
          />
        ) : (
          <PlayIcon className="h-10 w-10 transform cursor-pointer transition duration-100 ease-out hover:scale-125" />
        )}

        <FastForwardIcon className="h-5 w-5 transform cursor-pointer transition duration-100 ease-out hover:scale-125" />
        <ReplyIcon className="h-5 w-5 transform cursor-pointer transition duration-100 ease-out hover:scale-125" />
      </div>

      {/* {right} */}
      <div className="flex items-center justify-end space-x-3 pr-5 md:space-x-4">
        <VolumeOffIcon
          onClick={() => volume > 0 && setVolume(volume - 10)}
          className="h-5 w-5 transform cursor-pointer transition duration-100 ease-out hover:scale-125"
        />
        <input
          className="w-14 md:w-28"
          type="range"
          value={volume}
          min={0}
          max={100}
          onChange={(e) => setVolume(Number(e.target.value))}
        />
        <VolumeUpIcon
          onClick={() => volume < 100 && setVolume(volume + 10)}
          className="h-5 w-5 transform cursor-pointer transition duration-100 ease-out hover:scale-125"
        />
      </div>
    </div>
  );
};

export default Player;
