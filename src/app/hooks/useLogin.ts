import { useMutation } from "react-query";
import { request } from "../../features/utils/axios";
import { ILoginData } from "../../pages/Login";

let savedData: ILoginData;
const signup = (data: ILoginData) => {
  savedData = data;
  return request({ url: `users/?email=${data.email}` });
};

const login = (data: ILoginData) => {
  return request({ url: `users/?email=${data.email}` });
};

const signupStep2 = (data: ILoginData) => {
  return request({url: `users`, method: 'post', data})
}

export const useSignup = (onSuccess) => {
  return useMutation(signup, { onSuccess: data => onSuccess(data, savedData) });
};

export const useLogin = (onSuccess) => {
  return useMutation(login, { onSuccess });
};

export const useSignupStep2 = (onSuccess) => {
  return useMutation(signupStep2, {onSuccess})
}