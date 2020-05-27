import React from "react";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import * as watcherTypes from "../../store/actions/watcherTypes";

// MUI
import { ButtonGroup, Button, Box } from "@material-ui/core";
import { Person } from "@material-ui/icons";

// Styles
import * as Styled from "./styles";

// Types
interface ButtonsWrapperProps {
    variant: "horizontal" | "vertical";
}

const ButtonsWrapper: React.FC<ButtonsWrapperProps> = ({ variant, children }) =>
    variant === "horizontal" ? (
        <ButtonGroup>{children}</ButtonGroup>
    ) : (
        <Box
            maxWidth="90%"
            display="flex"
            flexDirection="column"
            margin="0 auto"
            height="85px"
            justifyContent="space-between"
        >
            {children}
        </Box>
    );

interface SignInUpOutProps {
    username: string | undefined;
    variant: "vertical" | "horizontal";
    closeDrawer?: () => void;
}

export const SignInUpOut: React.FC<SignInUpOutProps> = ({
    username,
    variant,
    closeDrawer,
}) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const handleLogout = () => {
        dispatch({ type: watcherTypes.WATCH_USER_LOGOUT });
        history.push("/");
    };
    return username ? (
        <Styled.LogoutBox>
            <Box marginRight={2}>
                <Button
                    component={RouterLink}
                    to="/ustawienia"
                    style={{
                        color: "inherit",
                        textDecoration: "none",
                        display: "flex",
                        alignItems: "center",
                        padding: "8px",
                        textTransform: "none",
                    }}
                    onClick={closeDrawer}
                >
                    <Person style={{ marginRight: "8px" }} /> {username}
                </Button>
            </Box>
            <Button color="inherit" variant="outlined" onClick={handleLogout}>
                Wyloguj się
            </Button>
        </Styled.LogoutBox>
    ) : (
        <ButtonsWrapper variant={variant}>
            <Button
                component={RouterLink}
                to="/logowanie"
                color="secondary"
                variant="contained"
                onClick={closeDrawer}
            >
                Zaloguj się
            </Button>
            <Button
                component={RouterLink}
                to="/rejestracja"
                color="secondary"
                variant="contained"
                onClick={closeDrawer}
            >
                Utwórz konto
            </Button>
        </ButtonsWrapper>
    );
};
