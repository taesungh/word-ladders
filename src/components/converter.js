import React, { useState, useEffect } from 'react';
import WordDisplay from "./word_display";
import convert from "../services/word_transform";

const words = new Set([]);

const _R_PAUSE = 0.2;
const _H_WORD = 200;
const _H_MORPH = _H_WORD * (1 - _R_PAUSE)


const Converter = function() {

  const [startWord, setStartWord] = useState("");
  const [endWord, setEndWord] = useState("");

  const [path, setPath] = useState([]);
  const [index, setIndex] = useState(0);
  const [height, setHeight] = useState(1);


  const updateHeight = () => {
    let height = window.scrollY;
    if (height < 0) {
      setHeight(0);
    } else if (height < _H_WORD * (path.length - 1)) {
      setHeight(height);
      setIndex((height / _H_WORD) >> 0);
    } else {  // scroll has excedeed amount needed
      setHeight(_H_WORD * (path.length - 1) - 1);
    }
  };

  const progress = Math.min(height % _H_WORD, _H_MORPH) / _H_MORPH;

  useEffect(() => {
    window.addEventListener("scroll", updateHeight);
    return () => {
      window.removeEventListener("scroll", updateHeight);
    };
  }, [path]);

  const startConversion = () => {
    const conversion = convert(startWord, endWord, words);
    setIndex(0);
    setPath(conversion);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    startConversion();
  }


  return (
    <div
      className="converter"
      style={{height: `calc(${_H_WORD * (path.length - 1)}px + 100vh)`}}
    >

      <form onSubmit={handleSubmit}>

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

      <WordDisplay word={path[index]} nextWord={path[index+1]} progress={progress} />

    </div>
  );
};

export default Converter;
