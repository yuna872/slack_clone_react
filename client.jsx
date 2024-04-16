// react, react-dom 불러오기 (node module system)
const React = require("react");
const ReactDom = require("react-dom");
const App = require("./App");

ReactDom.render(<App/>, document.querySelector('#root'))
