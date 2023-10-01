import { Rect } from "@remotion/shapes";
import { AbsoluteFill, Sequence, interpolate, useCurrentFrame } from "remotion";
import NoiseComp from "../NoiseComp";
import { EndCard } from "./EndCard";

const Title: React.FC<{ title: string }> = ({ title }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <div style={{ opacity, textAlign: "center", fontSize: "7em" }}>{title}</div>
  );
};

const EndCredits = () => {
  return (
    <AbsoluteFill>
      <AbsoluteFill
        style={{
          // background: "linear-gradient(to bottom, #000021, #010024)",
          background: "white",
        }}
      >
        <NoiseComp speed={0.01} circleRadius={5} maxOffset={50} />
      </AbsoluteFill>
      <Sequence durationInFrames={200}>
        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <EndCard />
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};

export default EndCredits;
