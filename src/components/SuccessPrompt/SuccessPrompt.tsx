import React from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actionCreators from "../../store/actions/actionCreators";

// MUI
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

// Types
import { State } from "../../types/State";

export const SuccessPrompt: React.FC = () => {
    const dispatch = useDispatch();
    const success = useSelector((state: State) => state.success);

    const handleCloseSnackbar = () => {
        dispatch(actionCreators.setSuccess({}));
    };
    // Adjust prompt showtime to average reading speed + 2 sec for finding it out
    let promptShowtime = 0;
    if (success.message) {
        promptShowtime = 2000 + 400 * success.message.split(" ").length;
    }

    return (
        <Snackbar
            open={success.page !== undefined || success.message !== undefined}
            autoHideDuration={promptShowtime}
            onClose={handleCloseSnackbar}
        >
            <MuiAlert
                elevation={6}
                variant="filled"
                onClose={handleCloseSnackbar}
                severity="success"
            >
                {success.message}
            </MuiAlert>
        </Snackbar>
    );
};
