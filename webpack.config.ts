// node에서 경로 지정할 수 있게 해주는 모듈
import path from "path";
import webpack, { Configuration as WebpackConfiguration } from "webpack";
import { Configuration as WebpackDevServerConfiguration } from "webpack-dev-server";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

const isDevelopment = process.env.NODE_ENV !== "production";

const config: Configuration = {
  name: "webpack-practice",
  mode: isDevelopment ? "development" : "production", // 실서비스인 경우 'production',
  devtool: "eval",
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json"], // entry의 확장자 생략 가능하게됨
    alias: {
      "@hooks": path.resolve(__dirname, "hooks"),
      "@components": path.resolve(__dirname, "components"),
      "@layouts": path.resolve(__dirname, "layouts"),
      "@pages": path.resolve(__dirname, "pages"),
      "@utils": path.resolve(__dirname, "utils"),
      "@typings": path.resolve(__dirname, "typings"),
    },
  },

  // ** 입력
  entry: {
    app: ["./client"], // 이를 합쳐서 아래의 output을 출력함
  },

  // 연결
  module: {
    // 여러 개의 규칙을 적용할 수 있음
    rules: [
      {
        test: /\.tsx?$/,
        loader: "babel-loader",
        // babel의 option
        options: {
          presets: [
            [
              "@babel/preset-env",
              {
                // 타겟 브라우저 설정 (버전 별로 설정 가능)
                targets: { browsers: ["last 2 chrome versions"] },
                debug: true,
              },
            ],
            "@babel/preset-react",
            "@babel/preset-typescript",
          ],
          plugins: [],
          env: {
            development: {
              plugins: [
                "@emotion/babel-plugin",
                require.resolve("react-refresh/babel"), // hot reloading
              ],
            },
          },
        },
      },
      // css 파일을 loader들이 js 파일을 만들어줌
      {
        test: /\.css?$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  // **plugins
  plugins: [
    new ForkTsCheckerWebpackPlugin({ async: false }), // 타입체킹을 더 빨리 하기 위한 플러그인 (typescript)
    new webpack.EnvironmentPlugin({
      NODE_ENV: isDevelopment ? "development" : "production",
    }),
    new webpack.LoaderOptionsPlugin({ debug: true }),
  ],

  // **출력
  output: {
    path: path.join(__dirname, "dist"), // 현재폴더(slack_clone_react) > dist 폴더를 자동으로 만들어 줌
    filename: "app.js",
  },
  // => entry에 있는 파일을 읽고, module을 적용한 후, output으로 출력한다.

  devServer: {
    historyApiFallback: true, // react router
    port: 3090, // 요청을 수신할 포트 번호 지정
    devMiddleware: { publicPath: "/dist/" },
    static: { directory: path.resolve(__dirname) },
    // proxy: {
    //   "/api/": {
    //     target: "http://localhost:3095",
    //     changeOrigin: true,
    //   },
    // },
  },
};

if (isDevelopment && config.plugins) {
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
  config.plugins.push(new ReactRefreshWebpackPlugin());
}

export default config;
