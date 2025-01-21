import React from 'react';
import YouTube, { YouTubeProps } from 'react-youtube';

interface YouTubePlayerProps {
  videoUrl: string;
}

const YouTubePlayer: React.FC<YouTubePlayerProps> = ({ videoUrl }) => {
  const isShortUrl = videoUrl.includes('shorts');

  const videoId = isShortUrl
    ? videoUrl.split('/')[4]
    : videoUrl.split('=')[1].split('&')[0];

  const opts: YouTubeProps['opts'] = {
    playerVars: {
      autoplay: 0,
      rel: 0,
    },
  };

  return (
    <div>
     <YouTube videoId={videoId} opts={opts} />
    </div>
  );
};

export default YouTubePlayer;
