export interface DrawInterface {
  id?: string;
  title: string;
  price: number;
  date: Date;
  creatorsId: string;
}

export interface StateInterface {
  username?: string;
  email?: string;
  userId?: string;
  token?: string;
  usersDraws: DrawInterface[];
  loginError?: string;
}

export interface LoginDataInterface {
  username: string;
  password: string;
}

export type DrawsList = DrawInterface[] 
