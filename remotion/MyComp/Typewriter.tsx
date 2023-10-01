import { AbsoluteFill, Sequence, useCurrentFrame } from "remotion";

const cursor: React.CSSProperties = {
  height: 60,
  width: 3,
  display: "inline-block",
  backgroundColor: "black",
  marginLeft: 4,
  marginTop: -4,
};

export const TypeWriter = () => {
  const frame = useCurrentFrame();
  const text = "Yak and Yeti Hotel";
  // A new character every 3 frames
  const charsShown = Math.floor(frame / 6);
  const textToShow = text.slice(0, charsShown);
  // Show the cursor while the text is typing, then start blinking
  const cursorShown =
    textToShow.length === text.length ? Math.floor(frame / 10) % 2 === 1 : true;

  return (
    <>
      <Sequence durationInFrames={200}>
        <AbsoluteFill
          style={{
            backgroundColor: "white",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontFamily: "sans-serif",
              fontSize: 120,
              color: "#d2cd23",
            }}
          >
            {textToShow}
            <span
              style={{
                ...cursor,
                verticalAlign: "middle",
                opacity: Number(cursorShown),
              }}
            />
          </div>
        </AbsoluteFill>
      </Sequence>
    </>
  );
};
