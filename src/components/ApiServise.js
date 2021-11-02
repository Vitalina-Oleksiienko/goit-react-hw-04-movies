import axios from 'axios';

const API_KEY = '1bf71eaa77d060a8674d8281198a200f';
const BASE_URL = 'https://api.themoviedb.org/3/';

export default function Query(path, params) {
  let url = new URL(path, BASE_URL);
  url.searchParams.append('api_key', API_KEY);
  params.forEach(el => url.searchParams.append(el[0], el[1]));
  return axios(url.href);
}