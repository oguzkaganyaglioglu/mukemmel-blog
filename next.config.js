const withSass = require("@zeit/next-sass");
const withCSS = require("@zeit/next-css");
require("dotenv").config();

module.exports = withCSS(
  withSass({
    webpack: (config, { isServer }) => {
      config.module.rules.push({
        test: /\.md$/,
        use: "raw-loader"
      });
      if (!isServer) {
        config.node = {
          fs: 'empty'
        }
      }
      return config;
    },
    env: {
      DOMAIN: process.env.DOMAIN,
      JWT_SECRET: process.env.JWT_SECRET,
      API_VERSION: process.env.API_VERSION,
      MONGO_URL: process.env.MONGO_URL,
      PASS_SECRET: process.env.PASS_SECRET,
      PORT: process.env.PORT,
      PASS_SECRET: process.env.PASS_SECRET,
      GOOGLE_TRACKING_ID: process.env.GOOGLE_TRACKING_ID
    },
    devIndicators: {
      autoPrerender: false,
    }
  })
);
