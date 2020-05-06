import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useLocation, useHistory } from "react-router-dom";

// Components
import PageWrapper from "../../components/PageWrapper/PageWrapper";

// MUI
import { Typography, TextField, Button } from "@material-ui/core";

export const NewPassword: React.FC = () => {
    const location = useLocation();
    const history = useHistory();
    const { handleSubmit, register, errors, getValues } = useForm();

    const onSubmit = async (formData: any) => {
        const { password } = formData;
        const email = location.search.slice(1);
        const token = location.hash.slice(1);
        const graphQLquery = {
            query: `
			mutation{setNewPassword(newPasswordInput: 
				{
					password: "${password}",
					email: "${email}",
					token: "${token}"
				}
			) {success message}}
        `,
        };
        try {
            const response = await axios.post("/graphql", graphQLquery);
            console.log(response.data);
            if (response.data.data.setNewPassword.success) {
                history.push("/logowanie");
            } else {
                throw new Error(response.data.data);
            }
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <PageWrapper>
            <Typography variant="h1" align="center">
                Utwórz nowe hasło
            </Typography>
            <form
                onSubmit={handleSubmit(onSubmit)}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    maxWidth: "400px",
                    margin: "2rem auto",
                }}
            >
                <TextField
                    label="Nowe hasło"
                    error={errors.hasOwnProperty("password")}
                    helperText={
                        errors.password &&
                        "Hasło musi zawierać co najmniej 5 znaków"
                    }
                    margin="normal"
                    inputRef={register({
                        required: true,
                        minLength: 5,
                    })}
                    name="password"
                    type="password"
                />
                <TextField
                    label="Powtórz nowe hasło"
                    error={errors.hasOwnProperty("repassword")}
                    helperText={
                        errors.repassword && "Hasła muszą być identyczne"
                    }
                    margin="normal"
                    inputRef={register({
                        validate: (repassword) =>
                            repassword === getValues().password,
                    })}
                    name="repassword"
                    type="password"
                />
                <Button variant="contained" color="primary" type="submit">
                    Ustaw hasło
                </Button>
            </form>
        </PageWrapper>
    );
};
