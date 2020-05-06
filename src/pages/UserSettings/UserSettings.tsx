import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";

// MUI
import { Typography } from "@material-ui/core";

// Components
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import { EmailSettings } from "../../components/EmailSettings/EmailSettings";

// Types
import { State } from "../../types/State";
import { PasswordSettings } from "../../components/PasswordSettings/PasswordSettings";

export const UserSettings: React.FC = () => {
    const user = useSelector((state: State) => state.auth);

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
