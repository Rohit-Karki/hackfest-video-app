import { mix } from "polished";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import styled from "styled-components";
import { Title } from "./Reviews";
import { Title as KTitle } from "./MyTitleComponent";

const colors = ["#42e9f5", "#4290f5"];

const Container = styled.div`
  height: 600px;
  width: 1000px;
  border: 10px solid ${colors[1]};
  border-radius: 20px;
  display: flex;
  padding: 5px;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
`;

const Core = styled.div<{
  x: number;
  y: number;
}>`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => {
    const g = interpolate(props.x + props.y, [0, 6], [0, 1]);
    return mix(g, colors[0], colors[1]);
  }};
  margin: 5px;
  border-radius: 6px;
`;

const CoreContainer: React.FC<{
  x: number;
  y: number;
}> = ({ x, y }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const offset = x * 4 + y;
  const progress = spring({
    fps,
    frame: frame - Number(offset) * 50,
  });
  if (y == 0) {
    return (
      <Core style={{ transform: `scale(${progress})` }} x={x} y={y}>
        <Title>Jimmy Giri</Title>
        <Title> Luxurious Oasis in the Heart of the City</Title>
        <p style={{ fontSize: "26px" }}>
          What truly sets this hotel apart is its central location. It's within
          walking distance of some of the city's most iconic landmarks, making
          it the perfect base for exploring.I wholeheartedly recommend this
          hotel for a luxurious and unforgettable stay.
        </p>
      </Core>
    );
  } else if (y == 1) {
    return (
      <Core style={{ transform: `scale(${progress})` }} x={x} y={y}>
        <Title>James Karki</Title>
        <Title>A Hidden Gem of Serenity</Title>
        <p style={{ fontSize: "26px" }}>
          The hotel's restaurant is a culinary delight. The chef's creativity
          shines through in every dish, and the presentation is a work of art. I
          highly recommend trying the chef's tasting menu for a gastronomic
          journey you won't forget.
        </p>
      </Core>
    );
  }
  return (
    <Core style={{ transform: `scale(${progress})` }} x={x} y={y}>
      <Title>James Karki</Title>
      <Title>A Hidden Gem of Serenity</Title>
      <p style={{ fontSize: "26px" }}>
        The hotel's restaurant is a culinary delight. The chef's creativity
        shines through in every dish, and the presentation is a work of art. I
        highly recommend trying the chef's tasting menu for a gastronomic
        journey you won't forget.
      </p>
    </Core>
  );
};

export const ReviewItem: React.FC = () => {
  return (
    <Container>
      <Column>
        {new Array(1).fill(true).map((k, i) => {
          return (
            <Row key={i}>
              {new Array(3).fill(true).map((x, j) => {
                return <CoreContainer key={j} x={i} y={j} />;
              })}
            </Row>
          );
        })}
      </Column>
    </Container>
  );
};
