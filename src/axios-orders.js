import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-burger-95f7f.firebaseio.com/'
});

export default instance;
