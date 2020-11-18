import React, { useState } from 'react';
import convert from "../services/word_transform";
import WordDisplay from "./word_display"

const words = new Set([]);

const Converter = function() {

  const [startWord, setStartWord] = useState("");
  const [endWord, setEndWord] = useState("");

  const [path, setPath] = useState([""]);
  const [index, setIndex] = useState(0);

  const startConversion = () => {
    const conversion = convert(startWord, endWord, words);
    setIndex(0);
    setPath(conversion);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    startConversion();
  }

  const prevIndex = () => {
    if (index > 0) {
      setIndex(index => index - 1)
    }
  }
  const nextIndex = () => {
    if (index < path.length-1) {
      setIndex(index => index + 1)
    }
  }


  return (
    <div className="converter">

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

      <WordDisplay word={path[index]} />

      <button onClick={prevIndex}>prev</button>
      <button onClick={nextIndex}>next</button>

    </div>
  );
};

export default Converter;
