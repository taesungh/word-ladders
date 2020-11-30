import React, { useState, useEffect } from 'react';
import WordDisplay from "./word_display";
import convert from "../services/word_transform";
import wordFreq from "../services/word_freq";

const _R_PAUSE = 0.2;
const _H_WORD = 150;
const _H_MORPH = _H_WORD * (1 - _R_PAUSE)


const Converter = function() {

  const [startWord, setStartWord] = useState("");
  const [endWord, setEndWord] = useState("");

  const [path, setPath] = useState([]);
  const [index, setIndex] = useState(0);
  const [height, setHeight] = useState(0);
  const [reverse, setReverse] = useState(false);


  const updateHeight = () => {
    let hScroll = window.scrollY;
    if (hScroll < 0) {
      setHeight(0);
    } else if (hScroll <= _H_WORD * (path.length - 1)) {
      setHeight((height) => {
        // invert direction if scrolling up
        setReverse(hScroll <= height);
        return hScroll;
      });
      setIndex((hScroll / _H_WORD) >> 0);
    } else {  // scroll has excedeed amount needed
      setHeight(_H_WORD * (path.length - 1) - 1);
    }
  };

  const progress = Math.min(height % _H_WORD, _H_MORPH) / _H_MORPH;

  useEffect(() => {
    window.addEventListener("scroll", updateHeight);
    // auto clean-up scroll listener
    return () => {
      window.removeEventListener("scroll", updateHeight);
    };
  }, [path]);

  const startConversion = () => {
    const conversion = convert(startWord, endWord, wordFreq);
    console.log(conversion);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    setPath(conversion);
    // setIndex(0);
    setReverse(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    startConversion();
  }


  return (
    <div
      className="converter"
      style={{height: `calc(${_H_WORD * (path.length - 1)}px - 6rem + 80vh)`}}
    >

      <form onSubmit={handleSubmit} className="conversion-form sticky">

        <label htmlFor="startWord">starting word</label>
        <input
          type="text"
          id="startWord"
          value={startWord}
          onChange={(event) => {
            setStartWord(event.target.value);
          }}
          placeholder="start word"
        />

        <span>to</span>

        <label htmlFor="endWord">destination word</label>
        <input
          type="text"
          id="endWord"
          value={endWord}
          onChange={(event) => {
            setEndWord(event.target.value);
          }}
          placeholder="end word"
        />

        <button
          type="submit"
          disabled={!startWord || !endWord}
        >
          Convert
        </button>

      </form>

      <WordDisplay
        word={path[index]}
        nextWord={index + 1 < path.length ? path[index+1] : path[index]}
        progress={progress}
        reverse={reverse}
      />

    </div>
  );
};

export default Converter;
