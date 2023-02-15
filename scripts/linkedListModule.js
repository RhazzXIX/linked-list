["log", "warn", "error"].forEach((methodName) => {
  const originalMethod = console[methodName];
  console[methodName] = (...args) => {
    let initiator = "unknown place";
    try {
      throw new Error();
    } catch (e) {
      if (typeof e.stack === "string") {
        let isFirst = true;
        for (const line of e.stack.split("\n")) {
          const matches = line.match(/^\s+at\s+(.*)/);
          if (matches) {
            if (!isFirst) {
              // first line - current function
              // second line - caller (what we are looking for)
              initiator = matches[1];
              break;
            }
            isFirst = false;
          }
        }
      }
    }
    originalMethod.apply(console, [...args, "\n", `  at ${initiator}`]);
  };
});

const LinkedList = (function () {
  let List = null;

  const Node = function (data, next) {
    return { data, next };
  };

  const prepend = function (data) {
    const newHead = Node(data, List);
    List = newHead;
  };

  const head = function () {
    return List;
  };

  const tail = function (data) {
    if (List === null) return List;
    let tempNode = List;
    while (tempNode.next !== null) {
      tempNode = tempNode.next;
    }
    return tempNode;
  };

  const append = function (data) {
    const nodeTail = tail();
    const newNode = Node(data, null);
    nodeTail.next = newNode;
  };

  const size = function () {
    let length = 0;
    if (List === null) return length;
    let tempNode = List;
    while (tempNode !== null) {
      tempNode = tempNode.next;
      length += 1;
    }
    return length;
  };

  const at = function (num) {
    let index = 0;
    let tempNode = List;
    for (index; index < num; index += 1) {
      if (tempNode === null) {
        console.log(`Index is up to ${size()} only`);
        break;
      }
      tempNode = tempNode.next;
    }
    return tempNode;
  };

  const pop = function () {
    if (List === null) {
      console.log("The list is null");
      return;
    }
    if (size() - 2 < 0) {
      List = null;
      return;
    }
    const newSize = size() - 2;
    const nodeTail = at(newSize);
    nodeTail.next = null;
  };

  const contains = function (data) {
    let tempList = List;
    let hasData = false;
    while (tempList !== null) {
      if (tempList.data === data) {
        hasData = true;
        break;
      }
      tempList = tempList.next;
    }
    return hasData;
  };

  const find = function (data) {
    let index = 0;
    console.log(data);
    if (List === null) {
      console.log("The List is null");
      return;
    }
    if (!contains(data)) return null;
    let tempList = List;
    while (tempList !== null) {
      if (tempList.data === data) break;
      index += 1;
      tempList = tempList.next;
    }

    return index;
  };

  const toString = function () {
    let Node = List;
    let string = ``;
    while (Node !== null) {
      string += `(${Node.data}) -> `;
      Node = Node.next;
    }

    if (Node === null) {
      string += `${Node}`;
      return string;
    }
    return string;
  };

  return {
    append,
    prepend,
    head,
    tail,
    size,
    at,
    pop,
    contains,
    find,
    toString,
  };
})();

const list1 = LinkedList;
const testData = "This is test Data";

list1.prepend(testData);

list1.prepend(165465465);

// console.log(list1.size());

// console.log(list1.tail());

list1.append("testing append");
// console.log(list1.tail());

// console.log(list1.head());
// console.log(list1.size());

const obj1 = {
  prop: "test",
};

// console.log(list1.tail());
// console.log(list1.contains(testData));
// console.log(list1.contains('lkadfka'));
// console.log(list1.contains(165465465));
// console.log(list1.find('lkadfka'));
// console.log(list1.find(165465465));

list1.append(obj1);

console.log(list1.find(obj1));
console.log(typeof list1.at(3));
console.log(list1.toString());
