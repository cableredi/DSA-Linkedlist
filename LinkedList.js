'use strict';

class _Node {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  };
};


class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  };

  insertFirst(item) {
    this.head = new _Node(item, this.head);
  };

  insertLast(item) {
    if (this.head === null) {
      this.insertFirst(item);
      return;
    }

    let tempNode = this.head;

    while (tempNode.next !== null) {
      tempNode = tempNode.next;
    };

    tempNode.next = new _Node(item, null);
  };

  insertBefore(beforeItem, item) {
    if (this.head === null) {
      this.insertFirst(item);
      return;
    }

    let currNode = this.head;
    let prevNode = this.head;

    while ((currNode !== null) && currNode.value !== beforeItem) {
      prevNode = currNode;
      currNode = currNode.next;

      prevNode.next = new _Node(item, currNode);
    }

  }

  insertAfter(afterItem, item) {
    if (this.head === null) {
      this.insertFirst(item);
      return;
    }

    let currNode = this.find(afterItem);

    if (currNode === null) {
      this.insertLast(item)
      return;
    }

    currNode.next = new _Node(item, currNode.next);
  }

  insertAt(item, index) {
    if (this.head === null) {
      this.insertFirst(item);
      return;
    }

    let currNode = this.head;
    let currPosition = 1;

    while (currPosition < index - 1) {
      currNode = currNode.next;
      currPosition++;
    };

    currNode.next = new _Node(item, currNode.next);
  }

  find(item) {
    //Start at the head
    let currNode = this.head;

    //If the list is empty
    if (!this.head) {
      return null;
    };

    // Check for the item
    while (currNode.value !== item) {
      // return null if its the end of the list & the item is not on the list
      if (currNode.next === null) {
        return null;
      }

      // keep looking
      currNode = currNode.next;

    };

    // Found it
    return currNode;
  }

  remove(item) {
    // If the list is empty
    if (!this.head) {
      return null;
    }

    // If the node to be removed is head, make the next node head
    if (this.head.value === item) {
      this.head = this.head.next;
      return;
    }

    // Start at the head
    let currNode = this.head;

    // Keep track of previous
    let prevNode = this.head;

    while ((currNode !== null) && (currNode.value !== item)) {
      // Save the previous node 
      prevNode = currNode;
      currNode = currNode.next;
    }

    if (currNode === null) {
      console.log('Item not found');
      return;
    }

    prevNode.next = currNode.next;
  }

  // prints the list items 
  printList() {
    var curr = this.head;
    var str = "";

    while (curr) {
      str = str + curr.value + " ";
      curr = curr.next;
    }
    console.log(str);
  }

};

function main() {
  let SLL = new LinkedList();

  SLL.insertFirst('Apollo');
  SLL.insertFirst('Boomer');
  SLL.insertFirst('Helo');
  SLL.insertFirst('Husker');
  SLL.insertFirst('Starbuck');
  SLL.printList();

  SLL.insertLast('Tauhida');
  SLL.printList();

  SLL.remove('Husker');
  SLL.printList();

  SLL.insertBefore('Boomer', 'Athena');
  SLL.printList();

  SLL.insertAfter('Helo', 'Hotdog');
  SLL.printList();

  SLL.insertAt('Kat', 3);
  SLL.printList();

  SLL.remove('Tauhida');
  SLL.printList();

  console.log('Size: ', size(SLL));
  console.log('Empty? ', isEmpty(SLL));

  console.log('Find Previous', findPrevious('Hotdog', SLL));

  console.log('Find last', findLast(SLL));

  console.log('What do I do? ');
  WhatDoesThisProgramDo(SLL).printList();

  console.log('Reverse Iterative: New head');
  reverseList(SLL).printList();

  console.log('Third From End', ThirdFromEnd(SLL));
  console.log('Middle of List: ', middleOfList(SLL));

  const nodeA = new _Node('A');
  const nodeB = nodeA.next = new _Node('B');
  const nodeC = nodeB.next = new _Node('C');
  const nodeD = nodeC.next = new _Node('D');
  const nodeE = nodeD.next = new _Node('E');

  console.log('Has Cycle? ', cycleInList(nodeA)); // false
  nodeE.next = nodeB;
  console.log('Has Cycle? ', cycleInList(nodeA)); // true
}

main();

// Display size of list
function size(list) {
  let currNode = list.head;
  let i = 0;

  while (currNode.next !== null) {
    currNode = currNode.next;
    i++;
  }

  return i;
}

// Is list Empty?
function isEmpty(list) {
  return list.size === 0;
}

// Find previous item
function findPrevious(item, list) {
  if (list.head === null) {
    console.log('Empty List');
    return;
  }

  let currNode = list.head;
  let prevNode = list.head;

  while ((currNode !== null) && (currNode.value !== item)) {
    prevNode = currNode;
    currNode = currNode.next;
  }

  if (currNode === null) {
    console.log('Item not found');
    return;
  }

  return prevNode.value;
}

// Find last item
function findLast(list) {
  if (list.head === null) {
    console.log('Empty List');
    return;
  }

  let currNode = list.head;

  while (currNode.next !== null) {
    currNode = currNode.next;
  }

  return currNode.value;
}

// Removes duplicates from list
function WhatDoesThisProgramDo(list) {
  let current = list.head;

  while (current !== null) {
    let newNode = current;

    while (newNode.next !== null) {
      if (newNode.next.value === current.value) {
        newNode.next = newNode.next.next;
      }
      else {
        newNode = newNode.next;
      }
    }

    current = current.next;
  }

  return list;
}

// Reverse a list
function reverseList(list) {
  let newList = list;

  let currentNode = newList.head;
  var previous = null;

  while (currentNode) {
    // save next or you lose it!!!
    var save = currentNode.next;
    // reverse pointer
    currentNode.next = previous;
    // increment previous to current node
    previous = currentNode;
    // increment node to next node or null at end of list
    currentNode = save;
  }

  newList.tail = newList.head;
  newList.head = previous;
 
  return newList;
}

// Find third element from the end
function ThirdFromEnd(list) {
  let currNode = list.head;
  let nextNode = currNode.next;

  while (nextNode.next.next !== null) {
    currNode = currNode.next;
    nextNode = nextNode.next;
  }

  if (nextNode.next.next === null) {
    return currNode.value;
  }
}

// Find the middle element
function middleOfList(list) {
  let fastPointer = list.head;
  let slowPointer = list.head;

  while (fastPointer.next !== null && fastPointer.next.next !== null) {
    fastPointer = fastPointer.next.next;
    slowPointer = slowPointer.next;
  }

  return slowPointer.value;
}

// Is there a cycle in the list?
function cycleInList(list) {
  let slowPointer = list;
  let fastPointer = list;
  do {
    if (fastPointer.next === null) return false;
    fastPointer = fastPointer.next;
    if (fastPointer.next === null) return false;
    fastPointer = fastPointer.next;
    slowPointer = slowPointer.next;
  } while (slowPointer !== fastPointer);

  return true;
}