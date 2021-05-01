import axios from 'axios';

import {standardHeaders} from 'utils/requests';

import {User} from 'types/app/User';

export async function createUser({
  display_name,
  email,
  password,
}: {
  display_name: string;
  email: string;
  password: string;
}) {
  return axios.post(`${process.env.REACT_APP_BACKEND_API}/users`, {display_name, email, password}, standardHeaders());
}

export async function getUser({uuid}: {uuid: string}): Promise<User | null> {
  const response = await axios.get<User>(`${process.env.REACT_APP_BACKEND_API}/users/${uuid}`);

  return response.data ? response.data : null;
}
