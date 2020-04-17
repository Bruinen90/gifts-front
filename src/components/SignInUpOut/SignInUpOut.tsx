import React from "react";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { Link as RouterLink } from "react-router-dom";

// MUI
import {
    ButtonGroup,
    Button,
    Box,
    Typography,
} from "@material-ui/core";

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

const SignInUpOut: React.FC<SignInUpOutProps> = ({ username, variant, closeDrawer }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const handleLogout = () => {
        dispatch({ type: "USER_LOGOUT_WATCHER" });
        history.push("/");
    };
    return username ? (
        <Box display="flex" alignItems="flex-end" marginLeft="2rem">
            <Box marginRight={2}>
                <Typography>Witaj {username}</Typography>
            </Box>
            <Button color="inherit" variant="outlined" onClick={handleLogout}>
                Wyloguj się
            </Button>
        </Box>
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

export default SignInUpOut;
