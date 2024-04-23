import { User } from "./user";

// is redundant with profile class, not really needed
export interface IProfile {
  username: string;
  displayName: string;
  image?: string;
  bio?: string;
}

export class Profile implements IProfile {
  username: string;
  displayName: string;
  image?: string | undefined;
  bio?: string | undefined;
  constructor(user: User) {
    this.username = user.username;
    this.displayName = user.displayName;
    this.image = user.image
  }
}