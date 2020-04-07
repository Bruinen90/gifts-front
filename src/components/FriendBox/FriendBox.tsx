import React, { useState } from "react";
import { useDispatch } from "react-redux";

// MUI
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Button,
  IconButton,
  Theme,
} from "@material-ui/core";
import { CardGiftcard, PersonAddDisabled } from "@material-ui/icons";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/styles";

interface FriendBoxProps {
  _id: string;
  username: string;
  email?: string;
}

export const FriendBox: React.FC<FriendBoxProps> = ({
  _id,
  username,
  email,
}) => {
  const dispatch = useDispatch();
  const theme: Theme = useTheme();
  const minWidth = useMediaQuery(theme.breakpoints.up("md"));

  const handleCancelFriendship = () => {
    console.log("Canceling friendship with: ", _id);
  };
  return (
    <ListItem>
      <ListItemText primary={username} secondary={email} />

      <ListItemSecondaryAction>
        <Button
          color="primary"
          startIcon={<CardGiftcard />}
          style={{ marginRight: "1rem" }}
        >
          Lista życzeń
        </Button>
        {minWidth ? (
          <Button
            color="secondary"
            onClick={handleCancelFriendship}
            startIcon={<PersonAddDisabled />}
          >
            Usuń z listy znajomych
          </Button>
        ) : (
          <IconButton onClick={handleCancelFriendship}>
            <PersonAddDisabled color="secondary" />
          </IconButton>
        )}
      </ListItemSecondaryAction>
    </ListItem>
  );
};
