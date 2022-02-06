import React from "react";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { Profile } from "../../types";

interface Props {
  profile: Profile;
}
export function UserProfile(props: Props) {
  const { profile } = props;

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Typography variant="h6">{profile.name}</Typography>
      <Avatar alt={profile.name} src={profile.avatarURL} />
    </div>
  );
}
