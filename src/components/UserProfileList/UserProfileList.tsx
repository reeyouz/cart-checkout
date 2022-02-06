import React from "react";
import Grid from "@mui/material/Grid";
import { Profile } from "../../types";
import { UserProfile } from "../UserProfile";

interface Props {
  profiles: Profile[];
}
export function UserProfileList(props: Props) {
  const { profiles = [] } = props;

  return (
    <Grid container spacing={1}>
      {profiles.map((profile) => (
        <Grid item xs={12}>
          <UserProfile key={profile.id} profile={profile} />
        </Grid>
      ))}
    </Grid>
  );
}
