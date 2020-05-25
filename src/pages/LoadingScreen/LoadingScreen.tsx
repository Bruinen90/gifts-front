import React from "react";

// Styles
import * as Styled from "./stylesLoadingScreen";

// Components
import {LogoBox} from "../../components/LogoBox/LogoBox";

// MUI
import { CircularProgress } from "@material-ui/core";

export const LoadingScreen: React.FC = () => {
    return (
        <Styled.Wrapper>
            <LogoBox scale={window.innerWidth / 400} />
            <CircularProgress style={{ margin: "2rem auto" }} />
        </Styled.Wrapper>
    );
};
