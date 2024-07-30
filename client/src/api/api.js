import axios from "axios";

const axiosParams = {
  baseURL:
    `${import.meta.env.VITE_API_BASE_URL}/ecommerce/api`
};

const axiosInstance = axios.create(axiosParams);

axiosInstance.interceptors.request.use(
  (config) => {
    const localStorageToken = localStorage.getItem('ACCESS_TOKEN');
    if (localStorageToken) {
      config.headers.Authorization = `Bearer ${localStorageToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const didAbort = (error) => axios.isCancel(error) && { aborted: true };

const getCancelSource = () => axios.CancelToken.source();

export const isApiError = (error) => axios.isAxiosError(error);

const withAbort = (fn) => {
  const executor = async (...args) => {
    const originalConfig = args[args.length - 1];
    const { abort, ...config } = originalConfig;

    if (typeof abort === "function") {
      const { cancel, token } = getCancelSource();
      config.cancelToken = token;
      abort(cancel);
    }

    try {
      if (args.length > 2) {
        const [url, body] = args;
        return await fn(url, body, config);
      } else {
        const [url] = args;
        return await fn(url, config);
      }
    } catch (error) {
      if (didAbort(error)) {
        error.aborted = true;
      }

      throw error;
    }
  };

  return executor;
};

// export const withLogger = async (promise) =>
//   promise.catch((error) => {
//     // if (!process.env.REACT_APP_DEBUG_API) throw error;

//     if (error.response) {
//       console.log(error.response.data);
//       console.log(error.response.status);
//       console.log(error.response.headers);
//     } else if (error.request) {
//       console.log(error.request);
//     } else {
//       console.log("Error", error.message);
//     }
//     console.log(error.config);
//     throw error;
//   });

const api = (axios) => {
  return {
    get: (url, config = {}) => withAbort(axios.get)(url, config),
    delete: (url, config = {}) =>
      withAbort(axios.delete)(url, config),
    post: (url, body, config = {}) =>
      withAbort(axios.post)(url, body, config),
    patch: (url, body, config = {}) =>
      withAbort(axios.patch)(url, body, config),
    put: (url, body, config = {}) =>
      withAbort(axios.put)(url, body, config),
  };
};


//with Logger

// const api = (axios) => {
//   return {
//     get: (url, config = {}) => withLogger(withAbort(axios.get)(url, config)),
//     delete: (url, config = {}) =>
//       withLogger(withAbort(axios.delete)(url, config)),
//     post: (url, body, config = {}) =>
//       withLogger(withAbort(axios.post)(url, body, config)),
//     patch: (url, body, config = {}) =>
//       withLogger(withAbort(axios.patch)(url, body, config)),
//     put: (url, body, config = {}) =>
//       withLogger(withAbort(axios.put)(url, body, config)),
//   };
// };

export default api(axiosInstance);
