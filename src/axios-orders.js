import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://jbecast-react-burger-builder.firebaseio.com/'
});

export default instance;