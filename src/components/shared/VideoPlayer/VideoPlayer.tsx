import React, { useRef, useEffect } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

export const VideoPlayer = (props: {
  options: any;
  onReady?: (player: any) => void;
}) => {
  const videoRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<any | null>(null);
  const { options, onReady } = props;

  useEffect(() => {
    if (videoRef.current) {
      if (!playerRef.current) {
        const videoElement = document.createElement("video-js");
        videoElement.classList.add("vjs-big-play-centered");
        videoRef.current.appendChild(videoElement);

        const player = (playerRef.current = videojs(
          videoElement,
          options,
          () => {
            videojs.log("player is ready");
            onReady?.(player);
          },
        ));
      } else {
        const player = playerRef.current;
        player.autoplay(options.autoplay);
        player.src(options.sources);
      }
    }
  }, [options]);

  useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, []);

  return (
    <div data-vjs-player style={{ width: "600px" }}>
      <div ref={videoRef} />
    </div>
  );
};

export default VideoPlayer;
