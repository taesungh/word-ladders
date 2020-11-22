import React, { useState, useEffect } from 'react';

import Letter from "./letter";


const WordDisplay = function({ word, nextWord, progress }) {

  if (!word) {
    return <div className="word sticky" />
  }

  word = word || "";
  nextWord = nextWord || "";

  // zip function by ninjagecko
  const zip = (...arrs) => [...arrs[0]].map((_,c) => arrs.map(arr => arr[c]));

  const svgWord = (zip(word, nextWord)).map(([a, b], i) => (
    <Letter char={a} nextChar={b} progress={progress} index={i} key={a + b + i} />
  ));

  return (
    <div className="word sticky" style={{top: "10rem"}}>
      {svgWord}
    </div>
  )
}

export default WordDisplay;
