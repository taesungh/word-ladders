import React, { useState, useEffect } from 'react';
import { MorphTransition } from 'react-svg-morph';
import { paths, widths, height, kerning } from '../paths/jubilat-light';


const Letter = function({ char, nextChar, progress, reverse, scale, index }) {

  const [shrinking, setShrinking] = useState(false);
  useEffect(() => {
    // do not change shrinking when currently morphing
    setShrinking(reverse !== (widths[nextChar] < widths[char]));
  }, [char]);

  const [update, setUpdate] = useState(null);
  useEffect(() => {
    // temporary fix to prevent pre-flickering to nextChar
    setUpdate(true);
  }, []);

  const width =
    widths[char] + progress * (widths[nextChar] - widths[char]);
  // MorphTransition is finicky about slice/meet
  const par = `xMinYMid ${shrinking ? 'slice' : 'meet'}`;

  const svgChar = (char) => (
    <svg key={index + '_' + char}
      width={scale * width}
      height={scale * height}
      viewBox={`0 0 ${width} ${height}`}
      style={{margin: `0 ${scale * kerning/2}`}}
    >
      <path d={paths[char]} />
    </svg>
  );


  if (char === nextChar) {
    return svgChar(char);
  }

  return (
    <MorphTransition
      width={scale * width}
      height={scale * height}
      progress={100 * progress}
      rotation="none"
      preserveAspectRatio={par}
      style={{margin: `0 ${scale * kerning/2}`}}
    >
      {{
        from: svgChar(char),
        to: svgChar(nextChar)
      }}
    </MorphTransition>
  );
};

export default Letter;
