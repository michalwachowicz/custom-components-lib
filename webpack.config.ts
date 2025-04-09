import path from "path";
import { Configuration } from "webpack";
import CopyWebpackPlugin from "copy-webpack-plugin";
import ESLintWebpackPlugin from "eslint-webpack-plugin";

const config: Configuration = {
  mode: (process.env.NODE_ENV as "development" | "production") || "development",
  entry: "./src/main.tsx",
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
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [{ from: "public" }],
    }),
    new ESLintWebpackPlugin({
      extensions: ["ts", "tsx"],
      exclude: ["node_modules"],
    }),
  ],
};

export default config;
