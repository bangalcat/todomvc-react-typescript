const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: "./src/App.tsx", // 리액트 파일이 시작하는 곳
  output: {
    // bundled compiled 파일
    path: path.join(__dirname, "/dist"), // __dirname : 현재 디렉토리, dist 폴더에 모든 컴파일
    filename: "index_bundle.js"
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  module: {
    // javascript 모듈을 생성할 규칙을 지정 ( node_module을 제외한 .js 파일을 babel-loader로 불러와 모듈을 생성)
    rules: [
      {
        test: /\.(js|ts)$/, // .js, .jsx로 끝나는 babel이 컴파일하게 할 모든 파일
        exclude: /node_module/, // node_module 폴더는 babel 컴파일에서 제외
        use: {
          loader: "babel-loader", // babel loader가 파이프를 통해 js코드를 불러옴
          options: {
            presets: ["@babel/preset-env", "@babel/preset-typescript"]
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html" // 생성한 템플릿 파일
    })
  ]
};

