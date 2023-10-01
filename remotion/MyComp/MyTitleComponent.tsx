import {
  AbsoluteFill,
  Sequence,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { TextFade } from "./TextFade";

export const Title: React.FC<{ title: string }> = ({ title }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <div style={{ opacity, textAlign: "center", fontSize: "3em" }}>{title}</div>
  );
};

export const MyTitleComponent = (title1: string, title2: string) => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();

  const progress = spring({
    fps,
    frame,
    config: {
      damping: 200,
    },
    durationInFrames: 100,
  });

  // const translateY = interpolate()
  return (
    <AbsoluteFill>
      <Sequence durationInFrames={100}>
        <TextFade>
          <Title title={title1} />
          <Title title={title2} />
        </TextFade>
      </Sequence>
    </AbsoluteFill>
  );
};
