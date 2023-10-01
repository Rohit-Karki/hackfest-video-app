import {
  Series,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Transition } from "./utils/Transition";
import styled from "styled-components";

const Container = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-size: 50px;
  font-weight: 700;
  text-align: center;
  color: #fff;
`;

export const Howto: React.FC = () => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();
  const progress = spring({
    fps,
    frame: frame - 20,
    config: {
      damping: 200,
    },
  });
  const progress1 = spring({
    fps,
    frame: frame - 50,
    config: {
      damping: 200,
    },
  });
  const progress2 = spring({
    fps,
    frame: frame - 50,
    config: {
      damping: 200,
    },
  });

  // const translateY = interpolate(progress, [0, 0.5, 1], [600, 0, -600]);
  const translateY = interpolate(progress, [0, 1], [600, 0]);
  const translate_Y = interpolate(progress1, [0, 1], [800, 0]);
  const translate__Y = interpolate(progress2, [0, 1], [600, 0]);
  const translate___Y = interpolate(progress2, [0, 0.01, 1], [800, 0, -800]);

  return (
    <Series>
      <Series.Sequence durationInFrames={100}>
        <Transition type="out">
          <Container
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
              // backgroundColor: "rgba(0, 0, 0, 0.5)",
              width: "100%",
              height: "100%",
            }}
          >
            <div
              style={{
                fontSize: "112px",
                fontWeight: "bold",
                // color: "#f5ad43",
                transform: `translateY(${translate_Y}px)`,
              }}
            >
              Discover a World of Luxury!
            </div>
          </Container>
        </Transition>
      </Series.Sequence>
      <Series.Sequence durationInFrames={100}>
        <Transition type="out">
          <Container
            style={{
              // transform: `translateY(${translate__Y}px)`,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
              // backgroundColor: "rgba(0, 0, 0, 0.5)",
              width: "100%",
              height: "100%",
            }}
          >
            <div
              style={{
                fontSize: "112px",
                fontWeight: "bold",
                // color: "#f5ad43",
                transform: `translateY(${translate___Y}px)`,
              }}
            >
              Your Memories Start Here~
            </div>
          </Container>
        </Transition>
      </Series.Sequence>
    </Series>
  );
};
