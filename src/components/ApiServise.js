import axios from 'axios';

const API_KEY = 'a59354717540e035317ae59cf70c16ef';
const BASE_URL = 'https://api.themoviedb.org/3/';

export default function Query(path, params) {
  let url = new URL(path, BASE_URL);
  url.searchParams.append('api_key', API_KEY);
  params.forEach(el => url.searchParams.append(el[0], el[1]));
  return axios(url.href);
}