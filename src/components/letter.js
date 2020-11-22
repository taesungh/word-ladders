import React, { useState, useEffect } from 'react';
import { MorphTransition } from 'react-svg-morph';
import { paths, widths, height } from '../paths/jubilat-light'


const Letter = function({ char, nextChar, progress, scale, index }) {

  const [toChar, setToChar] = useState(char);
  useEffect(() => {
    // temporary fix to prevent pre-flickering to nextChar
    // still flickers when progressing in reverse
    setToChar(nextChar);
  }, [nextChar]);

  const svgChar = (char) => (
    <svg key={index + '_' + char}
      width={widths[char] + progress * (widths[nextChar] - widths[char]) + 25}
      height={height}>
      <path d={paths[char]} />
    </svg>
  );

  if (char === nextChar) {
    return svgChar(char);
  }

  return (
    <MorphTransition
      width={widths[char] + progress * (widths[nextChar] - widths[char]) + 25}
      height={height}
      progress={100 * progress}
      rotation="none"
      style={{marginRight: ""}}
    >
      {{
        from: svgChar(char),
        to: svgChar(toChar)
      }}
    </MorphTransition>
  );
};

export default Letter;
