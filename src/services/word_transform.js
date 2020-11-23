import { Queue } from "./util";


/**
 * Determines sequence of intermediate words between the two given words
 * where each adjacent word differs by one character
 * and all intermediate words are part of the valid words
 * @param {string} s1
 * @param {string} s2
 * @param {{string: int}} wordFreq - collection of valid words and frequencies
 * @returns {string[]} - Array of words in conversion
 */
function convert(s1, s2, words) {
  const prev = {};
  const q = new Queue();

  prev[s1] = null;
  q.enqueue(s1);

  // expansive search
  while (!q.isEmpty()) {
    const word_curr = q.front();

    // if target word reached, return reverse traversal
    if (word_curr === s2) {
      let w = word_curr;
      const path = [w];
      while (w !== s1) {
        w = prev[w];
        path.push(w);
      }
      return path.reverse()
    }

    q.dequeue();
    // otherwise, check all neighboring words
    for (let i = 0; i < word_curr.length; ++i) {
      let a = word_curr.substr(0, i);
      let b = word_curr.substr(i + 1);

      for (let c = 'a'.charCodeAt(0); c <= 'z'.charCodeAt(0); ++c) {
        let word_next = a + String.fromCharCode(c) + b;

        // skip invalid words
        if (!(word_next in words)) {
          continue;
        }

        // enqueue all new words to search
        if (!(word_next in prev)) {
          prev[word_next] = word_curr;
          q.enqueue(word_next);
        }
      }
    }
  }

  return ["no path found"];
}

export default convert;
