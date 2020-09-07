class Graph {
  constructor() {
    this.nodeList = [];
    this.edges = new Map();
  }
  addNode(node) {
    this.nodeList.push(node);
    this.edges.set(node, []);
  }
  addEdge(nodeStart, nodeEnd) {
    this.edges.get(nodeStart).push(nodeEnd);
    this.edges.get(nodeEnd).push(nodeStart);
  }
  toString() {
    let result = "";
    for (let index = 0; index < this.nodeList.length; index++) {
      const node = this.nodeList[index];
      result += node + " => ";
      const edges = this.edges.get(node).toString();
      result += edges + "\n";
    }
    return result;
  }
}

const graph = new Graph();
var myVertices = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
myVertices.forEach((node) => {
  graph.addNode(node);
});
graph.addEdge("A", "B");
graph.addEdge("A", "C");
graph.addEdge("A", "D");
graph.addEdge("C", "D");
graph.addEdge("C", "G");
graph.addEdge("D", "G");
graph.addEdge("D", "H");
graph.addEdge("B", "E");
graph.addEdge("B", "F");
graph.addEdge("E", "I");

console.log(graph.toString());
