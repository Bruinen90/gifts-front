import React, { useEffect } from "react";
import { useLocation } from "react-router";
import { Link as RouterLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as watchersTypes from "../../store/actions/watcherTypes";

// Components
import { PageWrapper } from "../../components/PageWrapper/PageWrapper";

//MUI
import { Typography, Box, Link } from "@material-ui/core";

// Images
import Email from "../../img/undraw_opened.svg";

export const UsubscribeConfirmation: React.FC = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    useEffect(() => {
        const searchParams = location.search
            .split("?")
            .slice(1)
            .map((string) => {
                const [key, value] = string.split("=");
                return { [key]: value };
            })
            .reduce((prevVal, currValue) => ({ ...prevVal, ...currValue }));
        console.log(searchParams);
        if (!searchParams || !searchParams.email || !searchParams.token) {
            throw new Error(
                "Niepoprawne dane, nie udało się zablokować powiadomień"
            );
        }
        dispatch({
            type: watchersTypes.WATCH_UNSUBSCRIBE,
            payload: { email: searchParams.email, token: searchParams.token },
        });
    }, [dispatch, location.search]);
    return (
        <PageWrapper>
            <Box maxWidth="400px" margin="auto" textAlign="center">
                <img
                    src={Email}
                    alt=""
                    style={{ width: "250px", margin: "2rem auto" }}
                />
                <Typography variant="h5" color="primary">
                    Wyłączono powiadomienia email
                </Typography>
                <Typography>
                    Nie będziesz już otrzymywać wiadomości z naszego serwisu.
                    Możesz je przywrócić w{" "}
                    <Link component={RouterLink} to="/ustawienia">
                        ustawieniach swojego konta
                    </Link>
                    .
                </Typography>
            </Box>
        </PageWrapper>
    );
};
