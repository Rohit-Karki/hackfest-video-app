import React from "react";
import { staticFile } from "remotion";
import { interpolate, Sequence, useCurrentFrame, Video } from "remotion";
const remapSpeed = (frame: number, speed: (fr: number) => number) => {
  let framesPassed = 0;
  for (let i = 0; i <= frame; i++) {
    framesPassed += speed(i);
  }
  return framesPassed;
};
export const AcceleratedVideo: React.FC<{ src: string }> = ({ src }) => {
  const frame = useCurrentFrame();
  const speedFunction = (f: number) => interpolate(f, [0, 400], [1, 8]);
  const remappedFrame = remapSpeed(frame, speedFunction);
  return (
    <Sequence from={frame}>
      <Video
        startFrom={Math.round(remappedFrame)}
        // endAt={400}
        playbackRate={speedFunction(frame)}
        src={staticFile(src)}
      />
    </Sequence>
  );
};
