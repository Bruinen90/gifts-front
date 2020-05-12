import React from "react";
import { useSelector } from "react-redux";

// MUI
import { Box, CircularProgress } from "@material-ui/core";

// Types
import { State } from "../../types/State";

interface LoadingOverlayProps {
    recordId: string;
    indicatorSize?: number;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
    recordId,
    indicatorSize,
}) => {
    const loadingId = useSelector((state: State) => state.loading.recordId);

    if (!loadingId || loadingId !== recordId) {
        return null;
    } else {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                position="absolute"
                left="8px"
                top="8px"
                right="8px"
                bottom="8px"
                bgcolor="rgba(255, 255, 255, 0.8)"
                zIndex="10"
                style={{ cursor: "wait" }}
            >
                <CircularProgress size={indicatorSize || 90} />
            </Box>
        );
    }
};

export default LoadingOverlay;
