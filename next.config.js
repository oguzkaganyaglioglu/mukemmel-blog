const withSass = require('@zeit/next-sass');
const withCSS = require("@zeit/next-css");
require('dotenv').config();

  

module.exports = withCSS(withSass({
  webpack: config => {
    config.module.rules.push({
      test: /\.md$/,
      use: "raw-loader"
    });
    
    return config;
  },
  env: {
    DOMAIN: "http://localhost:3000/"
    
  }
}));
