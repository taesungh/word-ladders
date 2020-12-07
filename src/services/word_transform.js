import { PriorityQueue } from "./util";

const _W_STEP = 0.3
const _W_FREQ = 1e6;

/**
 * Determines sequence of intermediate words between the two given words
 * where each adjacent word differs by one character
 * and all intermediate words are part of the valid words
 * @param {string} s1
 * @param {string} s2
 * @param {{string: int}} wordFreq - collection of valid words and frequencies
 * @returns {string[]} - Array of words in conversion
 */
function convertWeighted(s1, s2, wordFreq) {
  const prev = {};
  const distances = {};

  // priority queue will store [weight, word] and use default comparison
  const unvisited = new PriorityQueue();
  const visited = new Set();

  // default distance is Infinity
  distances[s1] = 0;
  prev[s1] = null;
  unvisited.push([0, s1]);

  // expansive search, based on Dijkstra's algorithm
  while (!unvisited.isEmpty()) {
    // select the word with the smallest distance
    const [dist, word_curr] = unvisited.front();

    if (visited.has(word_curr)) {
      // ignore leftover duplicate entries with greater distance
      unvisited.pop();
      continue;
    }

    // terminate search when destination word is reached
    if (word_curr === s2) {
      let w = word_curr;
      const path = [w];
      while (w !== s1) {
        w = prev[w];
        path.push(w);
      }
      return path.reverse()
    }

    unvisited.pop();
    visited.add(word_curr);

    // for each neighboring word found by substituting characters
    for (let i = 0; i < word_curr.length; ++i) {
      let a = word_curr.substr(0, i);
      let b = word_curr.substr(i + 1);

      for (let c = 'a'.charCodeAt(0); c <= 'z'.charCodeAt(0); ++c) {
        let word_next = a + String.fromCharCode(c) + b;

        // skip invalid words
        if (!(word_next in wordFreq)) {
          continue;
        }

        // alternative distance is current known + distance to word_next
        let altDist =
          distances[word_curr] + _W_STEP + _W_FREQ / wordFreq[word_next];

        if (!(visited.has(word_next))) {
          unvisited.push([altDist, word_next]);
        }

        // otherwise, update distance if smaller than current known distance
        if (!(word_next in distances) || altDist < distances[word_next]) {
          distances[word_next] = altDist;
          prev[word_next] = word_curr;
          // update the distance in the priority queue by pushing a duplicate
          unvisited.push([altDist, word_next]);
        }
      }
    }
  }

  return ["no path"];
}

export default convertWeighted;
