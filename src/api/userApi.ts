import axios, { CancelToken } from "axios";

export interface UserApiResponse {
  results: Array<{
    name: {
      title: string;
      first: string;
      last: string;
    };
    picture: {
      thumbnail: string;
    };
    login: {
      uuid: string;
    };
  }>;
}

export async function fetchUsers(pageNumber: number, cancelToken: CancelToken) {
  return axios.get<UserApiResponse>("https://randomuser.me/api", {
    params: {
      seed: "abc123",
      results: 15,
      page: pageNumber,
    },
    cancelToken,
  });
}
