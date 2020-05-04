import React from "react";
import { useSelector } from "react-redux";

// MUI
import { Box, CircularProgress } from "@material-ui/core";

// Types
import { State, LoadingCategory, LoadingType } from "../../types/State";

interface LoadingSpinnerProps {
    category?: LoadingCategory;
    type?: LoadingType;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
    category,
    type,
    children,
}) => {
    const loadingState = useSelector((state: State) => state.loading);
    if (
        loadingState.loading &&
        (loadingState.category === category || !category) &&
        (loadingState.type === type || !type)
    ) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="33vh"
            >
                <CircularProgress size={90} />
            </Box>
        );
    } else {
        return <>{children}</>;
    }
};
