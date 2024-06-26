import { User } from "./user";

// is redundant with profile class, not really needed
export interface IProfile {
  username: string;
  displayName: string;
  image?: string;
  bio?: string;
  photos?: Photo[];
}

export class Profile implements IProfile {
  username: string;
  displayName: string;
  image?: string | undefined;
  bio?: string | undefined;
  photos?: Photo[];

  constructor(user: User) {
    this.username = user.username;
    this.displayName = user.displayName;
    this.image = user.image
  }
}

export interface Photo {
  id: string;
  url: string;
  isMain: boolean;
}