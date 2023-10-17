import React, { useEffect, useRef, useState } from "react";
import { formatDuration, formatTimeAgo } from "../utils/helpers";
import Dot from "./Dot";

type VideoItemProps = {
  id: string;
  title: string;
  channel: {
    id: string;
    name: string;
    profileUrl: string;
  };
  views: number;
  postedAt: Date;
  duration: number;
  thumbnailUrl: string;
  videoUrl: string;
};

const VIEW_FORMATTER = Intl.NumberFormat(undefined, {
  notation: "compact",
});

const VideoCardItem = ({
  id,
  title,
  channel,
  duration,
  postedAt,
  thumbnailUrl,
  videoUrl,
  views,
}: VideoItemProps) => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current == null) return;

    if (isVideoPlaying) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }, [isVideoPlaying]);

  return (
    <div
      className="flex flex-col gap-2"
      onMouseEnter={() => setIsVideoPlaying(true)}
      onMouseLeave={() => setIsVideoPlaying(false)}
    >
      <a href={`/watch?v=${id}`} className="relative aspect-video">
        <img
          src={thumbnailUrl}
          alt={title}
          className={`h-full w-full object-cover transition-[border-radius] duration-200 ${
            isVideoPlaying ? "rounded-none" : "rounded-xl"
          }`}
        />
        <div className="absolute bottom-1 right-1 bg-secondary-dark text-gray-400 text-sm px-0.5 rounded">
          {formatDuration(duration)}
        </div>
        <video
          className={`block h-full object-cover absolute inset-0 transition-opacity delay-200 ${
            isVideoPlaying ? "opacity-100 duration-200" : "opacity-0"
          }`}
          src={videoUrl}
          ref={videoRef}
          muted
          playsInline
        />
      </a>
      <div className="flex gap-2">
        <a href={`/@${channel.id}`} className="flex-shrink-0">
          <img
            src={channel.profileUrl}
            alt={channel.name}
            className="w-12 h-12 rounded-full"
          />
        </a>
        <div className="flex flex-col">
          <a href={`/watch?v=${id}`} className="font-bold">
            {title}
          </a>
          <a href={`/@${channel.id}`} className="text-gray-400 text-sm">
            {channel.name}
          </a>
          <div className="text-gray-400 text-sm">
            {VIEW_FORMATTER.format(views)} Views <Dot />{" "}
            {formatTimeAgo(postedAt)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCardItem;
