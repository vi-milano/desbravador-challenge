import axios from 'axios';
import { EXTERNAL_SERVICES } from './endpoints';

const BASE_TIMEOUT = 5000;

export const gitHubApi = axios.create({
  baseURL: EXTERNAL_SERVICES.GITHUB,
  timeout: BASE_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});
