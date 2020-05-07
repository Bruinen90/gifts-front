import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";

// MUI
import {
    Typography,
    CardContent,
    CardActions,
    Button,
    FormControlLabel,
    Switch,
    TextField,
    Box,
    FormControl,
    Input,
    InputLabel,
    InputAdornment,
    IconButton,
    FormHelperText,
} from "@material-ui/core";

// Components
import { CenteredCard } from "../CenteredCard/CenteredCard";

// Types
import { State } from "../../types/State";
import { Edit, Cancel } from "@material-ui/icons";

interface EmailsState {
    emailInEdit: boolean;
    emailChanged: boolean;
}

type ChangeResponse =
    | "invalid-password"
    | "success"
    | "server-error"
    | undefined;

export const EmailSettings: React.FC = () => {
    // Set unsubcribed from redux as default, but manage it in local state of useForm hook
    const user = useSelector((state: State) => state.auth);
    const { register, handleSubmit, errors, setValue, getValues } = useForm();
    const [changeResponse, setChangeResponse] = useState<ChangeResponse>();
    const [emailsForm, setEmailsForm] = useState<EmailsState>({
        emailInEdit: false,
        emailChanged: false,
    });

    const onSubmit = (data: any) => console.log(data);

    const handleStartEditingEmail = () => {
        setEmailsForm({ emailInEdit: true, emailChanged: false });
    };

    const handleCancelEditingEmail = () => {
        setEmailsForm({ emailInEdit: false, emailChanged: false });
        setValue("email", user.email);
    };

    useEffect(() => {
        setValue("email", user.email);
        setValue("unsubcribed", user.unsubscribed);
    }, [user.email]);

    return (
        <CenteredCard>
            <form onSubmit={handleSubmit(onSubmit)}>
                <CardContent>
                    <Typography variant="h3">Powiadomienia email</Typography>
                    <Box
                        padding={0.5}
                        display="flex"
                        flexDirection="column"
                        maxWidth="400px"
                    >
                        <FormControl
                            margin="normal"
                            disabled={!emailsForm.emailInEdit}
                        >
                            <InputLabel htmlFor="email">
                                Twój adres email
                            </InputLabel>
                            <Input
                                id="email"
                                error={errors.hasOwnProperty("email")}
                                inputRef={register()}
                                name="email"
                                type="email"
                                autoComplete="off"
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="Edytuj adres email"
                                            onClick={
                                                emailsForm.emailInEdit
                                                    ? handleCancelEditingEmail
                                                    : handleStartEditingEmail
                                            }
                                        >
                                            {emailsForm.emailInEdit ? (
                                                <Cancel color="secondary" />
                                            ) : (
                                                <Edit />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                            {errors.email && (
                                <FormHelperText>
                                    Podaj prawidłowy adres email
                                </FormHelperText>
                            )}
                        </FormControl>

                        <TextField
                            error={changeResponse === "invalid-password"}
                            helperText={
                                changeResponse === "invalid-password"
                                    ? "Podane hasło jest nieprawidłowe"
                                    : "Ze względów bezpieczeństwa podaj swoje hasło"
                            }
                            label="Hasło"
                            margin="normal"
                            inputRef={register({
                                required: emailsForm.emailChanged,
                                minLength: 5,
                            })}
                            name="password"
                            type="password"
                            autoComplete="off"
                        />
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={getValues().unsubcribed}
                                    name="unsubscribed"
                                    color="secondary"
                                    inputRef={register()}
                                />
                            }
                            label="Nie chcę otrzymywać powiadomień na email"
                        />
                    </Box>
                </CardContent>

                <CardActions>
                    <Button variant="contained" color="primary" type="submit">
                        Zapisz zmiany
                    </Button>
                </CardActions>
            </form>
        </CenteredCard>
    );
};
