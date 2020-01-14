const withSass = require("@zeit/next-sass");
const withCSS = require("@zeit/next-css");
require("dotenv").config();

module.exports = withCSS(
  withSass({
    webpack: (config) => {
      config.module.rules.push({
        test: /\.md$/,
        use: "raw-loader"
      });

      return config;
    },
    env: {
      DOMAIN: process.env.DOMAIN,
      JWT_SECRET: process.env.JWT_SECRET,
      API_VERSION: process.env.API_VERSION,
      MONGO_URL: process.env.MONGO_URL,
      PASS_SECRET: process.env.PASS_SECRET,
      PORT: process.env.PORT,
      PASS_SECRET: process.env.PASS_SECRET
    },
    devIndicators: {
      autoPrerender: false,
    }
  })
);
