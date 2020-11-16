class LN {
  constructor(value=null, next=null) {
    this.value = value;
    this.next = next;
  }
}

export class Queue {
  constructor() {
    this._head = null;
    this._tail = null;
    this._length = 0;
  }

  front() {
    if (this._head !== null) {
      return this._head.value;
    }
    throw "queue is empty";
  }

  enqueue(value) {
    if (this._tail === null) {
      this._tail = this._head = new LN(value, null);
    } else {
      this._tail.next = new LN(value, null);
      this._tail = this._tail.next;
    }
    this._length += 1;
  }

  dequeue() {
    if (this._head === null) {
      throw "queue is empty";
    }
    this._head = this._head.next;
    if (this._head === null) {
      this._tail = null;
    }
    this._length -= 1;
  }

  isEmpty() {
    return this._head === null;
  }

  get length() {
    return this._length;
  }
}
