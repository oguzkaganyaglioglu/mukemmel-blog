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
          fs: "empty",
          net: "empty",
          tls: "empty",
          dns: "empty"
        };
      }

      return config;
    },
    env: {
      DOMAIN: "http://localhost:3000/"
    },
    devIndicators: {
      autoPrerender: false,
    }
  })
);
