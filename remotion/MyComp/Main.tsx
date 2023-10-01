import React, { useMemo } from "react";
import { z } from "zod";
import {
  AbsoluteFill,
  interpolate,
  OffthreadVideo,
  Video,
  Audio,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  Series,
} from "remotion";
import { CompositionProps } from "../../types/constants";
import { NextLogo } from "./NextLogo";
import { MapComp } from "./utils/MapRoute";
import { loadFont, fontFamily } from "@remotion/google-fonts/Inter";
import { Rings } from "./Rings";
import { TextFade } from "./TextFade";
import { MyTitleComponent } from "./MyTitleComponent";
import EndCredits from "./EndCredits/EndCredits";
import { Gradient } from "./Gradient";
import { TypeWriter } from "./Typewriter";
import { Howto } from "./Howto";
import { Transition } from "./utils/Transition";
import { BestQualities } from "./BestQualities";
import { Pricing } from "./Pricing";
import { Reviews } from "./Reviews";
import { AcceleratedVideo } from "./AcceleratedVideo";
import FirstVideo from "./TextsInsideVideo.tsx/FirstVideo";

loadFont();

const container: React.CSSProperties = {
  backgroundColor: "white",
};

const logo: React.CSSProperties = {
  justifyContent: "center",
  alignItems: "center",
};

export const Main = ({ title }: z.infer<typeof CompositionProps>) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const transitionStart = 2 * fps;
  const transitionDuration = 1 * fps;

  const logoOut = spring({
    fps,
    frame,
    config: {
      damping: 200,
    },
    durationInFrames: transitionDuration,
    delay: transitionStart,
  });

  const titleStyle: React.CSSProperties = useMemo(() => {
    return { fontFamily, fontSize: 120, color: "white" };
  }, []);

  return (
    <AbsoluteFill style={container}>
      <Audio volume={0.1} src={staticFile("floating-abstract-142819.mp3")} />
      <Series>
        <Series.Sequence durationInFrames={100}>
          <Transition type="out">
            <AbsoluteFill>
              <Rings outProgress={logoOut} />
              <AbsoluteFill style={logo}>
                <NextLogo outProgress={logoOut}></NextLogo>
              </AbsoluteFill>
            </AbsoluteFill>
          </Transition>
        </Series.Sequence>

        <Series.Sequence durationInFrames={200}>
          <Transition type="out">
            <AbsoluteFill>
              <AcceleratedVideo src="drone_video.mp4" />
            </AbsoluteFill>
          </Transition>
        </Series.Sequence>

        <Series.Sequence durationInFrames={230}>
          <Transition type="out">
            <Audio src={staticFile("Welcome_to_Yak_a_1.wav")} />
            <TypeWriter />
          </Transition>
        </Series.Sequence>
        <Series.Sequence durationInFrames={125}>
          <Gradient />
        </Series.Sequence>
        {/* <Series.Sequence durationInFrames={400}>
          <Series.Sequence durationInFrames={60}>
            <TextFade>
                  <h1 style={titleStyle}>{title}</h1>
                </TextFade>
            <Audio src={staticFile("Let-s_embark_on_2.wav")} />

            <MapComp />
          </Series.Sequence>
        </Series.Sequence> */}

        <Series.Sequence durationInFrames={500}>
          <Transition type="out">
            <AbsoluteFill>
              <Audio src={staticFile("Welcome_to_a_wor_1.wav")} />
              <AbsoluteFill>
                <FirstVideo />
              </AbsoluteFill>
              <Video
                playbackRate={2.5}
                src={staticFile("Starbucks_westlink_with_background.mp4")}
                endAt={600}
              />
            </AbsoluteFill>
          </Transition>
        </Series.Sequence>
        <Series.Sequence durationInFrames={400}>
          <AbsoluteFill>
            <Transition type="in">
              <Audio src={staticFile(`Experience_the_p_1.wav`)} />
              <OffthreadVideo
                playbackRate={0.8}
                volume={(f) =>
                  interpolate(f, [0, 100], [0, 1], { extrapolateLeft: "clamp" })
                }
                src={staticFile("Upstairs_Master_with_background.mp4")}
              />
            </Transition>
          </AbsoluteFill>
        </Series.Sequence>

        <Series.Sequence durationInFrames={150}>
          <Transition type="out">
            <BestQualities />
          </Transition>
        </Series.Sequence>

        <Series.Sequence durationInFrames={200}>
          <Transition type="out">
            <Audio src={staticFile("Indulge_in_a_cul_1.wav")} />
            <Video
              endAt={200}
              src={staticFile("Dgnautryjgr_with_background.mp4")}
            />
          </Transition>
        </Series.Sequence>

        {/* <Series.Sequence durationInFrames={100}>
          <Transition type="out">
            <MyTitleComponent titl=e="" />
          </Transition>
        </Series.Sequence> */}
        <Series.Sequence durationInFrames={480}>
          <Transition type="out">
            <Pricing />
          </Transition>
        </Series.Sequence>
        <Series.Sequence durationInFrames={200}>
          <Transition type="in">
            <Reviews />
          </Transition>
        </Series.Sequence>
        <Series.Sequence durationInFrames={200}>
          <EndCredits />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
