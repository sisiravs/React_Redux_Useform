import axios from "axios";
const instance = axios.create({
    baseURL: 'https://dummy.restapiexample.com/api/v1',
  });

  export default instance