import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import GroupIcon from "@mui/icons-material/Group";
import WorkIcon from "@mui/icons-material/Work";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import Divider from "@mui/material/Divider";
import CreateGroupForm from "./CreateGroupForm";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function CardEssa({ groups }) {
  const { user } = useSelector((state) => state.auth);
  console.log(groups);

  groups = groups.filter(
    (g) =>
      g.participants.find((p) => p.userName === user.userName) !== undefined
  );
  console.log(groups);

  return (
    <List
      sx={{
        width: "30%",
        maxWidth: 360,
        bgcolor: "background.paper",
      }}
      style={{ height: "80%", position: "fixed", marginTop: "30px" }}
    >
      {/* <Divider  component="li" /> */}
      <div style={{ overflowY: "scroll", height: "70%" }}>
        {groups.map((g) => (
          <React.Fragment key={g._id}>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <GroupIcon />
                </Avatar>
              </ListItemAvatar>

              <ListItem component={Link} to={`/group/${g._id}/sheet`}>
                <ListItemText primary={g.name} secondary="Jan 9, 2014" />
              </ListItem>
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        ))}
      </div>
    </List>
  );
}
