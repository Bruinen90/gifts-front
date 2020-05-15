import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router";

// Components
import PageWrapper from "../../components/PageWrapper/PageWrapper";

//MUI
import { Typography } from "@material-ui/core";

// Types
type ReqState = "loading" | "success" | "fail";

const UsubscribeConfirmation: React.FC = () => {
    const [reqState, setReqState] = useState<ReqState>("loading");
    useEffect(() => {
        const graphQLquery = ``;
        const unsubscribe = async () => {
            setReqState("loading");
            let success = false;
            if (success) {
                setReqState("success");
            } else {
                setReqState("fail");
            }
        };
        unsubscribe();
        // Send request to backend with email token from location
    }, []);
    const location = useLocation();
    return (
        <PageWrapper>
            <Typography>
                Nie będziesz już otrzymywać powiadomień mailowych z naszego
                serwisu
            </Typography>
        </PageWrapper>
    );
};

export default UsubscribeConfirmation;
