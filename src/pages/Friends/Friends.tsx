import React from "react";
import { useSelector } from "react-redux";

// Components
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import { FriendBox } from "../../components/FriendBox/FriendBox";

// MUI
import { Box, Typography, Button, List } from "@material-ui/core";

// Types
import { StateInterface } from "../../interfaces/interfaces";

// Images
import Subscriptions from "../../img/subscripions.svg";

export const Friends: React.FC = () => {
  const friendsList = useSelector((state: StateInterface) => state.friends);

  const handleCancelFriendship = () => {
    console.log("canceling friendship");
  };
  return (
    <PageWrapper>
      <Typography variant="h1" align="center">
        Twoi znajomi
      </Typography>
      <List style={{ maxWidth: "600px", margin: "auto" }}>
        <FriendBox _id="124" username="Helenka" email="helenka@gmail.com" />
      </List>
      <Box
        textAlign="center"
        display="flex"
        flexDirection="column"
        alignItems="center"
        margin="2rem auto"
      >
        {friendsList && friendsList.length > 0 ? (
          friendsList.map((friend) => (
            <FriendBox
              _id={friend._id}
              username={friend.username}
              email={friend.email}
            />
          ))
        ) : (
          <>
            <Typography style={{ opacity: "0.5" }}>
              Nie masz jeszcze żadnych znajomych
            </Typography>
            <img
              src={Subscriptions}
              style={{
                width: "20%",
                maxWidth: "180px",
                opacity: "0.5",
                margin: "2rem",
              }}
            />
            <Button variant="contained" color="primary">
              Szukaj znajomych
            </Button>
          </>
        )}
      </Box>
    </PageWrapper>
  );
};
