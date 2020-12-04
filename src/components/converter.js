import React, { useState, useEffect } from 'react';
import WordDisplay from "./word_display";
import convert from "../services/word_transform";
import wordFreq from "../services/word_freq";
import "./form-input.css";
import "./converter.css";

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

  // attempt to disable "are you sure" prompt
  window.onbeforeunload = null;

  const disperseStyle = {
    opacity: `${Math.max(0, 0.8 * _H_WORD - height)}%`
  };

  return (
    <div
      className="converter"
      style={{height: `calc(${_H_WORD * (path.length - 1)}px - 4rem + 80vh)`}}
    >

      <h3
        style={disperseStyle}
      >
        Enter two words of the same length to find a path between them
      </h3>

      <form onSubmit={handleSubmit} className="conversion-form sticky">

        <input
          type="text"
          id="startWord"
          className="form-control input-word"
          value={startWord}
          onChange={(event) => {
            setStartWord(event.target.value);
          }}
          placeholder="starting word"
          aria-label="starting word"
        />

        <span>to</span>

        <input
          type="text"
          id="endWord"
          className="form-control input-word"
          value={endWord}
          onChange={(event) => {
            setEndWord(event.target.value);
          }}
          placeholder="ending word"
          aria-label="ending word"
        />

        <button
          type="submit"
          className="btn btn-convert"
          disabled={!startWord || !endWord}
        >
          Convert
        </button>

      </form>

      <h3
        style={disperseStyle}
      >
        {path.length > 1 ? "scroll down to see the word ladder" : ""}
      </h3>

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
