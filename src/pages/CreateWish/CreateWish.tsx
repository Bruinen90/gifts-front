import React from "react";
import {useDispatch} from 'react-redux';
import { useForm } from "react-hook-form";

import { Typography, TextField, Button } from "@material-ui/core";

import * as Styled from "./stylesCreateWish";

const CreateWish: React.FC = () => {
	const dispatch = useDispatch()
    // Validation
    const { handleSubmit, register, errors, triggerValidation } = useForm({
        defaultValues: {
            title: "",
            description: "",
            link: "",
            price: ""
        }
    });

    const handleTriggerValidation = async (
        event: React.FocusEvent<HTMLInputElement>
    ) => {
        triggerValidation(event.target.getAttribute("name")!);
    };

    // Submiting
    const onSubmit = (formData: any) => {
		// Remove blank fields
        Object.keys(formData).forEach(key => {
            if (formData[key] === "") {
                delete formData[key];
            }
        });
        dispatch({ type: 'CREATE_DRAW_WISH', payload: formData });
    };
    return (
        <>
            <Typography variant="h4" component="h2" align="center">
                Utwórz życzenie
            </Typography>
            <Styled.MyForm onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    error={errors.hasOwnProperty("title")}
                    helperText={
                        errors.title
                            ? "Nazwa życzenia powinna zawierać co najmniej 3 znaki"
                            : "Np. skarpetki w kropki"
                    }
                    label="Nazwa życzenia"
                    margin="normal"
                    inputRef={register({ required: true, minLength: 3 })}
                    name="title"
                    onBlur={handleTriggerValidation}
                />
                <TextField
                    error={errors.hasOwnProperty("description")}
                    helperText={
                        "Np. rozmiar, kolor, gdzie kupić i inne przydatne informacje o prezencie"
                    }
                    label="Opis prezentu"
                    multiline
                    rowsMax={10}
                    margin="normal"
                    name="description"
                    inputRef={register()}
                />
                <TextField
                    error={errors.hasOwnProperty("link")}
                    helperText={
                        errors.link
                            ? "Podaj prawidłowy adres URL"
                            : "Jeśli posiadasz dołącz link do zdjęcia lub specyfikacji prezentu np. na stronie jego producenta"
                    }
                    label="Link"
                    margin="normal"
                    name="link"
                    inputRef={register({
                        pattern: /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
                    })}
                    onBlur={handleTriggerValidation}
                />
                <TextField
                    type="number"
                    error={errors.hasOwnProperty("price")}
                    helperText={
                        errors.link &&
                        "Podanie orientacyjnej ceny prezentu jest wymagane"
                    }
                    label="Orientacyjna cena"
                    margin="normal"
                    name="price"
                    inputRef={register({ required: true, min: 1 })}
                    onBlur={handleTriggerValidation}
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    style={{ marginTop: "1rem" }}
                >
                    Zapisz życzenie
                </Button>
            </Styled.MyForm>
        </>
    );
};

export default CreateWish;
