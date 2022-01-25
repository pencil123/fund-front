import axios from "axios";

// 测试地址
// axios.defaults.baseURL = '';
// 线上地址
// axios.defaults.baseURL = '';
// demo地址
//axios.defaults.baseURL = "/api/";
axios.defaults.timeout = 10000; // 超时时间  10s

var api = {
  /** get 请求
   * @param  {接口地址} url
   * @param  {请求参数} params
   */
  get: function (url, params) {
    params = params || {};
    return new Promise((resolve, reject) => {
      axios
        .get(url, {
          params: params,
        })
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  /** post 请求
   * @param  {接口地址} url
   * @param  {请求参数} params
   */
  post: function (url, params) {
    params = params || {};
    return new Promise((resolve, reject) => {
      axios
        .post(url, params)
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};

export default api;
