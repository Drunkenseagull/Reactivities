// responsibile for the actual issuing of requests to the API

import axios, { AxiosError, AxiosResponse } from 'axios';
import { IActivity, ActivityFormValues } from '../models/activity';
import { toast } from 'react-toastify';
import { router } from '../router/Routes';
import { store } from '../stores/store';
import { User, UserFormValues } from '../models/user';
import { Photo, Profile } from '../models/profile';

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay)
  })
}

// sets the base url for all axios requests
axios.defaults.baseURL = 'http://localhost:5000/api';

// sets up interceptor middleware which runs on axios objects directly before send (request) or directly after recieve (response)
axios.interceptors.request.use(config => {
  const token = store.commonStore.token;
  if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
  return config;
})

axios.interceptors.response.use(async response => {
  await sleep(1000);
  return response;
}, (error: AxiosError) => {
  const { data, status, config } = error.response as AxiosResponse;
  switch (status) {
    case 400:
      if (config.method === 'get' && Object.prototype.hasOwnProperty.call(data.errors, 'id')) {
        router.navigate('/not-found');
      }
      if (data.errors) {
        const modalStateErrors = [];
        for (const key in data.errors) {
          if (data.errors[key]) {
            modalStateErrors.push(data.errors[key])
          }
        }
        throw modalStateErrors.flat();
      } else {
        toast.error(data);
      }
      break;
    case 401:
      toast.error('unauthorized');
      break;
    case 403:
      toast.error('forbidden');
      break;
    case 404:
      router.navigate('/not-found')
      break;
    case 500:
      store.commonStore.setServerError(data);
      router.navigate('/server-error');
      break;
  }
  return Promise.reject(error);
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data; // simple function to get data out of axios response object

// base requests, all other request types build on these. Maps fetched json to <T> 
const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody)
}

const Activities = {
  list: () => requests.get<IActivity[]>('/Activities'),
  details: (id: string) => requests.get<IActivity>(`/Activities/${id}`),
  create: (activity: ActivityFormValues) => requests.post<void>('/Activities', activity),
  update: (activity: ActivityFormValues) => requests.put<void>(`/Activities/${activity.id}`, activity),
  delete: (id: string) => requests.del<void>(`/Activities/${id}`),
  attend: (id: string) => requests.post<void>(`/activities/${id}/attend`, {})
}

const Account = {
  current: () => requests.get<User>('/account'),
  login: (user: UserFormValues) => requests.post<User>('/account/login', user),
  register: (user: UserFormValues) => requests.post<User>('/account/register', user)
}

const Profiles = {
  get: (username: string) => requests.get<Profile>(`/profiles/${username}`),
  uploadPhoto: (file: any) => {
    let formData = new FormData();
    formData.append('File', file);
    return axios.post<Photo>('photos', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  },
  setMainPhoto: (id: string) => axios.post(`/photos/${id}/setMain`, {}),
  deletePhoto: (id: string) => axios.delete(`/photos/${id}`),
  updateProfile: (profile: Partial<Profile>) => axios.put("/profiles", profile)
}

const agent = {
  Activities,
  Account,
  Profiles
}

export default agent;