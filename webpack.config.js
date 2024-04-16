// node에서 경로 지정할 수 있게 해주는 모듈
const path = require("path");

module.exports = {
  name: "webpack-practice",
  mode: "development", // 실서비스인 경우 'production',
  devtool: "eval",
  resolve: {
    extensions: [".js", ".jsx"],
  },

  // ** 입력
  entry: {
    app: ["./client"], // 이를 합쳐서 아래의 output을 출력함
  },

  // 연결
  module: {
    // 여러 개의 규칙을 적용할 수 있음
    rules: [{
        test: /\.jsx?/,
        loader : 'babel-loader',
        // babel의 option
        options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
        }
    }],
  },

  // **출력
  output: {
    path: path.join(__dirname, "dist"), // 현재폴더 > dist 폴더를 자동으로 만들어 줌
    filename: "app.js",
  },
  // => entry에 있는 파일을 읽고, module을 적용한 후, output으로 출력한다.
};
