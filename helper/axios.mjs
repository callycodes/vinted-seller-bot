import axios from 'axios';
import { cookie, csrf } from '../constants.mjs'

const instance = axios.create({
  baseURL: 'https://www.vinted.co.uk/api/v2/',
  timeout: 1000,
  headers: { 
  'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1',
  'x-csrf-token': csrf,
  'cookie': cookie}
});

const another = axios.create({
  baseURL: 'https://www.vinted.co.uk',
  timeout: 1000,
  headers: { 
  'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1',
  'x-csrf-token': csrf,
  'cookie': cookie}
});

export { instance as VintedAxios, another as VintedBasicAxios }