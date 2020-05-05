import React from "react";
import { useSelector } from "react-redux";

// MUI
import { Button, CircularProgress, ButtonProps } from "@material-ui/core";

// Types
import {
    LoadingCategory,
    LoadingType,
    LoadingOperation,
    State,
} from "../../types/State";

interface ButtonWithLoaderProps extends ButtonProps {
    loadingCategory?: LoadingCategory;
    loadingType?: LoadingType;
    recordId?: string;
    componentLoading?: boolean;
    operationType?: LoadingOperation;
    startIcon?: any;
}

export const ButtonWithLoader: React.FC<ButtonWithLoaderProps> = ({
    loadingCategory,
    loadingType,
    recordId,
    operationType,
    children,
    componentLoading,
    startIcon,
    ...other
}) => {
    const loadingState = useSelector((state: State) => state.loading);
    const isLoading =
        (loadingState.loading &&
            (loadingState.category === loadingCategory || !loadingCategory) &&
            loadingState.type === loadingType &&
            (loadingState.recordId === recordId || !loadingState.recordId) &&
            (!operationType || operationType === loadingState.operationType)) ||
        componentLoading;
    return (
        <Button
            {...other}
            disabled={isLoading}
            startIcon={isLoading ? null : startIcon}
        >
            {isLoading ? (
                <CircularProgress color="inherit" size={24} />
            ) : (
                children
            )}
        </Button>
    );
};
