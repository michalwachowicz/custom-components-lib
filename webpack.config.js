import path from "path";
import ESLintWebpackPlugin from "eslint-webpack-plugin";

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const config = {
  mode: process.env.NODE_ENV || "development",
  entry: "./src/index.ts",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: "ts-loader",
      },
      {
        test: /\.module\.s[ac]ss$/i,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: { modules: true },
          },
          "sass-loader",
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        exclude: /\.module\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
    library: {
      type: "module",
    },
    clean: true,
    module: true,
  },
  experiments: {
    outputModule: true,
  },
  externals: {
    react: "react",
    "react-dom": "react-dom",
  },
  plugins: [
    new ESLintWebpackPlugin({
      extensions: ["ts", "tsx"],
      exclude: ["node_modules"],
    }),
  ],
};

export default config;
