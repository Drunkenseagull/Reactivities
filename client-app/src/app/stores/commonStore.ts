import { makeAutoObservable, reaction } from "mobx";
import { ServerError } from "../models/serverError";

export default class CommonStore {
  error: ServerError | null = null;
  token: string | null | undefined = localStorage.getItem('jwt');
  appLoaded: boolean = false;


  constructor() {
    makeAutoObservable(this);

    // mobx reaction, is triggered on changes to an obseved value, does not run on initialize of value, this.token in this case. Second param is the function that runs on change. 
    reaction(
      () => this.token,
      token => {
        if (token) {
          localStorage.setItem('jwt', token)
        } else {
          localStorage.removeItem('jwt')
        }
      }
    )
  }

  setServerError(error: ServerError) {
    this.error = error;
  }

  setToken = (token: string | null) => {
    this.token = token;
  }

  setAppLoaded = () => {
    this.appLoaded = true;
  }
}
