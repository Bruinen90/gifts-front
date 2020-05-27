import React from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actionTypes from "../../store/actions/actionTypes";

// MUI
import { Link, Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

// Types
import { State } from "../../types/State";

export const ErrorPrompt: React.FC = () => {
    const dispatch = useDispatch();
    const errors = useSelector((state: State) => state.errors);
    const errorsCount = Object.values(errors).length;

    const refreshPage = () => {
        window.location.reload();
    };

    const clearErrors = () => {
        dispatch({ type: actionTypes.CLEAR_ALL_ERRORS });
    };
    return (
        <>
            {errors && errorsCount > 0 && (
                <Snackbar
                    open={true}
                    onClose={() => {}}
                    autoHideDuration={1000}
                >
                    <MuiAlert
                        elevation={6}
                        variant="filled"
                        onClose={clearErrors}
                        severity="error"
                    >
                        {errorsCount > 1
                            ? "Wygląda na to, że mamy problemy z serwerem, spróbuj ponownie za jakiś czas"
                            : Object.values(errors)[0]}
                        <Link href="" color="inherit" onClick={refreshPage}>
                            Odśwież, aby spróbować ponownie.
                        </Link>
                    </MuiAlert>
                </Snackbar>
            )}
        </>
    );
};
