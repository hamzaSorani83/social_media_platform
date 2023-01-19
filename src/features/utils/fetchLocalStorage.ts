import { IUser as UserInfo } from '../user/userSlice'


export const fetchUser = () => {
  const user = localStorage.getItem('user');
  let userInfo: UserInfo | null = null;
  if (user !== null && user !== 'undefined')
    userInfo = JSON.parse(user);
  else
    localStorage.clear();
  return userInfo;
}
