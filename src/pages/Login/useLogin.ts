import { ChangeEvent, useCallback, useState } from "react";

export interface Credentials {
  username: string;
  password: string;
}
export function useLogin(initial?: Credentials) {
  const [credentials, setCredentials] = useState<Credentials>({
    username: initial?.username ?? "",
    password: initial?.password ?? "",
  });

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // console.log({ name, value });
    setCredentials((prevCred) => ({
      ...prevCred,
      [name]: value,
    }));
  }, []);

  return { credentials, handleChange };
}
