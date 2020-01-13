import axios from "axios";
import config from "../config";

const url = (endPoint) => {
  return `/${config.apiVersion}/${endPoint}`;
};

const post = (endPoint, data = {}) => {
    return axios.post(url(endPoint), data).then(res => res.data);
};

export {post};