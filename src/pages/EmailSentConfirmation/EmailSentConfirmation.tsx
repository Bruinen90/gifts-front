import React from "react";

// Components
import { PageWrapper } from "../../components/PageWrapper/PageWrapper";

// MUI
import { Typography, Box } from "@material-ui/core";

export const EmailSentConfirmation = () => (
    <PageWrapper>
        <Typography variant="h1" align="center">
            Sprawdź pocztę
        </Typography>
        <Box mx="auto" my={5} maxWidth="600px">
            <Typography>
                Jeśli podałeś właściwy adres email otrzymasz wiadomość
                zawierającą link, za pomocą którego utworzysz nowe hasło do
                swojego konta. Link jest ważny przez 1 godzinę.
                <br />
                <br />
                Jeśli nie otrzymałeś wiadomości (sprawdź również folder SPAM)
                upewnij się, że podałeś ten sam adres email co podczas
                rejestracji.
            </Typography>
        </Box>
    </PageWrapper>
);
