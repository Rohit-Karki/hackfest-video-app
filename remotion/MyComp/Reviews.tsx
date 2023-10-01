import styled from "styled-components";
import { ReviewItem } from "./ReviewItem";

const Container = styled.div`
  background-color: white;
  flex: 1;
  justify-content: center;
  align-items: center;
  display: flex;
`;

export const Title = styled.h2`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-size: 24px;
  font-weight: 500;
  text-align: center;
  margin-bottom: 0;
`;

const Column = styled.div`
  flex-direction: column;
  display: flex;
  align-items: center;
`;

export const Reviews: React.FC = () => {
  return (
    <Container>
      <Column>
        <ReviewItem />
        <Title>Some of the reviews</Title>
      </Column>
    </Container>
  );
};
