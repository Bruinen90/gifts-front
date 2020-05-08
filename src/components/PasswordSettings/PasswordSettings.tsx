import React, { useState } from "react";
import axios from "axios";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as actionTypes from "../../store/actions/actionTypes";
import * as actionCreators from "../../store/actions/actionCreators";

// MUI
import {
    Typography,
    CardContent,
    CardActions,
    Button,
    TextField,
    Box,
} from "@material-ui/core";

// Components
import { CenteredCard } from "../CenteredCard/CenteredCard";

type ChangeResponse =
    | "invalid-old-password"
    | "success"
    | "server-error"
    | undefined;

export const PasswordSettings: React.FC = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [changeResponse, setChangeResponse] = useState<ChangeResponse>();
    const { register, handleSubmit, errors, getValues } = useForm();
    const onSubmit = async (formData: any) => {
        const { oldPassword, newPassword } = formData;
        const graphQLquery = {
            query: `
			mutation{changePassword(changePasswordInput: 
				{
					newPassword: "${newPassword}",
					oldPassword: "${oldPassword}"
				}
			) {success message}}
        `,
        };
        try {
            const response = await axios.post("/graphql", graphQLquery);
            console.log(response.data);
            if (response.data.data.changePassword.success) {
                dispatch({ type: "USER_LOGOUT_WATCHER" });
                history.push("/logowanie");
                dispatch(
                    actionCreators.setSuccess({
                        page: "settings",
                        message:
                            "Twoje hasło zostało zaktualizowane, użyj nowego hasła aby ponownie się zalogować",
                    })
                );
            } else {
                setChangeResponse("invalid-old-password");
            }
        } catch (err) {
            console.log(err);
            setChangeResponse("server-error");
        }
    };
    return (
        <CenteredCard>
            <form onSubmit={handleSubmit(onSubmit)}>
                <CardContent>
                    <Typography variant="h3">Zmiana hasła</Typography>
                    <Box
                        padding={0.5}
                        display="flex"
                        flexDirection="column"
                        maxWidth="400px"
                    >
                        <TextField
                            error={changeResponse === "invalid-old-password"}
                            helperText={
                                changeResponse === "invalid-old-password" &&
                                "Podane hasło jest nieprawidłowe"
                            }
                            label="Stare hasło"
                            margin="normal"
                            inputRef={register({
                                required: true,
                                minLength: 5,
                            })}
                            name="oldPassword"
                            type="password"
                            autoComplete="off"
                        />
                        <TextField
                            label="Nowe hasło"
                            error={errors.hasOwnProperty("newPassword")}
                            helperText={
                                errors.password &&
                                "Hasło musi zawierać co najmniej 5 znaków"
                            }
                            margin="normal"
                            inputRef={register({
                                required: true,
                                minLength: 5,
                            })}
                            name="newPassword"
                            type="password"
                        />
                        <TextField
                            label="Powtórz nowe hasło"
                            error={errors.hasOwnProperty("repassword")}
                            helperText={
                                errors.repassword &&
                                "Hasła muszą być identyczne"
                            }
                            margin="normal"
                            inputRef={register({
                                validate: (repassword) =>
                                    repassword === getValues().newPassword,
                            })}
                            name="repassword"
                            type="password"
                        />
                    </Box>
                </CardContent>

                <CardActions>
                    <Button variant="contained" color="primary" type="submit">
                        Zapisz zmiany
                    </Button>
                    <Button component={RouterLink} to="/zresetuj-haslo">
                        Zapomniałem hasła
                    </Button>
                </CardActions>
            </form>
        </CenteredCard>
    );
};
