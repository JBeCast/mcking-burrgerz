import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-burguer-builder.firebaseio.com/'
});

export default instance;