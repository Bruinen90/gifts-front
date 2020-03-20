import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// MUI
import { Typography, List } from "@material-ui/core";

// Components
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import DrawRow from "../../components/DrawRow/DrawRow";

// Interfaces
import { DrawInterface, StateInterface } from "../../interfaces/interfaces";

const MyDraws = () => {
  const [usersDraws, userId] = useSelector((state: StateInterface) => [
    state.usersDraws,
    state.userId
  ]);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(userId, usersDraws);
    dispatch({
      type: "WATCH_GET_USER_DRAWS_LIST",
      payload: { userId: userId }
    });
  }, []);
  return (
    <PageWrapper>
      <Typography variant="h4" component="h2" align="center">
        Moje losowania
      </Typography>
      <List>
        {usersDraws &&
          usersDraws.map((draw: DrawInterface) => (
            <DrawRow
              title={draw.title}
              date={draw.date}
              // Replace with _id when backend addded!!!
              key={draw.title}
            />
          ))}
        <DrawRow title="Losowanie 2020!!!" date={new Date()} />
      </List>
    </PageWrapper>
  );
};
export default MyDraws;
