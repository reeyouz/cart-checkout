import axios, { Canceler } from "axios";
import React, { useState } from "react";
import { fetchUsers } from "../../api";
import { Profile } from "../../types";

interface ErrorDetails {
  hasError: boolean;
  errorMessage: string;
}

const defaultError: ErrorDetails = {
  hasError: false,
  errorMessage: "",
};

export function useProfile(pageNumber: number) {
  const [loading, setLoading] = useState(false);
  const [errorDetails, setErrorDetails] = useState<ErrorDetails>(defaultError);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [hasMore, setHasMore] = useState(true);

  React.useEffect(() => {
    setLoading(true);
    setErrorDetails(defaultError);
    let canceler: Canceler;
    fetchUsers(pageNumber, new axios.CancelToken((c) => (canceler = c)))
      .then((res) => {
        setProfiles((prev) => [
          ...prev,
          ...res.data.results.map(
            ({
              login: { uuid } = { uuid: "" },
              name: { first, last } = { first: "", last: "" },
              picture: { thumbnail } = { thumbnail: "" },
            }) => ({
              id: uuid,
              name: `${first} ${last}`,
              avatarURL: thumbnail,
            })
          ),
        ]);
        setHasMore(res.data.results.length > 0);
      })
      .catch((e) => {
        setErrorDetails({ hasError: true, errorMessage: e.message });
      })
      .finally(() => {
        setLoading(false);
      });

    return () => {
      canceler();
    };
  }, [pageNumber]);

  return { loading, errorDetails, profiles, hasMore };
}
