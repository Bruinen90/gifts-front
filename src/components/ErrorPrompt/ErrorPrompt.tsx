import React from "react";
import { useSelector } from "react-redux";

// MUI
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

// Types
import { State } from "../../types/State";

export const ErrorPrompt: React.FC = () => {
    const errors = useSelector((state: State) => state.errors);
    const errorsCount = Object.values(errors).length;
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
                        onClose={() => {}}
                        severity="error"
                    >
                        {errorsCount > 1
                            ? "Wygląda na to, że mamy problemy z serwerem, spróbuj ponownie za jakiś czas"
                            : Object.values(errors)[0]}
                    </MuiAlert>
                </Snackbar>
            )}
        </>
    );
};
