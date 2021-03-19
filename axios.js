import axios from 'axios';

//const dev = 'http://10.0.2.2:5000/api';
const dev = 'http://192.168.0.110:5000/api';
const prod = 'http://www.dgsadminportal.com:5000/api';
export const apiUrl = prod.slice(0, -4);
const instance = axios.create({
  baseURL: prod,
});
export default instance;
