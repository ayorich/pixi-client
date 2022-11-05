import axios from 'axios';

const API_ENDPOINT = 'http://localhost:5000/api/v1';

const apiService = (
  url: string,
  method: 'POST' | 'GET' | 'PATCH' | 'DELETE',
  data?: any
) => {
  return new Promise((resolve, reject) => {
    axios({
      url: `${API_ENDPOINT}${url}`,
      method,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      data,
    })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export default apiService;
