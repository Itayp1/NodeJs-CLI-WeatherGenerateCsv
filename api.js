const axios = require("axios");
const { APPID, BASE_URL } = require('./config')

const instance = axios.create({
  baseURL: BASE_URL
});

instance.interceptors.request.use(
  async config => {
    config.url += `&APPID=${APPID}`;
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);



module.exports = instance;
