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
    const newNode = Node(data, null)
    nodeTail.next = newNode;
  }

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
        const errorMessage = `Index is up to ${size()} only`
        throw new Error(errorMessage);
      };
      tempNode = tempNode.next;
    }
    return tempNode
  }

  return { append, prepend, head, tail, size, at };
})();

const list1 = LinkedList;
const testData = "This is test Data";

list1.prepend(testData);

console.log(list1.head());

list1.prepend(165465465);

console.log(list1.size());

console.log(list1.tail());

list1.append('testing append');
console.log(list1.tail());

console.log(list1.at(0));
