import React from "react";
import { useSelector } from "react-redux";

// MUI
import { Button, CircularProgress, ButtonProps } from "@material-ui/core";

// Types
import { LoadingCategory, LoadingType, State } from "../../types/State";

interface ButtonWithLoaderProps extends ButtonProps {
    loadingCategory?: LoadingCategory;
    loadingType?: LoadingType;
    componentLoading?: boolean;
}

export const ButtonWithLoader: React.FC<ButtonWithLoaderProps> = ({
    loadingCategory,
    loadingType,
    children,
    componentLoading,
    ...other
}) => {
    const loadingState = useSelector((state: State) => state.loading);
    const isLoading =
        (loadingState.loading &&
        (loadingState.category === loadingCategory || !loadingCategory) &&
        loadingState.type === loadingType) || componentLoading;
    return (
        <Button {...other} disabled={isLoading}>
            {isLoading ? (
                <CircularProgress color="inherit" size={24} />
            ) : (
                children
            )}
        </Button>
    );
};
