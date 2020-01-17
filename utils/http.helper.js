import axios from "axios";
require("dotenv").config();

const url = (endPoint) => {
  return `/${process.env.API_VERSION}/${endPoint}`;
};

const post = (endPoint, data = {}) => {
    return axios.post(url(endPoint), data).then(res => res.data);
};

export {post};