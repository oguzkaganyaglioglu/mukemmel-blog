import axios from "axios";
require("dotenv").config();

const url = endPoint => {
  return `/${process.env.API_VERSION}/${endPoint}`;
};

const post = (endPoint, data = {}, headers) => {
  // const headers = {
  //   "Content-Type": "application/json",
  //   Authorization: "JWT fefege..."
  // };
  return axios
    .post(url(endPoint), data, {
      headers: headers
    })
    .then(res => res.data);
};

export { post };
