import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";

export const Typeface: React.FC = () => {
  const frame = Math.max(0, useCurrentFrame() - 20);
  const letters = "Explore the\nEnthralling Experience\nOf Pokhara"
    .substring(0, frame)
    .split("\n");

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        fontSize: 100,
        color: "white",
        fontFamily: "Arial",
        fontWeight: "bolder",
        lineHeight: 0.9,
      }}
    >
      <div>
        {letters.map((word, i) => {
          const letters = word.split("");
          return (
            <div key={i}>
              {letters.map((letter, index) => {
                return <span key={index}>{letter}</span>;
              })}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
