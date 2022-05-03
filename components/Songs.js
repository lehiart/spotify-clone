import { useSiteContext } from '../context/context';
import Song from './Song';

const Songs = () => {
  const { playlist } = useSiteContext();

  return (
    <div className="flex flex-col space-y-1 px-8 pb-28 text-white">
      {playlist?.tracks.items.map((track, idx) => {
        return <Song key={track.track.id} track={track} order={idx} />;
      })}
    </div>
  );
};

export default Songs;
