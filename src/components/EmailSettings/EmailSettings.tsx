import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

// MUI
import {
    Typography,
    CardContent,
    CardActions,
    Button,
    Switch,
} from "@material-ui/core";

// Components
import { CenteredCard } from "../CenteredCard/CenteredCard";

// Types
import { State } from "../../types/State";

interface EmailsState {
    emailInEdit: boolean;
    emailChanged: boolean;
    newEmail?: string;
    password?: string;
    unsubscribed: boolean;
}

export const EmailSettings: React.FC = () => {
    const user = useSelector((state: State) => state.auth);

    const [emailsForm, setEmailsForm] = useState<EmailsState>({
        emailInEdit: false,
        emailChanged: false,
        unsubscribed: false,
    });

    useEffect(() => {
        setEmailsForm((prev) => ({
            ...prev,
            unsubscribed: user.unsubscribed!,
        }));
    }, []);
    return (
        <CenteredCard>
            <CardContent>
                <Typography variant="h3">Powiadomienia email</Typography>
                <form></form>
            </CardContent>
            <CardActions>
                <Button variant="contained" color="primary" type="submit">
                    Zapisz zmiany
                </Button>
            </CardActions>
        </CenteredCard>
    );
};
