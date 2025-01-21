import { useMediaQuery } from '@chakra-ui/react';
import React from 'react';
import YouTube, { YouTubeProps } from 'react-youtube';

interface YouTubePlayerProps {
  videoUrl: string;
}

const YouTubePlayer: React.FC<YouTubePlayerProps> = ({ videoUrl }) => {
  const [isLargerThan840] = useMediaQuery('(min-width: 840px)');

  const height = isLargerThan840 ? '400' : '200';
  const width = isLargerThan840 ? '640' : '320';

  const videoId = videoUrl.split('=')[1].split('&')[0];

  const opts: YouTubeProps['opts'] = {
    height: height,
    width: width,
    playerVars: {
      autoplay: 0,
    },
  };

  return (
    <div>
      <YouTube videoId={videoId} opts={opts} />
    </div>
  );
};

export default YouTubePlayer;
