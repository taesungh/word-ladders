// implements a priority queue using an array to compact a heap
// similar to the Python implementation of heapq
export class PriorityQueue {
  constructor() {
    this._heap = [];
  }

  push(item) {
    this._heap.push(item);
    this._percolateUp(this._heap.length - 1);
  }

  pop() {
    if (this._heap.length === 0) {
      return null;
    }

    const end = this._heap.pop();
    // replace the front with the maximal element and reorder the heap
    if (this._heap.length !== 0) {
      this._heap[0] = end;
      this._percolateDown(0);
    }
  }

  front() {
    if (this._heap.length === 0) {
      return null;
    }
    return this._heap[0];
  }

  isEmpty() {
    return this._heap.length == 0;
  }

  get length() {
    return this._heap.length;
  }

  // restore the heap invariant possibly broken by the element at pos
  // by sifting larger parent items downwards
  _percolateUp(pos, startPos=0) {
    const item = this._heap[pos];

    while (pos > startPos) {
      // parent element is stored at roughly half index
      const parentPos = (pos - 1) >> 1;
      const parentItem = this._heap[parentPos];

      // stop elevating when the item is no longer smaller than the parent
      if (item >= parentItem) {
        break;
      }
      // bring the larger parent down
      this._heap[pos] = parentItem;
      // repeat process for the parent position
      pos = parentPos;
    }

    // store the fully elevated item
    this._heap[pos] = item;
  }

  // restore the heap invariant possibly broken by the element at pos
  // by sifting smaller child items upwards
  _percolateDown(pos) {
    const startPos = pos;
    const halfLength = this._heap.length >> 1;
    const item = this._heap[pos];

    while (pos < halfLength) {
      // choose smaller of two children
      let childPos = 2 * pos + 1;
      const right = childPos + 1;
      if (right < this.length && this._heap[right] < this._heap[childPos]) {
        childPos = right;
      }

      // according to heapq.py/Knuth, do not compare but continue descending
      // if (this._heap[childPos] >= item) {
      //   break;
      // }

      // elevate the smaller child
      this._heap[pos] = this._heap[childPos];
      pos = childPos;
    }

    this._heap[pos] = item;
    // re-elevate target item which was fully brought down
    this._percolateUp(pos, startPos)
  }
}
