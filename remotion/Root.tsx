import { Composition } from "remotion";
import { Main } from "./MyComp/Main";
import {
  COMP_NAME,
  defaultMyCompProps,
  DURATION_IN_FRAMES,
  VIDEO_FPS,
  VIDEO_HEIGHT,
  VIDEO_WIDTH,
} from "../types/constants";
import { MapComp } from "./MyComp/utils/MapRoute";
import { NextLogo } from "./MyComp/NextLogo";
import { MyTitleComponent } from "./MyComp/MyTitleComponent";
import EndCredits from "./MyComp/EndCredits/EndCredits";
import { TypeWriter } from "./MyComp/Typewriter";
import { Gradient } from "./MyComp/Gradient";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id={COMP_NAME}
        component={Main}
        durationInFrames={DURATION_IN_FRAMES}
        fps={VIDEO_FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
        defaultProps={defaultMyCompProps}
      />
      <Composition
        id="YaknadYetiLogo"
        component={NextLogo}
        durationInFrames={200}
        fps={30}
        width={140}
        height={140}
        defaultProps={{
          outProgress: 0,
        }}
      />
      {/* <Composition
        id="titles"
        component={MyTitleComponent}
        durationInFrames={100}
        fps={VIDEO_FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
      /> */}
      <Composition
        id="endcredits"
        component={EndCredits}
        durationInFrames={100}
        fps={VIDEO_FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
      />
      <Composition
        id="typewriter"
        component={TypeWriter}
        durationInFrames={100}
        fps={VIDEO_FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
      />
      <Composition
        id="gradient"
        component={Gradient}
        durationInFrames={100}
        fps={VIDEO_FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
      />
      <Composition
        id="mmm"
        component={MapComp}
        durationInFrames={400}
        fps={30}
        width={1280}
        height={720}
      />
    </>
  );
};
