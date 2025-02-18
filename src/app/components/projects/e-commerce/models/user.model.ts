export interface UserLogin{
  username: string;
  password: string;
}
export interface UserDTO{
  status: number;
  data: {
    username: string;
    age: string;
    gender: string
    token: string;
  }
}
export interface User{
  username: string;
  age: string;
  gender: string;
  token: string;
}
export interface UserRegister{
  username: string;
  age: string;
  gender: string
  password: {
    newPassword: string;
    repeatNewPassword: string;
  };
}
export interface UserRegisterDTO{
  status: number;
  data: {
    username: string;
    age: string;
    gender: string;
    token: string;
  }
}
export interface UserUpdate {
  username: string;
  age: string;
  gender: string;
  password: {
    currentPassword: string;
    newPassword?: string;
    repeatNewPassword?: string;
  }
}