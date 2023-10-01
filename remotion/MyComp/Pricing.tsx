import React from "react";
import {
  AbsoluteFill,
  Audio,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import styled from "styled-components";
import { PricingLeft } from "./PricingLeft";
import { PricingRight } from "./PricingRight";

const Container = styled.div`
  flex: 1;
  background-color: white;
`;

export const Pricing: React.FC = () => {
  const { fps, width } = useVideoConfig();
  const frame = useCurrentFrame();
  const transitionProgress = spring({
    fps,
    frame: frame - 200,
    config: {
      damping: 200,
    },
  });

  const freeTranslateX = interpolate(
    transitionProgress,
    [0, 1],
    [0, -width / 4]
  );
  const rightTranslateX = interpolate(
    transitionProgress,
    [0, 1],
    [0, width / 4]
  );
  const rightOpacity = interpolate(transitionProgress, [0.6, 1], [0, 1]);

  return (
    <Container>
      <Sequence>
        <Audio src={staticFile("Starting_at_just_1.wav")} />
      </Sequence>
      <Sequence from={220}>
        <Audio src={staticFile("For_those_seeki_1.wav")} />
      </Sequence>
      <AbsoluteFill style={{ transform: `translateX(${freeTranslateX}px)` }}>
        <PricingLeft />
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          transform: `translateX(${rightTranslateX}px)`,
          opacity: rightOpacity,
        }}
      >
        <PricingRight />
      </AbsoluteFill>
    </Container>
  );
};
