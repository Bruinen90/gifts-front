import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// MUI
import { Typography, Grid } from "@material-ui/core";

// Components
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import DrawRow from "../../components/DrawRow/DrawRow";

// Interfaces
import {
    DrawInterface,
    StateInterface,
    User
} from "../../interfaces/interfaces";

const MyDraws = () => {
    const [usersDraws, userId] = useSelector((state: StateInterface) => [
        state.usersDraws,
        state.userId
    ]);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: "WATCH_GET_USER_DRAWS_LIST",
            payload: { userId: userId }
        });
    }, [dispatch, userId, usersDraws]);
    return (
        <PageWrapper>
            <Typography variant="h4" component="h2" align="center">
                Moje losowania
            </Typography>
            <Grid container spacing={2}>
                {usersDraws &&
                    usersDraws.map((draw: DrawInterface) => {
                        if (draw.results) {
                            return (
                                <DrawRow
                                    title={draw.title}
                                    date={draw.date as Date}
                                    _id={draw._id}
                                    key={draw._id}
                                    results={draw.results}
                                    creator={draw.creator as User}
                                    participants={draw.participants as [User]}
                                    adminMode={draw.creator._id === userId}
                                    price={draw.price}
                                />
                            );
                        } else {
                            return (
                                <DrawRow
                                    title={draw.title}
                                    date={draw.date as Date}
                                    _id={draw._id}
                                    key={draw._id}
                                    creator={draw.creator as User}
                                    participants={draw.participants as [User]}
                                    adminMode={draw.creator._id === userId}
                                    price={draw.price}
                                />
                            );
                        }
                    })}
            </Grid>
        </PageWrapper>
    );
};
export default MyDraws;
