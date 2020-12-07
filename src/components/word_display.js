import React, { useState, useEffect } from 'react';

import Letter from "./letter";
import { widths, kerning } from '../paths'

const _MAX_WIDTH = 0.75;


const WordDisplay = function({ word, nextWord, progress, reverse }) {

  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setFrame(_MAX_WIDTH * window.innerWidth);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    // auto clean-up when no longer used
    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, []);


  if (!word) {
    return <div className="word sticky" />
  }

  word = word || "";
  nextWord = nextWord || "";

  const calcWidth = (w) => [...w].map((c) => (
    widths[c] + kerning
  )).reduce((a, b) => a + b, 0);

  const width =
    calcWidth(word) + progress * (calcWidth(nextWord) - calcWidth(word));
  const scale = Math.min(1, frame / width);

  // zip function by ninjagecko
  const zip = (...arrs) => [...arrs[0]].map((_,c) => arrs.map(arr => arr[c]));

  const svgWord = (zip(word, nextWord)).map(([a, b], i) => (
    <Letter
      char={a} nextChar={b}
      progress={progress}
      reverse={reverse}
      index={i} key={a + b + i}
      scale={scale}
    />
  ));
  
  const desc = word === nextWord ? word : `${word} to ${nextWord}`;

  return (
    <div
      className="word sticky"
      title={desc}
      aria-label={desc}
    >
      {svgWord}
    </div>
  )
}

export default WordDisplay;
