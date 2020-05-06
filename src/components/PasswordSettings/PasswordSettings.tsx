import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";

// MUI
import {
    Typography,
    CardContent,
    CardActions,
    Button,
} from "@material-ui/core";

// Components
import { CenteredCard } from "../CenteredCard/CenteredCard";

// Types
import { State } from "../../types/State";

export const PasswordSettings: React.FC = () => {
    const user = useSelector((state: State) => state.auth);

    const [password, setPasswordForm] = useState({
        oldPassword: "",
        newPassword: "",
        reNewPassword: "",
    });
    return (
        <CenteredCard>
            <CardContent>
                <Typography variant="h3">Zmiana hasła</Typography>
            </CardContent>
            <CardActions>
                <Button variant="contained" color="primary" type="submit">
                    Zapisz zmiany
                </Button>
                <Button component={RouterLink} to="/zresetuj-haslo">
                    Zapomniałem hasła
                </Button>
            </CardActions>
        </CenteredCard>
    );
};
