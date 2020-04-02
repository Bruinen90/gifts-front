import React from "react";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { Link as RouterLink } from "react-router-dom";

// MUI
import {
    Hidden,
    ButtonGroup,
    Button,
    Box,
    Typography
} from "@material-ui/core";

interface SignInUpOutProps {
    username: string | undefined;
}

const SignInUpOut: React.FC<SignInUpOutProps> = ({ username }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const handleLogout = () => {
        dispatch({ type: "USER_LOGOUT_WATCHER" });
        history.push("/");
    };
    return (
        <Hidden smDown>
            {username ? (
                <Box display="flex" alignItems="flex-end">
                    <Box marginRight={2}>
                        <Typography>Witaj {username}</Typography>
                    </Box>
                    <Button
                        color="inherit"
                        variant="outlined"
                        onClick={handleLogout}
                    >
                        Wyloguj się
                    </Button>
                </Box>
            ) : (
                <ButtonGroup>
                    <Button
                        component={RouterLink}
                        to="/logowanie"
                        color="secondary"
                        variant="contained"
                    >
                        Zaloguj się
                    </Button>
                    <Button
                        component={RouterLink}
                        to="/rejestracja"
                        color="secondary"
                        variant="contained"
                    >
                        Utwórz konto
                    </Button>
                </ButtonGroup>
            )}
        </Hidden>
    );
};

export default SignInUpOut;
