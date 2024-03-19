import axios, { AxiosResponse } from 'axios';
import { Activity } from '../models/activity';

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay)
  })
}

// sets the base url for all axios requests
axios.defaults.baseURL = 'http://localhost:5000/api';

// sets up interceptor middleware which runs on axios objects directly before send (request) or directly after recieve (response)
axios.interceptors.response.use(async response => {
  try {
    await sleep(1000);
    return response;
  }
  catch (e) {
    console.log(e);
    return Promise.reject(e);
  }
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data; // simple function to get data out of axios response object

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody)
}

const activities = {
  list: () => requests.get<Activity[]>('/activities'),
  details: (id: string) => requests.get<Activity>(`/activities/${id}`),
  create: (activity: Activity) => axios.post<void>('/activities', activity),
  update: (activity: Activity) => axios.put<void>(`/activities/${activity.id}`, activity),
  delete: (id: string) => axios.delete<void>(`/activities/${id}`)
}

const agent = {
  activities
}

export default agent;