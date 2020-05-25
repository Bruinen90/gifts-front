import React from "react";

// MUI
import { Typography } from "@material-ui/core";

// Components
import { PageWrapper } from "../../components/PageWrapper/PageWrapper";
import { EmailSettings } from "../../components/EmailSettings/EmailSettings";
import { PasswordSettings } from "../../components/PasswordSettings/PasswordSettings";

export const UserSettings: React.FC = () => {
    return (
        <PageWrapper>
            <Typography variant="h1" align="center">
                Ustawienia
            </Typography>
            <PasswordSettings />
            <EmailSettings />
        </PageWrapper>
    );
};
