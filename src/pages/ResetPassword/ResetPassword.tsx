import React from "react";
import { useForm } from "react-hook-form";

// Components
import PageWrapper from "../../components/PageWrapper/PageWrapper";

// MUI
import { Typography, TextField, Button } from "@material-ui/core";

export const ResetPassword: React.FC = () => {
    const { handleSubmit, register, errors } = useForm();

    const onSubmit = (formData: any) => {
        console.log(formData);
    };
    return (
        <PageWrapper>
            <Typography component="h1" align="center">
                Zresetuj hasło
            </Typography>
            <Typography>
                Jeśli zapomniałeś hasła możesz je zresetować, aby odzyskać
                dostęp do swojego konta. Link otrzymasz na adres email podany
                podczas rejestracji
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    label="Twój adres email"
                    error={errors.hasOwnProperty("email")}
                    helperText={errors.email && "Podaj prawidłowy adres email"}
                    margin="normal"
                    inputRef={register({
                        required: true,
                        pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                    })}
                    name="email"
                />
                <Button variant="contained" color="primary" type="submit">
                    Zresetuj hasło
                </Button>
            </form>
        </PageWrapper>
    );
};
