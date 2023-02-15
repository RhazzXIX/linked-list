
['log', 'warn', 'error'].forEach((methodName) => {
  const originalMethod = console[methodName];
  console[methodName] = (...args) => {
    let initiator = 'unknown place';
    try {
      throw new Error();
    } catch (e) {
      if (typeof e.stack === 'string') {
        let isFirst = true;
        for (const line of e.stack.split('\n')) {
          const matches = line.match(/^\s+at\s+(.*)/);
          if (matches) {
            if (!isFirst) { // first line - current function
                            // second line - caller (what we are looking for)
              initiator = matches[1];
              break;
            }
            isFirst = false;
          }
        }
      }
    }
    originalMethod.apply(console, [...args, '\n', `  at ${initiator}`]);
  };
});

const LinkedList = (function () {
  let node = null;

  const Node = function (data, next) {
    return { data, next };
  };

  const prepend = function (item) {
    node = Node(item, node);
  };

  const head = function () {
    return node.data;
  };

  console.log(node);

  return { prepend, head };
})();

const list1 = LinkedList;
const testData = "This is test Data";

list1.prepend(testData);

console.log(list1.head());

list1.prepend(165465465);

console.log(list1.head());
