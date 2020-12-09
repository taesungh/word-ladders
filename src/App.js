import './App.css';

import Converter from './components/converter';

function App() {
  return (
    <div className="App">
      <div className="content">
        <div className="header sticky">
          <h1>Word Ladders</h1>
        </div>
        <Converter />
      </div>
      <div className="footer">
        Created by Taesung Hwang. Inspiration by Professor Shindler.
        <br />
        Original Puzzle by Lewis Carroll.
      </div>
    </div>
  );
}

export default App;
