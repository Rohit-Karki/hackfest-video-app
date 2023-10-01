import { useCurrentFrame, Sequence, useVideoConfig } from "remotion";

const FirstVideo = () => {
  const { fps, durationInFrames } = useVideoConfig();
  const beatsPerMinute = 120; // Adjust the BPM as needed
  const framesPerBeat = (fps * 60) / beatsPerMinute;

  return (
    <Sequence durationInFrames={durationInFrames}>
      <BeatText
        framesPerBeat={framesPerBeat}
        durationInFrames={durationInFrames}
      />
    </Sequence>
  );
};

const BeatText: React.FC<{
  framesPerBeat: number;
  durationInFrames: number;
}> = ({ framesPerBeat, durationInFrames }) => {
  const frame = useCurrentFrame();
  const currentBeat = Math.floor(frame / framesPerBeat);

  const texts = [
    "Elegance in Every Detail",
    "Step Inside Paradise",
    "Discover a World of Luxury",
  ];

  // Get the text for the current beat
  const textToShow = texts[currentBeat % texts.length];

  // Calculate the y-position based on the frame
  const translateY = frame * (1080 / durationInFrames);

  return (
    <div
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        transform: `translateY(${translateY}px)`,
        position: "absolute",
        width: "100%",
        height: "100%",
      }}
    >
      <p
        style={{
          fontSize: 80,
          fontFamily: "Arial",
          color: "white",
          textAlign: "center",
        }}
      >
        {textToShow}
      </p>
    </div>
  );
};

export default FirstVideo;
